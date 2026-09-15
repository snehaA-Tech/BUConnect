import React, { useState } from "react";

const initialQueries = [
  {
    _id: "q1",
    title: "OA link not working",
    description: "Flipkart OA link giving error",
    postedBy: "Riya",
    status: "pending",
    priorityScore: 1,
    createdAt: 1,
    upvotedBy: [],
    replies: [],
  },
  {
    _id: "q2",
    title: "Unable to submit form",
    description: "Goldman Sachs registration form not submitting",
    postedBy: "Aman",
    status: "pending",
    priorityScore: 1,
    createdAt: 2,
    upvotedBy: [],
    replies: [],
  },
  {
    _id: "q3",
    title: "Interview slot not showing",
    description: "Cisco interview slot booking page is blank",
    postedBy: "Neha",
    status: "in-progress",
    priorityScore: 1,
    createdAt: 3,
    upvotedBy: [],
    replies: [],
  },
];

const stopWords = new Set([
  "a",
  "an",
  "the",
  "is",
  "are",
  "was",
  "were",
  "am",
  "be",
  "been",
  "being",
  "to",
  "of",
  "for",
  "from",
  "in",
  "on",
  "at",
  "by",
  "with",
  "and",
  "or",
  "but",
  "my",
  "me",
  "i",
  "we",
  "our",
  "you",
  "your",
  "it",
  "this",
  "that",
  "there",
  "here",
  "not",

  // Hinglish filler words
  "mera",
  "meri",
  "mere",
  "mujhe",
  "muje",
  "hum",
  "hamara",
  "wala",
  "wali",
  "wale",
  "ka",
  "ki",
  "ke",
  "ko",
  "se",
  "me",
  "mai",
  "main",
  "hai",
  "hain",
  "ho",
  "raha",
  "rahi",
  "rha",
  "rhi",
  "nahi",
  "nhi",
  "na",
  "kya",
  "kab",
  "tak",
  "abhi",
  "ye",
  "wo",
  "aur",
  "le",
  "de",
  "pa",
]);

function normalizeText(text = "") {
  return text
    .toLowerCase()

    // Email/account phrases
    .replace(/\bemail address\b/g, "emailaccount")
    .replace(/\bemail id\b/g, "emailaccount")
    .replace(/\bmail id\b/g, "emailaccount")
    .replace(/\bbanasthali wali id\b/g, "banasthali emailaccount")
    .replace(/\bbanasthali id\b/g, "banasthali emailaccount")
    .replace(/\bemail\b/g, "emailaccount")

    // Login/access/accepting issue
    .replace(/\bnhi le rha\b/g, "accessissue")
    .replace(/\bnahi le raha\b/g, "accessissue")
    .replace(/\bnhi le raha\b/g, "accessissue")
    .replace(/\bnahi le rha\b/g, "accessissue")

    .replace(/\blog\s*in\b/g, "accessissue")
    .replace(/\blogin\b/g, "accessissue")
    .replace(/\bsign\s*in\b/g, "accessissue")
    .replace(/\bsignin\b/g, "accessissue")

    .replace(/\baccepting\b/g, "accessissue")
    .replace(/\baccepted\b/g, "accessissue")
    .replace(/\baccept\b/g, "accessissue")
    .replace(/\brejected\b/g, "accessissue")
    .replace(/\brejecting\b/g, "accessissue")

    // Submission
    .replace(/\bsubmitting\b/g, "submit")
    .replace(/\bsubmission\b/g, "submit")

    // Availability
    .replace(/\baayega\b/g, "available")
    .replace(/\baayegi\b/g, "available")
    .replace(/\bmilega\b/g, "available")
    .replace(/\bmilegi\b/g, "available")

    // Remove punctuation
    .replace(/[^a-z0-9\s]/g, " ");
}

function getKeywords(text) {
  return normalizeText(text)
    .split(/\s+/)
    .filter(
      (word) =>
        word.length > 1 &&
        !stopWords.has(word)
    );
}

function calculateSimilarity(text1, text2) {
  const words1 = new Set(getKeywords(text1));
  const words2 = new Set(getKeywords(text2));

  if (words1.size === 0 || words2.size === 0) {
    return {
      score: 0,
      commonWords: 0,
    };
  }

  const intersection = [...words1].filter((word) =>
    words2.has(word)
  );

  const commonWords = intersection.length;

  const smallerSetSize = Math.min(
    words1.size,
    words2.size
  );

  return {
    score: commonWords / smallerSetSize,
    commonWords,
  };
}

function samePerson(name1, name2) {
  return (
    name1.trim().toLowerCase() ===
    name2.trim().toLowerCase()
  );
}

function QueryBoard() {
  const [queries, setQueries] = useState(initialQueries);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Temporary until real login is connected
  const [currentStudentName, setCurrentStudentName] =
    useState("");

  const [currentRole, setCurrentRole] =
    useState("student");

  const [message, setMessage] = useState("");
  const showMessage = (text) => {
  setMessage(text);

  setTimeout(() => {
    setMessage("");
  }, 3000);
};

  const [replyInputs, setReplyInputs] = useState({});

  const sortedQueries = [...queries].sort((a, b) => {
    // Unresolved queries first
    if (
      a.status === "resolved" &&
      b.status !== "resolved"
    ) {
      return 1;
    }

    if (
      a.status !== "resolved" &&
      b.status === "resolved"
    ) {
      return -1;
    }

    // Then highest priority
    if (b.priorityScore !== a.priorityScore) {
      return b.priorityScore - a.priorityScore;
    }

    return a.createdAt - b.createdAt;
  });

  const isOwner = (query) => {
    if (!currentStudentName.trim()) return false;

    return samePerson(
      query.postedBy,
      currentStudentName
    );
  };

  const isParticipant = (query) => {
  if (!currentStudentName.trim()) return false;

  // Original poster
  if (
    samePerson(
      query.postedBy,
      currentStudentName
    )
  ) {
    return true;
  }

  // Student who pressed +
  return (query.upvotedBy || []).some(
    (name) =>
      samePerson(
        name,
        currentStudentName
      )
  );
};

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("");

    if (currentRole !== "student") {
      setMessage("Only students can post queries.");
      return;
    }

    if (!currentStudentName.trim()) {
      setMessage("Please enter your name first.");
      return;
    }

    if (!title.trim()) {
      setMessage("Please enter an issue title.");
      return;
    }

    let bestDuplicate = null;
    let bestScore = 0;

    queries.forEach((query) => {
      if (query.status === "resolved") {
        return;
      }

      const newDescriptionWords =
        getKeywords(description);

      const oldDescriptionWords =
        getKeywords(query.description || "");

      const descriptionSimilarity =
        calculateSimilarity(
          description,
          query.description || ""
        );

      const combinedSimilarity =
        calculateSimilarity(
          `${title} ${description}`,
          `${query.title} ${query.description || ""}`
        );

      let isDuplicate = false;
      let matchScore = 0;

      if (
        newDescriptionWords.length >= 2 &&
        oldDescriptionWords.length >= 2
      ) {
        isDuplicate =
          descriptionSimilarity.commonWords >= 2 &&
          descriptionSimilarity.score >= 0.5;

        matchScore = descriptionSimilarity.score;
      } else {
        isDuplicate =
          combinedSimilarity.commonWords >= 2 &&
          combinedSimilarity.score >= 0.6;

        matchScore = combinedSimilarity.score;
      }

      if (
        isDuplicate &&
        matchScore > bestScore
      ) {
        bestDuplicate = query;
        bestScore = matchScore;
      }
    });

    if (bestDuplicate) {
      const previousUpvotes =
        bestDuplicate.upvotedBy || [];

      const alreadySupported =
        previousUpvotes.some((name) =>
          samePerson(name, currentStudentName)
        );

      const ownQuery = samePerson(
        bestDuplicate.postedBy,
        currentStudentName
      );

      if (ownQuery) {
        showMessage(
          `You have already posted this query: "${bestDuplicate.title}".`
        );
      } else if (alreadySupported) {
        showMessageMessage(
          `You have already supported this query: "${bestDuplicate.title}".`
        );
      } else {
        setQueries((previousQueries) =>
          previousQueries.map((query) =>
            query._id === bestDuplicate._id
              ? {
                  ...query,
                  priorityScore:
                    query.priorityScore + 1,
                  upvotedBy: [
                    ...(query.upvotedBy || []),
                    currentStudentName.trim(),
                  ],
                }
              : query
          )
        );

        showMessage(
          `Similar query already exists. Priority increased for "${bestDuplicate.title}".`
        );
      }

      setTitle("");
      setDescription("");
      return;
    }

    const newQuery = {
      _id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      postedBy: currentStudentName.trim(),
      status: "pending",
      priorityScore: 1,
      createdAt: Date.now(),
      upvotedBy: [],
      replies: [],
    };

    setQueries((previousQueries) => [
      ...previousQueries,
      newQuery,
    ]);

    showMessage("Query posted successfully.");

    setTitle("");
    setDescription("");
  };

  // Student + button
  const increasePriority = (id) => {
    if (currentRole !== "student") {
      showMessage(
        "Priority support is available for students."
      );
      return;
    }

    if (!currentStudentName.trim()) {
      showMessage(
        "Enter your name before supporting a query."
      );
      return;
    }

    const targetQuery = queries.find(
      (query) => query._id === id
    );

    if (!targetQuery) return;

    if (targetQuery.status === "resolved") {
      showMessage(
        "Resolved queries cannot be upvoted."
      );
      return;
    }

    if (isOwner(targetQuery)) {
      showMessage(
        "Your own query already counts as one priority."
      );
      return;
    }

    const upvotedBy =
      targetQuery.upvotedBy || [];

    const alreadyUpvoted =
      upvotedBy.some((name) =>
        samePerson(name, currentStudentName)
      );

    if (alreadyUpvoted) {
      showMessage(
        "You have already supported this query."
      );
      return;
    }

    setQueries((previousQueries) =>
      previousQueries.map((query) =>
        query._id === id
          ? {
              ...query,
              priorityScore:
                query.priorityScore + 1,
              upvotedBy: [
                ...(query.upvotedBy || []),
                currentStudentName.trim(),
              ],
            }
          : query
      )
    );

    showMessage("Priority increased.");
  };

  // Student/Admin replies
  const addReply = (id) => {
    const replyText =
      (replyInputs[id] || "").trim();

    if (!replyText) {
      showMessage("Please type a reply first.");
      return;
    }

    let repliedBy = "Admin";

    if (currentRole === "student") {
      if (!currentStudentName.trim()) {
  showMessage(
    "Enter your name before replying."
  );
  return;
}

      repliedBy = currentStudentName.trim();
    }

    const newReply = {
      id: `${Date.now()}-${Math.random()}`,
      text: replyText,
      repliedBy,
      role: currentRole,
    };

    setQueries((previousQueries) =>
      previousQueries.map((query) =>
        query._id === id
          ? {
              ...query,
              replies: [
                ...(query.replies || []),
                newReply,
              ],
            }
          : query
      )
    );

    setReplyInputs((previous) => ({
      ...previous,
      [id]: "",
    }));

    showMessage("Reply added.");
  };

  // Admin starts work
  const markInProgress = (id) => {
    if (currentRole !== "admin") return;

    setQueries((previousQueries) =>
      previousQueries.map((query) =>
        query._id === id
          ? {
              ...query,
              status: "in-progress",
            }
          : query
      )
    );
  };

  // Admin OR query owner can resolve
  const markResolved = (id) => {
    const targetQuery = queries.find(
      (query) => query._id === id
    );

    if (!targetQuery) return;

    const allowed =
      currentRole === "admin" ||
      (
        currentRole === "student" &&
        isOwner(targetQuery)
      );

    if (!allowed) {
      showMessage(
        "Only the query owner or admin can resolve this query."
      );
      return;
    }

    setQueries((previousQueries) =>
      previousQueries.map((query) =>
        query._id === id
          ? {
              ...query,
              status: "resolved",
            }
          : query
      )
    );

    showMessage("Query marked as resolved.");
  };

  const stillFacingIssue = (id) => {
  const targetQuery = queries.find(
    (query) => query._id === id
  );

  if (!targetQuery) return;

  if (!currentStudentName.trim()) {
    showMessage(
      "Please enter your name first."
    );
    return;
  }

  if (!isParticipant(targetQuery)) {
    showMessage(
      "Only students affected by this issue can reopen it."
    );
    return;
  }

  if (targetQuery.status !== "resolved") {
    return;
  }

  setQueries((previousQueries) =>
    previousQueries.map((query) =>
      query._id === id
        ? {
            ...query,
            status: "in-progress",
          }
        : query
    )
  );

  showMessage(
    "Query reopened because the issue is still being faced."
  );
};

  const deleteQuery = (id) => {
    const targetQuery = queries.find(
      (query) => query._id === id
    );

    if (!targetQuery) return;

    let allowed = false;

    if (currentRole === "admin") {
      allowed = true;
    } else if (
      currentRole === "student" &&
      isOwner(targetQuery) &&
      targetQuery.status === "pending" &&
      targetQuery.priorityScore === 1 &&
      (targetQuery.replies || []).length === 0
    ) {
      allowed = true;
    }

    if (!allowed) {
      showMessage(
        "You cannot delete this query because other users may already be using it."
      );
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this query?"
    );

    if (!confirmed) return;

    setQueries((previousQueries) =>
      previousQueries.filter(
        (query) => query._id !== id
      )
    );

    showMessage("Query deleted.");
  };

  return (
    <div style={styles.section}>

      <div style={styles.topBar}>
        <h1 style={styles.heading}>
          Placement Query Board
        </h1>

        <div style={styles.roleBox}>
          <span style={styles.roleText}>
            Viewing as:
          </span>

          <button
            type="button"
            style={
              currentRole === "student"
                ? styles.activeRoleButton
                : styles.roleButton
            }
            onClick={() => {
              setCurrentRole("student");
              showMessage("");
            }}
          >
            Student
          </button>

          <button
            type="button"
            style={
              currentRole === "admin"
                ? styles.activeRoleButton
                : styles.roleButton
            }
            onClick={() => {
              setCurrentRole("admin");
              setMessage("");
            }}
          >
            Admin
          </button>
        </div>
      </div>

      <p style={styles.roleInfo}>
        {currentRole === "student"
          ? "Student Mode: Post, support, reply and resolve your own queries."
          : "Admin Mode: Reply, manage status, resolve and delete queries."}
      </p>

      {currentRole === "student" && (
        <input
          type="text"
          placeholder="Your name (temporary testing)"
          value={currentStudentName}
          onChange={(e) =>
            setCurrentStudentName(
              e.target.value
            )
          }
          style={styles.studentNameInput}
        />
      )}

      {message && (
  <div style={styles.toast}>
    {message}
  </div>
)}

      {currentRole === "student" && (
        <form
          onSubmit={handleSubmit}
          style={styles.form}
        >
          <input
            type="text"
            placeholder="Issue title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            style={styles.input}
          />

          <textarea
            placeholder="Describe the issue"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            style={styles.textarea}
          />

          <button
            type="submit"
            style={styles.button}
          >
            Post Query
          </button>
        </form>
      )}

      <div style={styles.queryList}>
        {sortedQueries.map((query) => {
          const replies =
            query.replies || [];

          const ownQuery = isOwner(query);

          const participant = isParticipant(query);

          const alreadyUpvoted =
            (query.upvotedBy || []).some(
              (name) =>
                samePerson(
                  name,
                  currentStudentName
                )
            );

          return (
            <div
              key={query._id}
              style={styles.queryCard}
            >
              <div style={styles.queryHeader}>
                <h3 style={styles.queryTitle}>
                  {query.title}
                </h3>

                <span
                  style={statusBadgeStyle(
                    query.status
                  )}
                >
                  {query.status}
                </span>
              </div>

              {query.description && (
                <p style={styles.description}>
                  {query.description}
                </p>
              )}

              <div style={styles.priorityRow}>
                <p style={styles.meta}>
                  Posted by {query.postedBy}
                  {" • "}
                  Priority:{" "}
                  {query.priorityScore}
                </p>

                {currentRole === "student" &&
                  query.status !==
                    "resolved" && (
                    <button
                      type="button"
                      onClick={() =>
                        increasePriority(
                          query._id
                        )
                      }
                      disabled={
                        ownQuery ||
                        alreadyUpvoted
                      }
                      style={
                        ownQuery ||
                        alreadyUpvoted
                          ? styles.disabledPlusButton
                          : styles.plusButton
                      }
                      title={
                        ownQuery
                          ? "Your own query"
                          : alreadyUpvoted
                          ? "Already supported"
                          : "I have the same problem"
                      }
                    >
                      +
                    </button>
                  )}
              </div>

              {replies.length > 0 && (
                <div style={styles.repliesBox}>
                  <strong>Replies</strong>

                  {replies.map((reply) => (
                    <div
                      key={reply.id}
                      style={styles.reply}
                    >
                      <div
                        style={
                          styles.replyHeader
                        }
                      >
                        <strong>
                          {reply.repliedBy}
                        </strong>

                        <span
                          style={
                            reply.role ===
                            "admin"
                              ? styles.adminBadge
                              : styles.studentBadge
                          }
                        >
                          {reply.role}
                        </span>
                      </div>

                      <div>
                        {reply.text}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div style={styles.replyForm}>
  <input
    type="text"
    placeholder="Write a reply..."
    value={
      replyInputs[query._id] || ""
    }
    onChange={(e) =>
      setReplyInputs((previous) => ({
        ...previous,
        [query._id]: e.target.value,
      }))
    }
    style={styles.replyInput}
  />

  <button
    type="button"
    onClick={() =>
      addReply(query._id)
    }
    style={styles.replyButton}
  >
    Reply
  </button>

  {query.status !== "resolved" &&
    (
      currentRole === "admin" ||
      ownQuery
    ) && (
      <button
        type="button"
        onClick={() =>
          markResolved(query._id)
        }
        style={styles.solvedButton}
      >
        ✓ {currentRole === "admin"
          ? "Resolve"
          : "Solved"}
      </button>
    )}
</div>
{currentRole === "student" &&
  query.status === "resolved" &&
  participant && (
    <button
      type="button"
      onClick={() =>
        stillFacingIssue(query._id)
      }
      style={styles.stillFacingButton}
    >
      Still facing issue
    </button>
  )}


              <div style={styles.actions}>
                {currentRole === "admin" &&
                  query.status ===
                    "pending" && (
                    <button
                      type="button"
                      onClick={() =>
                        markInProgress(
                          query._id
                        )
                      }
                      style={
                        styles.progressButton
                      }
                    >
                      Start Progress
                    </button>
                  )}

              

                {(currentRole === "admin" ||
                  (
                    currentRole ===
                      "student" &&
                    ownQuery &&
                    query.status ===
                      "pending" &&
                    query.priorityScore ===
                      1 &&
                    replies.length === 0
                  )) && (
                  <button
                    type="button"
                    onClick={() =>
                      deleteQuery(query._id)
                    }
                    style={
                      styles.deleteButton
                    }
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function statusBadgeStyle(status) {
  const base = {
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "bold",
    textTransform: "capitalize",
    whiteSpace: "nowrap",
  };

  if (status === "resolved") {
    return {
      ...base,
      background: "#e6f4ea",
      color: "#1b5e20",
    };
  }

  if (status === "in-progress") {
    return {
      ...base,
      background: "#fff8e1",
      color: "#e65100",
    };
  }

  return {
    ...base,
    background: "#fdecea",
    color: "#c62828",
  };
}

const styles = {

  solvedButton: {
  padding: "8px 14px",
  borderRadius: "6px",
  border: "none",
  background: "#1b5e20",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
  whiteSpace: "nowrap",
},

stillFacingButton: {
  marginTop: "12px",
  padding: "8px 14px",
  borderRadius: "6px",
  border: "1px solid #e65100",
  background: "#fff8e1",
  color: "#e65100",
  cursor: "pointer",
  fontWeight: "bold",
},

  toast: {
  position: "fixed",
  top: "20px",
  right: "20px",
  background: "#16325c",
  color: "white",
  padding: "12px 18px",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  fontSize: "14px",
  fontWeight: "500",
  zIndex: 9999,
  maxWidth: "320px",
},

  section: {
    fontFamily: "Arial, sans-serif",
    padding: "24px",
    maxWidth: "850px",
    margin: "40px auto 0",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    flexWrap: "wrap",
  },

  heading: {
    color: "#16325c",
    margin: 0,
  },

  roleBox: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
  },

  roleText: {
    fontSize: "13px",
    color: "#555",
  },

  roleButton: {
    padding: "7px 12px",
    borderRadius: "6px",
    border: "1px solid #16325c",
    background: "white",
    color: "#16325c",
    cursor: "pointer",
  },

  activeRoleButton: {
    padding: "7px 12px",
    borderRadius: "6px",
    border: "1px solid #16325c",
    background: "#16325c",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },

  roleInfo: {
    fontSize: "13px",
    color: "#666",
    marginTop: "10px",
    marginBottom: "12px",
  },

  studentNameInput: {
    width: "100%",
    boxSizing: "border-box",
    padding: "9px 12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "12px",
  },

  message: {
    padding: "10px 12px",
    marginBottom: "16px",
    borderRadius: "6px",
    background: "#fff8d8",
    border: "1px solid #e6c94c",
    color: "#665000",
    fontSize: "14px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "25px",
  },

  input: {
    padding: "9px 12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  textarea: {
    padding: "9px 12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    minHeight: "70px",
    resize: "vertical",
  },

  button: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    background: "#16325c",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },

  queryList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  queryCard: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "14px",
    boxShadow:
      "0 2px 6px rgba(0,0,0,0.06)",
    background: "white",
  },

  queryHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
  },

  queryTitle: {
    margin: 0,
    color: "#0f4d2e",
  },

  description: {
    fontSize: "14px",
    color: "#444",
  },

  meta: {
    fontSize: "12px",
    color: "#888",
    margin: 0,
  },

  priorityRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "8px",
  },

  plusButton: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    border: "1px solid #16325c",
    background: "#16325c",
    color: "white",
    cursor: "pointer",
    fontSize: "18px",
    lineHeight: "20px",
    fontWeight: "bold",
  },

  disabledPlusButton: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    border: "1px solid #bbb",
    background: "#eee",
    color: "#999",
    cursor: "not-allowed",
    fontSize: "18px",
  },

  repliesBox: {
    marginTop: "16px",
    paddingTop: "12px",
    borderTop: "1px solid #eee",
  },

  reply: {
    background: "#f7f8fa",
    borderRadius: "7px",
    padding: "9px",
    marginTop: "8px",
    fontSize: "13px",
  },

  replyHeader: {
    display: "flex",
    gap: "7px",
    alignItems: "center",
    marginBottom: "5px",
  },

  adminBadge: {
    fontSize: "10px",
    padding: "2px 6px",
    borderRadius: "10px",
    background: "#16325c",
    color: "white",
    textTransform: "capitalize",
  },

  studentBadge: {
    fontSize: "10px",
    padding: "2px 6px",
    borderRadius: "10px",
    background: "#e6f4ea",
    color: "#1b5e20",
    textTransform: "capitalize",
  },

  replyForm: {
    display: "flex",
    gap: "8px",
    marginTop: "12px",
  },

  replyInput: {
    flex: 1,
    padding: "8px 10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  replyButton: {
    padding: "8px 14px",
    borderRadius: "6px",
    border: "none",
    background: "#0f4d2e",
    color: "white",
    cursor: "pointer",
  },

  actions: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    marginTop: "12px",
  },

  progressButton: {
    padding: "7px 12px",
    borderRadius: "6px",
    border: "1px solid #e0a800",
    background: "#fff8e1",
    color: "#8a6500",
    cursor: "pointer",
    fontWeight: "bold",
  },

  resolveButton: {
    padding: "7px 12px",
    borderRadius: "6px",
    border: "1px solid #16325c",
    background: "white",
    color: "#16325c",
    cursor: "pointer",
    fontWeight: "bold",
  },

  deleteButton: {
    padding: "7px 12px",
    borderRadius: "6px",
    border: "1px solid #c62828",
    background: "white",
    color: "#c62828",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default QueryBoard;
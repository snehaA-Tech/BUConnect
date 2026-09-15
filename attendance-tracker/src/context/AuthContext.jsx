import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadState, saveState } from '../services/storage';

const AuthContext = createContext(null);

const DEFAULT_PROFILE = {
  name: 'Aarav Sharma',
  email: 'aarav.sharma@college.edu',
  rollNo: 'CS21B045',
  course: 'B.Tech Computer Science',
  year: '3rd Year',
  role: 'student',
  avatarColor: '#2D5BFF',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadState('user', null));
  const [profile, setProfile] = useState(() => loadState('profile', DEFAULT_PROFILE));

  useEffect(() => saveState('user', user), [user]);
  useEffect(() => saveState('profile', profile), [profile]);

  const value = useMemo(
    () => ({
      user,
      profile,
      isAuthenticated: !!user,
      login: (email) => setUser({ email, loggedInAt: Date.now() }),
      register: (data) => {
        setProfile((p) => ({ ...p, ...data }));
        setUser({ email: data.email, loggedInAt: Date.now() });
      },
      logout: () => setUser(null),
      updateProfile: (data) => setProfile((p) => ({ ...p, ...data })),
    }),
    [user, profile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

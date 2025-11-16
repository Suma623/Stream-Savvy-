import { createContext, useContext, useState, useEffect, useRef } from 'react';

const AuthContext = createContext();

const AUTH_STORAGE_KEY = 'streamsavvy_auth';
const ACCOUNT_STORAGE_KEY = 'streamsavvy_account';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const normalizeAccount = (data = {}) => {
  const baseUser = data.user || {};
  return {
    user: {
      fullName: baseUser.fullName ?? data.fullName ?? '',
      email: baseUser.email ?? data.email ?? '',
      password: baseUser.password ?? data.password ?? '',
    },
    hasCompletedPayment: !!(data.hasCompletedPayment ?? baseUser.hasCompletedPayment ?? false),
  };
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedSignUp, setHasCompletedSignUp] = useState(false);
  const [hasCompletedPayment, setHasCompletedPayment] = useState(false);
  const [user, setUser] = useState(null);
  const hasLoaded = useRef(false);

  // Load auth/account state from localStorage on mount
  useEffect(() => {
    try {
      const rawAuthData = localStorage.getItem(AUTH_STORAGE_KEY);
      const rawAccountData = localStorage.getItem(ACCOUNT_STORAGE_KEY);
      const parsedAuth = rawAuthData ? JSON.parse(rawAuthData) : null;
      const parsedAccount = rawAccountData ? normalizeAccount(JSON.parse(rawAccountData)) : null;

      if (parsedAuth) {
        setIsAuthenticated(parsedAuth.isAuthenticated || false);
        setHasCompletedSignUp(parsedAuth.hasCompletedSignUp || !!parsedAccount);
        setHasCompletedPayment(parsedAuth.hasCompletedPayment || parsedAccount?.hasCompletedPayment || false);
        setUser(parsedAuth.user || parsedAccount?.user || null);
      } else if (parsedAccount) {
        setIsAuthenticated(false);
        setHasCompletedSignUp(true);
        setHasCompletedPayment(parsedAccount.hasCompletedPayment);
        setUser(parsedAccount.user);
      }
    } catch (e) {
      console.error('Error parsing auth/account data:', e);
    } finally {
      hasLoaded.current = true;
    }
  }, []);

  const persistAccount = (accountData) => {
    try {
      const payload = normalizeAccount(accountData);
      localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(payload));
    } catch (error) {
      console.error('Failed to persist account data:', error);
    }
  };

  // Persist session state once initial load has completed
  useEffect(() => {
    if (!hasLoaded.current) return;
    try {
      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({
          isAuthenticated,
          hasCompletedSignUp,
          hasCompletedPayment,
          user,
        })
      );
    } catch (error) {
      console.error('Failed to write auth data:', error);
    }
  }, [isAuthenticated, hasCompletedSignUp, hasCompletedPayment, user]);

  const signUp = (userData) => {
    const accountPayload = normalizeAccount({ ...userData, hasCompletedPayment: false });
    setUser(accountPayload.user);
    setHasCompletedSignUp(true);
    setHasCompletedPayment(false);
    persistAccount(accountPayload);
  };

  const completePayment = () => {
    setHasCompletedPayment(true);

    const rawAccountData = localStorage.getItem(ACCOUNT_STORAGE_KEY);
    if (rawAccountData) {
      try {
        const parsed = normalizeAccount(JSON.parse(rawAccountData));
        const updated = {
          user: parsed.user,
          hasCompletedPayment: true,
        };
        persistAccount(updated);
        setUser(updated.user);
        setHasCompletedSignUp(true);
      } catch (error) {
        console.error('Failed to update account after payment:', error);
      }
    }
  };

  const signIn = (email, password) => {
    try {
      const rawAccountData = localStorage.getItem(ACCOUNT_STORAGE_KEY);
      if (!rawAccountData) return false;

      const account = normalizeAccount(JSON.parse(rawAccountData));
      const storedUser = account.user;

      const emailMatch = storedUser.email.trim().toLowerCase() === email.trim().toLowerCase();
      const passwordMatch = storedUser.password === password;

      if (emailMatch && passwordMatch && account.hasCompletedPayment) {
        setUser(storedUser);
        setHasCompletedSignUp(true);
        setHasCompletedPayment(true);
        setIsAuthenticated(true);
        return true;
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
    return false;
  };

  const signOut = () => {
    setIsAuthenticated(false);
  };

  const canAccessHome = () => {
    return isAuthenticated && hasCompletedSignUp && hasCompletedPayment;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        hasCompletedSignUp,
        hasCompletedPayment,
        user,
        signUp,
        completePayment,
        signIn,
        signOut,
        canAccessHome,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


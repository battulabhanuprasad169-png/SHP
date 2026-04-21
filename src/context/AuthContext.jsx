import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  console.log("AuthContext: Initializing...");
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('shp_userSession');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        console.error("Failed to parse user session", e);
      }
    }
    return null; // null means not logged in
  });

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem('shp_registeredUsers');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse shp_registeredUsers", e);
      }
    }
    return []; // array of { username, email, password }
  });

  // Sync session
  useEffect(() => {
    if (user) {
      localStorage.setItem('shp_userSession', JSON.stringify(user));
    } else {
      localStorage.removeItem('shp_userSession');
    }
  }, [user]);

  // Sync registered users
  useEffect(() => {
    localStorage.setItem('shp_registeredUsers', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  const registerUser = (username, email, password) => {
    const userExists = registeredUsers.some(u => u.username === username || u.email === email);
    if (userExists) {
      return { success: false, message: 'User already exists with this username or email.' };
    }
    setRegisteredUsers(prev => [...prev, { username, email, password }]);
    return { success: true };
  };

  const login = (role, identifier, password) => {
    // Admin bypass: generic password
    if (role === 'admin') {
      if (identifier === 'bhanu' && password === '123456') {
         setUser({ role: 'admin', name: 'Bhanu (Admin)' });
         return { success: true };
      }
      return { success: false, message: 'Invalid Admin Credentials' };
    }

    // Student real validation
    if (role === 'student') {
      const foundUser = registeredUsers.find(
        (u) => (u.username === identifier || u.email === identifier) && u.password === password
      );
      if (foundUser) {
        setUser({ role: 'student', name: foundUser.username });
        return { success: true };
      }
      return { success: false, message: 'Incorrect username, email, or password. Please try again or register.' };
    }
    
    return { success: false, message: 'Invalid Login' };
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserInfo = (newData) => {
    setUser(prev => {
        const updated = { ...prev, ...newData };
        localStorage.setItem('shp_userSession', JSON.stringify(updated));
        
        // Also update the registeredUsers array so it's saved permanently
        setRegisteredUsers(regPrev => regPrev.map(u => {
            if (u.username === prev.name || u.email === prev.email) {
                return { ...u, ...newData };
            }
            return u;
        }));
        
        return updated;
    });
  };

  const [hasSeenIntro, setHasSeenIntro] = useState(() => {
    return sessionStorage.getItem('shp_intro_seen') === 'true';
  });

  const markIntroSeen = () => {
    setHasSeenIntro(true);
    sessionStorage.setItem('shp_intro_seen', 'true');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, registerUser, updateUserInfo, hasSeenIntro, markIntroSeen }}>
      {children}
    </AuthContext.Provider>
  );
};

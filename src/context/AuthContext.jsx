import React, { createContext, useContext, useState, useEffect } from 'react';

const AUTH_STORAGE_KEY = 'pascall_kantin_auth_user';

const AuthContext = createContext(null);

export const DEFAULT_CREDENTIALS = {
  email: 'kantin.cipinang@pascall.id',
  password: 'password123',
  name: 'Petugas Kantin Lapas Cipinang',
  role: 'Operator Kantin',
  branch: 'Lapas Kelas I Cipinang'
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error reading auth state:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (identifier, password) => {
    // Simulasi delay autentikasi
    await new Promise((res) => setTimeout(res, 400));

    const idClean = (identifier || '').trim();
    const idLower = idClean.toLowerCase();
    const cleanPass = (password || '').trim();

    if (!idClean) {
      return { success: false, message: 'Nomor HP atau email tidak boleh kosong.' };
    }

    if (!cleanPass) {
      return { success: false, message: 'Kata sandi tidak boleh kosong.' };
    }

    if (cleanPass.length < 6) {
      return { success: false, message: 'Kata sandi minimal harus terdiri dari 6 karakter.' };
    }

    // Tentukan Cabang UPT dari email/identifier yang dimasukkan
    let branchName = 'Lapas Kelas I Cipinang';
    let operatorName = 'Petugas Kantin Lapas Cipinang';

    if (idLower.includes('salemba')) {
      branchName = 'Lapas Kelas IIA Salemba';
      operatorName = 'Petugas Kantin Lapas Salemba';
    } else if (idLower.includes('sukamiskin')) {
      branchName = 'Lapas Kelas I Sukamiskin';
      operatorName = 'Petugas Kantin Lapas Sukamiskin';
    } else if (idLower.includes('kerobokan')) {
      branchName = 'Lapas Kelas IIA Kerobokan';
      operatorName = 'Petugas Kantin Lapas Kerobokan';
    } else if (idLower.includes('cipinang')) {
      branchName = 'Lapas Kelas I Cipinang';
      operatorName = 'Petugas Kantin Lapas Cipinang';
    }

    // Validasi akun UPT (misal: kantin.cipinang@pascall.id, operator.cipinang@pascall.id, kantin@pascall.id, dsb)
    const isValidFormat = idLower.includes('@') || idClean.length >= 4;

    if (isValidFormat) {
      const loggedInUser = {
        email: idClean,
        name: operatorName,
        role: 'Operator Kantin',
        branch: branchName,
        loginAt: new Date().toISOString(),
      };

      setUser(loggedInUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(loggedInUser));
      return { success: true, user: loggedInUser };
    }

    return { 
      success: false, 
      message: 'Email/nomor atau kata sandi salah, silakan coba lagi.' 
    };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

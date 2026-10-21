import { createContext, useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export const AuthContext = createContext();
export { useAuth };

const USER_STORAGE_KEY = 'nexo_user';
const CERT_STORAGE_KEY = 'nexo_certificate';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading user from localStorage', e);
    }
    return {
      name: 'Jeronimo Montoya Rivera',
      email: 'Jeronimo1724@gmail.com',
      school: 'I. E. LA SALLE DE CAMPOAMOR',
      grade: '11',
      avatar: null,
      isAuthenticated: true,
      isStudent: true
    };
  });

  const [certificate, setCertificate] = useState(() => {
    try {
      const saved = localStorage.getItem(CERT_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading certificate from localStorage', e);
    }
    return {
      fileName: 'certificado_estudio.pdf',
      uploadDate: '01/09/2026',
      fileData: null,
      fileType: 'application/pdf',
      status: 'Verificado',
      studentName: 'Jeronimo Montoya Rivera',
      school: 'I. E. LA SALLE DE CAMPOAMOR',
      grade: '11'
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } catch (e) {
      console.error('Error saving user to localStorage', e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(CERT_STORAGE_KEY, JSON.stringify(certificate));
    } catch (e) {
      console.error('Error saving certificate to localStorage', e);
    }
  }, [certificate]);

  const updateProfile = (updatedFields) => {
    setUser(prev => ({
      ...prev,
      ...updatedFields
    }));
    setCertificate(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        studentName: updatedFields.name || prev.studentName,
        school: updatedFields.school || prev.school,
        grade: updatedFields.grade || prev.grade
      };
    });
  };

  const updateAvatar = (avatarDataUrl) => {
    setUser(prev => ({
      ...prev,
      avatar: avatarDataUrl
    }));
  };

  const uploadCertificate = ({ fileName, fileData, fileType }) => {
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    
    setCertificate({
      fileName: fileName || 'certificado_actualizado.pdf',
      uploadDate: formattedDate,
      fileData: fileData || null,
      fileType: fileType || 'application/pdf',
      status: 'Verificado',
      studentName: user.name,
      school: user.school,
      grade: user.grade
    });
  };

  const deleteCertificate = () => {
    setCertificate(null);
  };

  const login = (email, _password) => {
    setUser(prev => ({
      ...prev,
      email: email || prev.email,
      isAuthenticated: true
    }));
    return { success: true };
  };

  const register = ({ nombre, apellido, correo, colegio, grado, certificateFile }) => {
    const fullName = `${nombre} ${apellido}`.trim();
    const newUser = {
      name: fullName,
      email: correo,
      school: colegio,
      grade: grado,
      avatar: null,
      isAuthenticated: true,
      isStudent: true
    };
    setUser(newUser);

    if (certificateFile) {
      uploadCertificate({
        fileName: certificateFile.name,
        fileData: certificateFile.data,
        fileType: certificateFile.type
      });
    }

    return { success: true };
  };

  const logout = () => {
    setUser(prev => ({
      ...prev,
      isAuthenticated: false
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        certificate,
        updateProfile,
        updateAvatar,
        uploadCertificate,
        deleteCertificate,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

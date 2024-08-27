import React, { useState, createContext, useEffect, ReactNode } from "react";
import api from "@/api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "../animations/loadingScreen";

interface AuthContextProps {
  isSigned: boolean;
  signIn: (token: string) => Promise<void>;
  signUp: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  editProfile: (token: string) => Promise<void>;
}

const defaultValue: AuthContextProps = {
  isSigned: false,
  signIn: async (token: string) => {},
  signUp: async (token: string) => {},
  signOut: async () => {},
  editProfile: async (token: string) => {},
};

export const AuthContext = createContext<AuthContextProps>(defaultValue);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isSigned, setIsSigned] = useState<boolean | null>(null); 

  useEffect(() => {
    authToken();
  }, []);

  const authToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      try {
        const res = await api.get(`users/checkUser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsSigned(true);
      } catch (error) {
        setIsSigned(false);
        console.log(error);
      }
    } else {
      await AsyncStorage.removeItem('token');
      setIsSigned(false);
    }
  };


  const signIn = async (token: string) => {
    try {
      await AsyncStorage.setItem("token", token);
      setIsSigned(true); // Define como signed após o login
    } catch (error) {
      console.error("Erro ao salvar o token no signIn:", error);
    }
  };

  const signUp = async (token: string) => {
    try {
      await AsyncStorage.setItem("token", token);
      setIsSigned(true);
    } catch (error) {
      console.error("Erro ao salvar o token no signUp:", error);
    }
  };

  const editProfile = async (token: string) => {
    try {
      await AsyncStorage.setItem("token", token);
      setIsSigned(true);
    } catch (error) {
      console.error("Erro ao salvar o token no editProfile:", error);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setIsSigned(false);
    } catch (error) {
      console.error("Erro ao remover o token no signOut:", error);
    }
  };

  if (isSigned === null) {
    
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider
      value={{ isSigned , signIn, signUp, signOut, editProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

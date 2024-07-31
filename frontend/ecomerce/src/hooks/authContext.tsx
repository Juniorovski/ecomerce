import api from "@/api/api"; // Certifique-se de que o caminho e o arquivo estão corretos
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, createContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isSigned, setIsSigned] = useState(false);

  useEffect(() => {
    authToken();
  }, []);

  const authToken = async () => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      try {
        const response = await api.get(`users/checkUser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response);
        setIsSigned(true);
      } catch (error) {
        console.error("Erro ao validar o token:", error);
        setIsSigned(false);
      }
    } else {
      await AsyncStorage.removeItem("token");
      setIsSigned(false);
    }
  };

  const signIn = async (token) => {
    try {
      await AsyncStorage.setItem("token", token);
      setIsSigned(true);
    } catch (error) {
      console.error("Erro ao salvar o token no signIn:", error);
    }
  };

  const signUp = async (token) => {
    try {
      await AsyncStorage.setItem("token", token);
      setIsSigned(true);
    } catch (error) {
      console.error("Erro ao salvar o token no signUp:", error);
    }
  };

  const editProfile = async (token) => { // token é esperado como parâmetro aqui
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

  return (
    <AuthContext.Provider
      value={{ isSigned, signIn, signUp, signOut, editProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

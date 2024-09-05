
import api from '@/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useEffect, useState } from 'react'


interface AuthContextProps{
  isSigned:boolean,
  signIn:(token:string) => Promise<void>,
}

const defaultValue: AuthContextProps = {
  isSigned: false,
  signIn: async () => {},
}

export const AuthContext= createContext<AuthContextProps>(defaultValue);
  
interface AuthProviderProps{
  children :ReactNode;
}

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [isSigned, setIsSigned]= useState(false);

 useEffect(()=>{
  authToken();
 },[]);

 const authToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      try {
        const response = await api.get("users/checkUser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setIsSigned(true)
        if (response.status === 200) {
          setIsSigned(true);
          
        } else {
          setIsSigned(false);
        }
      } catch (error) {
        console.error("Erro ao validar o token:", error);
        setIsSigned(false);
      }
    } else {
      setIsSigned(false);
    }
  } catch (error) {
    console.error("Erro ao recuperar o token:", error);
    setIsSigned(false);
  }
};

  const signIn = async (token: string) => {
    try {
      await AsyncStorage.setItem("token", token);
      setIsSigned(true);
      if(token){
        await AsyncStorage.getItem('token')
        setIsSigned(true);  
        
      }
      else{
        setIsSigned(false);
      } 
    } catch (error) {
      console.error("Erro ao salvar o token no signIn:", error);
    }
  };

  return (
      <AuthContext.Provider 
      value={{isSigned,signIn}}
      >

        {children}
      </AuthContext.Provider>
  )
}



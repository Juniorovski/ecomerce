
import api from '@/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useEffect, useState } from 'react'


interface AuthContextProps{
  isSigned:boolean,
  signIn:(token:string) => Promise<void>,
  signOut:()=>Promise<void>,
  editProfile:(token:string)=> Promise<void>,
  favorite:()=>Promise<void>
}

const defaultValue: AuthContextProps = {
  isSigned: false,
  signIn: async () => {},
  signOut: async () => {},
  editProfile:async()=>{},
  favorite:async()=>{},
}

export const AuthContext= createContext<AuthContextProps>(defaultValue);
  
interface AuthProviderProps{
  children: ReactNode;
}

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [isSigned, setIsSigned]=  useState (false);

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

       if (response.status === 200) {
          setIsSigned(true);
          //console.log(token)
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

 const editProfile = async (token:string) =>{
    try {
       await AsyncStorage.setItem('token',token);
        setIsSigned(true);
    } catch ( error) {
       console.log(error);
    }
 }

  const signOut = async () =>{
    try {
      await AsyncStorage.removeItem('token');
      setIsSigned(false);
      
    } catch (error) {
      console.log(error)
    }
  }

  const favorite = async () =>{
          
  }

  return (
      <AuthContext.Provider 
      value={{isSigned,signIn,signOut, editProfile,favorite}}
      >
        {children}
      </AuthContext.Provider>
  )
}



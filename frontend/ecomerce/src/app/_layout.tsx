import React, { useContext } from 'react';
import { Stack } from 'expo-router';
import '../styles/global.css'

import { AuthContext, AuthProvider } from '../hooks/AuthContext';


export default function StackLayout() {
 const {isSigned}= useContext(AuthContext);
 console.log(`Logado : ${isSigned}`)
 
  return (

    <AuthProvider>
     <Stack screenOptions={{ headerShown: false }}>  
          {isSigned  ?( 
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          ):(
          <Stack.Screen name="(pages)" options={{ headerShown: false }} />
         )}
      </Stack>
    </AuthProvider>
     
    
  );
}

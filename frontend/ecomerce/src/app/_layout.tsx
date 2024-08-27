import React, { useContext } from 'react';
import { Stack } from 'expo-router';
import '../styles/global.css'
import { AuthContext } from '../hooks/AuthContext';


export default function StackLayout() {
 const {isSigned} = useContext(AuthContext);

  console.log("User is signed in:", isSigned);

  return (
      <Stack screenOptions={{ headerShown: false }}>  
        { isSigned ? (
          
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          
         ):( 
          
           <Stack.Screen name="(pages)" options={{ headerShown: false }} />
  
          )}
      </Stack>
    
  );
}

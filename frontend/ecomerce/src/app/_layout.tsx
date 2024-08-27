import React, { useContext } from 'react';
import { Stack } from 'expo-router';
import { AuthContext } from '../hooks/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import '../styles/global.css'


export default function StackLayout() {
  const { isSigned } = useContext(AuthContext);
   
  return (
    
      <Stack screenOptions={{ headerShown: false }}>  
        {isSigned ? (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
         ):( 
          <Stack.Screen name="(pages)" options={{ headerShown: false }} />
          
          )}
      </Stack>
    
  );
}

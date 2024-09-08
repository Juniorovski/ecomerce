
import React, { useContext } from 'react'
import { AuthContext, AuthProvider } from '../hooks/AuthContext';
import { Stack } from 'expo-router';

 export const  MainPage = () => {
    
    const {isSigned}= useContext(AuthContext);
    console.log(`Logado : ${isSigned}`)
    
     return (
   
       <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>  
             {isSigned ?( 
             <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
             ):(
             <Stack.Screen name="(pages)" options={{ headerShown: false }} />
            )}
         </Stack>
       </AuthProvider>
          
     );
}


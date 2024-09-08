import React, { useContext } from 'react';
//import { Slot } from 'expo-router';
import '../styles/global.css'
import { AuthProvider } from '../hooks/AuthContext';

import { Slot } from 'expo-router';

export default function StackLayout() {
  return (
    <AuthProvider>
       <Slot/>
    </AuthProvider>
  
  );
}

import React, { useContext } from 'react';
import { Slot } from 'expo-router';
import '../styles/global.css'
import { MainPage } from '.';
import { AuthProvider } from '../hooks/AuthContext';

export default function StackLayout() {
 
  return (
  <AuthProvider>
    <Slot/>
  </AuthProvider>
 
   
  );
}

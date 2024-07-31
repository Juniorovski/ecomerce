import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import '../styles/global.css'

export default function StackLayout() {
  return (
   <Stack>
    <Stack.Screen name='(pages)/login' options={{headerShown:false}}/>
    <Stack.Screen name='(pages)/register' options={{headerShown:false}}/>
    <Stack.Screen name='(tabs)' options={{headerShown:false}}/>
   </Stack>
  )
}
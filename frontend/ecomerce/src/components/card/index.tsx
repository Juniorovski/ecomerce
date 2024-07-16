import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'

export default function Card() {
  return (
    <View className='w-full h-40 mb-2 mt-2 px-4 gap-2  '>

       
    <Pressable className='w-36 h-36 rounded-xl' >
        <Image
        source={{uri:`https://github.com/god.png`}}
         className='w-40 h-36 rounded-xl '
       />
    </Pressable>
    <View className='w-36 h-36 flex flex-row  mb-2'>
    <Text className='font-bold text-xl'>Name</Text>
    </View>
    <View className='w-36 h-36 flex flex-col  mb-2'>
    <Text className='color-slate-700 text-xl'>Name</Text>
    <Feather name='star' size={24} color='#dceb0e'/>
    </View>
        
    </View>
  )
}
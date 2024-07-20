import { View, Text, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Feather, Ionicons } from '@expo/vector-icons'
import api from '@/api/api';

export default function Card() {
  const [produtoData , setProdutoData] = useState([]);
    
  useEffect(()=>{
    fetchData();
  },[])

  const fetchData = async ()=>{
    try {
      const response = await api.get(`/produto/listProdutos`)
      
        setProdutoData(response.data.produto)
     }
         catch (error) {
         console.log(error)
    }
  }
  return (
    produtoData.map((item)=>{
      return(
        <View  key={item.key} className='w-1/2  h-64 mb-4 mt-2 px-4 gap-2 flex-col border border-slate-300 rounded-xl '>
       
        <Pressable  className='w-36 h-36 rounded-xl' >
            <Image
            source={{uri:`${item.image}`}}
             className='w-36 h-40 rounded-xl '
           />
        </Pressable>
        <View className='w-1/2 flex flex-row'>
        <Text className='font-bold text-xl'>{item.name}</Text>
        </View>
        <View className='w-1/2 flex flex-row '>
        <Text className='color-slate-700 text-xl'>{item.categoria.name}</Text>
        </View>
        </View>
            
      )
    })
   
    
  )
}
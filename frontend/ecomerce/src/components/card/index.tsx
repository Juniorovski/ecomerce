import { View, Text, Image, Pressable, ScrollView, FlatList, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import api from "@/api/api";



export default function Card() {
  const [produtoData, setProdutoData] = useState([]);

  useEffect(()  => {
    fetchData();
                  
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get(`/produto/listProdutos`);
      setProdutoData(response.data.produto);
      //console.log(response.data.produto)
    } catch (error) {
      console.log(error);
    }
  };
  
    
return(
<SafeAreaView>
      <FlatList
      data={produtoData}
      keyExtractor={(item) =>item.id}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({item})=>{
         return(
        <View
         
          className="w-52 flex h-80 mt-2 mb-2  items-center gap-2 flex-col  rounded-2xl"
           >
          <Pressable className="w-full h-60 rounded-t-2xl  ">
            <Image
              className="w-full h-60 rounded-t-2xl mt-2"
              source={{uri:`http://10.0.0.248:5001/files/${item.image}`}} 
            />
          </Pressable>
         <View className="w-full flex flex-col items-center "> 
           <Text className="font-bold text-xl">{item.name.slice(0,15)}...</Text>
            <Text className="color-slate-700 text-xl">{item.categoria.name}</Text>
          </View>
          </View> 
         )
      }}
      >  
      </FlatList>

</SafeAreaView>
      
    );
}

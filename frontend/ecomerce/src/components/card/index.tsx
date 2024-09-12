import { View, Text, Image, Pressable, ScrollView, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import api from "@/api/api";
import { Feather, FontAwesome } from "@expo/vector-icons";



export default function Card() {
  const [produtoData, setProdutoData] = useState([]);
  const [likedItems, setLikedItems] = useState([]);

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

 const toggleLike = (id) =>{
   if (likedItems.includes(id)) {
      setLikedItems(likedItems.filter(itemId => itemId !==id));
   }else{
    setLikedItems([...likedItems, id])
   }
 }


    
return(
<SafeAreaView>
      <FlatList
      data={produtoData.slice(0,10)}
      keyExtractor={(item) =>item._id}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({item})=>{
         return(
        <View
          
          className="w-52 flex h-100 mt-2 mb-2  items-center gap-2 flex-col  rounded-2xl"
           >
          <Pressable className="w-full h-60 rounded-t-2xl " 
            
          >
            <Image
              className="w-full h-60 rounded-t-2xl mt-1"
              source={{uri:`http://10.0.0.248:5001/files/${item.image}`}} 
              resizeMode="contain"
            />

          </Pressable>
         <View className="w-full flex flex-col  justify-center items-center "> 
           <Text className="text-2xl flex-col">{item.name.slice(0,15)}</Text>
           
            <View className="flex w-full flex-row justify-center px-4 gap-2 items-center">
            <Text className="text-3xl font-serif">R$ {item.preco}</Text>

            <TouchableOpacity onPress={()=> toggleLike(item._id)}
             
            > 
              {likedItems.includes(item._id)? (
                 <FontAwesome name="heart"  size={30} color={'#ff0000'} /> 
                ) : (
                 <Feather name="heart"  size={30} />
                )}

              </TouchableOpacity>
            </View>
          
          </View>
          
          </View> 
         )
      }}
      >  
      </FlatList>

</SafeAreaView>
      
    );
}

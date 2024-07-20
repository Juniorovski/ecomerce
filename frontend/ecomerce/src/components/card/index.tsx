import { View, Text, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import api from "@/api/api";

export default function Card() {
  const [produtoData, setProdutoData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get(`/produto/listProdutos`);

      setProdutoData(response.data.produto);
    } catch (error) {
      console.log(error);
    }
  };
  return produtoData.map((item) => {
    return (
      <View
        key={item._id}
        className="flex h-72 mb-2 mt-2  justify-between items-center gap-2 flex-col border border-slate-300 rounded-2xl"
       >
        <Pressable className="w-full h-40 rounded-t-xl border ">
          <Image
            className="w-full h-40 rounded-t-xl"
            source={{ uri:`${process.env.IMAGE_PATH}/images/${item}`}} 
          />
        </Pressable>
       <View className="w-full flex flex-col items-center ">
         <Text className="font-bold text-xl">{item.name.slice(0,14)}...</Text>
          <Text className="color-slate-700 text-xl">{item.categoria.name}</Text>
        </View>
      </View>
    );
  });
}

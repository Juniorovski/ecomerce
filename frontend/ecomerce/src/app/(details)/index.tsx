import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importando AsyncStorage
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { Feather } from "@expo/vector-icons";


const statusBarHeight = Constants.statusBarHeight;

const Details = () => {
  const [product, setProduct] = useState([]);
  

  useEffect(() => {
    // Recupera os dados do produto armazenado no AsyncStorage
    const getProductData = async () => {
      try {
        const storedProduct = await AsyncStorage.getItem("selectedProduct");
        if (storedProduct) {
          setProduct(JSON.parse(storedProduct)); 
        }
      } catch (error) {
        console.log("Erro ao buscar dados do AsyncStorage", error);
      }
    };

    getProductData();
  }, []);


  const handlerCart = async (produtoSelecionado) => {
    try {
      const storedProduct = await AsyncStorage.getItem("selectedProduct");
      let carrinhoAtual = storedProduct ? JSON.parse(storedProduct) : [];
  
      if (!Array.isArray(carrinhoAtual)) {
        carrinhoAtual = [];
      }
  
      // Verificar se o produto já está no carrinho
      const produtoExistente = carrinhoAtual.find(
        (produto) => produto.id === produtoSelecionado.id
      );
  
      if (!produtoExistente) {
        carrinhoAtual.push(produtoSelecionado);
      } else {
        console.log("Produto já está no carrinho.");
      }
  
      await AsyncStorage.setItem("selectedProduct", JSON.stringify(carrinhoAtual));
      router.push("cart");
    } catch (error) {
      console.log("Erro ao salvar no AsyncStorage", error);
    }
  };
  

  return (
  
    <SafeAreaView
      className="flex-1 w-full  items-center justify-center "
      style={{ marginTop: statusBarHeight - 30 }}
    >
      {product ? (
        <>
        <View className=" relative flex w-full h-64 rounded-xl m-2 p-4 ">
         
        <Image
            className=" flex w-full h-full rounded-xl"
            source={{ uri: `http://10.0.0.248:5001/files/${product.image}` }}
           resizeMode="contain"
          />
        </View>
          <View className="flex  w-full  rounded-t-xl p-4 mb-4">
          <Text className="text-3xl text-gray-900 font-bold">{product.name}</Text>
         
          
          <View className="flex w-full  bg-blue-600 items-center   rounded-xl ">
                  <TouchableOpacity 
                  activeOpacity={0.6}
                  style={{
                    backgroundColor:'#2563eb',
                    width:'100%',
                    alignItems:"center",
                    borderRadius:12,
                    padding:12
                  }}
                  onPress={()=> handlerCart(product)}
                  >
                    <Text className="font-bold text-white text-2xl ">Add ao Carrinho</Text>
                  </TouchableOpacity>

               
          </View>
          <Text className="text-2xl font-normal text-justify">
           {product.descricao}
          </Text>

          </View>
          
        </>
      ) : (
        <Text>Carregando detalhes do produto...</Text>
      )}
    
    </SafeAreaView>
    
  );
};

export default Details;

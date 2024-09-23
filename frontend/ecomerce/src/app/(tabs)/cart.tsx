import { Text, View, Image, TouchableOpacity } from "react-native";

import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
//import { StatusBar } from "expo-status-bar";
import Section from "@/src/components/section";
import AsyncStorage from "@react-native-async-storage/async-storage";

const statusBarHeight = Constants.statusBarHeight;

export default function Cart() {
  
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

  let frete = 3.50;
  let montante = 1;
  
 let total =  product.preco + frete;
 

const subtrairQuantidade = ()=>{

}
 
const somarQuantidade = ()=>{
 
}

  return (
    <SafeAreaView
      className="flex-1 w-full  items-center justify-center "
      style={{ marginTop: statusBarHeight - 30 }}
      
    >
      { product &&
         
     
      <View className="flex w-full mb-8 m-2 justify-between">
        <Text className="text-stone-950 text-4xl font-bold p-2 m-2">
          Pedidos
        </Text>

        <View className="flex-row w-full mb-2 p-1 items-center ">
          <Image
             source={{ uri: `http://10.0.0.248:5001/files/${product.image}` }}
             resizeMode="contain"
            className="w-36 h-36  md:h-60 rounded-2xl m-2 "
          />

          <View className="flex-col items-start justify-between ">
            <Text className="text-stone-950 text-2xl font-bold ">
              {product.name}
            </Text>
            <View className="flex-row mt-4 items-center justify-between">
              <Text className="text-stone-950 text-3xl font-bold ">
               ${product.preco}
              </Text>

              <View className="flex-row m-1 items-center">
                <TouchableOpacity onPress={subtrairQuantidade}>
                  <View className="bg-blue-500 rounded-xl w-10 items-center ml-12">
                    <Text className="text-white text-4xl font-bold ">-</Text>
                  </View>
                </TouchableOpacity>

                <Text className="text-stone-950 text-3xl font-bold p-2">
                  {montante}
                </Text>

                <TouchableOpacity onPress={somarQuantidade}>
                  <View className="bg-blue-500 rounded-xl w-10 items-center">
                    <Text className="text-white text-4xl font-bold ">+</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View className="w-full h-full flex flex-col gap-2 mt-4 mb-2 px-4 ">
          <Text className="text-stone-950 text-3xl font-bold">
            Metodos de Pagamento
          </Text>
    
          <Section
          icon={{ name: "credit-card", size: 24 }}
          name="****01234"
          size="text-2xl"
          action={() => ('')}
          seta=">"
          />
          

          <Text className="text-stone-950 text-3xl font-bold">Preço Total</Text>

          <View className="justify-between items-center m-2 flex-row mt-2">
            <Text className="text-stone-600 text-2xl font-semibold">Subtotal</Text>
            <Text className="text-stone-950 text-3xl font-bold">${product.preco}</Text>
          </View>
          <View className="justify-between items-center flex-row m-2 ">
            <Text className="text-stone-600  text-2xl font-semibold">Entrega</Text>
            <Text className="text-stone-950 text-3xl font-bold">${frete}</Text>
          </View>
          <View className="justify-between items-center  m-2 flex-row">
            <Text className="text-stone-600 text-2xl font-semibold">Total</Text>
            <Text className="text-stone-950 text-3xl font-bold">${product.preco}</Text>
          </View>
          <View className="flex items-center justify-center mt-4 m-4 p-4 bg-blue-500 rounded-xl">
            <TouchableOpacity>
              <Text className="text-2xl font-semibold text-white">
                Fazer Pedido {product.preco}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
}
      
      
     
    </SafeAreaView>
  );
}

import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import api from "@/api/api";
import { Feather, FontAwesome } from "@expo/vector-icons";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Card() {
  const [produtoData, setProdutoData] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const router = useRouter();
  useEffect(() => {
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

  const handlerCart = async (item) => {
    try {
      const storedProduct = await AsyncStorage.getItem("selectedProduct");
      let carrinhoAtual = storedProduct ? JSON.parse(storedProduct) : [];
  
      if (!Array.isArray(carrinhoAtual)) {
        carrinhoAtual = [];
      }
  
      // Verificar se o produto já está no carrinho
      const produtoExistente = carrinhoAtual.find(
        (produto) => produto.id === item.id
      );
  
      if (!produtoExistente) {
        carrinhoAtual.push(item);
      } else {
        console.log("Produto já está no carrinho.");
      }
  
      await AsyncStorage.setItem("selectedProduct", JSON.stringify(carrinhoAtual));
      router.push("cart");
    } catch (error) {
      console.log("Erro ao salvar no AsyncStorage", error);
    }
  };
  

  const handlerDetails = async (item) => {
    try {
      await AsyncStorage.setItem("selectedProduct", JSON.stringify(item));

      router.push("(details)");
    } catch (error) {
      console.log("Erro ao salvar no AsyncStorage", error);
    }
  };

  const toggleLike = (id) => {
    if (likedItems.includes(id)) {
      setLikedItems(likedItems.filter((itemId) => itemId !== id));
      showMessage({
        message: "Removido",
        description: "Produto removido dos favoritos",
        type: "warning",
        icon: "warning",
      });
    } else {
      setLikedItems([...likedItems, id]);
      showMessage({
        message: "Sucesso!",
        description: "Produto adicionado aos favoritos",
        type: "success",
        icon: "success",
      });
    }
  };

  return (
    <SafeAreaView>
      <FlashMessage
        position={"center"}
        textStyle={{
          fontSize: 17,
          fontWeight: "bold",
        }}
      />

      <FlatList
        data={produtoData.slice(0, 10)}
        keyExtractor={(item) => item._id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View className="w-52 flex h-100 mt-1 mb-1  items-center m-1 gap-2 flex-col box-border rounded-2xl">
              <Pressable className="w-full h-60 rounded-t-2xl relative ">
                <Image
                  className="w-full h-60 rounded-t-2xl "
                  source={{ uri: `http://10.0.0.248:5001/files/${item.image}` }}
                  resizeMode="contain"
                />
              </Pressable>
              <View className="w-full flex flex-col  justify-center items-center ">
                <Text className="text-2xl ">{item.name.slice(0, 15)}</Text>

                <View className="flex w-full flex-row justify-evenly gap-2 items-center px-1">
                  <Text className="text-3xl font-serif">R${item.preco}</Text>

                  <TouchableOpacity onPress={() => toggleLike(item._id)}>
                    {likedItems.includes(item._id) ? (
                      <FontAwesome name="heart" size={30} color={"#ff0000"} />
                    ) : (
                      <Feather name="heart" size={30} />
                    )}
                  </TouchableOpacity>
                </View>
                <View className="flex w-full flex-row gap-2 justify-center items-center rounded-xl m-1">
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={{
                      backgroundColor: "#2563eb",
                      width: "60%",
                      alignItems: "center",
                      borderRadius: 12,
                      padding: 10,
                    }}
                    onPress={() => handlerDetails(item)}
                  >
                    <Text className="font-bold text-white text-2xl ">
                      {" "}
                      Comprar{" "}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="absolute flex  "
                    onPress={() => handlerCart(item)}
                  >
                    <Feather name="shopping-cart" size={24} color={"#000"} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      ></FlatList>
    </SafeAreaView>
  );
}

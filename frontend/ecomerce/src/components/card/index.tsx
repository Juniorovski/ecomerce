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
import { Entypo, Feather, FontAwesome } from "@expo/vector-icons";
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

      await AsyncStorage.setItem(
        "selectedProduct",
        JSON.stringify(carrinhoAtual)
      );
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
            <View className="w-52 flex h-100 mt-1 mb-1 items-center m-1 gap-2 flex-col rounded-2xl ">
              <View className="flex w-full h-60 rounded-2xl relative ">
              <TouchableOpacity onPress={() => toggleLike(item._id)} 
              style={{
                    position:'absolute',
                    top:0,
                    right:10,
                  }}>
                    {likedItems.includes(item._id) ? (
                      <FontAwesome name="heart" size={20} color={"#ff0000"} />
                    ) : (
                      <Feather name="heart" size={20} />
                    )}
                  </TouchableOpacity>

                <Image
                  className="w-full h-60"
                  source={{ uri: `http://10.0.0.248:5001/files/${item.image}` }}
                  resizeMode="contain"
                />
              </View>
              <View className="w-full flex flex-col  justify-center items-center ">
                <Text className="text-xl font-bold ">
                  {item.name.slice(0, 15)}
                </Text>
                <View className="flex w-full flex-row justify-evenly  items-center ">
                  <Text className="text-2xl font-sans bold">
                    R${item.preco}
                  </Text>
                  <View className="flex flex-row gap-1 items-center justify-center">
                  <Entypo name="star" size={24} color={'#f3f312'}/>
                  <Text className="text-2xl font font-semibold">4.8</Text>
                  </View>
                
                </View>
                <View className="flex w-full flex-row gap-2 justify-center items-center rounded-xl m-1">
                
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={{
                      backgroundColor: "#075985",
                      width: "100%",
                      alignItems: "center",
                      borderRadius: 20,
                      padding: 10,
                    }}
                    onPress={() => handlerDetails(item)}
                  >
                    <Text className="font-semi-bold text-white text-2xl">
                      Comprar
                    </Text>
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

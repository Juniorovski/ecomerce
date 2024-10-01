import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importando AsyncStorage
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { Feather } from "@expo/vector-icons";
import CardDetail from "@/src/components/card-detail";

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

      await AsyncStorage.setItem(
        "selectedProduct",
        JSON.stringify(carrinhoAtual)
      );
      router.push("cart");
    } catch (error) {
      console.log("Erro ao salvar no AsyncStorage", error);
    }
  };

  return (
    <SafeAreaView
      className="flex-1 items-center justify-center"
      style={{ marginTop: statusBarHeight - 30 }} >
    
        
     
    </SafeAreaView>
  );
};

export default Details;

import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import Constants from "expo-constants";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";

const statusBarHeight = Constants.statusBarHeight;
export default function Favorite() {
  useEffect(() => {
    getFavorite();
  }, []);

  const getFavorite = () => {};

 const goBuy = ()=>{
   router.push('(tabs)')
 }

  return (
    <SafeAreaView
      className="flex-1  justify-center items-center "
      style={{ marginTop: statusBarHeight - 30 }}
    >
      <View className="flex justify-center items-center m-4 p-2  mt-64 ">
        <View className="bg-slate-200 w-36 h-36 rounded-full items-center justify-center mt-4 mb-4">
          <MaterialIcons
            name="remove-shopping-cart"
            size={50}
            color={"#4e4949"}
          />
        </View>
        <Text className="text-2xl font-bold">
          Sua Lista de Favoritos está vazia!
        </Text>
        <Text className="text-xl font-thin m-2 text-center">
          Adicione seus items favoritos e tenha uma lista de compras
          personalizada com produtos do seu estilo.
        </Text>

        <View className="flex w-full items-center p-2 m-2 bg-sky-800 rounded-3xl mt-4">
          <TouchableOpacity onPress={()=>goBuy()}>
            <Text className="text-2xl font-semibold text-white p-2 ">
              {" "}
              Vai Comprar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

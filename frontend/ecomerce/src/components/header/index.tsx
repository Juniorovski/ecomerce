import { View, Text, Pressable } from "react-native";
import React from "react";
import { Ionicons, Feather } from "@expo/vector-icons";

export function Header() {
  return (
    <View className="w-full flex flex-row items-center justify-between mb-4 ">
      <Pressable className="w-10 h-10 rounded-full flex justify-center ">
        <Ionicons name="menu" size={24} color="#121212" />
      </Pressable>
      <View className=" flex flex-col justify-center items-center ">
        
        <View className="flex-row  items-center justify-center gap-1">
          <Feather name="map-pin" size={24} color="#f00" />
          <Text className="font-bold  text-xl">Recife-Pe</Text>
        </View>
      </View>
      <Pressable className="w-10 h-10 rounded-full flex justify-center ">
        <Feather name="bell" size={24} color="#121212" />
      </Pressable>
    </View>
  );
}

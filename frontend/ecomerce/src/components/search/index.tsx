import { View, TextInput } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

export function Search() {
  return (
    <View className="w-full h-16 flex-row gap-2 border border-slate-600 rounded-full items-center px-4 bg-transparent">
      <Feather name="search" size={24} color={"#64748b"} />

      <TextInput
        placeholder="O que você procura?"
        className="w-full h-full flex-1 bg-transparent text-xl "
      />
    </View>
  );
}

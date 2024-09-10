import { View, Text, Pressable } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

interface Props {
  icon?: {
    name: string;
    size: number;
    
  };
  name: string;
  size: "text-lg" | "text-xl" | "text-2xl" | "text-3xl";
  action: () => void;
  seta: string;
  
}
export default function ({ icon, name, size, action, seta }: Props) {
  return (
    <View className=" w-full p-2 mb-1 rounded-xl border border-slate-300   ">
      <Pressable
        onPress={action}
        className="flex flex-row justify-between px-2 "
      >
        <View className="flex flex-row gap-1  items-center rounded-lg">
          {icon && <Feather name = {icon.name} size={icon.size} />}
          <Text className={`${size}  font-bold my-4 items-center`}>{name}</Text>
        </View>
        <View>
          <Text className={`${size} font-bold my-4 items-center justify-end`}>
            {seta}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

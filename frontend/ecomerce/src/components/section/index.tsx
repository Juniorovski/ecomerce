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
    <View className=" w-full  px-2 mb-4 mt-2 rounded-xl border border-slate-300 mb-2  ">
      <Pressable
        onPress={action}
        className="flex flex-row justify-between px-4 mx-2 "
      >
        <View className="flex flex-row gap-2 items-center rounded-lg">
          {icon && <Feather name={icon.name} size={icon.size} />}
          <Text className={`${size} font-bold my-4 items-center`}>{name}</Text>
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

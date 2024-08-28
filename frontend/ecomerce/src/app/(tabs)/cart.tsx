import { Text, View, Image } from "react-native";

import Constants from "expo-constants";

const statusBarHeight = Constants.statusBarHeight;

export default function Cart() {
  return (
    <View
      className="flex-1 w-full  items-center "
      style={{ marginTop: statusBarHeight - 30 }}
    >
      <View className="flex w-full justify-center mb-10 m-4 ">
        <Text className="text-stone-950 text-3xl font-bold p-2 m-2">
          Pedidos
        </Text>

        <View className="flex-row w-full mb-4 p-2 border-slate-600 items-start ">
          <Image
            source={{ uri: `https://github.com/dog.png` }}
            className="w-36 h-36  md:h-60 rounded-2xl m-2"
          />

          <View className="flex-col mb-2 ">
            <Text className="text-stone-950 text-2xl font-bold ">
              Hamburger
            </Text>
            <Text className="text-slate-600 text-2xl  ">
              Lorem Ipsum Dolor
            </Text>
            <View className="flex-row mt-10 ">
          <Text className="text-stone-950 text-3xl font-bold ">
              $10.00
            </Text>
           <View className="flex-row">
             
           </View>
          </View>
         
          </View>
        </View>
      </View>
    </View>
  );
}

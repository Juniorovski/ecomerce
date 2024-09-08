import { Text, View, Image, TouchableOpacity } from "react-native";

import Constants from "expo-constants";

const statusBarHeight = Constants.statusBarHeight;

export default function Cart() {
 

  return (
    <View
      className="flex-1 w-full  items-center "
      style={{ marginTop: statusBarHeight - 30 }}
    >
      <View className="flex w-full mb-8 m-4 justify-between">
        <Text className="text-stone-950 text-4xl font-bold p-2 m-2">
          Pedidos
        </Text>

        <View className="flex-row w-full mb-2 p-1 items-center ">
          <Image
            source={{ uri: `https://github.com/dog.png` }}
            className="w-36 h-36  md:h-60 rounded-2xl m-2 "
          />

          <View className="flex-col items-start justify-between ">
            <Text className="text-stone-950 text-2xl font-bold ">
              Hamburger
            </Text>
            <Text className="text-slate-600 text-2xl  ">Lorem Ipsum Dolor</Text>
            <View className="flex-row mt-4 items-center justify-between">
              <Text className="text-stone-950 text-3xl font-bold  ">
                $10.00
              </Text>
              
              <View className="flex-row m-1 items-center">
                <TouchableOpacity>
                  <View className="bg-blue-500 rounded-xl w-10 items-center ml-12">
                    <Text className="text-white text-4xl font-bold ">-</Text>
                  </View>
                </TouchableOpacity>

                <Text className="text-stone-950 text-3xl font-bold p-2">0</Text>

                <TouchableOpacity>
                  <View className="bg-blue-500 rounded-xl w-10 items-center">
                    <Text className="text-white text-4xl font-bold ">+</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View className="flex-col m-2 mt-10 divide-y-2 divide-slate-700">
        <Text className="text-stone-950 text-3xl font-bold">
          Metodos de Pagamento
        </Text>
        <Text className="text-stone-950 text-3xl font-bold">Preços total</Text>

        <View className="justify-between items-center flex-row mt-4">
          <Text className="text-stone-600 text-2xl font-bold">Subtotal</Text>
          <Text className="text-stone-950 text-3xl font-bold">$10.00</Text>
        </View>
        <View className="justify-between items-center flex-row divide-x-2 mb-2">
          <Text className="text-stone-600  text-2xl font-bold">Entrega</Text>
          <Text className="text-stone-950 text-3xl font-bold">$1.00</Text>
        </View>
        <View className="justify-between items-center flex-row">
          <Text className="text-stone-600 text-2xl font-bold">Total</Text>
          <Text className="text-stone-950 text-3xl font-bold">$11.00</Text>
        </View>
           <View className="flex-row items-center justify-center mt-2 p-4 bg-blue-500 rounded-xl">
            <TouchableOpacity > 
              <Text className="text-2xl font-bold text-white">Fazer Pedido $11.00</Text>
            </TouchableOpacity>
           </View>
      </View>

      </View>
      
    </View>
  );
}

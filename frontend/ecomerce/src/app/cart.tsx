import { Text, View, ScrollView } from "react-native";

import  Constants  from "expo-constants";

const statusBarHeight = Constants.statusBarHeight;

export default function Cart() {
  
  return (
      <View className="flex-1  items-center" style={{marginTop:statusBarHeight +8}}>
        <Text>Cart Screen</Text>
      </View>
         
  );
}
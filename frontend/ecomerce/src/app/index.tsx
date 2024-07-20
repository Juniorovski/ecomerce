import { Text, View, ScrollView } from "react-native";
import { Header } from "../components/header";
import Constants from "expo-constants";
import { Banner } from "../components/banner";
import { Search } from "../components/search";
import Sections from "../components/sections";
import Card from "../components/card";

const statusBarHeight = Constants.statusBarHeight;

export default function Index() {
  return (
    <ScrollView
      style={{ flex: 1 }}
      className=" bg-white"
      showsVerticalScrollIndicator={false}
    >
      <View className="w-full px-4 " style={{ marginTop: statusBarHeight + 8 }}>
        <Header />
        <Search />
        <Banner />
      </View>

      <Sections
        name="Produtos em alta"
        label="veja todos"
        action={() => console.log("clicou no veja todos")}
        size="text-3xl"
      />
      <View className=" w-full   flex-row gap-2 justify-center items-center  ">
        <Card />
      </View>
      <Sections
        name="Produtos mais vendidos"
        label="veja todos"
        action={() => console.log("clicou no veja todos")}
        size="text-3xl"
      />
      <View className=" w-full   flex-row gap-2 justify-center items-center ">
        <Card />
      </View>
    </ScrollView>
  );
}

import { View, Text, Image } from "react-native";
import React from "react";
import Section from "../../components/section";
import Constants from "expo-constants";
import { Link } from "expo-router";



const statusBarHeight = Constants.statusBarHeight;

export default function Profile() {
  return (
    <View
      className="flex-1  items-center"
      style={{ marginTop: statusBarHeight + 8 }}>
      <View className="w-full  flex flex-row items-center gap-2  mb-8 px-4  ">
        <Image
          className="w-32 h-32 rounded-full mt-4 px-4 mb-4 mx-2 "
          source={{ uri: `https://github.com/Juniorovski.png` }}
        />
        <View className="flex flex-col mb-2 ">
          <Text className="text-3xl font-bold ">Name</Text>
          <Text className="text-xl font-bold color-slate-500">
            email@test.com
          </Text>
        </View>
      </View>
      <View className="w-full h-full flex flex-col border border-slate-500 rounded-t-3xl gap-2 mt-8 mb-2 px-2  ">
        <Section
          icon={{ name: "user", size: 24 }}
          name="Editar Perfil"
          size="text-2xl"
          action={() =>''}
          seta=">"
        />
        <Section
          icon={{ name: "bell", size: 24 }}
          name="Notificações"
          size="text-2xl"
          action={() => console.log("Edite perfil clicado")}
          seta=">"
        />
        <Section
         icon={{name:"map-pin" , size:24 }}
         name="Localização"
         size="text-2xl"
         action={()=>console.log('clicou na localizacao')}
         seta=">"
        />
        <Section
          icon={{ name: "credit-card", size: 24 }}
          name="Forma de Pagamento"
          size="text-2xl"
          action={() => console.log("Edite perfil clicado")}
          seta=">"
        />
        <Section
          icon={{ name: "settings", size: 24 }}
          name="Configuração"
          size="text-2xl"
          action={() => console.log("Edite perfil clicado")}
          seta=">"
        />
      </View>
    </View>
  );
}

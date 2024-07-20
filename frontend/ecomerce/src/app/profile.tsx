import { View, Text, Image } from "react-native";
import React from "react";
import Section from "../components/section"

import  Constants  from "expo-constants";

const statusBarHeight = Constants.statusBarHeight;

export default function Profile() {
  return (
    <View className="flex-1  items-center" 
    style={{marginTop:statusBarHeight +8}}>
      <View className="w-full h-64 flex flex-row items-center gap-2 mt-1 mb-4 px-4  ">
        <Image
          className="w-32 h-32 rounded-full mt-8 px-4 mb-4 "
          source={{ uri: `https://github.com/Juniorovski.png` }}
        />
        <View className="flex flex-col mb-2 ">
          <Text className="text-3xl font-bold ">Name</Text>
          <Text className="text-xl font-bold color-slate-500">
            email@test.com
          </Text>
        </View>
      </View>
    
      <Section 
        icon={{name:'user' , size:24}}
        name="Edite o perfil"
        size="text-2xl"
        action={()=>console.log("Edite perfil clicado")}
        seta=">"
      />
      <Section 
        icon={{name:'bell' , size:24}}
        name="Notificações"
        size="text-2xl"
        action={()=>console.log("Edite perfil clicado")}
      seta=">"
      />
       <Section 
        icon={{name:'credit-card' , size:24}}
        name="Forma de pagamento"
        size="text-2xl"
        action={()=>console.log("Edite perfil clicado")}
        seta=">"
      />
       <Section 
        icon={{name:'settings' , size:24}}
        name="Configuração"
        size="text-2xl"
        action={()=>console.log("Edite perfil clicado")}
        seta=">"
      />
     
    </View>
  );
}

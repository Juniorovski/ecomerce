import { View, Text, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Section from "../../components/section";
import Constants from "expo-constants";
import api from "@/api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "@/src/hooks/AuthContext";
import { router } from "expo-router";

const statusBarHeight = Constants.statusBarHeight;

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const { signOut } = useContext(AuthContext);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        try {
          const response = await api.get("users/checkUser", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (token) {
            
            setUserData(response.data);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlerEditProfile = ()=>{
    router.navigate('(editprofile)')
  }
  const handlerLogout = async () => {
    try {
      await signOut();
      router.navigate("(pages)");

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View
      className="flex-1  items-center"
      style={{ marginTop: statusBarHeight - 30 }}
    >
      {userData && (
        <View className="w-full h-64 flex flex-row items-center gap-2 mt-8 mb-2 px-4 ">
          <Image
            className="w-32 h-32 rounded-full mt-4 px-4 mb-2 mx-2 "
            source={{
              uri: `http://10.0.0.248:5001/files/users/${userData.image}`,
            }}
          />
          <View className="flex flex-col mb-2 ">
            <Text className="text-3xl font-bold ">{userData.name}</Text>
            <Text className="text-xl font-bold color-slate-500">
              {userData.email}
            </Text>
          </View>
        </View>
      )}
      <View className="w-full h-full flex flex-col gap-2 mt-4 mb-2 px-4 ">
        <Section
          icon={{ name: "user", size: 24 }}
          name="Editar Perfil"
          size="text-2xl"
          action={() => handlerEditProfile()}
          seta=">"
        />
        <Section
          icon={{ name: "bell", size: 24 }}
          name="Notificações"
          size="text-2xl"
          action={() => ''}
          seta=">"
        />
        <Section
          icon={{ name: "map-pin", size: 24 }}
          name="Localização"
          size="text-2xl"
          action={() => console.log("clicou na localizacao")}
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

        <Section
          icon={{ name: "log-out", size: 24 }}
          name="Sair"
          size="text-2xl"
          action={() => handlerLogout()}
          seta=">"
        />
      </View>
    </View>
  );
}

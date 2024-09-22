import { View, Text, TextInput, TouchableOpacity, Button } from "react-native";
import React, { useContext, useState } from "react";
import Constants from "expo-constants";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import api from "@/api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "@/src/hooks/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

//lembrar de instalar o FlashMessage

const statusBarHeight = Constants.statusBarHeight;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const { signIn } = useContext(AuthContext);

  const handlerLogin = async () => {
    const userData = {
      email,
      password,
    };

    if (!email || !password) {
      console.log("Todos os campos devem ser preenchidos!");
    } else {
      try {
        const response = await api.post(`users/login`, userData, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        });

        await AsyncStorage.setItem("token", response.data.token);
        const token = await AsyncStorage.getItem("token");

        if (token) {
          await signIn(token);
          router.replace("(tabs)");
        } else {
          console.log("Token não encontrado!");
        }
      } catch (error) {
        console.log(`Ocorreu um erro, tipo do erro:  ${error} !`);
      }
    }
  };

  const handlerRegister = () => {
    router.navigate("register");
  };

  return (
    <SafeAreaView
      className="flex-1 bg-orange-500 "
      style={{ marginTop: statusBarHeight - 30 }}
    >
      <View className="w-full h-64  justify-center items-center ">
        <Text className="text-4xl text-white font-bold">Ecomerce</Text>
      </View>

      <View className="w-full h-full flex bg-white rounded-t-3xl px-4 ">
        <Text className="text-4xl text-orange-500 font-bold px-2 mx-4 mt-10 mb-8">
          Log In
        </Text>

        <View className="w-full  flex-row gap-2 border border-slate-600 rounded-2xl p-4 items-center  px-4 mt-4 mb-4 ">
          <Feather name="user" size={26} color={"#64748b"} />
          <TextInput
            placeholder="ex:jhon@email.com"
            onChangeText={(e) => setEmail(e)}
            value={email}
            className="w-full flex-1 h-full bg-transparent text-2xl p-1"
          />
        </View>

        <View className="w-full  flex-row gap-2 border border-slate-600 rounded-2xl p-4 items-center px-4 ">
          <Feather name="eye" size={26} color={"#64748b"} />
          <TextInput
            placeholder="ex:1233"
            onChangeText={(e) => setPassWord(e)}
            value={password}
            secureTextEntry={true}
            className="w-full flex-1 h-full bg-transparent text-2xl p-1 "
          />
        </View>

        <View className="w-full  justify-center items-center mt-24 bg-orange-500 p-4 px-4 py-4 rounded-2xl  ">
          <TouchableOpacity onPress={handlerLogin}>
            <Text className=" w-full p-2 text-3xl font-bold items-center text-white">
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View className=" flex justify-center items-center ">
          <TouchableOpacity onPress={handlerRegister}>
            <Text className=" w-full text-xl font-bold px-2 mx-4 mt-8">
              Ainda não tem uma conta? Cadastre-se!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

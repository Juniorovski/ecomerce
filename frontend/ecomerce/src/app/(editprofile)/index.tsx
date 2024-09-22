import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import { Entypo, Feather, FontAwesome } from "@expo/vector-icons";
import api from "@/api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";


const statusBarHeight = Constants.statusBarHeight;

const EditProfile = () => {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [fone, setFone] = useState('');

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const token = await AsyncStorage.getItem("token");

    try {
      const response = await api.get(`users/checkUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data._id;
    } catch (error) {
      console.log(error);
    }
  };

  const changeUpdate = async () => {
    const userData = {
      name,
      email,
      fone,
    };

    if (!name || !email || !fone) {
      showMessage({
        message: "Error",
        type: "danger",
        description: "Todos os campos devem ser preenchidos",
        icon: "danger",
      });
      return;
    } else {
      try {
        const userId = await getUser();

        const token = await AsyncStorage.getItem("token");
        if (!userId) throw new Error("Não foi possível obter o userId");

        const res = await api.patch(`users/update/:${userId}`, userData, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.status)
        if (res.status === 200) {
          showMessage({
            message: "Sucesso!",
            type: "success",
            description: "Usuario atualizado com sucesso!",
            icon: "success",
          });

          router.navigate("profile");
        }
       

      } catch (error) {
        console.log(error);

        showMessage({
          message: "Error",
          description: "Usuário nao atualizado!",
          type: "danger",
          icon: "danger",
        });
      }
    }
  };

  return (
    <SafeAreaView
      className="flex-1  items-center"
      style={{ marginTop: statusBarHeight - 30 }}
    >
      <FlashMessage position={"center"} textStyle={{
        fontSize:17,
        fontWeight:'bold'
      }} />

      <View className="w-full h-64 flex flex-row items-center justify-center gap-2 mt-6 mb-2 px-4 ">
        <Image className="w-40 h-40 rounded-full mt-4 px-4 mb-2 mx-2 bg-slate-200" 
        
        />
        <FontAwesome
          name="pencil-square"
          size={38}
          color={"#0000ff"}
          style={{
            position: "absolute",
            zIndex: 1,
            left: 240,
            top: 145,
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      </View>

      <View className="w-full h-full flex bg-white rounded-t-3xl px-4  gap-2">
        <Text className="text-2xl font-bold px-2 mx-1 ">Nome</Text>
        <View className="w-full  flex-row gap-2 border border-slate-600 rounded-2xl p-4 items-center px-4 ">
          <Feather name="user" size={26} color={"#64748b"} />
          <TextInput
            placeholder="Name"
            onChangeText={(e) => setName(e)}
            value={name}
            className="w-full flex-1 h-full bg-transparent text-2xl p-1 "
          />
        </View>
        <Text className="text-2xl font-bold px-2 mx-1 ">E-mail</Text>
        <View className="w-full  flex-row gap-2 border border-slate-600 rounded-2xl p-4 items-center px-4 ">
          <Feather name="mail" size={26} color={"#64748b"} />
          <TextInput
            placeholder="Email"
            onChangeText={(e) => setEmail(e)}
            value={email}
            className="w-full flex-1 h-full bg-transparent text-2xl p-1 "
          />
        </View>
        <Text className="text-2xl font-bold px-2 mx-1 ">Telefone</Text>
        <View className="w-full  flex-row gap-2 border border-slate-600 rounded-2xl p-4 items-center px-4 ">
          <Feather name="phone" size={26} color={"#64748b"} />
          <TextInput
            placeholder="Phone"
            onChangeText={(e) => setFone(e)}
            value={fone}
            className="w-full flex-1 h-full bg-transparent text-2xl p-1 "
          />
        </View>
        <View className="w-full  justify-center items-center mt-24 bg-blue-500 p-4 px-4 py-4 rounded-2xl  ">
          <TouchableOpacity onPress={changeUpdate}>
            <Text className=" w-full p-2 text-3xl font-bold items-center text-white">
              Atualizar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;

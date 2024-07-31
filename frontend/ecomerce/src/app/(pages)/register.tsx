import { View, Text, TextInput, TouchableOpacity, Button } from "react-native";
import React from "react";
import Constants from "expo-constants";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

const statusBarHeight = Constants.statusBarHeight;

export default function Register() {

  const handlerLogin = ()=>{
    router.replace('login')
  }

  const handlerHome = ()=>{
   router.navigate('(tabs)')
  }

  return (
    <View
      className="flex-1 bg-orange-500 "
      style={{ marginTop: statusBarHeight - 30 }}
    >
      <View className="w-full h-52  justify-center items-center ">
        <Text className="text-4xl text-white font-bold">Ecomerce</Text>
      </View>
      
        <View className="w-full h-full flex bg-white rounded-t-3xl px-4 ">
          <Text className="text-4xl text-orange-500 font-bold px-2 mx-4 mt-10 mb-8">
            Register
          </Text>

          <View className="w-full  flex-row gap-2 border border-slate-600 rounded-2xl p-4 items-center  px-4 mt-4 mb-4 ">
            <Feather name="user" size={26} color={"#64748b"} />
            <TextInput
              placeholder="ex:jhon"
              value=""
              className="w-full flex-1 h-full bg-transparent text-2xl p-1"
            />
          </View>
          <View className="w-full  flex-row gap-2 border border-slate-600 rounded-2xl p-4 items-center  px-4  mb-4 ">
            <Feather name="mail" size={26} color={"#64748b"} />
            <TextInput
              placeholder="ex:jhon@email.com"
              value=""
              className="w-full flex-1 h-full bg-transparent text-2xl p-1"
            />
          </View>

          <View className="w-full  flex-row gap-2 border border-slate-600 rounded-2xl p-4 items-center  px-4  mb-4 ">
            <Feather name="phone" size={26} color={"#64748b"} />
            <TextInput
              placeholder="ex:99775544"
              value=""
              className="w-full flex-1 h-full bg-transparent text-2xl p-1"
            />
          </View>
          <View className="w-full  flex-row gap-2 border border-slate-600 rounded-2xl p-4 items-center px-4 ">
            <Feather name="eye" size={26} color={"#64748b"} />
            <TextInput
              placeholder="ex:1233"
              value=""
              className="w-full flex-1 h-full bg-transparent text-2xl p-1 "
            />
          </View>

          <View className="w-full justify-center items-center mt-16 bg-orange-500 p-4 px-4 py-4 rounded-2xl  ">
          <TouchableOpacity onPress={handlerHome}>
            <Text className=" p-2 text-3xl font-bold items-center text-white">Register</Text>
          </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handlerLogin}>
          <Text className="  text-xl font-bold px-2 mx-4 mt-8">
            Já tem uma conta? Faça login!
          </Text>
          </TouchableOpacity>
           
         
        </View>
      </View>
    
  );
}

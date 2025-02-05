import {  Tabs } from "expo-router";

import { Feather, Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
   <Tabs screenOptions={ 
    {tabBarActiveTintColor:"#107dfaea",
    tabBarLabelStyle:{
      fontSize:16,
      fontWeight:"semibold",
    }
   }}>
    <Tabs.Screen
    name="index"
    options={{
      title:"Home",
      tabBarIcon:({color}) =><Ionicons size={28} name="home-outline" color={color}/>,
      headerShown:false
    }}
    />

   <Tabs.Screen
     name="favorite"
     options={{
      title:"Favoritos",
      tabBarIcon:({color}) => <Ionicons  size={26} name="heart-outline" color={color}/>,
      headerShown:false
     }}
   />
    <Tabs.Screen 
    name="cart"
    options={{
      title:"Pedidos",
      tabBarIcon:({color})=><Ionicons size={28} name="cart-outline" color={color}/>,
      headerShown:false

    }}
   
    />
    <Tabs.Screen
     name="profile"
     options={{
      title:"Perfil",
      tabBarIcon:({color})=><Feather size={28} name="user" color={color}/>,
      headerShown:false
     }}
    />

   </Tabs>
  )
   
}

 
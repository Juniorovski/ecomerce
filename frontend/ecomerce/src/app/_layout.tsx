import { Tabs } from "expo-router";
import '../styles/global.css'
import { Feather, Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
  return (
   <Tabs screenOptions={ 
    {tabBarActiveTintColor:"blue",
    tabBarLabelStyle:{
      fontSize:16,
      fontWeight:"bold"
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
     name="catalog"
     options={{
      title:"Menu",
      tabBarIcon:({color}) => <Ionicons  size={26} name="grid-outline" color={color}/>,
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

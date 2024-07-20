import { Tabs } from "expo-router";
import '../styles/global.css'
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import  Constants  from "expo-constants";

const statusBarHeight = Constants.statusBarHeight;
export default function RootLayout() {
  return (
   <Tabs screenOptions={ {tabBarActiveTintColor:'blue'}}>
    <Tabs.Screen
    name="index"
    options={{
      title:"Home",
      tabBarIcon:({color}) =><Ionicons size={28} name="home" color={color}/>,
      headerShown:false
    }}
    />
    <Tabs.Screen 
    name="cart"
    options={{
      title:"Cart",
      tabBarIcon:({color})=><Ionicons size={28} name="cart" color={color}/>,
      headerShown:false
    }}
    />
    <Tabs.Screen
     name="profile"
     options={{
      title:"Profile",
      tabBarIcon:({color})=><FontAwesome size={28} name="user" color={color}/>,
      headerShown:false
     }}
    />

   </Tabs>
  )
   
}

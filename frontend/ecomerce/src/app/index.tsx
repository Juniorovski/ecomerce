import { Text, View, ScrollView } from "react-native";
import { Header } from "../components/header";
import  Constants  from "expo-constants";
import { Banner } from "../components/banner";
import { Search } from "../components/search";
import Sections from "../components/sections";
import Card from "../components/card";
import { useEffect, useState } from "react";
import api from "@/api/api";

const statusBarHeight = Constants.statusBarHeight;

export default function Index() {
    const [produtoData , setProdutoData] = useState('');
    
    useEffect(()=>{
      fetchData();
    },[])

    const fetchData = async ()=>{
      try {
        const response = await api.get(`/produto/listProdutos`)
         console.log(response.data);

       }
           catch (error) {
           console.log(error)
      }
    }
  return (
    <ScrollView style={{flex:1}} 
    className=" bg-white"
    showsVerticalScrollIndicator={false}
    >
      <View className="w-full px-4 " style={{marginTop:statusBarHeight +8}}>
        <Header/>
        <Search/>
       <Banner/>
      </View>
      <Sections
      name="Produtos em alta"
      label="veja todos"
      action={()=>console.log("clicou no veja todos")}
      size="text-2xl"
       />
       <Card/>
      <Sections
      name="Produtos mais vendidos"
      label="veja todos"
      action={()=>console.log("clicou no veja todos")}
      size="text-2xl"
       />
       
    </ScrollView>
  );
}

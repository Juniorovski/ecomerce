import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";



 
const LoadingScreen = () => {

    useEffect(()=>{
        animationIndicator(); 
    },[])

    const animationIndicator =()=>{
      const timer = setTimeout(()=>{
        router.push('(tabs)')
     },2000);
     return ()=>clearTimeout(timer);
     }
    return ( 
        <View style={[styles.container, styles.horizontal]}>
           <Text style={[ styles.text]}>Iniciando o Aplicativo aguarde...</Text>
            <ActivityIndicator size={70}  color={"#00f"}/>
        </View>
     );
     
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
    },
    horizontal: {
      flexDirection: "column",
      justifyContent: "center",
      padding: 10,
    },
    text:{
      fontSize:30,
       color:"#000",
       textAlign:'center',
       fontWeight:'bold'
    }
  });
 
export default LoadingScreen;
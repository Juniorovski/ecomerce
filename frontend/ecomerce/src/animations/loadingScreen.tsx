import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";



 
const LoadingScreen = () => {

    useEffect(()=>{
        const timer = setTimeout(()=>{
            router.replace('tabs');
        },2000);
        return ()=>clearTimeout(timer);
    })

    return ( 
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size={40} color={"#00f"}/>
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
       color:"#000"
    }
  });
 
export default LoadingScreen;
import { View ,Text} from "react-native-reanimated/lib/typescript/Animated"

interface Props{
    image:{
        source:string
    }
    name:string,
    size: "text-lg" | "text-xl" | "text-2xl" | "text-3xl",
    price:number,
}

export default function({image,name,size,price}:Props) {
    
    return(
        <View className="flex w-full bg-slate-300 rounded-md p-2 mb-1 border ">
           
            <View className="flex w-full flex-col mb-1">

            </View>
            <Text className={`${size} font-bold my-4 items-center`}>{name}</Text>
        </View>
    )
}
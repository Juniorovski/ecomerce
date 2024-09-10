import { View, Text ,Image, TextInput, TouchableOpacity} from 'react-native'
import React from 'react'
import Constants from 'expo-constants';
import { Entypo, Feather } from '@expo/vector-icons';

const statusBarHeight = Constants.statusBarHeight;

const EditProfile = () => {


  return (
    <View 
    className="flex-1  items-center"
      style={{ marginTop: statusBarHeight - 30 }}
    >
    <View className="w-full h-64 flex flex-row items-center justify-center gap-2 mt-6 mb-2 px-4 ">
          <Image className="w-40 h-40 rounded-full mt-4 px-4 mb-2 mx-2 bg-slate-200"
          
          />  
          <Entypo name='circle-with-plus' size={38} color={'#0000ff'} 
        
           style={{
            position:'absolute',
            zIndex:1,
            left:240,
            top:145,
            alignItems:'center',
            justifyContent:'center'
           }}

          /> 
     </View>
      
     <View className="w-full h-full flex bg-white rounded-t-3xl px-4  gap-2">
    
     <Text className="text-2xl font-bold px-2 mx-1 ">
          Nome
        </Text>
      <View className="w-full  flex-row gap-2 border border-slate-600 rounded-2xl p-4 items-center px-4 ">
          <Feather name="user" size={26} color={"#64748b"} />
          <TextInput
            placeholder="Name"
            onChangeText={()=>''}
            value={''}
          
            className="w-full flex-1 h-full bg-transparent text-2xl p-1 "
          />
        </View>
        <Text className="text-2xl font-bold px-2 mx-1 ">
          E-mail
        </Text>
        <View className="w-full  flex-row gap-2 border border-slate-600 rounded-2xl p-4 items-center px-4 ">
          <Feather name="mail" size={26} color={"#64748b"} />
          <TextInput
            placeholder="Email"
            onChangeText={()=>''}
            value={''}
          
            className="w-full flex-1 h-full bg-transparent text-2xl p-1 "
          />
        </View>
        <Text className="text-2xl font-bold px-2 mx-1 ">
          Telefone
        </Text>
        <View className="w-full  flex-row gap-2 border border-slate-600 rounded-2xl p-4 items-center px-4 ">
          <Feather name="phone" size={26} color={"#64748b"} />
          <TextInput
            placeholder="Phone"
            onChangeText={()=>''}
            value={''}
          
            className="w-full flex-1 h-full bg-transparent text-2xl p-1 "
          />
        </View>
        <View className="w-full  justify-center items-center mt-24 bg-blue-500 p-4 px-4 py-4 rounded-2xl  ">
          <TouchableOpacity onPress={()=>{}}>
            <Text className=" w-full p-2 text-3xl font-bold items-center text-white">
              Atualizar
            </Text>
          </TouchableOpacity>
        </View>
 
      </View>
      
    </View>
  )
}

export default EditProfile;
import React, { useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { IMBG } from "../icon";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () =>{
  const navigation=useNavigation()
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const register = (email, password) =>{
    auth()
      .signOut()
      .then(() => {
        console.log("User signed out!");
        {
          navigation.navigate('LoginScreen');
        }
      });
  }
  return(
    <View style={{flex:1}}>
      <ImageBackground source={IMBG} style={{width:'100%',height:'100%',alignItems:"center",justifyContent:"flex-end"}}>
        <TouchableOpacity
          onPress={() =>{register(email, password)}}
          style={{width:100,borderRadius:10,height:50,alignItems:'center',justifyContent:"center",backgroundColor:'blue' }}>
          <Text>logout</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}
export default HomeScreen;

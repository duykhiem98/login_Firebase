import React from 'react'
import { View } from "react-native";
import LoginScreen from "./src/Screen/LoginScreen";
import Router from "./src/Router";

const App = () =>{
  return(
    <View style={{flex:1,backgroundColor:'#fff'}}>
      <Router />
    </View>
  )
}
export default App;


import { IC_FACEBOOK, IC_GOOGLE, LOGO } from "../icon";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";

const LoginScreen = () => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const navigation = useNavigation();
  const register = (email, password) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("login");
        {
          navigation.navigate('HomeScreen');
        }
      })
      .catch(error => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }

        console.error(error);
      });
  };

  return (
    <View style={{ flex: 1, flexDirection: "column", paddingHorizontal: 15 }}>
      <View style={{ height: 200, justifyContent: "center", alignItems: "center" }}>
        <Image
          style={{ width: 100, height: 100 }}
          source={LOGO} />
        <Text style={{ fontWeight: "bold" }}>LOGIN APP</Text>
      </View>
      <TextInput
        placeholder="Email Address"
        placeholderTextColor="#808e9b"
        style={styles.input}
        autoCompleteType="email"
        keyboardType="email-address"
        textContentType="emailAddress"
        onChangeText={(text) => SetEmail(text)}
        value={email}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#808e9b"
        style={styles.input}
        textContentType="password"
        onChangeText={(text) => SetPassword(text)}
        value={password}
      />
      <TouchableOpacity>
        <Text style={styles.fpText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => register(email, password)
        }
        style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.loginWithBar}>
        <TouchableOpacity style={styles.iconButton}>
          <Image style={{ width: 36, height: 36 }}
                 source={IC_GOOGLE}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Image style={{ width: 36, height: 36 }}
                 source={IC_FACEBOOK}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.signUpTextView}>
        <Text style={styles.signUpText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => {
          navigation.navigate("RegisterScreen");
        }}>
          <Text style={[styles.signUpText, { color: "#B53471" }]}>
            {" Sign Up"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "900",
    color: "#fff",
    alignSelf: "center",
  },
  loginText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#333",
    borderRadius: 6,
    marginTop: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#808e9b",
  },
  fpText: {
    alignSelf: "flex-end",
    color: "#B33771",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: "#833471",
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 20,
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#fafafa",
    alignSelf: "center",
  },
  loginWithBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
  },
  iconButton: {
    backgroundColor: "#333",
    padding: 14,
    marginHorizontal: 10,
    borderRadius: 100,
  },
  signUpTextView: {
    marginTop: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  signUpText: {
    color: "#808e9b",
    fontSize: 20,
    fontWeight: "500",
  },
});
export default LoginScreen;

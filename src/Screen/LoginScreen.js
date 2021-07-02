import { IC_FACEBOOK, IC_GOOGLE, LOGO } from "../icon";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const LoginScreen = () => {
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '293116864634-qel8te4fdq2is7ud2v9br50j64n40j64.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: '', // specifies a hosted domain restriction
      // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: '', // [Android] specifies an account name on the device that should be used
      //iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      googleServicePlistPath: '', // [iOS] optional, if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
    });

  })
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo)
    } catch (error) {
      console.log({ error })
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
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
    <ScrollView>
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
          <GoogleSigninButton
            style={{  height:50,width:'100%' }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
         />
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
    </ScrollView>


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
    height: 50,
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
    flexDirection: "column",
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

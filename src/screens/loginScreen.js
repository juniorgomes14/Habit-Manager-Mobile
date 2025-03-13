import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput,  TouchableOpacity,Image } from 'react-native';
import { userOperations } from '../../database/database';
import AsyncStorage from '@react-native-async-storage/async-storage';



const LoginScreen = ({navigation}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
     alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      // Use the login utility function
      const user = await userOperations.login(username, password);

      if (user) {
       alert("Success", "Login successfully");
      // Salva o usuário no AsyncStorage
      await AsyncStorage.setItem("userToken", JSON.stringify(user));
      navigation.navigate("Home");
        
      
      } else {
       alert("Error", "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
     alert("Error", "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/background.png')} 
        style={styles.imageTop}
      />
      <Text style={styles.title}>Login</Text> 

      <View style={styles.infoContainer} >
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
        
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
        </View>
  
        <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Loading..." : "Login"}
        </Text>
      </TouchableOpacity>
      
      </View>
      <TouchableOpacity style={styles.signupContainer}  onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signupText}>Don't have any account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    
  },
  imageTop: {
    width:'100%', // Defina um tamanho adequado
    height: 200,
    marginBottom: 20, // Dá um espaçamento abaixo da imagem
    borderRadius: 30,
  },
  infoContainer:{
    backgroundColor:'#D9D9D9',
    width:'90%',

  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 10,
   
  },
  label: {
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor:'white',
  },
  button: {
    marginTop: 20,
    backgroundColor: 'black',
  
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    height:40
    
  }, buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginText:{
    color:'white'
  },
  signupContainer: {
    marginTop: 15,
  },
  signupText: {
    color: 'black',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
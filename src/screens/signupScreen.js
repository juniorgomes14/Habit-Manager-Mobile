
import { useState } from "react"
import { StyleSheet,Button, TextInput, View,Text,TouchableOpacity  } from "react-native"
import { userOperations } from "../../database/database";

const SignUpScreen=({navigation})=>{
  
    const [firstName,setFirstName]= useState('')
    const [lastName,setLastName]= useState('')
    const [username,setUsername]= useState('')
    const [password,setPassword]= useState('')
    const [confirmPassword,setConfirmPassword]= useState('')
    const [isLoading, setIsLoading] = useState(false);


  const handleSign  = async () => {

    if (!username || !password || !confirmPassword) {
      alert("Preencha todos os campos");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas diferentes");
      return;
    }

    setIsLoading(true);

    try {
      //check if user exists
      const existingUser = await userOperations.findByUsername(username);
      if (existingUser) {
        alert("Usuário já existe");
        return;
      }

      //registar um utilizador
      await userOperations.register(username, password);
      alert("Usuário registrado com sucesso", [
        { text: "OK", onPress: navigation.navigate('Home') },
      ]);

      setIsLoading(false);

    } catch (error) {
      console.error("Error registering user:", error);
      alert("Erro ao registrar usuário");
    } finally {
      setIsLoading(false);
    }
  };


   return(
    <View style={styles.container}>

      <View style={styles.topInfo}>
          <Button title="Voltar" style={styles.topInfoButton} 
          onPress={()=>{ navigation.goBack()}}/>

              <Text style={styles.topInfoText} >
                  Sign Up</Text>
      </View>
      
      <View style={styles.inputContainer}>
            <Text style={styles.label}>First name</Text>
            <TextInput
            style={styles.input}
            onChangeText={setFirstName}
            value={firstName} />
      </View>
        
        <View style={styles.inputContainer}>
            <Text style={styles.label}>Last name</Text>
            <TextInput
            style={styles.input}
            onChangeText={setLastName}
            value={lastName}/>
        </View>


        <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput 
             style={styles.input}
            onChangeText={setUsername}
            value={username} keyboardType="username-adress" autoCapitalize="none"/>
        </View>

        <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput 
             style={styles.input}
            onChangeText={setPassword}
            secureTextEntry
            value={password}/>
        </View>

        <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm password</Text>
            <TextInput
             style={styles.input}
            onChangeText={setConfirmPassword}
        
            value={confirmPassword}/>
        </View>
          <TouchableOpacity style={styles.button}  onPress={handleSign}>
                <Text  style={styles.buttonText}>Sign Up </Text>
              </TouchableOpacity>
       
    </View>
   )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    padding: 20,
  },
  topInfo:{
   flexDirection:'row',
    backgroundColor:'black',
    width:'100%',
    height:100,
    borderRadius:10,
    alignItems:"center"
  },
  topInfoButton:{
    color:'white',
    
    
  },
  topInfoText:{
   color:'white',
   marginLeft:"30%",
   fontSize:23


  },
 
  inputContainer: {
    marginBottom: 10,
    width:'90%',
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
    width:'80%',
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    height:40
    
  },
  buttonText:{
    color:'white',

  },
  
});

export default SignUpScreen
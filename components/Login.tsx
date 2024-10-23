import { Picker } from '@react-native-picker/picker';
import { useState, type PropsWithChildren, type ReactElement } from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import storeSession  from "../utils/storeSession";
import CarMapScreen from './CarMapScreen';
import { APIProvider } from "@vis.gl/react-google-maps";

import axios from 'axios';
import { Link, Route, useNavigate } from 'react-router-dom';
const url = "http://localhost:3000/"

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
}: Props) {
 

  const [selected, setSelected] = useState(false)
  const [role, setRole] = useState("1");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordR, setPasswordR] = useState("");
 
  const handleLogin = () => {

    if (username.trim().length > 6 && password.trim().length >6) {
      const urlTmp = url+'items?username='+username+"&password="+password
      
    axios.get(urlTmp)
    .then( async response => {  
      const res = response.data
      
      switch (res.code) {
        case 200:
   
          await storeSession.storeSession(res.data)

          // const data = await storeSession.getSession() 
          // console.log(data);
          

          break;
        case 300:
          alert("Credenciales no validas");
          break;
      
        default:
          break;
      }
    })
    .catch(error => {
        console.error('Error posting data:', error.response ? error.response.data : error.message); // Handle the error
    });

      
    }else{
      alert("Datos no validos")
    }
  };

  const saveUser = ()=>{
    if (password == passwordR && password.trim().length > 4 && username.trim().length > 5){
      const data = {password, username,role}
      console.log(data);

      axios.post(url+'items', data, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer your_token_here'
          }
      })
      .then(response => {
        const res = response.data
        console.log(res.code);
        switch (res.code) {
          case 200:
            alert("Usuario created");
            setSelected(true)
            break;
          case 300:
            alert("El usuario ya existe");
            
            break;
        
          default:
            break;
        }
      })
      .catch(error => {
          console.error('Error posting data:', error.response ? error.response.data : error.message); // Handle the error
      });
    
      
    }else{
      console.log("Datos no validos");
      
    }
  }

  return (
    <View style={styles.container}>

      {selected ? (

      <View style={styles.card}>
        <Text style={styles.title}>Ingreso al sistema</Text>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Contrasena"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)} />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>setSelected(!selected)}>
      <Text style={styles.linkText}>Registrate aqui</Text>
    </TouchableOpacity>

      </View>
      ):(
        <View style={styles.card}>
        <Text style={styles.title}>Registrese en el sistema</Text>
      <Text style={styles.label}>Tipo de Usuario:</Text>
        <View style={styles.container}>
      <Picker
        selectedValue={role}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setRole(itemValue)}
      >
        <Picker.Item label="Usuario que ve todos los vehiculos" value="1" />
        <Picker.Item label="Usuario que ve sus vehiculos" value="2" />
      </Picker>
      {/* <Text style={styles.selectedText}>Selected: {selectedValue}</Text> */}
    </View>

        <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Contrasena"
          secureTextEntry
          value={password}
          onChangeText={text=>setPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Repita su contrasena"
          secureTextEntry
          value={passwordR}
          onChangeText={text=>setPasswordR(text)}
        />
        <TouchableOpacity style={styles.button} onPress={saveUser}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>setSelected(!selected)}>
        <Text style={styles.linkText}>Ya tienes una cuenta?</Text>
      </TouchableOpacity>

      </View>
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    marginBottom: 10,
    alignContent:'flex-start',
    alignItems: 'flex-start',
    textAlign: 'left'
  },
  picker: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  selectedText: {
    fontSize: 16,
  },
  linkText: {
    marginTop:20,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Light background
  },
  card: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff', // White card background
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4CAF50', // Green button color
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // White text
    fontSize: 18,
    fontWeight: 'bold',
  },  
});

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
  idUser: number;
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function RegVehicle({
  children,
  headerImage,
  idUser,
  headerBackgroundColor,
}: Props) {

 

  const [placas, setPlacas] = useState("");
  const [user_id, setUser_id] = useState(idUser);
  const [marca, setMarca] = useState("");
  const [color, setColor] = useState("");
  const [modelo, setModelo] = useState("");
  const [latitud, setLatitud] = useState(51.909864);
  const [longitud, setLongitud] = useState(-0.118092);

  const saveCar = ()=>{
    if (placas.trim().length > 2 && 
        marca.trim().length > 2 &&
        color.trim().length > 2 &&
        modelo.trim().length > 2 &&
        latitud != 0 &&
        longitud  != 0
    ){
      const data = {user_id,placas, marca, color, modelo, latitud, longitud}
      
      console.log(data);

      axios.post(url+'cars', data, {
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
            alert("Car created");
            break;
          case 300:
            alert("Placas already exists");
            
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

      <View style={styles.card}>
        <Text style={styles.title}></Text>
        <TextInput
          style={styles.input}
          placeholder="Placas"
          value={placas}
          onChangeText={text => setPlacas(text)}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Marca"
          value={marca}
          onChangeText={text => setMarca(text)} />
        
        <TextInput
          style={styles.input}
          placeholder="Color"
          value={color}
          onChangeText={text => setColor(text)} />

        <TextInput
          style={styles.input}
          placeholder="Modelo"
          value={modelo}
          onChangeText={text => setModelo(text)} />

        <TouchableOpacity style={styles.button} onPress={saveCar}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity> 

      </View>
     
      
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

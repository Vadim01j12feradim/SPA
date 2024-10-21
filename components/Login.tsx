import { Picker } from '@react-native-picker/picker';
import { useState, type PropsWithChildren, type ReactElement } from 'react';
import { Linking, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import axios from 'axios';
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
  const handleLogin = () => {
    // Handle login logic here
    console.log("Login pressed");
  };

  
  const [selected, setSelected] = useState(false)
  const [selectedValue, setSelectedValue] = useState("1");
  
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [passwordRepeat, setPasswordRepeat] = useState("")
  
  const register = () =>{
    if (password == passwordRepeat && password.trim() != ""){
      const data = {username,password, selectedValue}
      console.log(data);
      
      const config = {
        headers: {
          'Authorization': 'Bearer your_token',
          'Content-Type': 'application/json'
        },
        timeout: 5000  // Tiempo máximo en milisegundos para esperar la respuesta
      };
      
      // Realiza una solicitud POST con configuración
    
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
        />
        <TextInput
          style={styles.input}
          placeholder="Contrasena"
          secureTextEntry
        />
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
        selectedValue={selectedValue}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Usuario que ve todos los vehiculos" value="1" />
        <Picker.Item label="Usuario que ve sus vehiculos" value="2" />
      </Picker>
      {/* <Text style={styles.selectedText}>Selected: {selectedValue}</Text> */}
    </View>

        <TextInput
          style={styles.input}
          value={username}
          placeholder="Usuario"
          onChangeText={text => setUsername(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Contrasena"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Repita su contrasena"
          secureTextEntry
          value={passwordRepeat}
          onChangeText={text => setPasswordRepeat(text)}
        />

        <TouchableOpacity style={styles.button} onPress={register}>
          <Text style={styles.buttonText}>Registrarse</Text>
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

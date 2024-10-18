import { useState, type PropsWithChildren, type ReactElement } from 'react';
import { Linking, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';

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
      <Text style={styles.linkText}>Click here to visit Example.com</Text>
    </TouchableOpacity>

      </View>
      ):(
        <View style={styles.card}>
        <Text style={styles.title}>Registrese en el sistema</Text>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
        />
        <TextInput
          style={styles.input}
          placeholder="Contrasena"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Repita su contrasena"
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
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

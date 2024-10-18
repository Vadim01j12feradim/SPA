import { Image, StyleSheet, Platform, Button, Alert } from 'react-native';  
import ParallaxScrollView from '@/components/ParallaxScrollView';
import Login from '@/components/Login';
import { useState } from 'react';
export default function HomeScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    navigation.navigate('Register'); // Replace 'Home' with your target screen name
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#f5f5f5', dark: '#f5f5f5' }}
      headerImage={
        <Image
          source={require('@/assets/images/iconfront.jpg')}
          style={styles.reactLogo}
        />
      }
      style={styles.container}>
      <Login headerBackgroundColor={{ light: '#f5f5f5', dark: '#f5f5f5' }}
        
        style={styles.container}></Login>

    </ParallaxScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f5f5f5',
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    borderColor: '#f5f5f5',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
  },
  loginButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  footerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  linkText: {
    color: '#f5f5f5',
  },
  reactLogo: {
    width: '100%'
  }
});
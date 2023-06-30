import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

import * as RN from 'react-native';

const auth = getAuth();

export default function LoginScreen() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  React.useLayoutEffect(() =>{
    navigation.setOptions({
        headerRight: () => <RN.Button title = 'Cadastro' onPress ={ () => navigation.navigate('Newuser')} />
    })
},[])

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
    
        Alert.alert('Login successful');
       
        navigation.navigate('Home'); 
        
        
      })
      .catch((error) => {
        
        Alert.alert('Invalid email or password');
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 16 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 16 }}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

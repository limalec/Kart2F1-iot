import { Text, View, TextInput, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getLeaderboard, getUserByEmail } from '../utils/ApiFunctions';

function Login({navigation, route}) {
  const [email, setEmail] = useState('');
  const handleEmailChange = (text) => {
    setEmail(text);
  };
  return (
  <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#DCEFE7',
    }}>
      <Text style={{
        fontSize: 25,
        marginTop: 10,
      }}>S'identifier</Text>

      <TextInput style={{
        height: 40,
        width: 200,
        borderColor: '#13C278',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        marginTop: 20,
        marginHorizontal: 10,
        borderRadius: 10,
        backgroundColor: 'white',
      }} placeholder="Adresse e-mail"
        onChangeText={handleEmailChange} />

      <TextInput
        secureTextEntry={true}
        style={{
          height: 40,
          width: 200,
          borderColor: '#13C278',
          borderWidth: 1,
          padding: 10,
          marginTop: 10,
          marginBottom: 20,
          marginHorizontal: 10,
          borderRadius: 10,
          backgroundColor: 'white',
        }} placeholder="Mot de passe" />

      <Button
        title='Se connecter'
        onPress={async () => {
          const user = await getUserByEmail(email)
          const leaderboard = await getLeaderboard()
          navigation.navigate('LeaderBoard', { user, leaderboard }); //a changer
        }}
        color="green">
      </Button>
    </View>
  </View>
  )
}

export default Login;
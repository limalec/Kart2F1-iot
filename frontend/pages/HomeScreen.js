import { Button, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Login" onPress={() => { navigation.navigate('Login', { name: 'tata' }); }} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default HomeScreen;

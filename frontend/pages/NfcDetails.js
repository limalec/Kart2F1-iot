import { Text, View, TouchableOpacity } from 'react-native';

function NfcDetails({ route, navigation }) {
    const {tag} = route.params;
    return(
        <View>
            <Text>Details</Text>
            <View style={{padding: 8, borderRadius: 8, marginBottom: 15}}>
                <Text>{JSON.stringify(tag, null, 2)}</Text>
            </View>
        </View>)
}

export default NfcDetails;
import { Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import NfcUtils from '../utils/NfcUtils';
import phone_icon from "../assets/mdi_cellphone-nfc.png"
import graph_icon from "../assets/Vector.png"
import hestia_logo from "../assets/logo_hestia.png"


function NFCReader({ navigation, route }) {

    const [hasNFC, setHasNFC] = useState(false)
    const [readButtonPressed, setReadButtonPressed] = useState(false)
    useEffect(() => {
        const checkIsSupported = async () => {
          const deviceIsSupported = await NfcUtils.init();
          setHasNFC(deviceIsSupported)
        }
    
        checkIsSupported()
      }, []);

      const readTag = async () => {
        setReadButtonPressed(true);
        const tag = await NfcUtils.readTag();
        if (tag) {
          navigation.navigate('NfcDetails', {tag});
        }
      }

    return (
      
        <View style={{padding: 20}}>
          
          {!hasNFC ? (<Text>NFC not supported</Text>) : 
          (
            <View>
              <View style={{
                backgroundColor: '#DCEFE7',
                height: 42,
                flexDirection: 'row', 
                alignItems: 'center',
                alignContent: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
              }}>
              <Image
                source={hestia_logo}
                style={{ width: 65, height: 65 }}
              />
              
                <Image
                  source={phone_icon}
                  style={{ width: 17, height: 17, right: 50, borderRadius: 0,
                    overflow: "hidden",
                    borderWidth: 2,
                    borderColor: "#13C278"}}
                />
              <TouchableOpacity
                onPress={() => navigation.navigate('LeaderBoard')} 
              >
              <Image
                source={graph_icon}
                style={{ width: 17, height: 17, right: 130, }}
              /> </TouchableOpacity>
              </View>
              <TouchableOpacity style={{padding: 10, width: 200, margin: 20, borderWidth: 1, borderColor: 'black'}}
                  onPress={readTag}>
                  <Text>Scan Tag</Text>
              </TouchableOpacity>
              {readButtonPressed && (
                <Text>Please scan something..</Text>
              )}
            </View>
            )}
            
        </View>
    )
}

export default NFCReader;
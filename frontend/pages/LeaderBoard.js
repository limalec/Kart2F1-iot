import { View, Image, Text, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import Polygon from "../assets/adaptive-icon.png";
import hestia_logo from "../assets/logo_hestia.png"
import { SvgUri } from 'react-native-svg';
import glass_icon from "../assets/glass_icon.png"
import green_icon from "../assets/green_icon.png"
import crown_icon from "../assets/crown_icon.png"
import plastic_icon from "../assets/plastic_icon.png"
import reward_1 from "../assets/first_reward.png"
import reward_2 from "../assets/second_reward.png"
import reward_3 from "../assets/third_reward.png"
import phone_icon from "../assets/mdi_cellphone-nfc.png"
import graph_icon from "../assets/Vector.png"
import {getLeaderboard} from "../utils/ApiFunctions"
import { counterEvent } from 'react-native/Libraries/Performance/Systrace';

function compute_score_bar(score, max){ 
  const result = (score * 200) / max;
    if (result > 200) {
      return 200;
    }
    return result;
}
function get_top_3(int, list) {
  if (int > 0) {
    const debut = (int - 1) * 3;
    const fin = debut + 3;
  
    if (debut < list.length) {
      const elements = list.slice(debut, fin);
      return elements;
    } else {
      return []
    }
  } else {
    return []
  }
}
function get_max_page_list(leaderboard_list) {
  const result = []
  for (let i = 1; i <= Math.ceil(leaderboard_list.length / 3); i++) {
    result.push(i)
  }
  return result
}

function classement(leaderboard_list, user) {
  let count = 1
  for (e in leaderboard_list) {
    if (leaderboard_list[e].name == user.name) {
      return count
    }
    count += 1
  }
  return -1
}

function updateBadges(leaderboard_list, user) {
  let badges = {"all" : 0, "glass": 0, "organic": 0, "plastic": 0}
  let user_max_plastic = {}
  let max_plastic = 0
  let user_max_organic = {}
  let max_organic = 0
  let user_max_glass = {}
  let max_glass = 0
  let user_max = {}
  let max = 0
  for (e in leaderboard_list) {
    if (leaderboard_list[e].info.statistics.plastic > max_plastic) {
      max_plastic = leaderboard_list[e].info.statistics.plastic
      user_max_plastic = leaderboard_list[e] 
    }
    if (leaderboard_list[e].info.statistics.organic > max_organic) {
      max_organic = leaderboard_list[e].info.statistics.organic
      user_max_organic = leaderboard_list[e] 
    }
    if (leaderboard_list[e].info.statistics.glass > max_glass) {
      max_glass = leaderboard_list[e].info.statistics.glass
      user_max_glass = leaderboard_list[e] 
    }
    if (leaderboard_list[e].info.statistics.plastic + leaderboard_list[e].info.statistics.glass + leaderboard_list[e].info.statistics.organic > max) {
      max = leaderboard_list[e].info.statistics.plastic + leaderboard_list[e].info.statistics.glass + leaderboard_list[e].info.statistics.organic
      user_max = leaderboard_list[e] 
    }
  }
  if (user_max.name == user.name) {
    badges.all = 1
  }
  if (user_max_glass.name == user.name) {
    badges.glass = 1
  }
  if (user_max_organic.name == user.name) {
    badges.organic = 1
  }
  if (user_max_plastic.name == user.name) {
    badges.plastic = 1
  }
  return badges
}
function LeaderBoard({ navigation, route }) {

  const user = route.params.user;
  const leaderboard_list = route.params.leaderboard
  const handleArrowLeftButtonPress = () => { if (leaderboard_page - 1 <= 0) { } else {setLeaderboard_page(leaderboard_page - 1)}}
  const handleArrowRightButtonPress = () => { if (leaderboard_page + 1 > leaderboard_max_page.length) { } else {setLeaderboard_page(leaderboard_page + 1)}}
  const [score, setScore] = useState(user.info.statistics.glass * 2 + user.info.statistics.plastic * 1 + user.info.statistics.organic * 1.5)
  const [badges, setBadges] = useState(updateBadges(leaderboard_list, user))
  const [nb_dechet, setNb_dechet] = useState(user.info.statistics.plastic + user.info.statistics.organic + user.info.statistics.glass)
  const [leaderboard_page, setLeaderboard_page] = useState(1)
  const [leaderboard_max_page, setLeaderboard_max_page] = useState(get_max_page_list(leaderboard_list))
  const [current_leaderboard, setCurrent_leaderboard] = useState(get_top_3(leaderboard_page, leaderboard_list))
  useEffect(() => {
    setCurrent_leaderboard(get_top_3(leaderboard_page, leaderboard_list))
    }, [leaderboard_page]);
  return (
    <View style={{ flex: 1 }}>
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
    <TouchableOpacity
      onPress={() => navigation.navigate('NfcScreen')}
    >
      <Image
        source={phone_icon}
        style={{ width: 17, height: 17, right: 50 }}
      />
    </TouchableOpacity>
    <Image
      source={graph_icon}
      style={{ width: 17, height: 17, right: 130, borderRadius: 0,
      overflow: "hidden",
      borderWidth: 2,
      borderColor: "#13C278"}}
    />
    </View>

    <View style={{
      height: 42,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 9,
    }}>
      <View style={{ width: '52%'}}>
      <Text style={{ color: '#000', fontSize: 12, fontWeight: '600', textDecorationLine: 'underline'}}>Vos badges</Text>
      </View>
      <View>
        {badges.glass === 1 && (<Image
          source={glass_icon}
          style={{
            position: 'absolute',
            width: 30,
            height: 30,
            top: 30,
            right: 145,
          }}
        />)}
        
        {badges.organic === 1 && (<Image
          source={green_icon}
          style={{
            position: 'absolute',
            width: 30,
            height: 30,
            top: 30,
            right: 100,
          }}
        />)}
        {badges.all === 1 && (<Image
          source={crown_icon}
          style={{
            position: 'absolute',
            width: 30,
            height: 30,
            top: 80,
            right: 145,
          }}
        />)}
        
        {badges.plastic === 1 && (<Image
          source={plastic_icon}
          style={{
            position: 'absolute',
            width: 30,
            height: 30,
            top: 80,
            right: 100,
          }}
        />)}
        
      </View>

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        right: 80,
      }}>
        <Text style={{ color: '#000', fontSize: 12, fontWeight: '600', textDecorationLine: 'underline'}}>Classement</Text>
        
      </View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        right: 50,
      }}>
        <Text style={{ color: 'grey', fontSize: 12, fontWeight: '600'}}>Vous êtes {classement(leaderboard_list, user)}e sur 100</Text>
        
      </View>
        
      <View style={{
        alignItems: 'center',
        paddingHorizontal: 10,
        right: 270,
        top: 90,
      }}>
        <View style={{ marginBottom: 20 }}>
           {current_leaderboard.map((user_leaderboard, index) => (
              <Text style={{ color: '#000', fontSize: 12, fontWeight: '600', lineHeight: 20, backgroundColor: user_leaderboard.name === user.name ? 'grey' : 'transparent',}}>{((leaderboard_page - 1) * 3 + 1) + index} - {user_leaderboard.name} {user_leaderboard.surname}    {user_leaderboard.info.statistics.glass * 2 + user_leaderboard.info.statistics.plastic * 1 + user_leaderboard.info.statistics.organic * 1.5} points</Text>
           ))

           }
           </View>
        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center"}}>
          <TouchableOpacity
          onPress={handleArrowLeftButtonPress}
          style={{
            width: 0,
            height: 0,
            borderLeftWidth: 8, // Largeur du triangle
            borderRightWidth: 8, // Largeur du triangle
            borderBottomWidth: 10, // Hauteur du triangle
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: '#13C278',
            transform: [{ rotate: '-90deg' }],
            marginRight: 10
          }}
        ></TouchableOpacity>

          <Text style={{ color: '#000', fontSize: 8, fontWeight: '400', marginRight: 10 }}>{leaderboard_page - 1}</Text>
          <Text style={{ color: '#000', fontSize: 8, fontWeight: '400', marginRight: 10, borderRadius: 2,  borderWidth: 1, textAlign: "center", width: 16, height: 16, paddingTop: 2}}>{leaderboard_page}</Text>
          <Text style={{ color: '#000', fontSize: 8, fontWeight: '400' }}>{leaderboard_page + 1}</Text>
          
          <TouchableOpacity
            onPress={handleArrowRightButtonPress}
            style={{
              width: 0,
              height: 0,
              borderLeftWidth: 8, // Largeur du triangle
              borderRightWidth: 8, // Largeur du triangle
              borderBottomWidth: 10, // Hauteur du triangle
              borderLeftColor: 'transparent',
              borderRightColor: 'transparent',
              borderBottomColor: '#13C278',
              transform: [{ rotate: '90deg' }],
              marginLeft: 10
            }}
          ></TouchableOpacity>
        </View>
      </View>
    
    </View>
    <View style={{
      height: 42,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 9,
      top: 150,
    }}>
      <Text style={{ color: '#000', fontSize: 12, fontWeight: '600', textDecorationLine: 'underline'}}>Titres</Text>

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        right: -65,
      }}>
        <Text style={{ color: '#000', fontSize: 12, fontWeight: '600', textDecorationLine: 'underline'}}>Vos statistiques</Text>
      </View>
      <View style={{
          alignItems: 'center',
          paddingHorizontal: 10,
          right: -20,
          top: 55,
        }}>
          <Text style={{ color: '#13C278', fontSize: 35, fontWeight: '600'}}>{nb_dechet}</Text>
          <Text style={{ color: '#000', fontSize: 18, fontWeight: '600'}}>déchets jetés</Text>
      </View>
      <View style={{
          alignItems: 'center',
          paddingHorizontal: 10,
          right: 170,
          top: 220,
        }}>
          <Text style={{ color: '#13C278', fontSize: 20, fontWeight: '600'}}>{user.info.statistics.plastic}</Text>
          <Text style={{ color: '#000', fontSize: 10, fontWeight: '600'}}>plastique</Text>
      </View>
      <View style={{
          alignItems: 'center',
          paddingHorizontal: 10,
          right: 140,
          top: 220,
        }}>
          <Text style={{ color: '#13C278', fontSize: 20, fontWeight: '600'}}>{user.info.statistics.organic}</Text>
          <Text style={{ color: '#000', fontSize: 10, fontWeight: '600'}}>organique</Text>
      </View>
      <View style={{
          alignItems: 'center',
          paddingHorizontal: 10,
          right: 95,
          top: 220,
        }}>
          <Text style={{ color: '#13C278', fontSize: 20, fontWeight: '600'}}>{user.info.statistics.glass}</Text>
          <Text style={{ color: '#000', fontSize: 10, fontWeight: '600'}}>verre</Text>
      </View>
    </View>
    <View style={{ position: 'absolute', top: 530, left: 130 }}>
      <View
        style={{
          position: 'absolute',
          width: 200, // Largeur du rectangle vert clair en pixels
          height: 25, // Hauteur du rectangle en pixels
          backgroundColor: '#DCEFE7', // Couleur du rectangle vert clair
        }}
      ></View>
      <View
        style={{
          position: 'absolute',
          width: compute_score_bar(score, 1000), // Largeur du rectangle vert foncé en pixels
          height: 25, // Hauteur du rectangle en pixels
          backgroundColor: '#13C278', // Couleur du rectangle vert foncé
        }}
      ></View>
        <Text
        style={{
          position: 'absolute',
          top: 5, // Position verticale du texte par rapport à la barre verte claire
          left: 75, // Position horizontale du texte par rapport à la barre verte claire
          color: 'black',
          fontSize: 10,
          fontWeight: '600',
          width: 200
        }}
      >
        {score} / 1000
      </Text>
      <Image
            source={reward_1} // Utilisez le chemin de l'image du badge
            style={{ width: 40, height: 40, top: -8, left: 170 }}
      />
    </View>
    <View style={{ position: 'absolute', top: 570, left: 130 }}>
      <View
        style={{
          position: 'absolute',
          width: 200, // Largeur du rectangle vert clair en pixels
          height: 25, // Hauteur du rectangle en pixels
          backgroundColor: '#DCEFE7', // Couleur du rectangle vert clair
        }}
      ></View>
      <View
        style={{
          position: 'absolute',
          width: compute_score_bar(score, 5000), // Largeur du rectangle vert foncé en pixels
          height: 25, // Hauteur du rectangle en pixels
          backgroundColor: '#13C278', // Couleur du rectangle vert foncé
        }}
      ></View>
        <Text
        style={{
          position: 'absolute',
          top: 5, // Position verticale du texte par rapport à la barre verte claire
          left: 75, // Position horizontale du texte par rapport à la barre verte claire
          color: 'black',
          fontSize: 10,
          fontWeight: '600',
          width: 200
        }}
      >
        {score} / 5000

      </Text>
      <Image
            source={reward_2} // Utilisez le chemin de l'image du badge
            style={{ width: 40, height: 40, top: -8, left: 170 }}
      />
    </View>
    <View style={{ position: 'absolute', top: 610, left: 130 }}>
      <View
        style={{
          position: 'absolute',
          width: 200, // Largeur du rectangle vert clair en pixels
          height: 25, // Hauteur du rectangle en pixels
          backgroundColor: '#DCEFE7', // Couleur du rectangle vert clair
        }}
      ></View>
      <View
        style={{
          position: 'absolute',
          width: compute_score_bar(score, 10000), // Largeur du rectangle vert foncé en pixels
          height: 25, // Hauteur du rectangle en pixels
          backgroundColor: '#13C278', // Couleur du rectangle vert foncé
        }}
      ></View>
        <Text
        style={{
          position: 'absolute',
          top: 5, // Position verticale du texte par rapport à la barre verte claire
          left: 75, // Position horizontale du texte par rapport à la barre verte claire
          color: 'black',
          fontSize: 10,
          fontWeight: '600',
          width: 200
        }}
      >
        {score} / 10000
      </Text>
      <Image
            source={reward_3} // Utilisez le chemin de l'image du badge
            style={{ width: 40, height: 40, top: -8, left: 170 }}
      />

    </View>
    <View style={{ position: 'absolute', top: 650, left: 140, alignItems: "center", width: 150 }}>
    <Text style={{ color: '#000', fontSize: 7, fontWeight: '600'}}>Contactez le service RH si vous êtes éligible à recevoir une récompense</Text>
    </View>

    
    <Image
            source={crown_icon} // Utilisez le chemin de l'image du badge
            style={{ width: 40, height: 40, top: 160, left: 30 }}
    />
    <Text style={{ color: '#000', fontSize: 9, fontWeight: '600', left: 17, top: 165}}>The Trash Goat</Text>
    <View style={{
      width: 60,  // Largeur du carré
      height: 60, // Hauteur du carré
      justifyContent: 'center',    // Centrer verticalement
      alignItems: 'center',
      top: 148,
      left: 18,
    }}>
    <Text style={{ color: '#000', fontSize: 7, fontWeight: '600', textAlign: 'center'}}>This person has recycled the most waste</Text>
    </View>
    <Image
            source={glass_icon} // Utilisez le chemin de l'image du badge
            style={{ width: 40, height: 40, top: 150, left: 30 }}
    />
    <Text style={{ color: '#000', fontSize: 9, fontWeight: '600', left: 8, top: 155}}>The Glass Magician</Text>
    <View style={{
      width: 60,  // Largeur du carré
      height: 60, // Hauteur du carré
      justifyContent: 'center',    // Centrer verticalement
      alignItems: 'center',
      top: 138,
      left: 18,
    }}>
    <Text style={{ color: '#000', fontSize: 7, fontWeight: '600', textAlign: 'center'}}>This person has recycled the most glass waste</Text>
    </View>
    <Image
            source={green_icon} // Utilisez le chemin de l'image du badge
            style={{ width: 40, height: 40, top: 140, left: 30 }}
    />
    <Text style={{ color: '#000', fontSize: 9, fontWeight: '600', left: 8, top: 145}}>The Organic Master</Text>
    <View style={{
      width: 60,  // Largeur du carré
      height: 60, // Hauteur du carré
      justifyContent: 'center',    // Centrer verticalement
      alignItems: 'center',
      top: 128,
      left: 18,
    }}>
    <Text style={{ color: '#000', fontSize: 7, fontWeight: '600', textAlign: 'center'}}>This person has recycled the most organic waste</Text>
    </View>
    <Image
            source={plastic_icon} // Utilisez le chemin de l'image du badge
            style={{ width: 40, height: 40, top: 130, left: 30 }}
    />
    <Text style={{ color: '#000', fontSize: 9, fontWeight: '600', left: 16, top: 135}}>The Plastic King</Text>
    <View style={{
      width: 60,  // Largeur du carré
      height: 60, // Hauteur du carré
      justifyContent: 'center',    // Centrer verticalement
      alignItems: 'center',
      top: 118,
      left: 18,
    }}>
    <Text style={{ color: '#000', fontSize: 7, fontWeight: '600', textAlign: 'center'}}>This person has recycled the most plastic waste</Text>
    </View>
  <View
      style={{
        width: 1, // Largeur de la ligne
        height: "90%", // Hauteur de la ligne (ajustez selon vos besoins)
        backgroundColor: 'black', // Couleur de la ligne
        left: 100,
        bottom: 520,
      }}
    />
    <View
      style={{
        position: 'absolute',
        width: 134.35, // Largeur du trait en pixels
        height: 1, // Hauteur du trait (nous définissons la hauteur à 1 pour un trait vertical)
        top: 400, // Position verticale en pixels depuis le haut
        left: 210, // Position horizontale en pixels depuis la gauche
        backgroundColor: 'green', // Couleur du trait
        transform: [{ rotate: '-135deg' }], // Rotation de -135 degrés (angle inversé)
        borderWidth: 1, // Largeur de la bordure du trait
        borderColor: '#13C278'
      }}
    ></View>
    <View
      style={{
        position: 'absolute',
        width: 94.61, // Largeur du trait en pixels
        height: 1, // Hauteur du trait (nous définissons la hauteur à 1 pour un trait vertical)
        top: 400, // Position verticale en pixels depuis le haut
        left: 183, // Position horizontale en pixels depuis la gauche
        backgroundColor: '#13C278', // Couleur du trait
        transform: [{ rotate: '-90deg' }], // Rotation de -90 degrés (angle inversé)
        borderWidth: 1, // Largeur de la bordure du trait
        borderColor: '#13C278', // Couleur de la bordure du trait
      }}
    ></View>
    <View
      style={{
        position: 'absolute',
        width: 132.76, // Largeur du trait en pixels
        height: 1, // Hauteur du trait (nous définissons la hauteur à 1 pour un trait vertical)
        top: 400, // Position verticale en pixels depuis le haut
        left: 117, // Position horizontale en pixels depuis la gauche
        backgroundColor: 'green', // Couleur du trait
        transform: [{ rotate: '-45deg' }], // Rotation de -45 degrés (angle inversé)
        borderWidth: 1, // Largeur de la bordure du trait
        borderColor: '#13C278', // Couleur de la bordure du trait
      }}
    ></View>
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    }}>
    </View>
  </View>
  )
}

export default LeaderBoard;

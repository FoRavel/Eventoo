import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, FlatList, Image, TouchableOpacity} from 'react-native';
import events from '../Helpers/donneesEvent';
import EventItem from './EventItem';

class Profil extends React.Component {
  static navigationOptions = ({navigation}) => {
    return{
      headerRight:  <TouchableOpacity onPress={()=> navigation.navigate("ProfilEdition")}>
                      <Image style={styles.marginRightCrayon} source={require("../Assets/edit.png")}/>
                    </TouchableOpacity>
    }
  }

  componentDidMount(){
    alert("Les éléments de cette page son factices, parcontre on peut modifier son profil en haut à droite.");
  }

  render() {
    //const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.centerSecondaryAxis}>
          <Image style={styles.image} source={require("../Assets/icon_provisoire_480px.png")}/>
          <Text>Thomas</Text>
        </View>
        <View style={styles.inline}>
          <Image source={require("../Assets/icon_provisoire.png")}/>
          <Text>Les événements que j'organise</Text>
        </View>
        <FlatList
          data={events}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <EventItem event={item}/>}
        />
        <View style={styles.inline}>
          <Image source={require("../Assets/icon_provisoire.png")}/>
          <Text>Les événements passés</Text>
        </View>
        <FlatList
          data={events}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <EventItem event={item}/>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 30,
    marginRight: 30,
    flex: 1
  },
  image:{
    height: 75,
    width: 75,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 50
  },
  centerSecondaryAxis:{
    alignItems: "center"
  },
  inline:{
    flexDirection:"row"
  },
  marginRightCrayon:{
    marginRight: 10
  }
})


export default Profil;

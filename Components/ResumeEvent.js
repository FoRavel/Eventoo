import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import GuessItem from './GuessItem';
import ChecklistItem from './ChecklistItem';

import {getEvent, getListInvites, getChecklist} from '../Networking/Profile';

class ResumeEvent extends React.Component{
  constructor(props){
    super(props)
    this.state={
      titre: "",
      organisateur: "Thomas",
      date: "12.06.2019 à 21h",
      description: "Salut la famille! Pour novel an mes parents me laisse la maison. Vous êtes donc conviés à la meilleure soirée de 2019. Tous les renseignements sont dans l'event! A plus",
      name: "Bar The Frog and Rosbif",
      address: "11 rue Faubourg, 75010",
      longitude: 37.78825,
      latitude: -122.4324,
      distance: "5km",
      countGuesses: 32,
      guessesList:[
        {id:0, firstName: "Lena", lastName: "Dupont", participate: true},
        {id:1, firstName: "Julia", lastName: "Martins", participate: null},
        {id:2, firstName: "Yves", lastName: "Robert", participate: false},
        {id:3, firstName: "Lola", lastName: "Perez", participate: true}
      ],

      currentBalance: "43",
      maxBalance: "70",
      contributors: "8",

      checklist:[
        {id:0, productLabel: "bières", donators:[0,1,2,3]},
        {id:1, productLabel: "chips", donators:[0,1,2]},
        {id:2, productLabel: "coca", donators:[0]},
        {id:3, productLabel: "confettis",  donators:[]}
      ],

      listePhotos:[0,1,2,3,4,5,6]
    }
  }

  _thisGetEvent = async(idEvent)=>{
    const event = await getEvent(idEvent);
    const listInvites = await getListInvites(idEvent);
    const checklist = await getChecklist(idEvent);
    this._getLongLat(event.nom_lieu); //la longitude et la latitude peuvent être obtenu lors de la phase du choix du lieux, puis stocker dans la base mais pas le temps de le faire
    console.log("ABCDEF: " + event.nom_lieu);
    this.setState({
      titre: event.titre,
      organisateur: event.prenom,
      date: event.date_heure_debut,
      description: event.details,
      address: event.adresse,
      name: event.nom_lieu,
      guessesList: listInvites,
      checklist: checklist
    });
    console.log("_thisGetEvent "+ event)
  }

  _totalDonators(){
    var x = 0;
    var array = this.state.checklist;
    array.forEach(function(e){
      x += e.donators.length;
    });
    return x;
  }

  _getLongLat = async(nomLieu) => {
  try {
    let response = await fetch(
      'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input='+nomLieu+'&inputtype=textquery&fields=geometry&key=AIzaSyBRU6VLlwoONuMKS6X8f2MevBhkxeqr2ds', {
        headers:{
          'Accept': 'application/json', // application/json ne marche pas
          'Content-Type': 'application/json'
        }
      }
    );
    responseJson = await response.json();

    console.log(responseJson);

    this.setState({
      longitude: responseJson.candidates[0].geometry.location.lng,
      latitude: responseJson.candidates[0].geometry.location.lat
    });
  } catch (error) {
    console.log(error);
  }
}


  componentDidMount(){
    this._totalDonators();
    console.log(this.props.navigation.state.params.idEvent);
    this._thisGetEvent(this.props.navigation.state.params.idEvent);

  }

  render(){
    const lng = this.state. longitude;
    const lat = this.state.latitude;
    return(
      <ScrollView style={styles.container}>
        <View style={styles.centerSecondaryAxis}>
          <Image style={{width: 80, height: 80, borderColor: "red", borderWidth:1}} source={require("../Assets/icon_provisoire_480px.png")}/>
          <Text style={styles.textBold}>{this.state.titre},</Text>
          <Text>par {this.state.organisateur}, le {this.state.date}</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>organisateur</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.textBold}>C'est quoi?</Text>
        <Text>{this.state.description}</Text>
        <Text style={styles.textBold}>Le lieu</Text>
        <View style={styles.containerMap}>
          <MapView
          style={styles.map}
          initialRegion={{
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
          key= "0"
          coordinate={{latitude:lat, longitude:lng}}
          title={this.state.name}
          description={this.state.address}
          />
        </MapView>
      </View>
      <View style={styles.inline}>
        <Text>{this.state.name}</Text>
        <Text style={styles.textAlignRight}>{this.state.distance}</Text>
      </View>
      <Text>{this.state.address}</Text>
      <View style={styles.inline}>
        <Text style={styles.textBold}>Les invités ({this.state.guessesList.length})</Text>
        <TouchableOpacity style={{flex:1}} onPress={()=>this.props.navigation.navigate("ResumeInvites", {invites: this.state.guessesList})}>
          <Text style={[{textAlign:"right"},styles.textBold]}>voir tout</Text>
        </TouchableOpacity>
      </View>
      <FlatList
      data={this.state.guessesList}
      keyExtractor={(item)=>item.id.toString()}
      renderItem={({item})=><GuessItem guess={item}/>}
      horizontal={true}
      />
      <Text style={styles.textBold}>La cagnotte</Text>
      <View style={styles.centerSecondaryAxis}>
        <Image style={{width: 80, height: 80, borderColor: "red", borderWidth:1}} source={require("../Assets/icon_provisoire_480px.png")}/>
        <View style={styles.inline}>
          <Text>{this.state.currentBalance}€/</Text>
          <Text>{this.state.maxBalance}€</Text>
        </View>
        <Text>récoltés par {this.state.contributors} participants</Text>
        <TouchableOpacity
        onPress={()=>this.props.navigation.navigate("ResumeCagnotte")}
        style={styles.button}>
          <Text style={styles.buttonText, styles.textBold}>voir la cagnotte</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inline}>
        <Text style={styles.textBold}>La checklist</Text>
        <TouchableOpacity style={{flex:1}} onPress={()=>this.props.navigation.navigate("ResumeChecklist")}>
          <Text style={{textAlign:"right"}}>voir tout</Text>
        </TouchableOpacity>
      </View>
      <FlatList
      data={this.state.checklist}
      keyExtractor={(item)=>item.id.toString()}
      renderItem={({item})=><ChecklistItem product={item} totalDonators={this._totalDonators()} />}
      />
      <View style={styles.inline}>
        <Text style={styles.textBold}>La galerie photo</Text>
        <TouchableOpacity style={{flex:1}} onPress={()=>this.props.navigation.navigate("Galerie")}>
          <Text style={{textAlign:"right"}}>voir tout</Text>
        </TouchableOpacity>
      </View>
      <FlatList
      data={this.state.listePhotos}
      keyExtractor={(item)=>item.toString()}
      renderItem={({item})=><View style={{width:250, height:100, backgroundColor: "black", marginRight: 30}}></View>}
      horizontal={true}
      />
    </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginLeft:25,
    marginRight: 25
  },
  centerSecondaryAxis:{
    alignItems: "center"
  },
  textAlignCenter:{
    textAlign: "center"
  },
  containerMap:{
    height: 200
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: 200
  },
  inline:{
    flexDirection: "row"
  },
  textAlignRight:{
    flex: 1,
    textAlign: "right"
  },
  button:{
    backgroundColor: "black",
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 50
  },
  buttonText:{
    color: "white"
  },
  textBold:{
    fontWeight: "bold"
  }
});

export default ResumeEvent;

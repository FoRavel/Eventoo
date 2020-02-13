import React, {Component} from 'react';
import {Platform, StyleSheet, TextInput, View, Button, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import LocationMapItem from './LocationMapItem';
//import Geolocation from 'react-native-geolocation-service';

class Location extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props)
    this.state = {
      //films:[],
      //isLoading: false
      lieux: new Array(),
      currentLocation: {latitude:48.853234, longitude:  2.349807},
      latitude: null,
      longitude: null,
      error: null,
    }
    this.searchedText = ""
    //this.page = 0
    //this.totalPages = 0
    //this._loadFilms = this._loadFilms.bind(this)
  }
  _getPlace = async(text) => {
  try {
    let response = await fetch(
      'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input='+text+'&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyBRU6VLlwoONuMKS6X8f2MevBhkxeqr2ds', {
        headers:{
          'Accept': 'application/json', // application/json ne marche pas
          'Content-Type': 'application/json'
        }
      }
    );
    let responseJson = await response.json();
    console.log(responseJson);
  } catch (error) {
    console.log(error);
  }
}

_searchTextInputChanged(text){
  this.searchedText = text;
  this._autoComplete(text);
}

//Résulats de la recherche de lieux
_getPlaces = async(text) => {
    try{
      let response = await fetch("https://maps.googleapis.com/maps/api/place/textsearch/json?query="+text+"&key=AIzaSyBRU6VLlwoONuMKS6X8f2MevBhkxeqr2ds",{
        headers:{
          "Accept":"application/json",
          "Content-Type":"application/json"
        }
      });
      let responseJson = await response.json();
      var arrayResults = responseJson.results;
      arrayResults.forEach(function(result){
        console.log(result.name);
      });

    } catch(error){
      console.log(error);
    }
}

_getCurrentPosition = () =>{
  navigator.geolocation.getCurrentPosition(
    position => {
      var latlng = {latitude: position.coords.latitude, longitude: position.coords.longitude };
      this.setState({ currentLocation : latlng }, () => this._getPropositionsLieux());
    },
    error => console.log(error.message),
    { enableHighAccuracy: false, timeout: 50000 }
  );
}

//Suggérer des lieux à proximité
_getPropositionsLieux = async()=>{
  var lat = this.state.currentLocation.latitude;
  var lng = this.state.currentLocation.longitude;
  try{
      let response = await fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+lat+","+lng+"&radius=1500&type=bar&key=AIzaSyBRU6VLlwoONuMKS6X8f2MevBhkxeqr2ds",{
        headers:{
          "Accept":"application/json",
          "Content-Type":"application/json"
        }
      });

      let responseJson = await response.json();
      var arrayResults = responseJson.results;

      this.setState({lieux: this.state.lieux.concat(arrayResults)}, ()=>console.log(this.state.lieux));
  }catch(error){
    console.log(error);
  }
}

//Autocomplétion pour la recherche de lieux
_autoComplete = async(text) => {
  try {
    let response = await fetch(
      'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+text+'&key=AIzaSyBRU6VLlwoONuMKS6X8f2MevBhkxeqr2ds', {
        headers:{
          'Accept': 'application/json', // application/json ne marche pas
          'Content-Type': 'application/json'
        }
      }
    );
    let responseJson = await response.json();
    var arrayPredictions = responseJson.predictions;
    arrayPredictions.forEach(function(prediction){
      console.log("AUTOCOMPLETION: "+ prediction.description);
    });
  } catch (error) {
    console.log(error);
  }
}

componentDidMount(){
  this._getCurrentPosition();
}

  render() {
    //const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.titrePage}>Où?</Text>
        <TouchableOpacity onPress={() => alert("La barre de recherche n'est pas disponible.")}>
        <View style={styles.inline}>
          <TextInput style={styles.champ} placeholder='Entre une adresse' onChangeText={(text)=> this._searchTextInputChanged(text)} editable={false}/>
          <TouchableOpacity
          style={styles.boutonRecherche}
          //onPress={() => this._getPlaces(this.searchedText)}
          >
            <Image style={{height: 15, width:15}}source={require('../Assets/search.png')}/>
          </TouchableOpacity>
        </View>
        </TouchableOpacity>
        <View style={styles.centrer}>
          <Text style={[styles.margeHautBas,styles.textBold]}>ou quelques propositions...</Text>
        </View>
        <View style={styles.liste}>
          <FlatList
          data={this.state.lieux}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item})=> <LocationMapItem location={item} currentPos={this.state.currentLocation}/>}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.centrer}>
          <Text style={[styles.margeHautBas,styles.textBold]}>ou...</Text>
          <TouchableOpacity
          onPress={()=>this.props.navigation.navigate("Carte")}
          style={styles.bouton}>
            <Text style={styles.texteBouton}>Voir la carte</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.flexEnd}>
          <TouchableOpacity
          onPress={()=>this.props.navigation.navigate("Checklist")}
          style={styles.boutonSuivant}>
            <Image source={require('../Assets/right-arrow-white.png')}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 30,
    marginLeft: 30
  },
  champ:{
    height: 40,
    borderBottomWidth: 2,
    borderColor: "black",
    flex:1
  },
  liste:{
    height: 200
  },
  bouton:{
    backgroundColor: "black",
    borderRadius: 50,
    padding: 7,
    width: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  texteBouton:{
    color: "white"
  },
  inline:{
    flexDirection: "row",
    //borderColor: "red",
    //borderWidth: 1,
    alignItems: "flex-end"
  },
  boutonSuivant:{
    backgroundColor: "black",
    borderRadius: 50,
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center"
  },
  boutonRecherche:{
    backgroundColor: "black",
    borderRadius: 50,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5

  },
  flexEnd:{
    //borderColor: "red",
    //borderWidth: 2,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flex: 1
  },
  centrer:{
    alignItems: "center"
  },
  margeHautBas:{
    marginTop: 17,
    marginBottom: 17
  },
  titrePage:{
    fontSize: 30,
    textAlign: "center",
    marginBottom: 40,
    marginTop: 40
  },


});

export default Location;

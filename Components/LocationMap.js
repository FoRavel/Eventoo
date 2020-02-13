import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import markers from '../Helpers/Markers';
import LocationMapItem from './LocationMapItem';


  import React, {Component} from 'react';
  import {Platform, StyleSheet, TextInput, View, Button, Image, Text, FlatList} from 'react-native';

  class LocationMap extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        markers: new Array(),
        searchedText: "",
        currentLocation: {latitude:48.853234, longitude:  2.349807}, //par défaut
        data:[1,2,3,4,5]
      }
    }

    //Trouver des lieux à proximité de la position actuelle
    _getPlaces = async() => {
      console.log();
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

          this.setState({markers: this.state.markers.concat(arrayResults)}, ()=>console.log(this.state.markers));

        } catch(error){
          console.log(error);
        }
    }

    _findCoordinates = () => {
      console.log(navigator.geolocation);
    navigator.geolocation.getCurrentPosition(
      position => {
        var latlng = {latitude: position.coords.latitude, longitude: position.coords.longitude };
        this.setState({ currentLocation : latlng }, () => this._getPlaces());
      },
      error => console.log(error.message),
      { enableHighAccuracy: false, timeout: 50000 }
    );
  }

    _searchTextInputChanged(text){
      this.setState({searchedText: text})
      //this._autoComplete(text);
    }

    componentDidMount(){
      this._findCoordinates();
      /*
      var marker = {
        id: 1,
        name: "result.name",
        address: "result.formatted_address",
        coord: {
          latitude: 30.78825,
          longitude: -121.4324
         }
      }
      this.setState({markers: this.state.markers.concat(marker)}, ()=>{console.log(this.state.markers)});
      ;*/
    }

    render() {
      var lat = this.state.currentLocation.latitude;
      var lng = this.state.currentLocation.longitude;

      return (
        <View style={styles.container}>
          <MapView
             style={styles.map}
             region={{
               latitude: lat,
               longitude: lng,
               latitudeDelta: 0.015,
               longitudeDelta: 0.0121,
             }}
           >
           {this.state.markers.map(marker=>(
             <Marker
             key={marker.id}
             coordinate={{latitude:marker.geometry.location.lat, longitude:marker.geometry.location.lng}}
             title={marker.name}
             description={marker.vicinity}
             />
           ))}
           </MapView>
           <FlatList
            style={styles.liste}
            data={this.state.markers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item})=> <LocationMapItem location={item} currentPos={this.state.currentLocation}/>}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            />
         </View>
      );
    }
  }

  const styles = StyleSheet.create({
   container: {
     ...StyleSheet.absoluteFillObject,
     flex: 1,
     width: 400,
     alignItems: 'center',
   },
   map: {
     ...StyleSheet.absoluteFillObject,
   },
   liste:{
    position: 'absolute',
    top: 230,
    right: 0,
    bottom: 0,
    left: 0,
    height: 200
  }

});


  export default LocationMap;

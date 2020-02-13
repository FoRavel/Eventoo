import * as React from 'react';
import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';

class LocationMapItem extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      distance: "0.0km",
      adresse: null,
      nom_lieu: null
    }
  }


  _setAdresse(adr, nomLieu){
    this.setState({adresse:adr, nom_lieu: nomLieu}, ()=>console.log("_setAdresse " + this.state.nom_lieu));
    let lieu = {
      adresse: adr,
      nom_lieu: nomLieu
    }

    this._dispatchAction(lieu);
    console.log("setAdresse(): "+ lieu);
  }

  _dispatchAction(lieu){
    action = {type: "SET_ADRESSE", value: lieu}
    this.props.dispatch(action);
  }

  //Distance depuis la position actuelle
  _getDistance = async() =>{
    const loc = this.props.location;
    var lat = loc.geometry.location.lat;
    var lng =  loc.geometry.location.lng;
    var id = loc.place_id;
    var currentLat = this.props.currentPos.latitude;
    var currentLng = this.props.currentPos.longitude;

    console.log("ID "+ id);
    console.log("ID2 "+loc.id);

    try{
      let response = await fetch("https://maps.googleapis.com/maps/api/distancematrix/json?origins="+currentLat+","+currentLng+"&destinations=place_id:"+id+"&key=AIzaSyBRU6VLlwoONuMKS6X8f2MevBhkxeqr2ds");
      let responseJson = await response.json();
      console.log(responseJson.rows[0].elements[0].distance.text);
      this.setState({distance: responseJson.rows[0].elements[0].distance.text});
    } catch(error){
      console.log(error);
    }
  }

  _createView(){
    const loc = this.props.location;
    if(this.props.location.photos == undefined){

      return(
        <TouchableOpacity
        style={styles.bloc}
        onPress={()=>{this._setAdresse(loc.vicinity, loc.name); console.log("LOC.NAME: "+ loc.name)}}
        >
          <Image style={styles.image} source={require("../Assets/white.png")}
          />
          <View style={styles.sousBloc}>
            <View style={styles.inlineBloc}>
              <Text style={[styles.texteWhite,{flex: 1}]}>{loc.name}</Text>
              <Text style={styles.texteWhite}>{this.state.distance}</Text>
            </View>
            <Text style={[styles.adresse, styles.texteWhite]}>{loc.vicinity}</Text>
          </View>
        </TouchableOpacity>
      )
    }
    else{
      const photoRef = this.props.location.photos[0].photo_reference;
      return(
        <TouchableOpacity
        style={styles.bloc}
        onPress={()=>this._setAdresse(loc.vicinity, loc.name)}
        >
          <Image style={styles.image} source={{uri: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&"+
          "maxheight=200&photoreference="+photoRef+
          "&key=AIzaSyBRU6VLlwoONuMKS6X8f2MevBhkxeqr2ds"}}
          />
          <View style={styles.sousBloc}>
            <View style={styles.inlineBloc}>
              <Text style={[styles.texteWhite,{flex: 1}]}>{loc.name}</Text>
              <Text style={styles.texteWhite}>{this.state.distance}</Text>
            </View>
            <Text style={[styles.adresse, styles.texteWhite]}>{loc.vicinity}</Text>
          </View>
        </TouchableOpacity>
      )
    }
  }

  componentDidMount(){
    this._getDistance();
  }
  render() {
    return (
      <View>
      {this._createView()}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  bloc:{
    height: 200,
    marginLeft: 30,
    marginRight: 30
  },
  image:{
    borderRadius: 15,
    height: 200,
    width:300
  },
  sousBloc:{
    position: 'absolute',
    top: 150,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "black",
    height: 50,
    width:300,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    padding: 10
  },
  inlineBloc:{
    flexDirection: "row"
  },
  adresse: {
    fontSize: 10
  },
  texteWhite:{
    color:"white"
  }

});

const mapStateToProps = (state) =>{
  return state;
}
export default connect(mapStateToProps)(LocationMapItem);

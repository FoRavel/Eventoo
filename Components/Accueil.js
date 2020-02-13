import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, FlatList, Image} from 'react-native';
import EventItem from './EventItem';
import events from '../Helpers/donneesEvent';
import {connect} from 'react-redux';
import {getMyEvents} from '../Networking/Profile';

class Accueil extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      events: [],
    }
    this.idUtilisateur = this.props.utilisateur.id;
    this.prenom = this.props.utilisateur.prenom;
  }

  _displayDetailForEvent = (idEvent) => {
    this.props.navigation.navigate("Resume", {idEvent: idEvent});
  }

  _getMyIncomingEvents = async(idUser)=>{
    array = []
    arrayMoisFR = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"]
    listEvents = await getMyEvents(idUser);
    listEvents.forEach(function(event){
      date = new Date(event.date_heure_debut);
      jour = date.getDate();
      mois = arrayMoisFR[date.getMonth()];
      annee = date.getFullYear();
      heure = date.getHours();
      evt = {
        id: event.idEvent,
        titre: event.titre,
        adresse: event.adresse,
        jour: jour,
        mois: mois,
        heure: heure,
        organisateur: event.prenom
      }
      console.log("HEURE: " +evt.heure);
      array.push(evt);
/*
      idEvent, titre, adresse, nom_lieu, details, date_heure_debut, prenom

     id:2,
     titre: "Anniv Yasmine",
     adresse:"234 rue Louise Michel, 92300 Levallois-Perret",
     jour: "20",
     mois: "mars",
     heure: "20h-4h",
     organisateur: "Yasmine"
*/
    })
    this.setState({events: array}, ()=>console.log(this.state.events));
  }

  _afficherListeEvents(){
    if(this.state.events.length == 0){
      return(
          <Text>Aucun événement à venir.</Text>
      )
    }else{
      return(
        <FlatList
          data={this.state.events}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <EventItem event={item} displayDetailForEvent={this._displayDetailForEvent}/>}
        />
      )
    }
  }

  componentDidMount(){
    console.log("ACCUEIsL ID USER: "+this.idUtilisateur);
    this._getMyIncomingEvents(this.idUtilisateur);

  }
  componentDidUpdate(){
    this.prenom = this.props.utilisateur.prenom;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.centrer}>
          <Image style={{width: 150, height: 150}} source={require('../Assets/icon_provisoire_480px.png')}/>
          <View style={[styles.enLigne, styles.marginBottom]}>
            <Text style={styles.fontSize}>Bonjour, </Text>
            <Text style={[styles.textBold,styles.fontSize]}>{this.prenom}</Text>
          </View>
        </View>
        <View style={styles.enLigne}>
          <Image source={require('../Assets/icon_provisoire.png')} />
          <Text style={styles.textBold}>Mes événements à venir</Text>
        </View>
        {this._afficherListeEvents()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 25,
    marginRight: 25
  },
  centrer:{
    alignItems:"center",
  },
  enLigne:{
    flexDirection: "row",
  },
  textBold:{
    fontWeight: "bold"
  },
  marginBottom:{
    marginBottom: 50
  },
  fontSize:{
    fontSize: 15
  }
});

const mapStateToProps = (state) =>{
  return {
    utilisateur: state.profileReducer.utilisateur
  }
}
export default connect(mapStateToProps)(Accueil);

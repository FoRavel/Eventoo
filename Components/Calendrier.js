import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, FlatList, Image} from 'react-native';
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.']
};

LocaleConfig.defaultLocale = 'fr';

class Calendrier extends React.Component {
constructor(props){
  super(props)
  this.state={
    dates: {"2019-05-22":{selected: true, selectedColor: 'grey'},"2019-05-23":{selected: true, selectedColor: 'grey'}}
  }
}

_getMyIncomingEvents = async(idUser)=>{
  array = []

  listEvents = await getMyEvents(idUser);
  datesEvent = {

  }
  listEvents.forEach(function(event){
    date = new Date(event.date_heure_debut);
    jour = date.getDate();
    mois = date.getMonth();
    annee = date.getFullYear();
    heure = date.getHours();
    a = annee+"-"+mois+"-"+jour

    console.log(datesEvent);

  })
  this.setState({events: array}, ()=>console.log(this.state.events));
}

  componentDidMount(){
    alert("Il n'y a rien à faire dans cet onglet pour le moment.")
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <CalendarList
      firstDay={1}
      onDayPress={(day) => console.log(day)}
      onDayLongPress={(day) => navigate("CalendrierSelect")}
      onMonthChange={(month) => {console.log('month changed', month)}}
      markedDates={this.state.dates}
      />
    );
  }
}


export default Calendrier;

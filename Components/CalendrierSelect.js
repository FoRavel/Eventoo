import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, FlatList, Image} from 'react-native';
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';
import CalendrierItem from './CalendrierItem';
import EventItem from './EventItem';
import events from '../Helpers/donneesEvent';

class CalendrierSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = { numJoursDuMois: new Array(new Array(), new Array()) }
}

_afficher(){
  var date = new Date();
  console.log(date);
  var nbDayOfWeek = date.getDay();
  var nbDayOfMonth = date.getDate();

  var arrLettreJour = new Array("L", "M", "M", "J", "V", "S", "D");
  var arr = new Array(new Array(), new Array());

  arr[1][nbDayOfWeek-1] = nbDayOfMonth;
  for(var i=0;i<7;i++){
      arr[0][i] = arrLettreJour[i];
  		if(arr[1][i] == null){
      	if(nbDayOfWeek-i<0){
        	arr[1][i] = nbDayOfMonth + (i-(nbDayOfWeek-1));
        }
        else{
        	arr[1][i] = nbDayOfMonth - ((nbDayOfWeek-1)-i);
        }
      	console.log(arr[1][i]);
      }
      else{
    	    console.log(arr[1][i]);
      }
  }
  console.log(arr);
  this.setState({numJoursDuMois: arr});
}

_displayDetailForEvent = () => {
  this.props.navigation.navigate("Resume");
}

componentDidMount(){
  this._afficher();
}

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.numJoursDuMois}
          renderItem={({item}) => <CalendrierItem array={item}/>}
        />
        <Text style={styles.textDate}>mardi 12 mars</Text>
        <View style={styles.ligneHorizontale}></View>
        <FlatList
          data={events}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <EventItem displayDetailForEvent={this._displayDetailForEvent} event={item}/>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    marginLeft:30,
    marginRight:30
  },
  textDate:{
    textAlign: "center"
  },
  ligneHorizontale:{
    borderBottomWidth: 2,
    borderColor: "purple",
    width: 300
  }
});


export default CalendrierSelect;

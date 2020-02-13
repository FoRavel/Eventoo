import React, {Component} from 'react';
import {TouchableOpacity, Text, View, StyleSheet, Image} from 'react-native';


class EventItem extends React.Component {

  render() {
    const {event, displayDetailForEvent} = this.props;
    return (
      <View>
        <TouchableOpacity
        onPress={()=> displayDetailForEvent(event.id)}
        style={styles.container}>
          <View style={styles.date}>
            <Text style={styles.fontSize}>{event.jour}</Text><Text>{event.mois}</Text>
          </View>
          <View style={styles.sousBlocDroit}>
            <View style={styles.enLigne}>
              <Text style={[styles.textWhite,styles.titreFlex]}>{event.titre}</Text>
              <Image source={require('../Assets/icon_provisoire.png')}/>
              <Text style={styles.textWhite}>à {event.heure}h</Text>
            </View>
            <View style={styles.enLigne}>
              <Text style={styles.textWhite}>par</Text>
              <Image source={require('../Assets/icon_provisoire.png')}/>
              <Text style={styles.textWhite}>{event.organisateur}</Text>
            </View>
            <View style={styles.enLigne}>
              <Image source={require('../Assets/icon_provisoire.png')}/>
              <Text style={[styles.textWhite, styles.fontSizeAdresse]}>{event.adresse}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
      flexDirection: "row",
      marginTop: 10,
      //borderWidth:1,
      //borderColor: "red",
      padding: 8,
      backgroundColor: "black",
      borderRadius: 10
    },
    date:{
      backgroundColor: "white",
      //borderColor: "black",
      //borderWidth: 1,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      width: 80,
      height: 80,
    },
    sousBlocDroit:{
      flex: 1,
      //borderColor: "green",
      //borderWidth:1,
      marginLeft: 6
    },
    enLigne:{
      flexDirection: "row",
    },
    titreFlex:{
      flex: 1,
      borderWidth:1,
      //borderColor: "green",
    },
    textWhite:{
      color:"white"
    },
    borderTextHeure:{borderWidth:1, borderColor: "green"},
    fontSize:{
      fontSize: 25
    },
    fontSizeAdresse:{
      fontSize: 12
    }
});

export default EventItem;

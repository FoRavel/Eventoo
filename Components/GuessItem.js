import React, {Component} from 'react';
import {StyleSheet, Image, TouchableOpacity, Text, View} from 'react-native';

class GuessItem extends React.Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }

  _showParticipation(){
    const guess = this.props.guess;
    if(guess.participate){
      return(
        <Text style={styles.participation}>participe</Text>
      )
    }
    else if (!guess.participate) {
      return(
        <Text style={styles.participation}>participe pas</Text>
      )
    }
    else{
      return(
        <Text style={styles.participation}>ne sait pas</Text>
      )
    }
  }
  render(){
    const guess = this.props.guess
    return(
      <View style={{flexDirection:"row"}}>
      <View style={styles.container}>
        <Image style={{height: 50, width:50, borderRadius: 50, borderColor: "red", borderWidth: 1}} source={require('../Assets/icon_provisoire_480px.png')}/>
        <Text>{guess.firstName}</Text>
        <Text>{guess.lastName}</Text>
        {this._showParticipation()}
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    alignItems: "center"
  },
  participation:{
    backgroundColor: "black",
    color: "white",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 50,
    paddingTop: 3,
    paddingBottom: 3
  }
})

export default GuessItem;

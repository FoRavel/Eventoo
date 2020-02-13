import React, {Component} from 'react';
import {StyleSheet, Image, View} from 'react-native';

class CircleThumbnail extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    
    return(
      <Image style={styles.style} source={require("../Assets/icon_provisoire_480px.png")}/>
    )
  }
}


const styles = StyleSheet.create({
  style:{height: 50, width:50, borderRadius: 50, borderColor: "red", borderWidth: 1}
})

export default CircleThumbnail;

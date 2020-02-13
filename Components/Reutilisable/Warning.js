import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';

class Warning extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <Image source={require('.../Assets/warning.png')}/>
    )
  }
}

export default Warning;

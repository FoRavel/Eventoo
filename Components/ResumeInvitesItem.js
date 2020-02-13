import React, {Component} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

class ResumeInvitesItem extends React.Component{

  componentDidMount(){
    
  }

  render(){
    const {invite} = this.props;
    return(
        <View style={[styles.inline,styles.centerSecondaryAxis, styles.margin]}>
          <Image style={{height: 50, width:50, borderRadius: 50, borderColor: "red", borderWidth: 1}} source={require('../Assets/icon_provisoire_480px.png')}/>
          <Text style={{marginLeft: 25}}>{invite.firstName} {invite.lastName}</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  inline:{
    flexDirection:"row"
  },
  centerSecondaryAxis:{
    alignItems:"center"
  },
  margin:{
    marginBottom:10
  },
})

export default ResumeInvitesItem;

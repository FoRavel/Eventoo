import React, {Component} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

class ResumeCagnotteItem extends React.Component{
  render(){
    const {contributor} = this.props;
    return(
      <View style={[styles.inline,styles.centerSecondaryAxis, styles.margin]}>
        <Image style={{height: 50, width:50, borderRadius: 50, borderColor: "red", borderWidth: 1}} source={require('../Assets/icon_provisoire_480px.png')}/>
        <Text style={{marginLeft: 25}}>{contributor.prenom} {contributor.nom}</Text>
        <Text style={styles.textAlignRight}>{contributor.montant}€</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  thumbnail:{height: 50, width:50, borderRadius: 50, borderColor: "red", borderWidth: 1},
  inline:{
    flexDirection:"row"
  },
  centerSecondaryAxis:{
    alignItems:"center"
  },
  margin:{
    marginBottom:10
  },
  textAlignRight:{
    textAlign: "right",
    flex: 1,
  }
})

export default ResumeCagnotteItem;

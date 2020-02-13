import React, {Component} from 'react';
import {StyleSheet, View, FlatList, Text, Image} from 'react-native';

class ChecklistItem extends React.Component{
  constructor(props){
    super(props)
  }

  //Calcul du pourcentage que représente le nombre de participants qui ont apporté ce produit
  //par rapport au nombre total de donateurs
  _calcPartDon(){
    const prod = this.props.product;
    const totalDons = this.props.totalDonators;
    x = prod.donators.length;
    resultat = Math.floor((x/totalDons)*100)
    return resultat;
  }
  //La largeur de la jauge est de 200. La longueur réelle est calculé en fonction du pourcentage calculé ci dessus.
  _setWidth(){
    var p = this._calcPartDon();
    const prod = this.props.product;
    //nombre total de personne qui apportent des choses
    const totalDons = this.props.totalDonators;
    var value;
    //rank correspond à l'index du produit dans l'array de la checklist
    const rank = prod.id;
    switch(rank){
      case 0:
        value = (p/100)*200;
        break;
      case 1:
        value = (p/100)*170;
        break;
      case 2:
        value = (p/100)*140;
        break;
      case 3:
        value = (p/100)*110;
        break;
    }
    return {width: value}
  }

  render(){
    const prod = this.props.product;
    return(
      <View style={[styles.inline, styles.centerSecondaryAxis]}>
        <View style={[styles.gauge, this._setWidth()]}>
          <Text style={styles.textWhite}>{prod.productLabel}</Text>
        </View>
        <FlatList
        //style={{borderColor:"red", borderWidth:1}}
        contentContainerStyle={{flex: 1, justifyContent: 'flex-end'}}
        data={prod.donators}
        keyExtractor={(item)=>item.toString()}
        renderItem={({item})=><Image style={{width: 25, height: 25, borderColor: "red", borderWidth:1, borderRadius: 50}} source={require("../Assets/icon_provisoire.png")}/>}
        horizontal="true"
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  gauge:{
    backgroundColor: "black",
    height: 25,
    borderRadius: 50
  },
  inline:{
    flexDirection: "row"
  },
  centerSecondaryAxis:{
    alignItems: "center"
  },
  textWhite:{
    color: "orange",
    marginLeft: 10,
    width: 100
  }

})

export default ChecklistItem;

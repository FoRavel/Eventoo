import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, FlatList} from 'react-native';

class ResumeChecklistItem extends React.Component{
  constructor(props){
    super(props)
    this.state={
      quatrePremiersApporteurs: []
    }
  }

  //Calcul du pourcentage que représente le nombre de participants qui ont apporté ce produit
  //par rapport au nombre total de donateurs
  _calculerPourcentageDon(){
    const produit = this.props.produit;
    const totalDons = this.props.totalApporteurs;
    x = produit.apporteur.length;
    resultat = Math.floor((x/totalDons)*100)
    return resultat;
  }
  //La largeur de la jauge est de 200. La longueur réelle est calculé en fonction du pourcentage calculé ci dessus.
  _setWidth(){
    var p = this._calculerPourcentageDon();
    const produit = this.props.produit;
    //nombre total de personne qui apportent des choses
    const totalDons = this.props.totalApporteurs;
    var value;
    //rank correspond à l'index du produit dans l'array de la checklist
    const rank = produit.id;

    value = (p/100)*200;

    return {width: value}
  }

  _getQuatrePremierApporteur(){
    const produit = this.props.produit;
    const arrayApporteurs = produit.apporteur;
    var quatrePremierApporteur = []
    if(arrayApporteurs.length>4)
    {
      for(var i=0;i<3;i++){
        if(arrayApporteurs[i] != undefined){
          quatrePremierApporteur.push(arrayApporteurs[i]);
        }
      }
    }
    else{
      for(var i=0;i<4;i++){
        if(arrayApporteurs[i] != undefined){
          quatrePremierApporteur.push(arrayApporteurs[i]);
        }
      }
    }
    this.setState({quatrePremiersApporteurs:quatrePremierApporteur}, ()=>console.log(this.state.quatrePremiersApporteurs));
  }

  _afficherPlus(){
    const produit = this.props.produit;
    if(produit.apporteur.length > 4){
      return(
        <View style={[styles.rondPlus, styles.centerSecondaryAxis, styles.centerPrimaryAxis]}>
          <Text style={styles.textPlus}>+{produit.apporteur.length - this.state.quatrePremiersApporteurs.length}</Text>
        </View>
      )
    }
  }

  componentDidMount(){
    this._getQuatrePremierApporteur();
    console.log(this.props);
  }

  render(){
    const produit = this.props.produit;
    return(
      <View style={[styles.inline, styles.centerSecondaryAxis, styles.marginBottom]}>
        <View style={[styles.jauge, this._setWidth()]}>
          <Text style={styles.textOrange}>{produit.label}</Text>
        </View>
        <FlatList
        //style={{borderColor:"red", borderWidth:1}}
        contentContainerStyle={{flex: 1, justifyContent: 'flex-end'}}
        data={this.state.quatrePremiersApporteurs}
        keyExtractor={(item)=>item.toString()}
        renderItem={({item})=><Image style={{width: 25, height: 25, borderColor: "red", borderWidth:1, borderRadius: 50, marginRight: 4}} source={require("../Assets/icon_provisoire.png")}/>}
        horizontal="true"
        />
        {this._afficherPlus()}
        <View style={[styles.puceViolet,styles.centerSecondaryAxis,styles.centerPrimaryAxis]}>
          <Text style={styles.textWhite}>+</Text>
        </View>
        <View style={[styles.puceOrange,styles.centerSecondaryAxis,styles.centerPrimaryAxis]}>
          <Text style={styles.textWhite}>-</Text>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  jauge:{
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
  marginBottom:{
    marginBottom: 20
  },
  centerPrimaryAxis:{
    justifyContent: "center"
  },
  textOrange:{
    color: "orange",
    marginLeft: 10,
    width: 100
  },
  textWhite:{
    color: "white"
  },
  puceViolet:{
    height: 12,
    width: 12,
    borderRadius: 50,
    backgroundColor: "blueviolet",
    marginRight: 9
  },
  puceOrange:{
    height: 12,
    width: 12,
    borderRadius: 50,
    backgroundColor: "darkorange",
  },
  rondPlus:{
    height: 25,
    width: 25,
    borderRadius: 50,
    backgroundColor: "red",
    marginRight: 9,
    fontSize: 12
  },
  textPlus:{
    fontSize: 10.5,
    textAlign: "center",
    color: "white",
  }

})

export default ResumeChecklistItem;

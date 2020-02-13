import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Picker, FlatList} from 'react-native';
import { CheckBox } from 'react-native-elements';

import {connect} from 'react-redux';


class Checklist extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props){
    super(props)
    this.state = {
      checked:true,
      label: "",
      quantite: "",
      listeProduits:[]
    }

  }

  _ajouterListeProduit(){
    listeProduits_copie = this.state.listeProduits;
    if(this.state.label != "" || this.state.quantite != ""){
      let produit = {
        label: this.state.label,
        quantite: this.state.quantite
      }
      listeProduits_copie.push(produit);
      this.setState({listeProduits: listeProduits_copie, label:"", quantite:""}, ()=>console.log(this.state.listeProduits));
    }
  }

  _capturerSaisiLabel(text){
    this.setState({label:text})
    console.log("LABEL SAISI: "+ this.state.label);
  }

  _capturerSaisiQuantite(text){
    this.setState({quantite:text})
    console.log("QUANTITE SAISIE: "+ this.state.quantite);
  }

  _displayTick(){
    if(this.state.checked){
      return(
        <Image style={{width:15, height:15}} source={require("../Assets/cancel.png")}/>
      )
    }
  }

  _updateCheckStatus(){
    if(this.state.checked){
      this.setState({checked: false});
    }
    else{
      this.setState({checked: true});
    }
  }

  _dispatchAction(listeProduits){
    console.log("LISTE PRODUITS AVANT TRIE: " + this.state.listeProduits)
    array = [];
    this.state.listeProduits.forEach((produit)=>{
      array.push(produit);
    })
    console.log("LISTE PRODUIT AVANT DISPATCH REDUCER: "+ array)
    const action = {type: "ADD_PRODUITS", value: array}
    this.props.dispatch(action);
  }


  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.titrePage}>Checklist</Text>
        <View style={styles.inline}>
          <TouchableOpacity
          onPress={()=>this._updateCheckStatus()}
          style={styles.checkboxContainer}>
          {this._displayTick()}
          </TouchableOpacity>
          <Text style={styles.checkboxTitle}>Les invités peuvent ajouter des éléments à la liste</Text>
        </View>
        <View style={styles.inline}>
          <Text>Produit</Text>
          <Text style={styles.quantity}>Quantité</Text>
        </View>
        <View style={styles.inline}>
          <TextInput style={[styles.inputLabel,styles.input]} value={this.state.label} onChangeText={(text)=>this._capturerSaisiLabel(text)}/>
          <TextInput style={[styles.inputQt,styles.input]} value={this.state.quantite} onChangeText={(text)=>this._capturerSaisiQuantite(text)} onSubmitEditing={()=>this._ajouterListeProduit()}/>
        </View>
        <FlatList
        data={this.state.listeProduits}
        renderItem={({item})=>
        <View style={styles.inline}>
          <Text style={{flex: 1}}>{item.label}</Text>
          <Text>{item.quantite}</Text>
        </View>
        }
        />
        <View style={styles.flexEnd}>
          <TouchableOpacity
          onPress={()=>{this._dispatchAction(this.state.produits); this.props.navigation.navigate("Cagnotte")}}
          style={styles.nextButton}>
            <Image source={require("../Assets/right-arrow-white.png")}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginRight: 25,
    marginLeft: 25,
    //borderColor: "red",
    //borderWidth: 1
  },
  checkboxContainer:{
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    height: 15,
    width: 15,
    marginRight: 9,
    marginBottom: 25
  },
  checkboxTitle:{
    fontSize: 13
  },
  input:{
    borderBottomWidth:1,
    marginBottom: 30
  },
  inputLabel:{
    width: 195,
    marginRight: 25
  },
  inputQt:{
    flex:1
  },
  inline:{
    flexDirection:"row"
  },
  quantity:{
    flex: 1,
    textAlign:"right"
  },
  flexEnd:{
    flex:1,
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  nextButton:{
    backgroundColor: "black",
    width: 45,
    height: 45,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  titrePage:{
    fontSize: 30,
    textAlign: "center",
    marginBottom: 40,
    marginTop: 40
  }


})

const mapStateToProps = (state)=>{
  return state;
}

export default connect(mapStateToProps)(Checklist);

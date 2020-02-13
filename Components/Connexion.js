import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Text, TouchableOpacity}from 'react-native';

import {connect} from 'react-redux';

import {getUser} from '../Networking/Profile';

class Connexion extends React.Component{
  constructor(props){
    super(props)
    this.state = {

    }
    this.courrielSaisi = "";
    this.mdpSaisi = "";
  }

  _capturerSaisiCourriel(text){
    this.courrielSaisi = text;
  }

  _capturerSaisiMdp(text){
    this.mdpSaisi = text;
  }

  _connecterUtilisateur = async (email, mdp) => {
    user = await getUser(email, mdp);
    if(user == "Utilisateur inexistant"||email == ""){
      console.log("_connecterUtilisateur: " + user)
      alert("Utilisateur inexistant");
    }else{
      var utilisateur = {
          id: user.id,
          nom: "",
          prenom: user.prenom,
          courriel: email,
          numero: "",
          photoProfil: "",
          profilReseauSocial: true
      }
      console.log("_connecterUtilisateur: " + user.id)
      this._setUtilisateur(utilisateur);
      this.props.navigation.navigate("Accueil", {socialAuthentification: true});
    }
  }

  _setUtilisateur(utilisateur){
    var action = {type: "SET_CURRENT_USER", value: utilisateur}
    this.props.dispatch(action);
  }

  render(){
    return(
      <View style={styles.container}>
      
        <TextInput style={styles.input} placeholder="courriel@mail.com" onChangeText={(text)=>this._capturerSaisiCourriel(text)}/>
        <TextInput style={styles.input} placeholder="************" onChangeText={(text)=>this._capturerSaisiMdp(text)}/>
        <TouchableOpacity style={styles.bouton} onPress={()=>this._connecterUtilisateur(this.courrielSaisi,this.mdpSaisi)}>
          <Text style={styles.texteBouton}>Valider</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginLeft: 25,
    marginRight: 25,
    alignItems: "center",
    justifyContent: "center"
  },
  input:{
    borderBottomWidth: 1,
    borderColor: "black",
    width: 250
  },
  bouton:{
    borderRadius: 30,
    backgroundColor: "black",
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 30,
    paddingLeft: 30,
    marginTop: 30,
    alignItems: "center"
  },
  texteBouton:{
    color: "white"
  }
})

const mapStateToProps = (state) =>{
  return state;
}
export default connect(mapStateToProps)(Connexion);

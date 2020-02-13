import React, {Component} from 'react';
import {Platform, StyleSheet, TextInput, View, Button, TouchableOpacity, Text} from 'react-native';
import { connect } from 'react-redux';
import {insertUser, getUser} from '../Networking/Profile';

class InscriptionForm extends React.Component {
  constructor(props){
    super(props)

    this.state={

    }
    this.nomSaisi = "";
    this.prenomSaisi = "";
    this.courrielSaisi = "";
    this.numeroSaisi = "";
    this.mdpSaisi = "";
  }

  _inscrireUtilisateur = async () => {
      utilisateur = {
        id: null,
        nom: this.nomSaisi,
        prenom: this.prenomSaisi,
        courriel:this.courrielSaisi,
        numero: this.numeroSaisi,
        mdp:this.mdpSaisi,
        photoProfil: null,
        profilReseauSocial: false
      }
      await insertUser(utilisateur);
      this._connecterUtilisateur(utilisateur);

  }

  _connecterUtilisateur = async(utilisateur) => {
    response = await getUser(utilisateur.courriel, null);
    utilisateur = {
      id: response.id,
      nom: utilisateur.nom,
      prenom: response.prenom,
      numero: utilisateur.numero,
      courriel: utilisateur.courriel,
      mdp: utilisateur.mdp,
      photoProfil: null,
      profilReseauSocial: false
    }
    this._setUtilisateur(utilisateur);
    console.log("_connecterUtilisateur " + response.id);
    this.props.navigation.navigate("Accueil");
  }

  //Enregistrer dans le state global les informations de l'utilisateur
  _setUtilisateur(utilisateur){
    var action = {type: "SET_CURRENT_USER", value: utilisateur}
    this.props.dispatch(action);
  }

  //ON PEUT DEPLACER LA CONDITION DANS LA FONCTION RENDER()
  _afficherInputMdp(){
    if(!this.props.navigation.state.params.socialAuthentification){
      return(
        <TextInput
          style={styles.champ}
          placeholder="Mot de passe"
          onChangeText={(text)=>this._capturerSaisiMdp(text)}
          //onChangeText={(text) => this.setState({text})}
          //value={this.state.text}
        />
      )
    }
  }

  _capturerSaisiCourriel(text){
    this.courrielSaisi = text;
  }
  _capturerSaisiNom(text){
    this.nomSaisi = text;
  }
  _capturerSaisiPrenom(text){
    this.prenomSaisi = text;
  }
  _capturerSaisiMdp(text){
    this.mdpSaisi = text;
  }
  _capturerSaisiNumero(text){
    this.numeroSaisi = text;
  }

  componentDidMount(){
    console.log(this.props);
    if(this.props.utilisateur != null){
      const {utilisateur} = this.props;
      this.nomSaisi = utilisateur.nom;
      this.prenomSaisi = utilisateur.prenom;
      this.courrielSaisi = utilisateur.courriel;
    }
  }
  componentDidUpdate(){

  }
  render() {
    const {navigate} = this.props.navigation;
    const {utilisateur} = this.props;
    const {socialAuthentification} = this.props.navigation.state.params;

    let inputPrenom;
    let inputNom;
    let inputCourriel;
    let button;
    //Si inscription classique
    if(!socialAuthentification){
      inputCourriel = <TextInput
                      style={styles.champ}
                      placeholder="adresse électronique"
                      onChangeText={(text)=>this._capturerSaisiCourriel(text)}
                      />
      inputNom = <TextInput
                  style={styles.champ}
                  placeholder="Nom"
                  onChangeText={(text)=>this._capturerSaisiNom(text)}
                />
      inputPrenom = <TextInput
                    style={styles.champ}
                    placeholder="Prénom"
                    onChangeText={(text)=>this._capturerSaisiPrenom(text)}
                  />
      button = <TouchableOpacity style={styles.bouton} onPress={() => this._inscrireUtilisateur()}>
                    <Text style={styles.texteBouton}>Valider</Text>

                </TouchableOpacity>

    }else{
      inputPrenom = <TextInput
                    style={styles.champ}
                    placeholder="Prénom"
                    value={utilisateur.prenom}
                  />
      inputNom = <TextInput
                  style={styles.champ}
                  placeholder="Nom"
                  value={utilisateur.nom}
                />


      button = <TouchableOpacity
              style={styles.bouton}
                onPress={() => this._inscrireUtilisateur()}>
                <Text style={styles.texteBouton}>Valider</Text>
                </TouchableOpacity>
    }

    return (
      <View style={styles.container}>
      {inputPrenom}
      {inputNom}
      {inputCourriel}
      <TextInput
        style={styles.champ}
        placeholder="numéro de téléphone"
        onChangeText={(text)=>this._capturerSaisiNumero(text)}
        //onChangeText={(text) => this.setState({text})}
        //value={this.state.text}
      />
      {this._afficherInputMdp()}
      {button}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  champ:{
    //height: 40,
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
});

const mapStateToProps = (state) => {
  return {
    utilisateur: state.profileReducer.utilisateur
  }
}
export default connect(mapStateToProps)(InscriptionForm);

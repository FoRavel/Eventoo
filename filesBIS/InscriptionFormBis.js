import React, {Component} from 'react';
import {Platform, StyleSheet, TextInput, View, Button} from 'react-native';
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

  _inscrireUtilisateur = async (mode_inscription) => {
    if(mode_inscription == "classique"){
      utilisateur = {
        id: null,
        nom: this.nomSaisi,
        prenom: this.prenomSaisi,
        courriel:this.courrielSaisi,
        numero: this.numeroSaisi,
        mdp:this.mdpSaisi,
        profilReseauSocial: false
      }

      await insertUser(utilisateur, "classique");
      this._connecterUtilisateur(utilisateur);
    }else{
      utilisateur = {
        id: null,
        nom: this.nomSaisi,
        prenom: this.prenomSaisi,
        numero: this.numeroSaisi,
        courriel: this.courrielSaisi,
        photoProfil: this.props.utilisateur.photoProfil,
        profilReseauSocial: true
      }

      await insertUser(utilisateur, "reseau_social");
      this._connecterUtilisateur(utilisateur);
    }
  }

  _connecterUtilisateur = async(utilisateur) => {
    id = await getUser(utilisateur.courriel);
    console.log("CONNEXION ID : "+ id)
    utilisateur = {
      id: id,
      nom: utilisateur.nom,
      prenom: utilisateur.prenom,
      numero: utilisateur.numero,
      courriel: utilisateur.courriel,
      mdp: utilisateur.mdp,
      photoProfil: utilisateur.photoProfil,
      profilReseauSocial: true
    }
    this._setUtilisateur(utilisateur);
  }

  //Enregistrer dans le state global les informations de l'utilisateur
  _setUtilisateur(utilisateur){
    var action = {type: "SET_CURRENT_USER", value: utilisateur}
    this.props.dispatch(action);
  }

  //DEPLACER CONDITION DANS LA FONCTION RENDER()
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

    console.log("InscriptionForm.js");
    console.log(this.props.navigation.state.params);
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

    let inputPrenom;
    let inputNom;
    let inputCourriel;
    let button;
    //Si inscription classique
    if(utilisateur == null){
      inputCourriel = <TextInput
                      style={styles.champ}
                      placeholder="adresse électronique"
                      onChangeText={(text)=>this._capturerSaisiCourriel(text)}

                      //onChangeText={(text) => this.setState({text})}
                      //value={this.state.text}
                      />
      inputNom = <TextInput
                  style={styles.champ}
                  placeholder="Nom"
                  onChangeText={(text)=>this._capturerSaisiNom(text)}
                  //onChangeText={(text) => this.setState({text})}
                  //value={this.state.text}
                />
      inputPrenom = <TextInput
                    style={styles.champ}
                    placeholder="Prénom"
                    onChangeText={(text)=>this._capturerSaisiPrenom(text)}
                    //onChangeText={(text) => this.setState({text})}
                    //value={this.state.text}
                  />
      button = <Button
                    onPress={() => this._inscrireUtilisateur("classique")}
                    title="Valider"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                    />

    }else{
      inputPrenom = <TextInput
                    style={styles.champ}
                    placeholder="Prénom"
                    value={utilisateur.prenom}
                    //onChangeText={(text) => this.setState({text})}
                    //value={this.state.text}
                  />
      inputNom = <TextInput
                  style={styles.champ}
                  placeholder="Nom"
                  value={utilisateur.nom}
                  //onChangeText={(text) => this.setState({text})}
                  //value={this.state.text}
                />


      button = <Button
                onPress={() => this._inscrireUtilisateur("reseau_social")}
                title="Valider"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
                />
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
    height: 40,
    borderBottomWidth: 2,
    borderColor: "black",
    width: 200
  }
});

const mapStateToProps = (state) => {
  return state;
}
export default connect(mapStateToProps)(InscriptionForm);

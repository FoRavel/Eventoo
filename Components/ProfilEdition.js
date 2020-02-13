import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Button} from 'react-native';
import {connect} from 'react-redux';
import {updateUser} from '../Networking/Profile';

class ProfilEdition extends React.Component{

  constructor(props){
    super(props)
    const {utilisateur} = this.props;
    this.state={
      prenomSaisi: utilisateur.prenom,
      nomSaisi: utilisateur.nom,
      courrielSaisi: utilisateur.courriel,
      numeroSaisi: utilisateur.numero
    }
    this.mdpSaisi ="";
  }

  _capturerSaisiCourriel(text){
    this.setState({courrielSaisi:text});
  }
  _capturerSaisiNom(text){
    this.setState({nomSaisi:text}, ()=> console.log(text));
  }
  _capturerSaisiPrenom(text){
    this.setState({prenomSaisi:text});
  }
  _capturerSaisiMdp(text){
    this.mdpSaisi = text;
  }
  _capturerSaisiNumero(text){
    this.setState({numeroSaisi:text});
  }

  _mettreAJourProfil = async(util)=>{
    console.log(util);
    updatedUtilisateur = {
      id: util.id,
      prenom: this.state.prenomSaisi,
      nom: this.state.nomSaisi,
      courriel: this.state.courrielSaisi,
      numero: this.state.numeroSaisi,
      profilReseauSocial: true
    }
    console.log("UPDATED: "+ updatedUtilisateur.prenom);
    this._setUtilisateur(updatedUtilisateur)
    reponse = await updateUser(updatedUtilisateur);
    console.log(reponse);
  }
  //Enregistrer l'utilisateur dans le state global
  _setUtilisateur(utilisateur){
    var action = {type: "SET_CURRENT_USER", value: utilisateur}
    this.props.dispatch(action);
  }


  componentDidMount(){

  }
  render(){
    const {utilisateur} = this.props;
    let image;
    let inputPrenom;
    let inputNom;
    let inputCourriel;
    let inputMdp;

    if(typeof utilisateur.photoProfil !== undefined){
      image = <Image style={styles.image} source={{uri:utilisateur.photoProfil}}/>
    }else{
      image = <Image style={styles.image} source={require("../Assets/icon_provisoire_480px.png")}/>
    }
    if(!utilisateur.profilReseauSocial){
      inputCourriel = <TextInput onChangeText={(text)=>this._capturerSaisiCourriel(text)}/>
      inputMdp = <TextInput onChangeText={(text)=>this._capturerSaisiMdp(text)}/>
    }

    return(

      <View style={styles.container}>
        <View style={styles.centerSecondaryAxis}>
          {image}
          <Text>modifier</Text>
        </View>
        <TextInput value={this.state.prenomSaisi} onChangeText={(text)=>this._capturerSaisiPrenom(text)}/>
        <TextInput value={this.state.nomSaisi} onChangeText={(text)=>this._capturerSaisiNom(text)}/>
        {inputCourriel}
        <TextInput value={this.state.numeroSaisi} onChangeText={(text)=>this._capturerSaisiNumero(text)}/>
        {inputMdp}
        <Button title="Valider" onPress={()=>this._mettreAJourProfil(utilisateur)}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 30,
    marginRight: 30,
    flex: 1
  },
  image:{
    height: 75,
    width: 75,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 50
  },
  centerSecondaryAxis:{
    alignItems: "center"
  }
})

const mapStateToProps = (state) => {
  return{
    utilisateur: state.profileReducer.utilisateur
  }
}

export default connect(mapStateToProps)(ProfilEdition);

import React,{Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

import {insertEvent, insertOrganise, insertInvite, insertChecklist, insertProduit, insertCompose} from '../Networking/Profile';

import {connect} from 'react-redux';

class JeValide extends React.Component{
  constructor(props){
    super(props)
    this.arrayIdProduit = [];
    this.idChecklist = null;
    this.idEvent = null;
  }

  _insertEvent = async(event) => {
    let idEvent = await insertEvent(event);
    this.idEvent = idEvent;
    await this._insertChecklist(idEvent);
    this._insertOrganise(event.idOrganisateur, idEvent);
    this._insertInvites(event.invites, idEvent);
    this._insertProduits(evenement.listeProduits);
    console.log("_insertEvent: " + idEvent);
  }

  _insertOrganise = async(idUser, idEvent)=> {
    let response = await insertOrganise(idUser, idEvent);
    console.log(response);
  }

  _insertInvites = (listInvites, idEvent)=> {
    listInvites.forEach(async function(id){
      await insertInvite(id, idEvent);
    })
  }

  _insertProduits = async (listeProduits) => {
    for(produit of listeProduits){
      let idProduit = await insertProduit(produit);
      this.arrayIdProduit.push(idProduit);
      console.log("ARRAY ID PRODUIT: "  + this.arrayIdProduit);

    }
    this._insertCompose(this.idChecklist);
    /*
    listeProduits.forEach(async(produit)=>{
      let idProduit = await insertProduit(produit);
      this.arrayIdProduit.push(idProduit);
      console.log("ARRAY ID PRODUIT: "  + this.arrayIdProduit);
    });*/

  }

  _insertChecklist = async(idEvent) => {
    let idLastChecklist = await insertChecklist(idEvent);
    this.idChecklist = idLastChecklist;
    console.log("ID CHECKLIST: "  + this.idChecklist);
  }

  _insertCompose = (idChecklist) =>{
    console.log("INSERT COMPOSEE: "  + this.arrayIdProduit);
    this.arrayIdProduit.forEach(async function(idProduit){
        await insertCompose(idProduit,idChecklist);
    })
  }


  componentDidMount(){
    console.log("VALIDATION TITRE: " + this.props.titre);
    console.log("VALIDATION ADRESSE: " + this.props.adresse);
    console.log("VALIDATION DETAILS: " + this.props.details);
    console.log("VALIDATION INVITES: " + this.props.invites);
    console.log("VALIDATION GENRE: " + this.props.genre);
    console.log("VALIDATION DATEHEUREDEB: " + this.props.dateHeureDeb);
    console.log("VALIDATION ORGANISATEUR: " + this.props.idOrganisateur);
    evenement = {
      titre: this.props.titre,
      adresse: this.props.adresse,
      nomLieu: this.props.nomLieu,
      details: this.props.details,
      invites: this.props.invites,
      genre: this.props.genre,
      dateHeureDeb: this.props.dateHeureDeb,
      listeProduits: this.props.listeProduits,
      idOrganisateur: this.props.idOrganisateur
    }

    this._insertEvent(evenement);
    /*
    this._insertProduits(evenement.listeProduits).then(()=>{
      this._insertCompose(this.idChecklist);
    });*/


  }
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.center}>
          <Text>Parfait !</Text>
          <Text>Ton évènement est</Text>
          <Text>enfin prêt</Text>
          <TouchableOpacity
            onPress={()=>{this.props.navigation.navigate("Resume",{idEvent: this.idEvent})}}
            style={styles.boutonConfirm}>
            <Text style={styles.buttonTxt}>Je valide</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginLeft: 30,
    marginRight: 30
  },
  center:{
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  boutonConfirm:{
    backgroundColor: "black",
    borderRadius: 50,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 50
  },
  buttonTxt:{
    color: "white"
  }
})

const mapStateToProps = (state) =>{
  return{
    titre: state.eventReducer.titre,
    adresse: state.eventReducer.adresse,
    nomLieu: state.eventReducer.nomLieu,
    details: state.eventReducer.details,
    invites: state.eventReducer.invites,
    genre: state.eventReducer.genre,
    dateHeureDeb: state.eventReducer.dateHeureDeb,
    idOrganisateur: state.eventReducer.idOrganisateur,
    listeProduits: state.eventReducer.listeProduits,
    utilisateur:state.profileReducer.utilisateur
  }
}

export default connect(mapStateToProps)(JeValide);

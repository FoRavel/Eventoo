/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import Inscription from './Components/Inscription';
import Navigation from './Navigation/Navigation';

import InviterLesPotos from './Components/InviterLesPotos';
import LocationMap from './Components/LocationMap';
import CardForm from './Components/CardForm';
import Quand from './Components/Quand';
import CestParti from './Components/CestParti';
import Checklist from './Components/Checklist';
import Cagnotte from './Components/Cagnotte';
import JeValide from './Components/JeValide';
import ResumeEvent from './Components/ResumeEvent';
import ChecklistItem from './Components/ChecklistItem';
import Profil from './Components/Profil';
import CircleThumbnail from './Components/CircleThumbnail';
import ResumeCagnotte from './Components/ResumeCagnotte';
import ResumeInvites from './Components/ResumeInvites';
import ResumeChecklist from './Components/ResumeChecklist';
import Galerie from './Components/Galerie';

import {Provider} from 'react-redux';
import Store from './Store/configureStore';

import {getUser} from './Networking/Profile';

export default class App extends React.Component {


// TEST FONCTIONNEL BACKEND PHP
/*
  _backEndTest = async() => {
    try{
      let response = await fetch("http://192.168.0.17/SocialnetworkAuth/testSQL.php?action=connexion",
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json', // application/json ne marche pas
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          courriel: 'jolifanfan@hotmail.fr'
        })
      });
      let responseJson = await response.json();
      console.log(responseJson);
    }catch(error){
      console.log(error)
    }
  }*/
  _utilisateurExiste(email){
    if(getUser(email)){
      console.log("Oui");
    }else{
      console.log("Non");
    }
  }


  componentDidMount(){
    this._utilisateurExiste("jolifanfan@hotmail.fr");
  }

  render() {
    return (
      <Provider store={Store}>
        <Navigation/>
      </Provider>
    )
  }
}
console.disableYellowBox = true

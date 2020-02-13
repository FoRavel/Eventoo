import {StyleSheet, Image, View} from 'react-native';
import React, {Component} from 'react';

import{createStackNavigator,createAppContainer, createBottomTabNavigator} from 'react-navigation';
import Inscription from '../Components/Inscription';
import InscriptionForm from '../Components/InscriptionForm';
import Accueil from '../Components/Accueil';
import Calendrier from '../Components/Calendrier';
import CalendrierSelect from '../Components/CalendrierSelect';
import InputAmountForm from '../Components/InputAmountForm';
import CardForm from '../Components/CardForm';
import Location from '../Components/Location';
import LocationMap from '../Components/LocationMap';
import InviterLesPotos from '../Components/InviterLesPotos';
import Quand from '../Components/Quand';
import CestParti from '../Components/CestParti';
import Checklist from '../Components/Checklist';
import Cagnotte from '../Components/Cagnotte';
import JeValide from '../Components/JeValide';
import ResumeEvent from '../Components/ResumeEvent';
import Profil from '../Components/Profil';
import MessageInbox from '../Components/MessageInbox';
import ResumeCagnotte from '../Components/ResumeCagnotte';
import ResumeInvites from '../Components/ResumeInvites';
import ResumeChecklist from '../Components/ResumeChecklist';
import Galerie from '../Components/Galerie';
import ProfilEdition from '../Components/ProfilEdition';
import Connexion from '../Components/Connexion';

const InscriptionNavigator = createStackNavigator({
  Inscription:{screen:Inscription},
  Formulaire:{screen:InscriptionForm},
  Connexion:{screen:Connexion},
  Accueil:{screen:Accueil},
  Resume:{screen:ResumeEvent},
  ResumeCagnotte:{screen:ResumeCagnotte},
  ResumeInvites:{screen:ResumeInvites},
  ResumeChecklist:{screen:ResumeChecklist},
  Galerie:{screen:Galerie}
});

InscriptionNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index <1 ) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

InscriptionNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if(navigation.state.index < 1){
    tabBarVisible = false;
  }
  if(navigation.state.routes[navigation.state.index].routeName == "Connexion"){
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};


const CalendrierNavigator = createStackNavigator({
  Calendrier:{screen:Calendrier},
  CalendrierSelect:{screen:CalendrierSelect},
});

const CreerEvent = createStackNavigator({
  CestParti:{screen:CestParti},
  Quand:{
    screen:Quand,
    navigationOptions: {
      title:'Quand?'
    }
  },
  Qui:{screen:InviterLesPotos},
  ChoisirLieu:{screen:Location},
  Cagnotte:{screen:Cagnotte},
  Checklist:{screen:Checklist},
  JeValide:{screen:JeValide},
  Resume:{screen:ResumeEvent},
  ResumeInvites:{screen:ResumeInvites},
  ResumeChecklist:{screen:ResumeChecklist},
  Galerie:{screen:Galerie},
  Carte:{screen:LocationMap},
  Montant:{screen:InputAmountForm},
  CarteBancaire:{screen:CardForm},
});

const ProfilNavigator = createStackNavigator({
  Profil:{screen:Profil},
  ProfilEdition:{screen:ProfilEdition}
});

const MessagerieNavigator = createStackNavigator({
  MessageInbox:{screen:MessageInbox}
});


const EventTabNavigator = createBottomTabNavigator({
  Accueil:{
    screen:InscriptionNavigator,
    navigationOptions:{
      tabBarIcon:()=>{
        return <Image source={require("../Assets/home.png")} style={styles.icon}/>
      }
    }
  },
  Calendrier:{
    screen:CalendrierNavigator,
    navigationOptions:{
      tabBarIcon:()=>{
        return <Image source={require("../Assets/calendar.png")} style={styles.icon}/>
      }
    }
  },
  CreerEvent:{
    screen:CreerEvent,
    navigationOptions:{
      tabBarIcon:()=>{
        return (
          <View style={[styles.icon, styles.iconPlus]}>
            <Image source={require("../Assets/add.png")}/>
          </View>
        )
      }
    }
  },
  Profil:{
    screen:ProfilNavigator,
    navigationOptions:{
      tabBarIcon:()=>{
        return <Image source={require("../Assets/user.png")} style={styles.icon}/>
      }
    }
  },
  Messagerie:{
    screen:MessagerieNavigator,
    navigationOptions:{
      tabBarIcon:()=>{
        return <Image source={require("../Assets/message.png")} style={styles.icon}/>
      }
    }
  },
}, {
  tabBarOptions:{
      activeBackgroundColor:'#DDDDDD',
      inactiveBackgroundColor:'#FFFFFF',
      showLabel: false,
      showIcon: true
    }
});

const styles = StyleSheet.create({
  icon:{
    height: 27,
    width: 27
  },
  iconPlus:{
    height: 35,
    width: 35,
    borderRadius: 10,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center"
  }
})

export default createAppContainer(EventTabNavigator);

import React from 'react';
import{View,TextInput,Button, StyleSheet, TouchableOpacity, Image, Text, FlatList, PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';

import potos from '../Helpers/potosData';
import PotosItem from './PotosItem';
import {getContact} from '../Networking/Profile';

import {connect} from 'react-redux';




class InviterLesPotos extends React.Component{
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state= {
      //Juste les contacts inscrits sur Eventoo
      prenomNomContacts: null
    }
    //Tous les contacts du répertoire
    this.numerosContacts = [];
  }

  _getListNumerosContacts(){
    var array  = [];
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        'title': 'Contacts',
        'message': 'This app would like to view your contacts.'
      }
    ).then(() => {
      Contacts.getAll((err, contacts) => {
        if (err === 'denied'){
          console.log("ERREUR :"+err);
        } else {
          contacts.forEach(function(e){
            if(e.phoneNumbers[0] != undefined){
              numero = e.phoneNumbers[0].number;
              console.log("CONTACT: "+ e.phoneNumbers[0].number);
              array.push(numero);
            }
          });
          this.numerosContacts = array;
          this._trierContact();
        }
      })
    })
  }

  _trierContact = ()=>{
    var arrayContacts = [];
    this.numerosContacts.forEach(async(num)=>{
      prenom_nom = await getContact(num);
      if(prenom_nom != null){
        arrayContacts.push(prenom_nom);
        console.log("L56: "+ prenom_nom);
        this.setState({prenomNomContacts:arrayContacts}, ()=>console.log("STATE: " + this.state.prenomNomContacts));
      }

    })


  }

  componentDidMount(){
    this._getListNumerosContacts();


  }

  render(){
    let flatlist;
    if(this.state.prenomNomContacts !== null){
      console.log("RENDER: "+this.state.prenomNomContacts)
      flatlist = <FlatList
                style={{height: 300}}
                data={this.state.prenomNomContacts}
                keyExtractor={(item)=>item.id.toString()}
                renderItem={({item})=> <PotosItem pote={item}/>}
                />
    }else{
      console.log("RENDER: "+this.state.prenomNomContacts)
      flatlist = <View style={{flex: 1, justifyContent: "center"}}><Text>Il n'y a aucun contact à invité. Des contacts de ton répertoire téléphonique doivent être inscrits sur Eventoo et avoir enregistré leur numéro pour apparaitre ici.</Text></View>;
    }

    return(
      <View style={styles.container}>
      <Text style={styles.titrePage}>Inviter les potos</Text>
      <TouchableOpacity onPress={()=>alert("La barre de recherche n'est pas encore utilisable")}>
        <View style={[styles.inline, {marginBottom: 10}]}>
          <TextInput  style={styles.input} placeholder="Entre un nom, numéro, e-mail" editable={false}/>
          <TouchableOpacity
          style={styles.boutonRecherche}
          >
            <Image style={{height: 15, width:15}} source={require('../Assets/search.png')}/>
          </TouchableOpacity>
        </View>
        </TouchableOpacity>
        {flatlist}
        <View style={styles.flexEnd}>
          <TouchableOpacity
           style={styles.boutonSuivant}
           onPress={()=> this.props.navigation.navigate("ChoisirLieu")}
           >
            <Image source={require('../Assets/right-arrow-white.png')}/>
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
    marginRight: 30,
    //borderWidth: 1,
    //borderColor: "black"
  },
  boutonRecherche:{
    backgroundColor: "black",
    borderRadius: 50,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5
  },
  inline:{
    flexDirection: "row",
    alignItems: "center"
  },
  input:{
    height: 40,
    borderBottomWidth: 2,
    borderColor: "black",
    flex: 1
  },
  boutonChecked:{
    backgroundColor: "black",
    borderRadius: 50,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5
  },
  boutonSuivant:{
    backgroundColor: "black",
    borderRadius: 50,
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center"
  },
  flexEnd:{
    //borderColor: "red",
    //borderWidth: 2,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flex: 1
  },
  titrePage:{
    fontSize: 30,
    textAlign: "center",
    marginBottom: 40,
    marginTop: 40
  }
});

const mapStateToProps = (state) =>{
  return state;
}
export default connect(mapStateToProps)(InviterLesPotos);

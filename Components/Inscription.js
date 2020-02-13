import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity, Image} from 'react-native';
import { AccessToken, LoginManager, LoginButton, GraphRequest, GraphRequestManager} from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton, statusCodes} from 'react-native-google-signin';
import firebase from 'react-native-firebase';
import {getUser} from '../Networking/Profile';
import { connect } from 'react-redux';

import ImagePicker from 'react-native-image-picker';




type Props = {};
class Inscription extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props){
    super(props)

    this.state={
      utilisateur: null
    }
  }



  //Google Sign n
  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo.email);
    } catch (error) {
      console.log(error);
    }
  };

  //pour Facebook login
  _responseInfoCallback(error: ?Object, result: ?Object) {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      console.log('Success fetching data: ' + result.picture.data.url);
      console.log('Success fetching data: ' + result.email);
      console.log('Success fetching data: ' + result.last_name);
      console.log('Success fetching data: ' + result.first_name);

      var utilisateur = {
          id: null,
          nom: result.last_name,
          prenom: result.first_name,
          courriel: result.email,
          numero: "",
          photoProfil: result.picture.data.url,
          profilReseauSocial: true
      }
      this._utilisateurExiste(utilisateur);
    }
  }

  _utilisateurExiste = async (utilisateur) => {
    response = await getUser(utilisateur.courriel, null);
    if(response == "Utilisateur inexistant"){
      console.log(response);
      this.setState({utilisateur: utilisateur}, ()=> {
        this._setUtilisateur(utilisateur);
        this.props.navigation.navigate("Formulaire", {socialAuthentification: true});
      });
    }
    else{
      console.log("Utilisateur existe "+response);
      this.setState({utilisateur: utilisateur}, async()=> {
        await this._connecterUtilisateur(utilisateur);
        this._setUtilisateur(utilisateur);
        this.props.navigation.navigate("Accueil", {socialAuthentification: true});
      });
    }
  }

  _setUtilisateur(utilisateur){
    var action = {type: "SET_CURRENT_USER", value: utilisateur}
    this.props.dispatch(action);
  }

  _connecterUtilisateur = async(utilisateur) => {
    response = await getUser(utilisateur.courriel, null);
    console.log("CONNEXION ID : "+ response.id);
    utilisateur.id = response.id;
    utilisateur.prenom = response.prenom;
    //this._setUtilisateur(utilisateur);
  }

    _FBLoginWithCustomUI = async () =>{
    result = await LoginManager.logInWithReadPermissions(["public_profile, email"]);
    if (result.isCancelled) {
        LoginManager.logOut();
    } else {
        data = await AccessToken.getCurrentAccessToken();
        const infoRequest = new GraphRequest(
        '/me',
        {
          parameters:{
            fields:{
              string:'picture, email, first_name, last_name'
            },
            access_token:{
                string: data.accessToken.toString()
            }
          }
        },
        this._responseInfoCallback.bind(this)
        );
        new GraphRequestManager().addRequest(infoRequest).start();
    }
  }


  componentDidMount(){
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '661023323621-2trv02uvbu6nh4bfre9im95nd0p418lk.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
      accountName: '', // [Android] specifies an account name on the device that should be used
      iosClientId: '', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });



  }

  componentDidUpdate(){


  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.eventoo}>eventoo.</Text>
        <TouchableOpacity
        style={[styles.bouton, styles.marginBottom]}
        onPress={()=>this._FBLoginWithCustomUI()}
        >
          <Text style={styles.texteBouton}>Continuer avec Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.bouton}
        //onPress={this.signIn}
        onPress={()=>alert("Inscription avec Google indisponible pour le moment")}
        >
          <Text style={styles.texteBouton}>Continuer avec Google</Text>
        </TouchableOpacity>

          <Text style={styles.ou}>ou...</Text>
          <TouchableOpacity
          onPress={() => navigate("Formulaire", {socialAuthentification: false})}
          style={styles.bouton}
          >
          <Text style={styles.texteBouton}>S'inscrire manuellement</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={()=>this.props.navigation.navigate("Connexion")}
          >
            <Text style={styles.seConnecter}>Se connecter</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventoo:{
    fontSize: 45,
    marginBottom: 35
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  bouton:{
    borderRadius: 30,
    backgroundColor: "black",
    paddingTop: 8,
    paddingBottom: 8,
    width: 240,
    alignItems: "center"
  },
  texteBouton:{
    color: "white"
  },
  ou:{
    marginTop: 22,
    marginBottom: 22
  },
  seConnecter:{
    marginTop: 15,
    marginBottom: 10,
    borderBottomWidth: 1
  },
  marginBottom:{
    marginBottom: 20
  }
});

const mapStateToProps = (state) =>{
  return state;
}

export default connect(mapStateToProps)(Inscription);

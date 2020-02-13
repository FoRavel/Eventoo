import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Picker, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {getAllGenre} from '../Networking/Profile';

class CestParti extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props){
    super(props)
    this.state = {
        titre: "",
        details: "",
        genre: "1",
        allGenre: []
      }
    }

    _capturerSaisiTitre(text){
      this.setState({titre: text}, ()=>console.log(this.state.titre))
    }
    _capturerSaisiDetails(text){
      this.setState({details: text}, ()=>console.log(this.state.details))
    }

    //Initialiser les propriétés titre, details et genre de la state globale
    cestParti(){
      evenement = {
        titre: this.state.titre,
        details: this.state.details,
        genre: this.state.genre,
        idOrganisateur: this.props.utilisateur.id
      }
      console.log("STATE GENRE: "+ this.state.genre);

      action = {type: 'CESTPARTI', value: evenement}
      this.props.dispatch(action);
    }

    _loadGenres = async()=>{
      response = await getAllGenre();
      this.setState({allGenre:response}, ()=>console.log("TEST: " + this.state.allGenre));

    }

    _cliqueSuivant = async()=>{
      if(this.state.titre == "" || this.state.details == ""){
        alert("Remplis tous les champs avant de passer à l'étape suivante.");
      }else{
        this.props.navigation.navigate("Quand");
      }
    }

    componentDidMount(){
      this._loadGenres();
    }

  render() {

    return(
      <View style={styles.container}>
        <Text style={styles.titrePage}>C'est parti !</Text>
        <Text>Un petit nom pour ton event:</Text>
        <TextInput style={styles.input} onChangeText={(text)=>this._capturerSaisiTitre(text)}/>
        <Text>C'est quoi le genre?</Text>
        <View style={styles.input}>
          <Picker
          selectedValue= {this.state.genre}
          onValueChange={(itemValue, itemIndex) =>
              this.setState({genre: itemValue}, console.log("ITEMVALUE: " + itemValue))
            }>
            {this.state.allGenre.map(genre=>(
              <Picker.Item label={genre.label} value={genre.id}/>
            ))}
          </Picker>
          <View style={styles.pickerButton}>
            <Image style={{width: 10, height: 10}} source={require("../Assets/down-arrow.png")}/>
          </View>
        </View>
        <Text>Donne un peu plus de détails!</Text>
        <TextInput
        style={styles.input}
        onChangeText={(text)=>this._capturerSaisiDetails(text)}
        multiline={true}/>
        <View style={styles.flexEnd}>
          <TouchableOpacity
          onPress={()=>{this.cestParti(); this._cliqueSuivant()}}
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
    marginRight: 30,
    marginLeft: 30,
    //borderColor: "red",
    //borderWidth: 1
  },
  input:{
    borderBottomWidth:1,
    marginBottom: 30
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
  inputMarginBot:{
    marginBottom: 50
  },
  pickerButton:{
    zIndex: -1,
    width: 20,
    height: 20,
    backgroundColor: "black",
    borderRadius: 50,
    position: "absolute",
    right: 11,
    top: 20,
    alignItems:"center",
    justifyContent:"center"
  },
  titrePage:{
    fontSize: 30,
    textAlign: "center",
    marginBottom: 40,
    marginTop: 40
  }

})

const mapStateToProps = (state) => {
  return{
    utilisateur: state.profileReducer.utilisateur
  }
}

export default connect(mapStateToProps)(CestParti);

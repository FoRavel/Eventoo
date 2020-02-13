import React from 'react';
import{View,TextInput,Button, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import {insertInvite, deleteInvite} from '../Networking/Profile';
import {connect} from 'react-redux';


class PotosItem extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      estInvite: false
    }
  }

  _updateBoutonInviter(){
    if(this.state.estInvite == true){
    this.setState({estInvite: false})
    }else{
      this.setState({estInvite: true})
    }
  }

  _dispatchAction(idUser){
    action = {type: 'ADD_INVITE' , value: idUser}
    this.props.dispatch(action);
  }

  _dispatchAction2(idUser){
    action = {type: 'REMOVE_INVITE' , value: idUser}
    this.props.dispatch(action);
  }


  _displayInvitButton(){
    const pote = this.props.pote;
    if(this.state.estInvite == true){
      return(
      <TouchableOpacity
      onPress={()=>{this._dispatchAction2(pote.id); this.setState({estInvite: false})}}
      style={styles.boutonChecked}>
        <Image  style={{height: 15, width:15}} source={require('../Assets/checked.png')}/>
      </TouchableOpacity>
    )
  }
    else{
      return(
      <TouchableOpacity
      onPress={()=>{this._dispatchAction(pote.id); this.setState({estInvite: true}) }}
      style={styles.boutonChecked}>
        <Image  style={{height: 15, width:15}} source={require('../Assets/add-plus-button.png')}/>
      </TouchableOpacity>
    )
    }
  }


  render(){
    const pote = this.props.pote;
    return(
        <View style={[styles.inline,{marginTop: 10, marginBottom: 10}]}>
          <Image style={{height: 50, width:50, borderRadius: 50, borderColor: "red", borderWidth: 1}} source={require('../Assets/icon_provisoire_480px.png')}/>
          <Text style={{marginLeft: 25}}>{pote.prenom} {pote.nom}</Text>
          <View style={{flex: 1, alignItems: "flex-end"}}>
            {this._displayInvitButton()}
          </View>
        </View>
    )
  }

}

const styles = StyleSheet.create({
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
  }
});

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(PotosItem);

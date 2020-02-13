import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Text, FlatList} from 'react-native';
import invites from '../Helpers/InvitesData';
import ResumeInvitesItem from './ResumeInvitesItem';

class ResumeInvites extends React.Component{
  constructor(props){
    super(props)
    this.state={
      invites: [],
      participants: [],
      absents: [],
      indecis: [],
      deuxParticipants: [],
      deuxAbsents: [],
      deuxIndecis: []
    }
  }

  _calcParticipant(){
    const invites = this.state.invites;
    var arrayParticipe = [];
    invites.forEach(function(element){
      if(element.participe == true){
        arrayParticipe.push(element);
      }
    })
    this.setState({participants:arrayParticipe}, ()=> this._deuxParticipants());
  }

  _calcNeParticipePas(){
    const invites = this.state.invites;
    var arrayParticipePas = [];
    invites.forEach(function(element){
      if(element.participe == false){
        arrayParticipePas.push(element);
      }
    })
    this.setState({absents:arrayParticipePas}, ()=> this._deuxAbsents());
  }
  _calcParticipePeutEtre(){
    const invites = this.state.invites;
    var arrayParticipePeutEtre = [];
    invites.forEach(function(element){
      if(element.participe == null){
        arrayParticipePeutEtre.push(element);
      }
    })
    this.setState({indecis:arrayParticipePeutEtre}, ()=> this._deuxIndecis());
  }

  _deuxParticipants(){
    const participants = this.state.participants;
    var arrayDeuxParticipants = [];
    for(var i=0;i<2;i++){
      if(participants[i] != undefined){
        arrayDeuxParticipants.push(participants[i]);
      }
      console.log(participants[i])
    }
    this.setState({deuxParticipants:arrayDeuxParticipants});
  }

  _deuxAbsents(){
    const absents = this.state.absents;
    var arrayDeuxAbsents = [];
    for(var i=0;i<2;i++){
      if(absents[i] != undefined){
        arrayDeuxAbsents.push(absents[i]);
      }
    }
    this.setState({deuxAbsents:arrayDeuxAbsents});
  }

  _deuxIndecis(){
    const indecis = this.state.indecis;
    var arrayDeuxIndecis = [];
    for(var i=0;i<2;i++){
      if(indecis[i] != undefined){
        arrayDeuxIndecis.push(indecis[i]);
      }
    }
    this.setState({deuxIndecis:arrayDeuxIndecis});
  }

  componentDidMount(){
    this.setState({invites:this.props.navigation.state.params.invites}, ()=> {
      console.log("zerzerzrer: "+this.state.invites);
      this._calcParticipant();
      this._calcNeParticipePas();
      this._calcParticipePeutEtre();
    });

  }

  render(){
    return(
      <ScrollView style={styles.container}>
        <View style={styles.centerSecondaryAxis}>
          <Text>Y'a qui?</Text>
          <View style={[styles.inline,styles.marginBottom]}>
            <Text>{this.state.participants.length} participants/</Text>
            <Text>{this.state.invites.length} invités</Text>
          </View>
        </View>
        <View style={[styles.inline, styles.centerSecondaryAxis]}>
          <View style={styles.puce}>
          </View>
          <Text style={styles.textBold}>Participe ({this.state.participants.length})</Text>
        </View>
        <FlatList
        style={{flexGrow:0}}
        data={this.state.deuxParticipants}
        keyExtractor={(item)=>item.id.toString()}
        renderItem={({item})=><ResumeInvitesItem invite={item}/>}
        />
        <Text style={styles.textBold}>Participe peut-être ({this.state.indecis.length})</Text>
        <FlatList
        style={{flexGrow:0}}
        data={this.state.deuxIndecis}
        keyExtractor={(item)=>item.id.toString()}
        renderItem={({item})=><ResumeInvitesItem invite={item}/>}
        />
        <Text style={styles.textBold}>Ne participe pas ({this.state.absents.length})</Text>
        <FlatList
        style={{flexGrow:0}}
        data={this.state.deuxAbsents}
        keyExtractor={(item)=>item.id.toString()}
        renderItem={({item})=><ResumeInvitesItem invite={item}/>}
        />
        <Text style={styles.textBold}>N'a pas répondu ({this.state.indecis.length})</Text>
        <FlatList
        style={{flexGrow:0}}
        data={this.state.deuxIndecis}
        keyExtractor={(item)=>item.id.toString()}
        renderItem={({item})=><ResumeInvitesItem invite={item}/>}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginLeft: 25,
    marginRight: 25
  },
  inline:{
    flexDirection:"row"
  },
  centerSecondaryAxis:{
    alignItems:"center"
  },
  marginBottom:{
    marginBottom: 30
  },
  puce:{
    height: 12,
    width: 12,
    borderRadius: 50,
    backgroundColor: "blueviolet"
  },
  textBold:{
    fontWeight: "bold"
  }
})

export default ResumeInvites;

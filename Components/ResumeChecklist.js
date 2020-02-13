import React,{Component} from 'react';
import {StyleSheet, View, Text, Image, FlatList} from 'react-native';
import ResumeChecklistItem from './ResumeChecklistItem';
import list from '../Helpers/checklistData';

class ResumeChecklist extends React.Component{
  constructor(props){
    super(props)
    this.state={
      checklist: []
    }
  }

  _calculerTotalApporteurs(){
    var x = 0;
    var array = this.state.checklist;
    array.forEach(function(e){
      x += e.apporteur.length;
    });
    return x;
  }

  componentDidMount(){
    this.setState({checklist: list});
  }
  render(){
    return(
      <View style={styles.container}>
        <View style={[styles.centerSecondaryAxis, styles.marginBottom20]}>
          <Image style={[styles.topImage,styles.marginBottom15]} source={require("../Assets/icon_provisoire_480px.png")}/>
          <Text>Qui ramène des chips?</Text>
        </View>
        <FlatList
        data={this.state.checklist}
        keyExtractor={(item)=>item.id.toString()}
        renderItem={({item})=><ResumeChecklistItem produit={item} totalApporteurs={this._calculerTotalApporteurs()} />}
        />
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginLeft: 25,
    marginRight: 25
  },
  topImage:{
    width: 80, height: 80, borderColor: "red", borderWidth:1
  },
  centerSecondaryAxis:{
    alignItems: "center"
  },
  marginBottom20:{
    marginBottom: 20
  },
  marginBottom15:{
    marginBottom: 15
  },

})

export default ResumeChecklist;

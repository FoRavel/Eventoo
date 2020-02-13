import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity, FlatList} from 'react-native';
import contributors from '../Helpers/contributorsData';
import ResumeCagnotteItem from './ResumeCagnotteItem';

class ResumeCagnotte extends React.Component{
  constructor(props){
    super(props)

    this.state={
      currentBalance: "43",
      maxBalance: "70",
      contributors: "8",
      contributorsList: contributors
    }
  }

  componentDidMount(){
    this.setState({contributorsList: contributors})
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.centerSecondaryAxis}>
          <Text>Fais pas ton radin</Text>
          <Image style={styles.topImage} source={require("../Assets/icon_provisoire_480px.png")}/>
          <View style={styles.inline}>
            <Text>{this.state.currentBalance}€/</Text>
            <Text>{this.state.maxBalance}€</Text>
          </View>
          <Text>récoltés par {this.state.contributors} participants</Text>
          <TouchableOpacity
          style={styles.button}>
            <Text style={styles.buttonText}>Participer</Text>
          </TouchableOpacity>
        </View>
        <FlatList
        data={this.state.contributorsList}
        keyExtractor={(item)=>item.id.toString()}
        renderItem={({item})=><ResumeCagnotteItem contributor={item}/>}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    marginLeft:25,
    marginRight: 25
  },
  topImage:{
    width: 80, height: 80, borderColor: "red", borderWidth:1
  },
  inline:{
    flexDirection:"row"
  },
  centerSecondaryAxis:{
    alignItems:"center"
  },
  button:{
    backgroundColor: "black",
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 50
  },
  buttonText:{
    color: "white"
  }
})

export default ResumeCagnotte;

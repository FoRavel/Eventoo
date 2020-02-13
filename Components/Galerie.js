import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import MasonryList from "react-native-masonry-list";
import photos from "../Helpers/galerieData";

class Galerie extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      listePhotos: photos
    }
  }

  componentDidMount(){

  }
  render(){
    return(


      <MasonryList
      images={this.state.listePhotos}
      renderIndividualFooter={(data)=>{
        return(
          <View elevation={5} style={styles.footerOverlay}>
            <TouchableOpacity style={styles.pouceRond}></TouchableOpacity>
          </View>
        )
      }}
      />
    )
  }
}

const styles = StyleSheet.create({
  image:{
    width: (Math.round(Dimensions.get('window').width))/2,

  },
  container:{
    flexWrap: "wrap"
  },
  pouceRond:{
    backgroundColor: "white",
    borderRadius: 50,
    width: 20,
    height: 20,
  },
  footerOverlay:{
    alignItems: "flex-end",
    position: "absolute",
    bottom:5,
    right: 5
  }
})
export default Galerie;

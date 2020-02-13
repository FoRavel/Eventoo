import React from 'react';
import{View,TextInput,Button, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';


class PotosItems extends React.Component{
  constructor(props){
    super(props);
    this.state= {

    }
  }


  render(){
    return(
        <View style={styles.inline}>
          <Image style={{height: 50, width:50, borderRadius: 50, borderColor: "red", borderWidth: 1}} source={require('../Assets/icon_provisoire_480px.png')}/>
          <Text style={{marginLeft: 25}}>Lola Dupont</Text>
          <View style={{flex: 1, alignItems: "flex-end"}}>
            <TouchableOpacity style={styles.boutonChecked}>
              <Image  style={{height: 15, width:15}} source={require('../Assets/checked.png')}/>
            </TouchableOpacity>
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

export default PotosItems;

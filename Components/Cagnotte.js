import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image} from 'react-native';

class Cagnotte extends React.Component{
  static navigationOptions = {
    header: null,
  };
  constructor(props){
    super(props)
    this.state = {
    day: '00',
    month: '00',
    year: '0000',
    }
  }

  async ouvrirDatePicker(){
        try {
            var today = new Date();
            var thousandYearsLater = today.setFullYear(3000);
            const {action, year, month, day} = await DatePickerAndroid.open({
              //date sélectionnée par défaut
              date: new Date(),
              //date minimale qui peut être sélectionnée
              minDate: new Date(),
              //date maximale qui peut être sélectionnée
              maxDate: thousandYearsLater,
              mode: 'default'
            });
            if (action !== DatePickerAndroid.dismissedAction) {
              // Selected year, month (0-11), day

              this.setState({day: day.toString(), month: (month+1).toString(), year: year.toString()})
              console.log("JOUR: "+day);
              console.log("MOIS: "+month);
              console.log("ANNÉE: "+year);

            }
          } catch ({code, message}) {
            console.log('Cannot open date picker: '+message);
          }
    }

  render(){
    return(
        <View style={styles.container}>
          <Text style={styles.titrePage}>Cagnotte</Text>
          <View style={styles.center}>
            <Text>De combien as-tu besoin?</Text>
            <View style={[styles.inputContainer, styles.inline, styles.centerY]}>
              <TextInput style={styles.inputTtAmount} placeholder="80"/>
              <Text style={styles.euroFont}>€</Text>
            </View>
            <Text>Combien par personne?</Text>
            <View style={[styles.inputContainerTight, styles.inline, styles.centerY]}>
              <TextInput style={styles.inputEachGuess} placeholder="7"/>
              <Text style={styles.euroFontLower}>€</Text>
            </View>
            <Text>Deadline?</Text>
          </View>
        <TouchableOpacity  style={[styles.inline, styles.center]} onPress={()=>this.ouvrirDatePicker()}>
            <TextInput editable={false} placeholder="26" style={[styles.input, styles.textCenter]} value={this.state.day}/>
            <TextInput editable={false} placeholder="07" style={[styles.input, styles.textCenter]} value={this.state.month}/>
            <TextInput editable={false} placeholder="2019" style={[styles.input,styles.widthInputYear, styles.textCenter]} value={this.state.year}/>
        </TouchableOpacity>

        <View style={styles.flexEnd}>
          <TouchableOpacity
            onPress={()=>this.props.navigation.navigate("JeValide")}
            style={styles.boutonSuivant}>
            <Image source={require('../Assets/right-arrow-white.png')}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  inline:{
    flexDirection: "row"
  },
  centerY:{
    alignItems: "center"
  },
  euroFont:{
    fontSize: 50
  },
  euroFontLower:{
    fontSize: 30
  },
  center:{
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer:{
    borderBottomWidth: 1,
    width: 110,
    marginBottom: 30
  },
  inputContainerTight:{
    borderBottomWidth: 1,
    width: 80,
    marginBottom: 30
  },
  inputTtAmount:{
    width: 80,
    textAlign: "center",
    fontSize: 50,
  },
  inputEachGuess:{
    fontSize: 30,
    textAlign: "center",
    width: 50
  },
  input:{
    borderBottomWidth: 1,
    borderColor: "black",
    marginRight: 10,
    marginLeft: 10,
    width: 54
  },
  textCenter:{
    textAlign: "center"
  },
  widthInputYear:{
    width: 74
  },
  absolute:{
    position:"absolute",
    right:  0
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
    //borderWidth: 1,
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
})

export default Cagnotte;

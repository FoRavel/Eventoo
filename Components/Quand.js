import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View, TouchableOpacity, Image, DatePickerAndroid} from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import {connect} from 'react-redux';

class Quand extends React.Component {
  static navigationOptions = {
    header: null,
  };


  constructor(props){
    super(props)
    this.state = {
    day: '00',
    month: '00',
    year: '0000',


    dayA: '00',
    monthA: '00',
    yearA: '0000',

    dayB: '00',
    monthB: '00',
    yearB: '0000',

    dayC: '00',
    monthC: '00',
    yearC: '0000',

    isDateTimePickerVisible: false
    }
    this.datetime = "";
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
      this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    console.log("A date has been picked: ", date.getFullYear());
    console.log("A date has been picked: ", date.getMonth());
    console.log("A date has been picked: ", date.getDate());
    console.log("A date has been picked: ", date.getHours());
    console.log("A date has been picked: ", date.getMinutes());
    console.log("A date has been picked: ", date.getSeconds());
    //2019-05-02 14:00:00
    var annee = date.getFullYear();
    var mois = date.getMonth();
    var jour = date.getDate();
    var heures = date.getHours();
    var minutes = date.getMinutes();
    var secondes = date.getSeconds();
    this.datetime = annee+"-"+mois+"-"+jour+" "+heures+":"+minutes+":"+secondes;
    this._dispatchAction(this.datetime);
    this.hideDateTimePicker();
  };

  _dispatchAction(dateHeureDeb){

    action = {type: 'QUAND', value: dateHeureDeb}
    this.props.dispatch(action);
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

    async ouvrirDatePickerA(){
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

                this.setState({dayA: day.toString(), monthA: (month+1).toString(), yearA: year.toString()})
                console.log("JOUR: "+day);
                console.log("MOIS: "+month);
                console.log("ANNÉE: "+year);

              }
            } catch ({code, message}) {
              console.log('Cannot open date picker: '+message);
            }
      }

      async ouvrirDatePickerB(){
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

                  this.setState({dayB: day.toString(), monthB: (month+1).toString(), yearB: year.toString()})
                  console.log("JOUR: "+day);
                  console.log("MOIS: "+month);
                  console.log("ANNÉE: "+year);

                }
              } catch ({code, message}) {
                console.log('Cannot open date picker: '+message);
              }
        }

        async ouvrirDatePickerC(){
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

                    this.setState({dayC: day.toString(), monthC: (month+1).toString(), yearC: year.toString()})
                    console.log("JOUR: "+day);
                    console.log("MOIS: "+month);
                    console.log("ANNÉE: "+year);

                  }
                } catch ({code, message}) {
                  console.log('Cannot open date picker: '+message);
                }
          }

          _cliqueSuivant = async()=>{
            if(this.datetime == ""){
              alert("Sélectionne une date avant de passer à l'étape suivante.");
            }else{
              this.props.navigation.navigate("Qui");
            }
          }

          componentDidMount(){

          }
  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.titrePage}>Quand?</Text>
        <TouchableOpacity onPress={()=>this.showDateTimePicker()}>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          mode="datetime"
        />
          <View style={[styles.inline, styles.center]}>
            <TextInput editable={false} placeholder="26" style={[styles.input, styles.textCenter]} value={this.state.day}/>
            <TextInput editable={false} placeholder="07" style={[styles.input, styles.textCenter]} value={this.state.month}/>
            <TextInput editable={false} placeholder="2019" style={[styles.input,styles.widthInputYear, styles.textCenter]} value={this.state.year}/>
          </View>
        </TouchableOpacity>
        <Text style={[styles.textCenter, styles.marginTopBottom]}>ou fais un sondage</Text>
        <View style={[styles.inline, styles.center, styles.marginTopContainerInput]}>
          <TouchableOpacity
          onPress={()=>console.log("choix sondage.")}
          style={styles.boutonSondage}
          >
            <Text style={styles.textWhite}>a</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.inline}
          onPress={()=>alert("La création d'un sondage n'est pas encore possible")}
          //onPress={()=>this.ouvrirDatePickerA()}
          >
            <TextInput editable={false} placeholder="26" style={[styles.input, styles.textCenter]} value={this.state.dayA}/>
            <TextInput editable={false} placeholder="07" style={[styles.input, styles.textCenter]} value={this.state.monthA}/>
            <TextInput editable={false} placeholder="2019" style={[styles.input,styles.widthInputYear, styles.textCenter]} value={this.state.yearA}/>
          </TouchableOpacity>
        </View>
        <View style={[styles.inline, styles.center, styles.marginTopContainerInput]}>
          <TouchableOpacity
          onPress={()=>console.log("choix sondage.")}
          style={styles.boutonSondage}
          >
            <Text style={styles.textWhite}>b</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.inline}
          onPress={()=>alert("La création d'un sondage n'est pas encore possible")}
          //onPress={()=>this.ouvrirDatePickerB()}
          >
            <TextInput editable={false} placeholder="26" style={[styles.input, styles.textCenter]} value={this.state.dayB}/>
            <TextInput editable={false} placeholder="07" style={[styles.input, styles.textCenter]} value={this.state.dayB}/>
            <TextInput editable={false} placeholder="2019" style={[styles.input,styles.widthInputYear , styles.textCenter]} value={this.state.dayB}/>
          </TouchableOpacity>
        </View>
        <View style={[styles.inline, styles.center, styles.marginTopContainerInput]}>
          <TouchableOpacity
          onPress={()=>console.log("choix sondage.")}
          style={styles.boutonSondage}
          >
            <Text style={styles.textWhite}>c</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.inline}
          onPress={()=>alert("La création d'un sondage n'est pas encore possible")}
          //onPress={()=>this.ouvrirDatePickerC()}
          >
            <TextInput editable={false} placeholder="26" style={[styles.input, styles.textCenter]} value={this.state.dayC}/>
            <TextInput editable={false} placeholder="07" style={[styles.input, styles.textCenter]} value={this.state.dayC}/>
            <TextInput editable={false} placeholder="2019" style={[styles.input, styles.widthInputYear, styles.textCenter]} value={this.state.dayC}/>
          </TouchableOpacity>
        </View>
        <View style={styles.flexEnd}>
          <TouchableOpacity
          onPress={()=>this._cliqueSuivant()}
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
    flex: 1,
    marginRight: 30,
    marginLeft: 30,
    //borderColor: "red",
    //borderWidth: 1
  },
  inline:{
    flexDirection: "row"
  },
  center:{
    justifyContent: "center",
    alignItems: "center"
  },
  input:{
    borderBottomWidth: 2,
    borderColor: "black",
    marginRight: 10,
    marginLeft: 10,
    width: 54
  },
  widthInputYear:{
    width: 74
  },
  textCenter:{
    textAlign: "center"
  },
  marginTopBottom:{
    marginTop: 50
  },
  textWhite:{
    color: "white"
  },
  boutonSondage:{
    backgroundColor: "black",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginRight: 7
  },
  marginTopContainerInput:{
    marginTop: 15
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

const mapStateToProps = (state)=> {
  return state;
}

export default connect(mapStateToProps)(Quand);

import React from 'react';
import{View,TextInput,Button} from 'react-native';

class InputAmountForm extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      input: ""
    }
  }

  _inputChanged(text){
    this.setState({input:text}, ()=>{console.log(this.state.input)});
  }

  //Aller à la page de saisi des coordonnées de CB
  _goToCardForm(){
    this.props.navigation.navigate("CarteBancaire", {montant: this.state.input});
    console.log("InputAmountForm: "+this.state.input);
  }

  render(){
    return(
      <View>
        <TextInput
          placeholder='Saisir un montant'
          onChangeText={(text)=>this._inputChanged(text)}
        />
        <Button
          title="Valider"
          onPress={()=>this._goToCardForm()}
        />
      </View>
    )
  }

}
export default InputAmountForm;

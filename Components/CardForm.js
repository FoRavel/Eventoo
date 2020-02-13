import React from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import stripe from 'tipsi-stripe';

stripe.setOptions({
publishableKey: 'pk_test_Q4mqDHJenzlISLNLULm55q3b',

androidPayMode: 'test', // Android only
});

class CardForm extends React.Component {
  constructor(props){
      super(props)
      this.state = {
        params:{
          number: "",
          expMonth: 0,
          expYear: 0,
          cvc: ""
      }
  }
}

  _numberCardInputChanged(text){
    this.state.params.number = text;
  }
  _CVCInputChanged(text){
    this.state.params.cvc = text;
  }
  _monthInputChanged(text){
    this.state.params.expMonth = parseInt(text);
  }
  _yearInputChanged(text){
    this.state.params.expYear = parseInt(text);
  }


//Créer un jeton (chaine de caractère) qui permet d'identifier la carte bancaire.
  _sendToken = async()=>{
      const token = await stripe.createTokenWithCard(this.state.params);
      token_id = token.tokenId;
      try{
        const response = await fetch("http://192.168.0.17/SocialnetworkAuth/traitement.php?action=payment",
        {
          method:'POST',
          headers: {
            'Accept': 'application/x-www-form-urlencoded', // application/json ne marche pas
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `stripeToken=${token_id}`
        });
        const responseJson = await response.json();
        console.log("RESPONSE: "+responseJson);
      }
      catch(err){
        alert(err);
      }

  }

  render() {
    const montant = this.props.navigation.getParam('montant');
    console.log(this.props.navigation);
    console.log("CardForm: "+montant);
    return (
      <View>
        <Text>{montant}</Text>
        <TextInput
          placeholder="4242 4242 4242 4242"
          onChangeText={(text)=>this._numberCardInputChanged(text)}
        />
        <TextInput
          placeholder="123"
          onChangeText={(text)=>this._CVCInputChanged(text)}
        />
        <TextInput
          placeholder="01"
          onChangeText={(text)=>this._monthInputChanged(text)}
        />
        <TextInput
          placeholder="19"
          onChangeText={(text)=>this._yearInputChanged(text)}
        />
        <Button
          onPress={()=>this._sendToken()}
          title="Valider"
        />
      </View>
    )
  }
}

export default CardForm;

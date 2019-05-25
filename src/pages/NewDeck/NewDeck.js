import React, { Component } from 'react'
import { View, KeyboardAvoidingView, TouchableNativeFeedback, Text, TextInput } from 'react-native'
import { Button, FormInput } from 'react-native-elements'
import * as API from '../../services/api'


class NewDeck extends Component {

    state = {
        title: ''
      }


      saveDeck = () => {
        const {navigation, screenProps} = this.props
        API.createDeck({title: this.state.title}).then((item) => {
          this.setState({title: ''})
          screenProps.newDeck({navigation, item})
          this.props.navigation.goBack()
        })
      }


  render() {
    return (
      <View style={{width: '100%', paddingLeft: 10, paddingRight: 10}}>
            <Text>Qual é o título do seu novo Deck?</Text>
            <TextInput
              placeholder="Ex: Alimentos em inglês"
              value={this.state.title}
              onChangeText={(text) => this.setState({title: text})}
            />
            <Button
              raised
              onPress={this.saveDeck}
              title="Salvar Deck">
            </Button>
      </View>

    )
  }
}

export default NewDeck;

import React, { Component } from 'react';

import { View, SafeAreaView, Text, TextInput } from 'react-native';
import * as API from '../../services/api'
import Loader from '../../components/Loader/Loader'
import { Button, } from 'react-native-elements'


class NewCard extends Component {
    state = {
        question: '',
        answer: '',
        loadingDeck: false
      }
      
      saveDeck = () => {
        const {navigation, screenProps} = this.props
        const { key } = navigation.state.params.item
        const { refreshDeck } = navigation.state.params
        const {question, answer} = this.state
        this.setState({loadingDeck: true})
        API.createCard({key, question: { question, answer}}).then(() => {
          screenProps.refreshList().then(() => {
            refreshDeck().then(navigation.goBack)
          })
        })
      }

      renderLoading = () => {
        return (
          <Loader />
        )
      }

    render() {
    const { loadingDeck } = this.state
    return !loadingDeck ? (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#efefef' }}>
        <View>
          <Text>Pergunta</Text>
          <TextInput
          placeholder=" Ex: Como se diz arroz em ingles? "
          value={this.state.question}
          onChangeText={(text) => this.setState({ question: text })}
          />
          <Text>Resposta</Text>
          <TextInput
          placeholder=" Ex: Rice "
          value={this.state.answer}
          onChangeText={(text) => this.setState({ answer: text})}
          />
          <Button
          raised
          large
          containerStyle={{ marginTop: 20 }}
          onPress={this.saveDeck}
          title="Salvar Deck"
          />
        </View>
      </SafeAreaView>
    ) : this.renderLoading()
  }
}

export default NewCard;

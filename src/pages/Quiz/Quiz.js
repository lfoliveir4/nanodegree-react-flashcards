import React, { Component } from 'react';
import { View, SafeAreaView } from 'react-native'
import * as API from '../../services/api'
import Loader from '../../components/Loader/Loader'
import { Button, Icon } from 'react-native-elements'

import { DeckContainer, QuestionsCount, Title } from './styles';

class Quiz extends Component {
    constructor(props) {
        super(props)
        this.state = {
          item: {
            title: '',
            questions: []
          }
        }
      }

      refreshDeck = () => {
        const { key } = this.props.navigation.state.params.item
        return API.getDeck({key}).then(item => {
          this.setState({item})
        })
      }
      componentDidMount() {
        this.refreshDeck()
      }
      renderLoading = () => {
        return (
          <Loader />
        )
      }


renderQuiz() {
    const { navigation, screenProps } = this.props
    const { item = {} } = this.state
    const questionsCount = (item.questions || []).length || 0
    return item && (
      <SafeAreaView style={{flex: 1, backgroundColor: '#efefef'}}>
        <View style={{flex: 1, backgroundColor: '#efefef'}}>
          <DeckContainer>
            <Title>{item.title}</Title>
            <QuestionsCount>{(!!questionsCount && `${questionsCount} ${questionsCount === 1 ? 'card' : 'cards'}`) || 'Crie seu primeiro card!! 🙂' }</QuestionsCount>
          </DeckContainer>

          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button
              raised
              large
              icon={{name: 'plus', type: 'font-awesome', size: 15}}
              containerViewStyle={{marginBottom: 10, flex: 1}}
              onPress={() => {navigation.navigate('NewCard', {item, refreshDeck: this.refreshDeck})}}
              title='Card' />

            <Button
              raised
              large
              icon={{name: 'play', type: 'font-awesome', size: 15}}
              disabled={!questionsCount}
              containerViewStyle={{marginBottom: 10, flex: 1}}
              onPress={() => {navigation.navigate('Card', {item})}}
              title='Iniciar Quiz' />
          </View>
        </View>
      </SafeAreaView>
    )
  }
  render() {
    const { navigation, screenProps } = this.props
    const { item = {} } = this.state
    const questionsCount = (item.questions || []).length || 0
    return !screenProps.fetchedDecks && this.renderLoading() || this.renderQuiz()
  }
}

export default Quiz;
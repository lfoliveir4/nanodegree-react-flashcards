import React, { Component } from 'react';

import { FlatList, Vibration, Alert, SafeAreaView } from 'react-native';
import * as API from '../../services/api'
import Loader from '../../components/Loader/Loader'
import Deck from '../../components/Deck'

import { Container, DeckMessage } from './styles';

class Decks extends Component {
    handleLongPress = ({item}) => {
      Vibration.vibrate(100)
      Alert.alert(
        'Deseja excluir este deck?',
        `${item.title}`,
        [
          {text: 'Não', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'Sim, Excluir!', onPress: () => this.removeDeck({key: item.key})},
        ],
        { cancelable: false }
      )
    }
    removeDeck = ({key}) => {
      const { screenProps } = this.props
      API.removeDeck({key}).then((decks) => {
        screenProps.refreshList()
      })
    }
    renderDecks = () => {
      const {navigation, screenProps = {}} = this.props
      return (screenProps.decks || []).length ? (
        <SafeAreaView style={{flex: 1, backgroundColor: '#efefef'}}>
          <FlatList
            style={{backgroundColor: '#efefef'}}
            data={screenProps.decks}
            renderItem={({item}) => (
              <Deck 
                questions={item.questions}
                item={item}
                onLongPress={() => this.handleLongPress({item})}
                onPress={() => navigation.navigate('Deck', {item})}>{item.title}</Deck>
            )}
          />
        </SafeAreaView>
      ) : (
        <Container>
          <DeckMessage>Vamos lá!!</DeckMessage>
          <DeckMessage>Crie seu primeiro deck!! 🙂</DeckMessage>
        </Container>
      );
    }
    renderLoading = () => {
      return (
        <Loader />
      )
    }
    render() {
      const {navigation, screenProps} = this.props
      return !screenProps.fetchedDecks && this.renderLoading() || this.renderDecks()
    }
  }

export default Decks;

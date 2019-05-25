import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import * as API from './src/services/api'
import { Constants } from 'expo'
import { NavigationActions, createAppContainer } from 'react-navigation'
import Container from './src/Routes'
import setLocalNotification from './src/services/helpers'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      decks: [],
      loadingDecks: false,
      fetchedDecks: false
    }
  }
  
  componentDidMount() {
    setLocalNotification()
  }

  refreshList = () => {
    this.setState({loadingDecks: true, fetchedDecks: false})
    return API.getDecks().then(decks => {
      this.setState({decks: JSON.parse(decks), fetchedDecks: true, loadingDecks: false}) 
    })
  }

  newDeck = ({navigation, item}) => {
    this.refreshList().then(() => {
      const resetAction = NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'Home'}),
          NavigationActions.navigate({ routeName: 'Deck', params: {item}}),
        ]
      })
      navigation.dispatch(resetAction)
    })
  }

  componentDidMount() {
    this.refreshList()
  }


  render() {
    const { decks, loadingDecks, fetchedDecks } = this.state
    const { refreshList, newDeck } = this


    return (
      <View style={{flex: 1}}>
      <StatusBar translucent   barStyle="light-content" />
      <View style={{flex: 1}}>
        <Container screenProps={{refreshList, newDeck, decks, loadingDecks, fetchedDecks}} />
      </View>
    </View>
    )
  }
}


export default App;

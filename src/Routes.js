import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import Card from './pages/Card/Card'
import Decks from './pages/Decks/Decks'
import Finish from './pages/Finish/Finish'
import NewCard from './pages/NewCard/NewCard'
import NewDeck from './pages/NewDeck/NewDeck'
import Quiz from './pages/Quiz/Quiz'
import { Button } from 'react-native-elements'

const RootNavigator = createStackNavigator({
  Home: {
    screen: Decks,
    navigationOptions: ({ navigate, navigation }) => (
      {
        title: 'FlashCards',
        headerRight: (
          <Button
            onPress={() => {navigation.navigate('NewDeck')}}
            title="Novo Deck"
          />
        )
      }
    )
  },
  Deck: {
    screen: Quiz,
    navigationOptions: {
      title: 'Deck',
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      title: 'Novo Deck',
    }
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      title: 'Novo Card',
    }
  },
  Card: {
    screen: Card,
    navigationOptions: {
      title: 'Quiz',
    }
  },
  Finish: {
    screen: Finish,
    navigationOptions: {
      title: 'Fim',
    }
  }
},
{
  headerMode: 'screen',
  navigationOptions: {
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: '#ffffffdd'
  },
  cardStyle: { shadowColor: 'transparent' },
})

const Container = createAppContainer(RootNavigator);
export default Container;
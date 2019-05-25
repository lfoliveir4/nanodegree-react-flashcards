import React, { Component } from 'react';
import { View, } from 'react-native'
import { Button } from 'react-native-elements'
import { NavigationActions, StackActions } from 'react-navigation'
import * as API from '../../services/api'
import { Container, Count, Title } from './styles';

class Finish extends Component {

  backToDeck = (item) => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home'}),
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

    restartQuiz = (item) => {
      const resetAction = StackActions.reset({
        index: 2,
        actions: [
          NavigationActions.navigate({ routeName: 'Home'}),
          NavigationActions.navigate({ routeName: 'Deck', params: {item}}),
          NavigationActions.navigate({ routeName: 'Card', params: {item}})
        ]
      })
      this.props.navigation.dispatch(resetAction)
    }
   

  render() {
    const { item = {}, score } = this.props.navigation.state.params
    const questionsCount = (item.questions || {}).length || 0

    return (

        <Container>
          
          <Title>{item.title}</Title>
          <Count>{`Você acertou ${score} de ${questionsCount}`}</Count>

          <View style={{justifyContent: 'center', marginTop: 20}}>
            <Button
              raised
              icon={{name: 'refresh', type: 'font-awesome', size: 15}}
              containerViewStyle={{marginBottom: 10}}
              onPress={() => { this.restartQuiz(item) }}
              title='Recomeçar quiz' />
            <Button
              raised
              onPress={() => { this.backToDeck() }}
              icon={{name: 'chevron-left', type: 'font-awesome', size: 15}}
              containerViewStyle={{marginBottom: 10}}
              title='Voltar ao baralho' />
          </View>
        </Container>

    )
  }
}

export default Finish;
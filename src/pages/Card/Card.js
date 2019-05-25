import React, { Component } from 'react';
import FlipCard from 'react-native-flip-card'
import { SafeAreaView } from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation'
import { Button } from 'react-native-elements'
import { View } from 'react-native';

import { Container, Step, Steps, CardFront, CardBack, ContainerCard, Title } from './styles';

class Card extends Component {
  state = {
    disableCard: true,
    currentQuestion: 0,
    fliped: false,
    score: 0,
    hideResponse: true
  }

  handleFlipEnd = (fliped) => {
    this.setState(() => {
      const disableCard = !fliped
      const hideResponse = false;
      return {
        fliped,
        hideResponse,
        disableCard
      }
    })
  }

  handleFlipStart = (fliped) => {
    this.setState(() => {
      const hideResponse = true;
      return {
        fliped,
        hideResponse
      }
    })
  }

  nextCard = (answer) => {
    const { navigation } = this.props
    const { item = {} } = navigation.state.params
    this.setState(({currentQuestion, score}) => {
      if(currentQuestion + 1 >= (item.questions || []).length) {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Finish', 
            params: {item, score: answer ? score + 1 :  score}
          })
          ]
        })
        this.props.navigation.dispatch(resetAction)
      }
      return {
        currentQuestion: currentQuestion + 1 < (item.questions || []).length ? currentQuestion + 1 :  currentQuestion,
        disableCard: true,
        hideResponse: true,
        fliped: false,
        score: answer ? score + 1 :  score
      }
    })
  }

  render() {
    const {children, questions, navigation, ...props} = this.props
    const { item } = navigation.state.params
    const { disableCard, fliped, currentQuestion, score, hideResponse } = this.state
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#efefef'}}>
        <Container>
          <Steps>
            <Step>{`${currentQuestion + 1}/${(item.questions || {}).length || 0}`}</Step>
          </Steps>
          <ContainerCard> 
            <FlipCard 
              perspective={1000}
              friction={6}
              flipHorizontal={true}
              flipVertical={false}
              flip={fliped}
              clickable={true}
              onFlipEnd={this.handleFlipEnd}
              onFlipStart={this.handleFlipStart}
              syle={{borderWidth: 0}}>
              <CardFront>
                <Title>{item.questions[currentQuestion].question}</Title>
              </CardFront>
              <CardBack>
                <Title hideResponse={hideResponse}>{item.questions[currentQuestion].answer}</Title>
              </CardBack>
            </FlipCard>
          </ContainerCard>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button
              raised
              large
              containerViewStyle={{marginBottom: 10, flex: 1}}
              icon={{name: 'times', type: 'font-awesome', size: 15}}
              disabled={disableCard} onPress={() => {this.nextCard(false)}}
              title='Errei' />
            <Button
              raised
              large
              disabled={disableCard} onPress={() => {this.nextCard(true)}}
              icon={{name: 'check', type: 'font-awesome', size: 15}}
              containerViewStyle={{marginBottom: 10, flex: 1}}
              title='Acertei' />
          </View>
        </Container>
      </SafeAreaView>
    )
  }
}

export default Card;

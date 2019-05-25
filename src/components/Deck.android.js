import React, { Component } from 'react';

import { View, Text, Alert, TouchableNativeFeedback } from 'react-native'
import styled from 'styled-components/native'
import * as API from '../services/api'


const Title = styled.Text`
  color: black;
  font-size: 24;
  text-align: center;
`

const Count = styled.Text`
  color: #555;
  font-size: 18;
  text-align: center;
`

const Container = styled.View`
  border-top-width: 0;
  padding-top: 25;
  padding-bottom:  25;
`

const Deck = ({children, questions = [], item = {}, ...props}) => {
  const questionsCount = questions.length || 0
  return (
    <TouchableNativeFeedback {...props} style={{marginBottom: 10}}>
      <Card>
        <Container>
          <Title>{children}</Title>
          <Count>{(!!questionsCount && `${questionsCount} ${questionsCount === 1 ? 'card' : 'cards'}`) || 'Crie seu primeiro card!! 🙂' }</Count>
        </Container>
      </Card>
    </TouchableNativeFeedback>
  )
};

export default Deck;
import { AsyncStorage } from 'react-native'
export const FLASHCARDS_STORAGE_KEY = 'FlashCards:cards'
import uuidv1 from 'uuid/v1'

export const getDecks = () => {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
}

export const getDeck = ({key}) => {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(decks => {
    decks = JSON.parse(decks) || []
    return decks.find(deck => deck.key === key)
  })
}

export const createDeck = ({title}) => {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(decks => {
    deckList = JSON.parse(decks) || []
    const newDeck = {
      title,
      key: uuidv1(),
      questions: []
    }
    const newDeckList = [...deckList, newDeck]
    AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(newDeckList))
    return newDeck
  })
}

export const removeDeck = ({key}) => {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(decks => {
    deckList = JSON.parse(decks) || []
    const newDeckList = (deckList || []).filter(deck => {
      return deck.key !== key
    })
    AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(newDeckList))
    return newDeckList
  })
}

export const createCard = ({key, question}) => {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(decks => {
    const deckList = JSON.parse(decks) || []
    const newDeckList = deckList.map(deck => {
      if(deck.key === key) {
        deck.questions = [...deck.questions, question]
      }
      return deck
    })
    AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(newDeckList))
  })
}
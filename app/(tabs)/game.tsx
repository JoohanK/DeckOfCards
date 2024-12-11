import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { createDeck, drawCard, shuffleDeck } from "../../services/api";
import { useSettings } from "../../context/SettingsContext";

export default function Game() {
  const { showRemainingGame, deckCountGame } = useSettings();
  const [deckId, setDeckId] = useState<string | null>(null);
  const [card, setCard] = useState<string | null>(null);
  const [secondCard, setSecondCard] = useState<string | null>(null);
  const [cardValue, setCardValue] = useState<number | null>(null);
  const [secondCardValue, setSecondCardValue] = useState<number | null>(null);
  const [remainingCards, setRemainingCards] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState<number>(0);
  const [rematch, setRematch] = useState<boolean | null>(null);

  useEffect(() => {
    const initializeDeck = async () => {
      const deck = await createDeck(deckCountGame);
      setDeckId(deck.deck_id);
      setRemainingCards(deck.remaining);
    };

    initializeDeck();
  }, [deckCountGame]);

  const handleDrawCardStart = async () => {
    if (deckId) {
      const drawn = await drawCard(deckId, 2);
      setCard(drawn.cards[0].image);
      setSecondCard(drawn.cards[1].image);
      setRemainingCards(drawn.remaining);
      setCardValue(getCardNumericValue(drawn.cards[0].value));
      setSecondCardValue(getCardNumericValue(drawn.cards[1].value));
      setGameStarted(true);
      console.log(drawn.cards);
    }
  };

  const handleDrawCardNotStart = async () => {
    if (deckId) {
      const drawn = await drawCard(deckId, 1);
      if (drawn.remaining === 0) {
        setGameStarted(false);
        setRematch(true);
      }
      setRemainingCards(drawn.remaining);
      setCard(secondCard);
      setCardValue(secondCardValue);
      setSecondCard(drawn.cards[0].image);
      setSecondCardValue(getCardNumericValue(drawn.cards[0].value));
    }
  };

  const handleShuffleDeck = async () => {
    if (deckId) {
      const shuffled = await shuffleDeck(deckId);
      setRemainingCards(shuffled.remaining);
      setCard(null);
      setGameStarted(false);
      setScore(0);
      setRematch(false);
      setIsCorrect(null);
    }
  };

  const getCardNumericValue = (value: string) => {
    switch (value) {
      case "ACE":
        return 1;
      case "JACK":
        return 11;
      case "QUEEN":
        return 12;
      case "KING":
        return 13;
      default:
        return parseInt(value, 10);
    }
  };

  const handleGuessLower = async () => {
    if (secondCardValue !== null && cardValue !== null) {
      const isCorrectGuess = secondCardValue < cardValue;
      setIsCorrect(isCorrectGuess);
      if (isCorrectGuess) {
        setScore(score + 1);
      }
      setCardValue(secondCardValue);
      handleDrawCardNotStart();
    }
  };

  const handleGuessHigher = async () => {
    if (secondCardValue !== null && cardValue !== null) {
      const isCorrectGuess = secondCardValue > cardValue;
      setIsCorrect(isCorrectGuess);
      if (isCorrectGuess) {
        setScore(score + 1);
      }
      setCardValue(secondCardValue);
      handleDrawCardNotStart();
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Score: {score}</Text>
        {isCorrect !== null && !rematch && (
          <Text style={styles.text}>
            {isCorrect ? "Correct!" : "Incorrect!"}
          </Text>
        )}
      </View>
      {!gameStarted && !rematch && (
        <TouchableOpacity style={styles.button} onPress={handleDrawCardStart}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      )}

      {gameStarted && !rematch && (
        <View style={styles.lowerHigherContainer}>
          <Pressable style={styles.button} onPress={handleGuessLower}>
            <Text style={styles.buttonText}>Lower</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={handleGuessHigher}>
            <Text style={styles.buttonText}>Higher</Text>
          </Pressable>
        </View>
      )}
      {showRemainingGame && (
        <Text style={styles.text}>
          {remainingCards ? `Remaining cards: ${remainingCards}` : ""}
        </Text>
      )}

      <Image
        source={{
          uri: card || "https://deckofcardsapi.com/static/img/back.png",
        }}
        style={styles.card}
      />

      <TouchableOpacity style={styles.button} onPress={handleShuffleDeck}>
        <Text style={styles.buttonText}>Shuffle Deck</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  card: {
    width: 200,
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: "#333",
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#1b2a41",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  lowerHigherContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    margin: 20,
    width: "100%",
  },
});

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
      setCard(drawn.cards[0].image); // Set card image URL
      setSecondCard(drawn.cards[1].image); // Set second card image URL
      setRemainingCards(drawn.remaining + 1); // Set remaining cards count
      setCardValue(
        getCardNumericValue(drawn.cards[0].value) // Set card numeric value
      );
      setSecondCardValue(
        getCardNumericValue(drawn.cards[1].value) // Set second card numeric value
      );
      setGameStarted(true);
      console.log(drawn.cards);
    }
  };

  const handleDrawCardNotStart = async () => {
    if (deckId) {
      const drawn = await drawCard(deckId, 1);
      setRemainingCards(drawn.remaining + 1); // Set remaining cards count
      setCard(secondCard);
      setCardValue(secondCardValue);
      setSecondCard(drawn.cards[0].image); // Set second card image URL
      setSecondCardValue(
        getCardNumericValue(drawn.cards[0].value) // Set second card numeric value
      );
    }
  };

  const handleShuffleDeck = async () => {
    if (deckId) {
      const shuffled = await shuffleDeck(deckId);
      setRemainingCards(shuffled.remaining); // Set remaining cards count
      setCard(null); // Reset card image
      setGameStarted(false);
      setScore(0);
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
      const isCorrectGuess = secondCardValue < cardValue; // Check if second card is lower
      setIsCorrect(isCorrectGuess);
      if (isCorrectGuess) {
        setScore(score + 1); // Increment score if guess is correct
      }
      setCardValue(secondCardValue); // Update current card value to the second card value
      handleDrawCardNotStart(); // Draw a new card to continue
    }
  };

  const handleGuessHigher = async () => {
    if (secondCardValue !== null && cardValue !== null) {
      const isCorrectGuess = secondCardValue > cardValue; // Check if second card is higher
      setIsCorrect(isCorrectGuess);
      if (isCorrectGuess) {
        setScore(score + 1); // Increment score if guess is correct
      }
      setCardValue(secondCardValue); // Update current card value to the second card value
      handleDrawCardNotStart(); // Draw a new card to continue
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Score: {score}</Text>
        {isCorrect !== null && (
          <Text style={styles.text}>
            {isCorrect ? "Correct!" : "Incorrect!"}
          </Text>
        )}
      </View>
      {!gameStarted ? (
        <TouchableOpacity style={styles.button} onPress={handleDrawCardStart}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      ) : (
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

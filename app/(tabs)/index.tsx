import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { createDeck, drawCard, shuffleDeck } from "../../services/api";
import { useSettings } from "../../context/SettingsContext";

export default function HomeScreen() {
  const { showRemaining, deckCount } = useSettings();
  const [deckId, setDeckId] = useState<string | null>(null);
  const [card, setCard] = useState<string | null>(null);
  const [remainingCards, setRemainingCards] = useState<number>(0);

  useEffect(() => {
    const initializeDeck = async () => {
      const deck = await createDeck(deckCount);
      setDeckId(deck.deck_id);
      setRemainingCards(deck.remaining);
    };

    initializeDeck();
  }, [deckCount]);

  const handleDrawCard = async () => {
    if (deckId) {
      const drawn = await drawCard(deckId, 1);
      setCard(drawn.cards[0].image); // Set card image URL
      setRemainingCards(drawn.remaining); // Set remaining cards count
    }
  };

  const handleShuffleDeck = async () => {
    if (deckId) {
      const shuffled = await shuffleDeck(deckId);
      setRemainingCards(shuffled.remaining); // Set remaining cards count
      setCard(null); // Reset card image
    }
  };

  return (
    <View style={styles.container}>
      {showRemaining && (
        <Text style={styles.text}>
          {remainingCards ? `Remaining cards: ${remainingCards}` : ""}
        </Text>
      )}
      <TouchableOpacity onPress={handleDrawCard}>
        <Image
          source={{
            uri: card || "https://deckofcardsapi.com/static/img/back.png",
          }}
          style={styles.card}
        />
      </TouchableOpacity>
      <Text style={styles.text}>
        {card ? "Tap to draw a new card!" : "Tap to draw your first card!"}
      </Text>
      <TouchableOpacity
        style={styles.shuffleButton}
        onPress={handleShuffleDeck}
      >
        <Text style={styles.shuffleButtonText}>Shuffle Deck</Text>
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
  shuffleButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#1b2a41",
    borderRadius: 5,
  },
  shuffleButtonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});

import axios from "axios";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

export const createDeck = async (deckCount: number = 1) => {
  const response = await axios.get(
    `${API_BASE_URL}/new/shuffle/?deck_count=${deckCount}`
  );
  return response.data; // Returns { deck_id, shuffled, remaining }
};

export const drawCard = async (deckId: string, cardCount: number) => {
  const response = await axios.get(
    `${API_BASE_URL}/${deckId}/draw/?count=${cardCount}`
  );
  return response.data; // Returns { cards, remaining }
};

export const shuffleDeck = async (deckId: string) => {
  try {
    const response = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`
    );
    return response.data;
  } catch (error) {
    console.error("Error shuffling deck:", error);
  }
};

import React from "react";
import {
  View,
  Text,
  Switch,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useSettings } from "../../context/SettingsContext";

export default function SettingsScreen() {
  const {
    showRemaining,
    setShowRemaining,
    deckCount,
    setDeckCount,
    showRemainingGame,
    setShowRemainingGame,
    deckCountGame,
    setDeckCountGame,
  } = useSettings();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Deck Settings</Text>
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Show Remaining Cards</Text>
        <Switch value={showRemaining} onValueChange={setShowRemaining} />
      </View>
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Number of Decks</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={deckCount.toString()}
          onChangeText={(value) => setDeckCount(Number(value))}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />
      </View>
      <br />
      <Text style={styles.header}>Game settings</Text>
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Show Remaining Cards</Text>
        <Switch
          value={showRemainingGame}
          onValueChange={setShowRemainingGame}
        />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Number of Decks</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={deckCountGame.toString()}
          onChangeText={(value) => setDeckCountGame(Number(value))}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1b2a41",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  settingLabel: {
    fontSize: 18,
    color: "#333",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    width: 50,
    textAlign: "center",
  },
});

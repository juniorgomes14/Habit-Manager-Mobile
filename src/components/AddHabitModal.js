import React, { useState } from "react";
import { View, Text, TextInput, Button, Modal, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { taskOperations } from "../../database/database";

const AddHabitModal = ({ visible, onClose }) => {
  const icons = ["📚", "🛒", "🏋️‍♂️", "🎵", "💻", "✏️"]; // Lista de ícones
  const colors = ["red", "blue", "green", "orange", "purple"]; // Lista de cores

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(icons[0]); // Agora icons já foi definido
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleSave = async () => {
    await taskOperations.createTask(title, subtitle, selectedIcon, selectedColor);
    console.log("Tarefa salva!");
    onClose(); // Fecha o modal ou volta para a tela anterior
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Button title="X" onPress={onClose} />

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Title</Text>
            <TextInput style={styles.input} onChangeText={setTitle} value={title} />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Subtitle</Text>
            <TextInput style={styles.input} onChangeText={setSubtitle} value={subtitle} />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Icon</Text>
           
            <Picker selectedValue={selectedIcon} onValueChange={(itemValue) => setSelectedIcon(itemValue)}>
              {icons.map((icon, index) => (
                <Picker.Item key={index} label={icon} value={icon} />
              ))}

            </Picker>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Color</Text>
            <FlatList
              horizontal
              data={colors}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (

                <TouchableOpacity
                  onPress={() => setSelectedColor(item)}
                  style={{
                    backgroundColor: item,
                    width: 40,
                    height: 40,
                    margin: 5,
                    borderRadius: 20,
                    borderWidth: selectedColor === item ? 2 : 0,
                    borderColor: "black",
                  }}
                />
              )}
            />
          </View>

          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveText}>ADD</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo escuro semi-transparente
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center", // Garante que o modal não saia do centro
  },
  inputContainer: {
    marginBottom: 10,
    width: "100%", // Ajusta para ocupar toda a largura do modal
  },
  label: {
    marginBottom: 5,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center", // Centraliza o texto dos labels
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    width: "100%", // Ajusta a largura do input
    backgroundColor: "white",
  },
  saveButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "black",

    width: "100%",
    borderRadius: 5,
    alignItems: "center",
  },
  saveText: {
    color: "white",
    textAlign: "center",
  },
});

export default AddHabitModal;

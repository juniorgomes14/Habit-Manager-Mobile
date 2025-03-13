import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useState } from "react";
import HabitList from "../components/habit";
import AddHabitModal from "../components/AddHabitModal"; 

const HomeScreen = () => {
  const dataT = new Date();
  const [modalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState([]);

  const today = dataT.toLocaleDateString("pt-BR", { day: "numeric", month: "long" });

  const daysOfWeek = [
    { id: "1", name: "Dom" },
    { id: "2", name: "Seg" },
    { id: "3", name: "Ter" },
    { id: "4", name: "Qua" },
    { id: "5", name: "Qui" },
    { id: "6", name: "Sex" },
    { id: "7", name: "Sáb" },
  ];

 
  const handleAddTask = (newTask) => {
    setTasks([...tasks, { id: tasks.length + 1, ...newTask }]);
  };

  return (
    <View style={styles.container}>
      <AddHabitModal visible={modalVisible} onClose={() => setModalVisible(false)} onSave={handleAddTask} />

      <View style={styles.topInfo}>
        <View style={styles.leftTop}>
          <Text style={styles.leftTopText}>Hoje {today}</Text>
        </View>

        <View style={styles.rightTop}>
          <TouchableOpacity style={styles.rightButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.rightText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.lista}>
        <View style={styles.dayCalen}>

          <FlatList
            data={daysOfWeek}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.dayItem}>
                <Text style={styles.dayText}>{item.name}</Text>
              </View>
            )}
          />
        </View>
      </View>

      <HabitList habits={tasks} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  topInfo: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "black",
    width: "100%",
    height: 150,
  },
  leftTopText: { padding: 10, color: "white", fontSize: 23 },
  rightTop: { padding: 10 },
  rightButton: {
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    height: 50,
    width: 50,
  },
  rightText: { color: "white", fontSize: 26 },
  lista: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#484D50",
    width: "100%",
    height: 100,
  },
  dayItem: { padding: 15 },
  dayText: { color: "white", fontSize: 16 },
});

export default HomeScreen;

import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const HabitList = ({ habits }) => {
  return (
    <View style={styles.container}>

      <FlatList
        data={habits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (

          <View style={styles.habitItem}>
            <Icon name={item.icon} size={30} color="white" style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              {item.subtitle ? <Text style={styles.subtitle}>{item.subtitle}</Text> : null}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1
  },
  habitItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
   
    
  },
  icon: {
    marginRight: 10,
    alignItems:'center'
  },
  textContainer: {
    flex: 1,
    alignItems:'center'
   
  },
  title: {
    fontSize: 16,
     color:'white'
   
  },
  subtitle: {
    fontSize: 14,
    color: "#757575",
  },
});

export default HabitList;
import { View,Text,StyleSheet } from "react-native"
 const HistoryScreen=()=>{


    return(
        <View style={styles.container}>
            <Text style={styles.topText} >History</Text>    
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    topText:{
        fontSize:18,

    },
})
export default HistoryScreen
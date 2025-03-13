import { StyleSheet, Text, View } from 'react-native';




const Meu =()=>{
    return(
        <View style={styles.container}>
            <View >
                <View>
                    <Text>Informacao do perfil</Text>
                </View>
                <View>
                    <Text>definicao</Text>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    }
})
export default Meu
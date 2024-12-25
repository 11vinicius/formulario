import { Text, TouchableOpacity, StyleSheet } from "react-native";

interface IButtonComponent{
    title: string;
    backgroundColor: string;
    color: string;
    onPress: () => void
}

export function ButtonComponent(props: IButtonComponent){
    const styles = StyleSheet.create({
        container:{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 8,
            borderRadius: 10,
            backgroundColor: props.backgroundColor
        },
        text:{
            color: props.color,
            fontWeight: 'bold',
            fontSize: 16
        }   
    })

    return (
        <TouchableOpacity onPress={props.onPress} style={styles.container}>
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    )
}
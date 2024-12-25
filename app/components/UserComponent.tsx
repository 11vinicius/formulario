import { View, Text, StyleSheet } from "react-native";
import { ButtonComponent } from "./ButtonComponent";

interface IUserComponent extends IUser{
    delete:() => void
    edit: () => void
}

export function UserComponent(props: IUserComponent){

    const styles = StyleSheet.create({
        container:{
            flex:1,
            justifyContent: 'space-between',
            backgroundColor: '#ffffff',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            flexDirection: 'row',
            padding: 10,
            margin: 8,
            gap:8
        },
        groupButton:{
            flexDirection: 'row',
            gap:4
        },
        title:{
            fontWeight: 'bold',
            fontSize: 20
        }
    })

    return  (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>{props.name}</Text>
                <Text>{props.email}</Text>
            </View>
            <View style={styles.groupButton}>
                <ButtonComponent backgroundColor="blue" title="Editar" onPress={props.edit} color="white"/>
                <ButtonComponent backgroundColor="red" title="Excluir" onPress={props.delete} color="white"/>
            </View>
        </View>
    )
}


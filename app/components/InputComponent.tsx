import { useEffect, useState } from "react"
import { TextInput, Text, StyleSheet, View} from "react-native"

interface IInputComponent{
    placeholder: string
    onchangeText: (text: string) => void
    value?: string
    error?: string | null
    secureTextEntry?: boolean
}

export function InputComponent(props: IInputComponent) {
    const [focus, setFocus] = useState<boolean>(false)

    const styles = StyleSheet.create({
        constainer:{
            margin: 4,
        },
        input:{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 8,
            borderRadius: 10,
            backgroundColor: '#ffffff',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        focusInput:{
            borderColor: '#000',
            borderWidth: 2
        },
        errorInput:{
            borderColor: 'red',
            borderWidth: 2
        },
        error:{
            color: 'red',
            fontWeight: 'bold',
            marginTop: 5
        }
    })

    return (
        <View style={styles.constainer}>
            <TextInput 
                onFocus={() => setFocus(true)} 
                onBlur={() => setFocus(false)}  
                style={[styles.input, focus? styles.focusInput : null, props.error? styles.errorInput:null]} 
                value={props.value} 
                placeholder={props.placeholder} 
                onChangeText={props.onchangeText}
                secureTextEntry={props.secureTextEntry}
            />
            {props.error && <Text style={styles.error}>{props.error}</Text>}
        </View>
    )
}
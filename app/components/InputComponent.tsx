import { useState } from "react"
import { TextInput, Text, StyleSheet, View, TouchableOpacity } from "react-native"
import Feather from '@expo/vector-icons/Feather';

interface IInputComponent{
    placeholder: string
    onchangeText: (text: string) => void
    value?: string
    error?: string | null
    secureTextEntry?: boolean
    isButtonInObscure?: boolean
}

export function InputComponent(props: IInputComponent) {
    const [focus, setFocus] = useState<boolean>(false)
    const [obscure, setObscure] = useState<boolean>(props.secureTextEntry? true : false)

    const styles = StyleSheet.create({
        constainer:{
            margin: 4,
        },
        inputArea:{
            padding: 8,
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#ffffff',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        input:{
            flex:1
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
            <View style={[styles.inputArea, focus? styles.focusInput : null, props.error? styles.errorInput:null]}>
                <TextInput 
                    style={styles.input}
                    onChangeText={props.onchangeText}
                    value={props.value} 
                    onFocus={() => setFocus(true)} 
                    onBlur={() => setFocus(false)}  
                    placeholder={props.placeholder} 
                    secureTextEntry={obscure}
                />
                {props.isButtonInObscure &&
                    <TouchableOpacity onPress={() => setObscure(!obscure)}>
                        {obscure?   
                            <Feather name="eye" size={24} color="black" />:
                            <Feather name="eye-off" size={24} color="black" />
                        }
                    </TouchableOpacity>
                }
            </View>
            {props.error && <Text style={styles.error}>{props.error}</Text>}
        </View>
    )
}
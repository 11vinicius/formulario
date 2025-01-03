import { View, StyleSheet } from "react-native";
import { Controller, useForm,  } from "react-hook-form"
import { InputComponent } from "../components/InputComponent";
import { ButtonComponent } from "../components/ButtonComponent";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingComponent } from "../components/LoadingComponent";
import { useState } from "react";
import { useRouter } from "expo-router";
import { api } from "../service/baseService";
import { Camera } from "expo-camera";
import { CameraComponent } from "../components/CameraComponent";

export default function Create() {

    const [loading, setLoading] = useState<Boolean>(false)
    const route = useRouter();

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          padding: 20
        },
        group: {
          flexDirection: 'row',
          marginTop: 20,
          gap: 10,
          justifyContent: 'center',
        }
      });

    const schema = z.object({
        name: z.string().min(1, 'O nome deve ter pelo menos 2 caracteres'),
        email: z.string().email('Insira um e-mail válido'),
        password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
    });

    const { formState: { errors }, handleSubmit, control } = useForm<IUser>({
        resolver: zodResolver(schema),  
    })
    async function onSubmit(data: IUser) {
        try {
            setLoading(true)
            const res = await api.post('/',{
                name: data.name,
                email: data.email,
                password: data.password,
                avatar:null
            })
            if(res.status === 201){
                route.replace('/user/home')
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
       
    }

    function handleCancel(){
        route.replace('/user/home')
    }

    if(loading){  
        return (
            <LoadingComponent/>
        )
    }

    return (
        <View style={styles.container}>
            <Controller
                control={control}
                name="name"
                defaultValue=''
                render={({ field: { onChange, value } } ) => 
                    <InputComponent value={value} placeholder="Digite nome" error={errors.name?.message? String(errors.name?.message) :null} onchangeText={onChange} />
                }
            />
            <Controller
                control={control}
                name="email"
                defaultValue=''
                render={({ field: { onChange, value } } ) => 
                    <InputComponent value={value} placeholder="Digite email" error={errors.email?.message? String(errors.email?.message) :null} onchangeText={onChange} />
                }
            />
            <Controller
                control={control}
                name="password"
                defaultValue=''
                render={({ field: { onChange, value } } ) => 
                    <InputComponent value={value} placeholder="Digite password" error={errors.password?.message? String(errors.password?.message) :null} onchangeText={onChange} />
                }
            />
            
            <CameraComponent/>

            <View style={styles.group}>
                <ButtonComponent title="Cadastrar" backgroundColor="green" color="#fff" onPress={handleSubmit(onSubmit)}/>
                <ButtonComponent title="Cancelar" backgroundColor="red" color="#fff" onPress={handleCancel}/>
            </View>
        </View> 
    );
}
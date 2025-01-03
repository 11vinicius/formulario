import { View, StyleSheet} from "react-native";
import { InputComponent } from "../components/InputComponent";
import { useForm, Controller } from "react-hook-form"
import { ButtonComponent } from "../components/ButtonComponent";
import { useLocalSearchParams, useRouter } from "expo-router";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { userService } from "../service/user.service";
import { useEffect, useState } from "react";
import { LoadingComponent } from "../components/LoadingComponent";


export default function Edit() {
    const { id } =  useLocalSearchParams<{id:string}>();
    const [user, setUser] = useState<IUser>();
    const [loading, setLoading] = useState<Boolean>(true)
    const route = useRouter();
    const service = userService();

    async function fechUser(){
        const { data } = await service.findById(id)
        const user = data
        setTimeout(() => {
            setUser(user)
            setLoading(false)
        },2000)
    }

    useEffect(() => {
        fechUser()
    },[])

    const schema = z.object({
        name: z.string().min(1, 'O nome deve ter pelo menos 2 caracteres'),
        email: z.string().email('Insira um e-mail válido'),
        password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
    });
      
    const { formState: { errors }, handleSubmit, control } = useForm<IUser>({
        resolver: zodResolver(schema),
    })

    const styles = StyleSheet.create({
        container:{
            flex:1,
            paddingTop:20,
            paddingHorizontal:20
        },
        groupButton:{
            flexDirection: 'row',
            gap:4,
            justifyContent: 'center',
            marginTop: 10
        }
    })

    function handleCancel(){
        route.replace('/user/home')
    }
    async function onSubmit(data: IUser){ 
        const api = await service.update(id, data)
        console.log(api)
        // route.replace('/user/home')
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
                defaultValue={user!.name}
                render={({ field: { onChange, value } } ) => 
                <InputComponent value={value} placeholder="Digite nome" error={errors.name?.message? String(errors.name?.message) :null} onchangeText={onChange} />
            }
            />

            <Controller
                control={control}
                name="email"
                defaultValue={user!.email}
                render={({ field: { onChange, value } } ) => 
                <InputComponent value={value} placeholder="Digite e-mail" error={errors.email?.message? String(errors.email?.message) :null} onchangeText={onChange} />
            }
            />

            <Controller
                control={control}
                name="password"
                defaultValue={user!.password}
                render={({ field: { onChange, value } } ) => {
                    return <InputComponent isButtonInObscure={true} secureTextEntry={true} value={value} placeholder="Digite password " error={errors.password?.message? String(errors.password?.message) :null} onchangeText={onChange} />
                }
            }
            />  
        
            <View style={styles.groupButton}>
                <ButtonComponent backgroundColor="green" color="white" title="Salvar" onPress={handleSubmit(onSubmit)}/>
                <ButtonComponent backgroundColor="red" color="white" title="Cancelar" onPress={handleCancel}/>
            </View>

        </View>
    )
}
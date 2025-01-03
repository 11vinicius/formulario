import { FlatList, TouchableOpacity, View, StyleSheet } from "react-native";
import { userService } from "../service/user.service";
import React, { useEffect, useState } from "react";
import { UserComponent } from "../components/UserComponent";
import { LoadingComponent } from "../components/LoadingComponent";
import { useRouter } from "expo-router";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Toastr } from "../components/tostrMessage";

export default function Home() {
  const route = useRouter()
  const [users, setUsers] = useState<IUser[]>([])
  const [loading, setLoading] = useState<Boolean>(false)
  const [IsMessage, setIsMessage] = useState<Boolean>(false)
  const service = userService()
  async function fetchUser(){
    try {
      const { data } = await service.findAll()
      setUsers(data)
  
      setTimeout(() => {
        setLoading(false)
      },2000)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])
  async function handleDelete(id: String){
    setLoading(true)
    const res = await service.del(id)
    setIsMessage(true)
    if(res.status === 200){
      fetchUser()
    }
  }
  function handleEdit(id: String){
    route.replace(`/user/${id}`,)
  }

  function handleCreate(){
    route.replace('/user/create')
  }

  if(loading){  
    return (
     <LoadingComponent/>
    )
  }

  return (
    <View style={styles.container}>
     <Toastr message="Usuário deletado com sucesso" isVisible={IsMessage} background="green" color="white"/>
      <FlatList data={users} 
        renderItem={
          ({item}) => <UserComponent {...item} delete={()=>handleDelete(item.id!)} edit={() => handleEdit(item.id!)}/>
        } 
      />
      <TouchableOpacity onPress={handleCreate} style={styles.button}>
        <FontAwesome6 name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  button: {
    backgroundColor:'blue',
    position: 'absolute',
    right: 30,
    bottom: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50
  },
});

import { FlatList, View } from "react-native";
import { userService } from "./service/user.service";
import { useEffect, useState } from "react";
import { UserComponent } from "./components/UserComponent";
import { LoadingComponent } from "./components/LoadingComponent";
import { useRouter } from "expo-router";

export default function Index() {
  const route = useRouter()
  const [users, setUsers] = useState<IUser[]>([])
  const [loading, setLoading] = useState<Boolean>(true)
  const service = userService()
  async function fetchUser(){
    const { data } = await service.findAll()
    const users = data
    setUsers(data)

    setTimeout(() => {
      setLoading(false)
    },2000)
  }

  useEffect(() => {
    fetchUser()
  }, [])
  async function handleDelete(id: String){
    setLoading(true)
    const res = await service.del(id)
    if(res.status === 200){
      fetchUser()
    }
  }
  function handleEdit(id: String){
    route.replace(`/user/${id}`,)
  }

  if(loading){  
    return (
     <LoadingComponent/>
    )
  }

  return (
    <View>
      <FlatList data={users} 
      renderItem={
        ({item}) => <UserComponent  {...item} delete={()=>handleDelete(item.id!)} edit={() => handleEdit(item.id!)}/>
      } 
    />
    </View>
  );
}

import { View, StyleSheet } from "react-native";
import React from "react";

import { useRouter } from "expo-router";
import { ButtonComponent } from "./components/ButtonComponent";

export default function Index() {

  const route = useRouter()
  function redirect(){
    route.replace('/user/home')
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
  });

  return (
    <View style={styles.container}>
      <ButtonComponent title="Entrar" backgroundColor="#000" color="#fff" onPress={() => redirect()} />
    </View>
  );
}

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';

type ToastrProps = {
  message: string
  background: string
  isVisible: Boolean
  color:string
};

export function Toastr (props: ToastrProps) {
  const [visible, setVisible] = useState(props.isVisible);
  const translateY = new Animated.Value(-100);

  useEffect(() => {
    // Animação para exibir o Toastr
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

//     // Ocultar automaticamente após o tempo definido
    const timer = setTimeout(() => {
        Animated.timing(translateY, {
            toValue: -100,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            setVisible(false);
          });
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 20,
      left: 20,
      right: 20,
      padding: 15,
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 1000,
      backgroundColor: props.background,
    },
    message: {
      color: props.color,
      fontSize: 16,
      flex: 1,
    },
  });

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY }] },
      ]}>
      <Text style={styles.message}>{props.message}</Text>
    </Animated.View>
  );
};




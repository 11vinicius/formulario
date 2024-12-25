import { View, ActivityIndicator } from "react-native";

export function LoadingComponent(){
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#000" />
        </View>
    )
}
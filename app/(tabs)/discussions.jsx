import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from "expo-font";
import { Link } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function Discussion () {
    const [loaded,error] = useFonts({
        "moradok": require("../../assets/fonts/MonradokTrial-Regular.otf")
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    },[loaded,error])

    if (!loaded && !error) {
        return null;
    }

    return (
       <SafeAreaProvider>
         <SafeAreaView style={styles.wrapper}>
            <View style={styles.wrapper}>
             <View style={styles.header}>
                <Text style={styles.brandText}>Unichat</Text>
                <Link href="create-discussion">
                    <FontAwesome name="pencil-square-o" size={32} color="green" />
                </Link>
            
             </View>
        </View>
         </SafeAreaView>
       </SafeAreaProvider>
       
       
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingHorizontal: 12
    },
    header :{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between"
    },
    brandText :{
        fontFamily: "moradok",
        fontSize: 36,
        color: "black",
        fontWeight: "semibold"
    }
});
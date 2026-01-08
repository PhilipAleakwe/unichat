import { Redirect, useRouter } from "expo-router";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import { ActivityIndicator } from "react-native-web";
import * as yup from "yup";
import { auth } from "../confiq/firebase";


const validationRules = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required().min(6).max(16),
    comfirm: yup.string().oneOf([yup.ref("password"),null])
});

export default function CreateDiscussion () {
    const [activity,setActivity] = useState(false);
    const [user,setUser] = useState(undefined);

    useEffect(() =>{
        if (user !== undefined) {
            return <Redirect href="/(tabs)/discussions"/>
        }
    },[user]);

    const auth_ = getAuth();
    const router = useRouter();

    const { handleChange,handleBlur,errors,values,touched,handleSubmit,resetForm } = useFormik({
        initialValues: { email:"",password:"",confirm:"" },
        onSubmit: async() => {
            setActivity(true);
            try {
                const userCredential = await createUserWithEmailAndPassword(auth,values.email,values.password);
                setUser(userCredential.user);
            } catch (e) {
                Alert.alert("Error",e.message);
            } finally {
                setActivity(false);
            }
        },
        validationSchema: validationRules
    });

    return (
        <KeyboardAvoidingView
            style={styles.wrapper}
            behavior="padding"
            keyboardVerticalOffset={Platform.select({
                ios: 0,
                android: -StatusBar.currentHeight,
            })}>

            <ScrollView
                contentContainerStyle={styles.ScrollViewContainer}
                showsVerticalScrollIndicator={false}>
                <View style={styles.body}>
                    {/* <StatusBar translucent={false} barStyle="light-content"/> */}
                    <View style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                        marginBottom: 22
                    }}>
                        <Text style={{ fontSize:42, fontWeight: "600" }}>UNICHAT</Text>
                        <Text style={{ fontSize:36, fontWeight: "400" }}>Create account</Text>

                    </View>

                  <View style={styles.form}>
                    
                     <View style={styles.inputBlock}>
                         <TextInput
                         keyboardType="email-address"
                         placeholder="valid email"
                         style={styles.input}
                         value={values.email}
                         onChangeText={handleChange("email")}
                         onBlur={handleBlur("email")}/>
                         {errors.email && touched.email && <Text style={styles.errorText}>{errors.email}</Text>}
                     </View>
                    <View style={styles.inputBlock}>
                         <TextInput
                         keyboardType="default"
                         placeholder="create password"
                         secureTextEntry={true}
                         style={styles.input}
                         value={values.password}
                         onChangeText={handleChange("password")}
                         onBlur={handleBlur("password")}/>
                         {errors.password && touched.password && <Text style={styles.errorText}>{errors.password}</Text>}
                     </View>
                    <View style={styles.inputBlock}>
                         <TextInput
                         keyboardType="default"
                         placeholder="confirm password"
                         secureTextEntry={true}
                         style={styles.input}
                         value={values.confirm}
                         onChangeText={handleChange("confirm")}
                         onBlur={handleBlur("confirm")}/>
                         {errors.confirm && touched.confirm && <Text style={styles.errorText}>{errors.confirm}</Text>}
                     </View>

                    <Pressable
                    onPress={handleSubmit}
                    style={styles.submit}>
                        {activity
                        ?
                        <ActivityIndicator size={36} color="oldlace"/>
                        :
                        <Text style={{ fontWeight: "bold",color: "oldlace" }}>CREATE ACCOUNT</Text>}
                    </Pressable>
                    </View> 
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
       
    }, 
    ScrollViewContainer: {
        flexGrow: 1,
        justifyContent: "space-between",
         marginBottom: 40,
    },
     body: {
        flex: 1,
        justifyContent: "center",
        paddingBottom: 40,
        paddingHorizontal: 12,
    },
    form: {
        display: "flex",
        gap: 12
    },
    inputBlock: {
        display: "flex",
        gap: 4
    },
    input: {
        borderWidth: 1,
        borderColor: "brown",
        borderRadius: 4,
        fontSize: 16,
        paddingHorizontal: 6,
        
    },
   
        
    errorText: {
        color: "red",
        fontSize: 10
    },
    submit: {
        
       height: 56,
       backgroundColor: "brown",
      borderRadius: 6,
      justifyContent: "center",
      alignItems: "center",

    }
});
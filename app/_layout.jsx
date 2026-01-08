
import { Stack } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext, AuthProvider } from "../confiq/auth-context";

export default function RootLayout() {
  const { currentUser } = useContext(AuthContext);
  const [session,setSession] = useState(false);

  useEffect(() => {
    if (currentUser !== undefined) {
      setSession(true);
    } else {
      setSession(false)
    }
  },[currentUser]);

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={session}>
          <Stack.Screen
          name="(tabs)"
          options={{ 
            title: "Home",
            headerShown: false,
          }}/>
          <Stack.Screen
          name="create-discussion"
          options={{ 
            title: "Create discussion",
            headerShown: true
          }}/>
        </Stack.Protected>

        <Stack.Protected guard={!session}>
          <Stack.Screen
          name="index"
          options={{ 
            title: "Create account",
            headerShown: false
          }}/>
          <Stack.Screen
          name="sign-in"
          options={{ 
            title: "Sign in",
            headerShown: false
          }}/>
        </Stack.Protected>
      </Stack>
    </AuthProvider>
  )
}





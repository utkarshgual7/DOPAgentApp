import { Stack } from "expo-router"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { loadAgent } from "./agentauthSlice"
import { ScannedDataProvider } from "../(pages)/ScannedDataContext"
import ScanToDeliver from "../(pages)/ScanToDeliver"



const AppWrapper = ()=>{
   const dispatch= useDispatch()
   useEffect(()=>{
    dispatch(loadAgent())
   }, [dispatch])
return(
    <>
     <ScannedDataProvider>
<Stack>
    <Stack.Screen name="index" options={{headerShown:false, title:"Home"}}/>
    <Stack.Screen name="(auth)" options={{headerShown:false}}/>
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen name="(pages)" options={{ headerShown: false }} />

   
        {/* <Stack.Screen name="search/[query]" options={{ headerShown: false }} /> */}

</Stack>
</ScannedDataProvider>
</>
)}


export default AppWrapper;
import AsyncStorage  from "@react-native-async-storage/async-storage";

export const getaccessTokenFromAsync = async ()=>{
    const accessToken= await AsyncStorage.getItem("accessToken")
  return accessToken
}

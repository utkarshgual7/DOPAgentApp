import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const loadAgentFromStorage = async()=>{
    try{
        const agentInfo = await AsyncStorage.getItem("agentInfo");
        return agentInfo ? JSON.parse(agentInfo) : null;

    }catch(error){
        return null;
    }
}

// Initial state for authentication
const initialState = {
  isAuthenticated: false,
  agent: null,
  loading: false,
  error: null,
};

const agentauthSlice = createSlice({
  name: "agentauth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.agent = action.payload;
      AsyncStorage.setItem("agentInfo", JSON.stringify(action.payload))
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.agent = null;
      AsyncStorage.removeItem("agentInfo")
    },
    setAgentAction:(state,action)=>{
        state.agent=action.payload
    }
  },
});

export const { loginStart, loginSuccess, loginFailure, setAgentAction,logout } =
  agentauthSlice.actions;

export default agentauthSlice.reducer;

export const loadAgent=()=>async (dispatch)=>{
    const agentInfo = await loadAgentFromStorage()
    if(agentInfo){
        dispatch(setAgentAction(agentInfo))
    }
}

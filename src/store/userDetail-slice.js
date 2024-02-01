import { createSlice } from '@reduxjs/toolkit';

const initialUserDetailState = { empNo: null, name: null,  roles:[] };

const userDetailSlice = createSlice({
    name: 'counter',
    initialState: initialUserDetailState,
    reducers:{
     
     setUserDetails(state, action){
        state.empNo = action.payload.empNo;
        state.name = action.payload.name;
        state.roles = action.payload.roles;
     },
    }  
});

export const userDetailActions = userDetailSlice.actions;

export default userDetailSlice.reducer;
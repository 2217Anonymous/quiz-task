import { createSlice } from "@reduxjs/toolkit"

export const questionReducer = createSlice({
    name:'question',
    initialState:{
        que : [],
        ans : [],
        trace : 0,
    },
    reducers : {
        startTestAction : (state,action) => {
            let {q,answers} = action.payload
            return {
                ...state,
                que : q,
                ans : answers
            }
        },
        moveNextAction : (state) => {
            return {
                ...state,
                trace : state.trace+1
            }
        },
        movePrevAction : (state) => {
            return{
                ...state,
                trace : state.trace-1
            }
        },
        resetAllAction : () => {
            return{
                que : [],
                answers : [],
                trace:0
            }
        }
    }
})

export const {startTestAction,moveNextAction,movePrevAction,resetAllAction} = questionReducer.actions
export default questionReducer.reducer
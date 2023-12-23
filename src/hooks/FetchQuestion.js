import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import data,{answers} from '../data'
import { startTestAction,moveNextAction } from '../redux/question_reducer'
import { getServerData } from "../helper/helper";
import { QUESTIONS } from "../redux/ApiUrl";

export const useFetchQestion = () => {
    const dispatch = useDispatch();   
    const [getData, setGetData] = useState({ isLoading : false, apiData : [], serverError: null});

    useEffect(() => {
        setGetData(prev => ({...prev, isLoading : true}));
        (async () => {
            try {
                let [{questions,answers}] = await getServerData(QUESTIONS)
                if (questions.length > 0) {
                    setGetData(prev => ({ ...prev, isLoading: false }))
                    setGetData(prev => ({ ...prev, apiData: {questions,answers}}))
                    dispatch(startTestAction({q:questions,answers}))
                } else {
                    throw new Error("No Question Available")
                }
            } catch (error) {
                setGetData(prev => ({ ...prev, isLoading: false }))
                setGetData(prev => ({ ...prev, serverError: error }))
            }
        })();
    },[dispatch])
    return [getData, setGetData];
}

export const moveNextQuestion = (dispatch) => {
    try{
        dispatch(moveNextAction())
    } catch(error){
        console.log(error);
    }
}

export const movePrevQuestion = (dispatch) => {
    try{
        dispatch(movePrevQuestion())
    } catch(error){
        console.log(error);
    }
}
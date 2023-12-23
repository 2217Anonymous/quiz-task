import { postServerData } from "../helper/helper";
import { RESULT } from "../redux/ApiUrl";
import { pushResultAction, updateResultAction } from "../redux/result_reducer";

export const pushAnswer = (result) => async (dispatch) => {
    try{
        await dispatch(pushResultAction(result))
    } catch(error){
        console.log(error);
    }
}

export const updateResult = (index,checked) => async (dispatch) => {
    try{
       await dispatch(updateResultAction(index))
    } catch(error){
        console.log(error);
    }
} 

export const publishResult = () => {
    const {result} = resultData
    (async () => {
        try{
            await postServerData(RESULT,resultData,data => data)
        } catch(error){
            console.log(error);
        }
    })()
}
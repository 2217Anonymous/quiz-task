import React, { useEffect, useState } from 'react'
import { useFetchQestion } from '../Actions/FetchQuestion'
import { useDispatch, useSelector } from 'react-redux'
import { updateResult } from '../Actions/setResult'

export default function Questions({onChecked}) {
    const dispatch = useDispatch()
    const [checked,setChecked] = useState(undefined)
    const {trace} = useSelector(state=>state.questions)
    const [{isLoading,apiData,serverError}] = useFetchQestion()
    const result = useSelector(state => state.result.result);
    const questions = useSelector(state => state.questions.que[state.questions.trace])
    useEffect(() => {
        dispatch(updateResult({trace,checked}))
    },[checked])

    const onSelect = (i) => {
        onChecked(i)
        setChecked(i)
        dispatch(updateResult({trace,checked}))
    }

    if(isLoading) return <h3>isLoading</h3>
    if(serverError) return <h3>{serverError || "Unknown Error"}</h3>
    return (
        <>
            <div className="mt-6 uppercase">
                <p className='text-2xl text-white font-semibold mb-4'>{questions?.question}</p>
                <div className='flex flex-col items-start' key={questions?.id}>
                    {
                        questions?.options.map((q, i) => (
                            <label key={i} className='flex items-center mb-3'>
                                <input 
                                    type='radio'
                                    value={false} 
                                    name='options' 
                                    id={`q${i}-option`} 
                                    className='mr-3 h-6 w-6' 
                                    onChange={() => onSelect(i)} 
                                />
                                <span className='text-white text-xl' htmlFor={`q${i}-option`}>{q}</span>
                                <div className={`check ${result[trace] === i ? 'checked' : ''}`}></div>
                            </label>
                        ))
                    }

                </div>
            </div>
        </>
    )
}

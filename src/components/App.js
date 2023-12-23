import React, { useEffect, useState } from 'react'
import Questions from './Questions';
import { useDispatch, useSelector } from 'react-redux';
import { moveNextAction, movePrevAction } from '../redux/question_reducer';
import { pushAnswer } from '../Actions/setResult';
import { Navigate } from 'react-router-dom';

export default function App() {
  const dispatch = useDispatch()
  const [check, setCheck] = useState(undefined)
  const result = useSelector(state => state.result.result)
  const { que, trace } = useSelector(state => state.questions)

  function onNext() {
    if (trace < que.length) {
      dispatch(moveNextAction())
      if (result.length <= trace) {
        dispatch(pushAnswer(check))
      }
    }
    setCheck(undefined)
  }

  function onChecked(check) {
    setCheck(check)
  }

  if (result.length && result.length >= que.length) {
    return <Navigate to={'/result'} />
  }

  return (
    <>
      <div className="flex items-center bg-gradient-to-r from-yellow-600 to-yellow-700 justify-center h-screen">
        <div className='shadow-2xl bg-white/10 w-3/4 md:w-1/2 p-5 rounded-xl'>
          <h1 className='text-3xl text-center text-white font-bold mb-6'>Quiz Application</h1>
          <hr />
          <Questions onChecked={onChecked} />
          <hr />
          <div className='flex justify-end mt-8'>
            <button className='bg-white py-2 px-6 rounded-2xl hover:bg-gray-300 hover:shadow-3xl' onClick={(onNext)}>Next</button>
          </div>
        </div>
      </div>
    </>
  )
}
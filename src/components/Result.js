import React, { useEffect } from 'react'
import '../styles/Result.css';
import { useDispatch, useSelector } from 'react-redux';
import { resetAllAction } from '../redux/question_reducer';
import { resetResultAction } from '../redux/result_reducer';
import { Link, Navigate } from 'react-router-dom';
import { attemptQuestion, displayQuestionsWithAttempts, earnPoints, gradeResult } from '../helper/helper';
import StarRating from './StarRating';
import { publishResult } from '../Actions/setResult';

export default function Result() {
    const dispatch = useDispatch()
    const { questions: { que, ans }, result: { result } } = useSelector(state => state)

    const total_points = que.length * 10
    const attempt_qus = attemptQuestion(que, result)
    const earn_points = earnPoints(result, ans, 10)
    const grade = gradeResult(total_points, earn_points)
    const q_w_a = displayQuestionsWithAttempts(que, ans, result)
    const restart = () => {
        dispatch(resetAllAction())
        dispatch(resetResultAction())
    }

    publishResult({
        result,
        attempts:attempt_qus,
        points:earn_points,
        achived:grade ? "Pass" : "Fail",
    })
    if (result.length <= 0) {
        return <Navigate to={'/'} />
    }

    return (
        <>
            <div className={`flex h-fit ${grade ? 'bg-gradient-to-r from-green-700 to-green-500' : 'bg-gradient-to-r from-red-500 to-red-700'}`}>
                <div className='bg-white/10 w-full p-10 rounded-xl'>
                    <h1 className='text-3xl text-center text-white font-bold mb-6'>Quiz Application</h1>
                    <hr />
                    <div className='flex justify-between'>
                        <div className="flex flex-col gap-8 mt-6 mb-5 text-xl">
                            {
                                q_w_a.map((q, i) => (
                                    <>
                                        <div className='shadow-xl w-full p-3 bg-white uppercase text-sm font-semibold' key={i}>
                                            <p className='font-bold'>{`${i + 1}) ${q.question}`}</p>
                                            <ul className='m-2'>{q.options.split(',').map((op, i) => (
                                                <li className={`${q.correctAnswer === op}text-green-700`}><span>{`${i + 1}) `}</span>{op}</li>
                                            ))}</ul>
                                            <p className={`mx-2 font-bold ${q.userAttempt === q.correctAnswer ? 'text-green-700' : 'text-red-700'}`}>
                                                User Answer : <span>{q.userAttempt}</span></p>
                                            <p className='mx-2 text-green-700 font-bold'>Correct Answer : <span>{q.correctAnswer}</span></p>
                                        </div>

                                    </>
                                ))
                            }
                        </div>
                        <div className="flex flex-col w-1/4 bg-white h-fit p-3 m-6 mb-3 text-md">
                            <div className='flex justify-between'>
                                <span>Total Questions </span>
                                <span className='font-bold pr-5'>{que.length}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span>Total Attempts </span>
                                <span className='font-bold pr-5'>{attempt_qus}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span>Total Earn Points </span>
                                <span className='font-bold pr-5'>{earn_points}</span>
                            </div>

                            <div className='flex justify-between mb-2'>
                                <span>Quiz Result</span>
                                <span className={`font-bold ${grade ? 'text-green-700' : 'text-red-700'}`}>{grade ? "Passed" : "Failed"}</span>
                            </div>
                            <hr />
                            <div className='flex justify-between text-md'>
                                <span>Ratings</span>
                                <StarRating rating={earn_points / 10} />
                            </div>
                        </div>
                    </div>

                    <hr />
                    <div className='flex justify-center mt-8'>
                        <Link to={'/'} onClick={restart} className='bg-white py-2 px-6 rounded-2xl hover:bg-gray-300 hover:shadow-3xl'>Restart</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

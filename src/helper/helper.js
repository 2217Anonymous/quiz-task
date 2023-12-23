import axios from "axios";

export function attemptQuestion(question,result){
    const exportedData = {
        question: question,
        answer: result
    };
    return result.filter(r => r !== undefined).length;
}

export function displayQuestionsWithAttempts(questions, correctAnswers, userAnswers) {
    const result_q = [];
    questions.forEach((question, index) => {
      const formattedQuestion = {
        question: question.question,
        options: question.options.join(', '),
        correctAnswer: question.options[correctAnswers[index] - 1],
        userAttempt: question.options[userAnswers[index] - 1]
      };
      result_q.push(formattedQuestion);
    });
  
    return result_q;
  }

export function earnPoints(result,answers,points) {
    return result.map((element,i) => answers[i] === element)
                .filter( i => i)
                .map( i => points)
                .reduce((prev,curr) => prev + curr, 0)
}

export function gradeResult(tot,earn){
    return (tot*50 / 100) < earn 
}

export async function getServerData(url,callback){
    const data = await (await (axios.get(url)))?.data.qus
    return callback ? callback(data) : data
}

export async function postServerData(url,result,callback){
    const data = await (await (axios.get(url,result)))?.data
    return callback ? callback(data) : data
}

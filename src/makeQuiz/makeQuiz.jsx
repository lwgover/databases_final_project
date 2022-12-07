import React from "react";
import { index } from "./../index";
import './makeQuiz.css';

export class makeQuiz extends React.Component {
    
    constructor(){
        super();
        this.state={count:0,results:0};
    }
render() {
    return( <div className="makeQuizWrapper">
        <h1>Create your quiz!</h1>
        <form onSubmit = {this.handleSubmit.bind(this)}>
       <p className="title">Quiz Name</p><input type = "text" name ="quizName"></input>
        <div name = "results">
            {this.getResults()}
        </div>
        <button type ="button"  onClick = {this.addResult}>Create new result</button>
        <div name="questions">
            {this.getQuestions()}
        </div>
        <button type ="button" onClick = {this.addQuestion}>Create new question</button>
        <button type ="button"  onClick = {this.deleteQuestion}>Delete last question</button>
        <button type = "submit">Create Quiz!</button>
        </form>
    </div>)
}
addQuestion = ()=>{
    this.setState({
        count: this.state.count + 1
    });
}
getQuestions(){

    var questionList=[];
    for(var i=0;i<this.state.count;i++){
        var answers =[];
        for(var j = 0; j<4; j++){
            var answer = <div className = "answer title"  name={"q"+i+"a" + answers.length}> <p className = "title">Answer {j+1}</p><input type = "text" className = "inline-btn"></input> <div id="resultRanges">{this.applyResultsToAnswer(i,j)}</div></div>
            answers.push(answer)
        }
        var question =<div className = "question title" name={"q" + i}> <p className = "title">Question {i+1}</p><input type = "text" className = "inline-btn"></input> <div className = "answers">{answers}</div></div>
        questionList.push(question);
    }
return questionList;
}
getResults(){
var resultsList = [];
for(var i=0;i<this.state.results;i++){
    var result = <div className = "result title"> <p className = "title">Result {i+1}</p><input type = "text" className = "result" name={"r" + i}></input></div>
    resultsList.push(result);
}
return resultsList;
}
addResult=()=>{
    this.setState({
        results: this.state.results + 1
    });
}
applyResultsToAnswer(questionNum, answerNum){
var resultRanges = [];
for(var i=0;i<this.state.results;i++){
    var resultRange = <div><p className = "title">Result {i+1}</p><input type="range" name = {"q" + questionNum +"a"+answerNum+"r"+i}></input></div>
    resultRanges.push(resultRange);
}
return resultRanges;
}
handleSubmit(event){
    //NEED USERNAME
    var username = null;
    event.preventDefault();
    var currentdate = new Date(); 
    var datePosted = (currentdate.getMonth()+1)  + "/" 
                +   currentdate.getDate() + "/"
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    const quizName = event.target.quizName.value;
    var quizResults =[];
    var questions = [];
    var answers = [];
    var answerResults = [];
    var quizwords = quizName.split(' ');
    var quizIDName ="";
    for(var i =0; i<quizwords.length;i++){
        console.log(quizwords[i]);
        quizIDName+=quizwords[i];
    }

    if (quizIDName.length > 30) { //in case quiz names get extremely long, don't let the IDs get extremely long
        quizIDName = quizIDName.slice(0, 31); //only the first 30 characters will be included.
    }
    var quizID = `${username}.${quizIDName}.${datePosted}`;
    var timesPlayed = 0;
    var quiz = {quizID:quizID,name:quizName,username:username,datePosted:datePosted,timesPlayed:timesPlayed};
    for(var i=0;i<this.state.results;i++){
        var resultText = event.target.elements[i+1].value;
        var result = {quizID:quizID,result:resultText,description:"added before this existed :)"};
        quizResults.push(event.target.elements[i+1].value);
    }
    for(var i = 0;i<this.state.count;i++){
        var qval = i*4*quizResults.length+i*4+i+quizResults.length+2;
        var questionText = event.target.elements[qval].value;
        var questionID = `${quizID}.${i}`;
        var question = {questionID:questionID,question:questionText,quizID:quizID,questionOrder:i};
        questions.push(question);
        for(var j = 0;j<4;j++){
            var aval = qval+j*(quizResults.length+1)+1;
            var answerText = event.target.elements[aval].value;
            var answerID = `${questionID}.${j}`;
            var answer = {answerID:answerID,answer:answerText,questionID:questionID};
            answers.push(answer);
            for(var k = 0;k<quizResults.length;k++){
                var answerResultValue = event.target.elements[aval+k+1].value;
                var answerResult = {answerID:answerID,result:quizResults[k].result,value:answerResultValue}
                answerResults.push(answerResult);
                
            }
        }
    }
    console.log(quizResults);
    console.log(questions);
    console.log(answers);
    console.log(answerResults);
    var quizObj = {quiz:quiz,questions:questions,answers:answers,quizResults:quizResults,answerValues:answerResults};
    var quizJSON = JSON.stringify(quizObj);
    localStorage.setItem('quiz', quizJSON);
    return(quizJSON);
}
cancelQuiz(){

}
deleteQuestion= ()=>{
    this.setState({
        count: this.state.count - 1
    
    });
    if(this.state.count<0){

    }
}
deleteAnswer(){

}

}
export default makeQuiz

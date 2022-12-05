import React from "react";
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
    event.preventDefault();
    const quizName = event.target.quizName.value;
    console.log(quizName);
    const test = event.target.r0.value;
    console.log(test);
    var results =[];
    var questions = [];
    var answers = [];
    var answerResults = [];
    for(var i=0;i<this.state.results;i++){
        
        results.push(event.target.elements[i+1].value);
    }
    console.log(results.length);
    for(var i = 0;i<this.state.count;i++){
        var qval = i*4*results.length+i*4+i+results.length+2;
        questions.push(event.target.elements[qval].value);
        for(var j = 0;j<4;j++){
            //var aval= qval+j+j*results.length+3+results.length;
            var answer = event.target.elements[qval+j].value;
            answers.push(answer);
        }
    }
    console.log(results);
    console.log(questions);
    console.log(answers);
    console.log(answerResults);
    var quizTableVals = [];
    var questionTableVals = [];
    var resultTableVals = [];
    var answerTableVals = [];
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

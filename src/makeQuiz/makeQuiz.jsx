import React from "react";
import { index } from "./../index";
export class makeQuiz extends React.Component {
    constructor(){
        super();
        this.state={count:0,results:0};
    }
render() {
    return( <div className="makeQuizWrapper">
        This is where you'll be able to make a quiz
        <h1>Create your quiz!</h1>
        <div id = "results">
            {this.getResults()}
        </div>
        <button onClick = {this.addResult}>Create new result</button>
        <div id="questions">
            {this.getQuestions()}
        </div>
        <button onClick = {this.addQuestion}>Create new question</button>
        <button onClick = {this.deleteQuestion}>Delete last question</button>
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
            var answer = <div className = "answer" id={"a" + answers.length}> <p>Answer {j+1}</p><input type = "text"></input></div>
            answers.push(answer)
        }
        var question =<div className = "question" id={"q" + questions.length}> <p>Question {i+1}</p><input type = "text"></input><div className = "answers">{answers}</div></div>
        questionList.push(question);
    }
return questionList;
}
getResults(){
var resultsList = [];
for(var i=0;i<this.state.results;i++){
    var result = <div className = "result" id={"r" + resultsList.length}> <p>Result {i+1}</p><input type = "text"></input></div>
    resultsList.push(result);
}
return resultsList;
}
addResult=()=>{
    this.setState({
        results: this.state.results + 1
    });
}
applyResults(){

}
handleSubmit(){
    
}
cancelQuiz(){

}
deleteQuestion= ()=>{
    this.setState({
        count: this.state.count - 1
    });
}
deleteAnswer(){

}

}
export default makeQuiz

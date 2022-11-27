export class Quiz{
    constructor(questions , amount)
    {
        this.questions = questions;
        this.amount = amount;
        this.currentQuestionElement = document.getElementById("current");
        this.totalAmountElement = document.getElementById("totalAmount");
        this.questionElement = document.getElementById("question");
        this.checkedElement = document.getElementsByName("answer");//nodelist
        this.rowAnswerElement = document.getElementById("rowAnswer");
        this.scoreElement = document.getElementById("score");
        this.tryBtnElement = document.getElementById("tryBtn");
        this.isCorrect = false;
        this.score =0;
        this.nextBtn = document.getElementById("next");
        this.currentQuestions = 0;
        this.nextBtn.addEventListener('click',this.nextQuestion.bind(this))
        this.tryBtnElement.addEventListener('click',()=>
        {
            this.tryAgain();
        })
        this.showQuestion()

    }
    nextQuestion(){

        let checkedAnswer = [...this.checkedElement].filter(element => element.checked);
        

        if(checkedAnswer.length == 0)
        {
            $('.alert').fadeIn(500);
        }
        else{
            $('.alert').fadeOut(500);
            this.isCorrect = this.checkAnswer(checkedAnswer[0].value);
        (this.isCorrect) ? $("#Correct").fadeIn(500,()=>{this.show()}) : $("#inCorrect").fadeIn(500,()=>{this.show()})

        }

    }

    show(){

        $("#Correct").fadeOut(500);
        $("#inCorrect").fadeOut(500);
        this.currentQuestions++;
        (this.currentQuestions < this.amount) ?  this.showQuestion() : this.finish();  
       
        


    }

    checkAnswer(checkedAnswer){
        let correct;
        if(this.questions[this.currentQuestions].correct_answer == checkedAnswer)
        {
            correct = true;
            this.score ++;
         
        
        }
        else{
            correct = false;
        }
        return correct;
    }


    showQuestion()
    {
        this.questionElement.innerHTML = this.questions[this.currentQuestions].question;
        this.currentQuestionElement.innerHTML = this.currentQuestions +1;
        this.totalAmountElement.innerHTML = this.amount;
        let answers =this.getAnswer(this.questions[this.currentQuestions])
        this.showAnswer(answers);

    }

    getAnswer(currentQuestion)
    {
        let answers =[
            currentQuestion.correct_answer,
           ...currentQuestion.incorrect_answers
        ]
        console.log(answers)

      let ranNums = [],
        i = answers.length,
        j = 0;
    
    while (i--) {
        j = Math.floor(Math.random() * (i+1));
        ranNums.push(answers[j]);
        answers.splice(j,1);
    }
    console.log(ranNums)

    return ranNums;

    }

    showAnswer(answersArray)
    {
        console.log(answersArray.length)
        let temp =``;
        for(let i= 0 ; i<answersArray.length ; i++)
        {
            temp+=`
            <div class="form-check">
                        <label class="form-check-label">
                            <input type="radio" class="form-check-input" name="answer" id="q${i}" value="${answersArray[i]}">
                            ${answersArray[i]}
                        </label>
                    </div>
            `
        }

        this.rowAnswerElement.innerHTML = temp;

    }

    finish(){
        $('#quiz').fadeOut(500,()=>{
            $('#finish').fadeIn(500)
        })
        this.scoreElement.innerHTML = this.score;
       
    }

    tryAgain(){

        $('#finish').fadeOut(500,()=>{
            $('#setting').fadeIn(500)
        })
    }

}



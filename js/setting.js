import {Quiz} from './quiz.js'
export class Setting{
    constructor(){
        this.categoryElement = document.getElementById("category");
        this.difficultyElement =Array.from(document.getElementsByName("difficulty"));
        this.numberofQuestion = document.getElementById("Number");
        this.startBtn = document.getElementById("startBtn");
        this.startBtn.addEventListener('click',this.startQuiz.bind(this))
    }

    async startQuiz()
    {
        
        let amount = this.numberofQuestion.value;
        let category = this.categoryElement.value;
        let difficult = this.difficultyElement.filter(el => el.checked)
        // console.log(difficult[0].value )
        let url =`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficult[0].value}`;

      let result = await this.fetchUrl(url);
    //   console.log(result);
    if(result.length > 0)
    {
        $("#setting").fadeOut(500,()=>{
            $("#quiz").fadeIn(500)
        })
    }
    new Quiz(result , amount);

    }


   async fetchUrl(url)
    {

        let response = await fetch(url);
        let data = await response.json();
        // console.log(data.results)
        return data.results;

    }
}
let question = document.querySelector('.question')
let answer = document.querySelectorAll('.answer')
let result_text = document.querySelector('.result')
let start = document.querySelector('.start')
let q_block = document.querySelector('.question-block')
let s_block = document.querySelector('.stat-block')
function randint(min,max) {
    return Math.round(Math.random()*(max-min)+min)
    
}
let signs = ["+", "-", "x", "/"]
function sign(){
    return signs[randint(0,3)]
}
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) { // The loop repeats until there are elements to mix
    randomIndex = Math.floor(Math.random() * currentIndex); // Select the remaining element.
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [    // Swapping with the current element.
      array[randomIndex], array[currentIndex]];
  }
  return array; // Returning the shuffled array
}

class Question {
    constructor(){
        let first_num = randint(1,30)
        let sec_num = randint(1,30)
        let num_sign = sign()
        this.question = `${first_num} ${num_sign} ${sec_num}`
        if (num_sign == '+'){
            this.correct = first_num + sec_num
        }
        else if (num_sign == '-'){
            this.correct = first_num - sec_num
        }
        else if (num_sign == 'x'){
            this.correct = first_num * sec_num
        }
        else if (num_sign == '/'){
            this.correct = first_num / sec_num
        }
        this.answers = [
            randint(this.correct-10,this.correct-6),
            randint(this.correct-5,this.correct-1),
            this.correct,
            randint(this.correct+1,this.correct+5),
            randint(this.correct+6,this.correct+10)]
        shuffle(this.answers)
    }
    display(){
        question.innerHTML = this.question
        for (let i = 0; i < this.answers.length; i += 1){
            answer[i].innerHTML = this.answers[i]
        }
    }
}
let current_question
let correct_answer
let total_answer
start.addEventListener('click', function() {
    s_block.style.display = 'none'
    q_block.style.display = 'flex'
    correct_answer = 0
    total_answer = 0
    current_question = new Question()
    current_question.display()
    setTimeout(function(){
        s_block.style.display = 'flex'
        q_block.style.display = 'none'
        result_text.innerHTML = `You gave ${correct_answer} correct answers from ${total_answer}
        Accuracy - ${Math.round(correct_answer * 100 / total_answer)}%`
        },10000)
    
})


for (let i = 0; i < answer.length; i += 1){
    answer[i].addEventListener('click',function() {
        if (answer[i].innerHTML == current_question.correct){
            correct_answer += 1
            answer[i].style.background = '#00FF00'
            anime({
                targets: answer[i],
                background: '#FFFFFF',
                duration : 100,
                delay: 10,
                easing: 'linear'
            })
        }
        else{
            answer[i].style.background = '#FF0000'
            anime({
                targets: answer[i],
                background: '#FFFFFF',
                duration : 100,
                delay: 10,
                easing: 'linear'
            })
        }
        total_answer += 1
        current_question = new Question()
        current_question.display()
    })
}

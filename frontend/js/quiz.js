const quiz_div = document.getElementsByClassName('quiz_div')
const next_btn = document.getElementsByClassName('next_btn')
const back_btn = document.getElementsByClassName('back_btn')
const current_question = document.getElementById('current_question')
const option = document.getElementsByClassName('option')
let question_num = parseInt(current_question.value)

// Hide all Questions
for (let i = 1; i < quiz_div.length; i++){
    quiz_div[i].style.display = 'none'
}

// Show only the next question when pressed the Next Button
for (let i = 0; i < next_btn.length; i++){
    next_btn[i].addEventListener('click', function(e){
        e.preventDefault()
        quiz_div[i + 1].style.display = 'block'
        quiz_div[i].style.display = 'none'
        question_num += 1
        if (question_num < 6){
            current_question.value = question_num
        }
    })
}

// Show only the previous question when pressed the back button
for (let i = 0; i < back_btn.length; i++){
    back_btn[i].addEventListener('click', function(e){
        e.preventDefault()
        quiz_div[i].style.display = 'block'
        quiz_div[i + 1].style.display = 'none'
        current_question.value -= 1
    })
}

// update score when clicked on the correct option
const score_input = document.getElementById('score_input')
const correct_option = document.getElementsByClassName('correct_option')
const final_score = document.getElementById('final_score')
let score = parseInt(score_input.value)

for (let i = 0; i < correct_option.length; i++){
    correct_option[i].addEventListener('click', function(e){
        e.preventDefault()

        if (!this.classList.contains('clicked')){
            score += 1
            score_input.value = score
            final_score.value = score
            this.classList.add('clicked')
        }
    })
}



// refresh the page when clicked on restart quiz
const restart_quiz = document.getElementById('restart_quiz')
restart_quiz.addEventListener('click', function(e){
    e.preventDefault()
    window.location.reload()
})

// select the background color of any selected option

const option_2 = document.getElementsByClassName('option_2')
const option_3 = document.getElementsByClassName('option_3')
const option_4 = document.getElementsByClassName('option_4')
const option_5 = document.getElementsByClassName('option_5')

const option_1 = document.getElementsByClassName('option_1')

function select_option(option){
    for(let i = 0; i < option.length; i++){
        if (option[i].clicked = true){
            option[i].addEventListener('click', function(e){
                for (let j = 0; j < option.length; j++){
                    option[j].style.backgroundColor = '#2196F3'
                }
                option[i].style.backgroundColor = '#3E2723'
            })
        }
        option[i].style.backgroundColor = '#2196F3'
    }

}

select_option(option_1)
select_option(option_2)
select_option(option_3)
select_option(option_4)
select_option(option_5)


// review quiz
const review_quiz = document.getElementById('review_quiz')
review_quiz.addEventListener('click', function(e){
    e.preventDefault()
    //  change the background color of the correct option to green
    for (let i = 0; i < correct_option.length; i++){
        correct_option[i].style.backgroundColor = 'green'
        for (let j = 1; j < quiz_div.length; j++){
            quiz_div[j].style.display = 'block'
        }
    }

    //  disable the all next buttons
    for (let i = 0; i < next_btn.length; i++){
        next_btn[i].disabled = true
    }

    //  disable the all back buttons
    for (let i = 0; i < back_btn.length; i++){
        back_btn[i].disabled = true
    }

    //  disable the all options
    for (let i = 0; i < option.length; i++){
        option[i].disabled = true
    }
})

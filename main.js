console.log('Script loaded');

const createQuiz = function () {
    return {
        fetchQuiz: function (url) {
            return fetch(url).then(res => res.json());
        },

        render: function (questions) {
            const ul = document.querySelector('main ul.questions');

            questions.forEach((question) => {
                const li = document.createElement('li');
                ul.appendChild(li);

                const h2 = document.createElement('h2');
                h2.innerHTML = question.title;
                li.appendChild(h2);

                const p = document.createElement('p');
                p.innerHTML = question.content;
                li.appendChild(p);


                const select = document.createElement('select');
                li.appendChild(select);

                question.options.forEach((option) => {
                    const answerOption = document.createElement('option');
                    select.appendChild(answerOption);
                    answerOption.innerText = option.content;
                    answerOption.value = option.correct;
                })
            })

        },

        showScore: function (event) {
            event.preventDefault();
            let score = 0;
            const selectors = [...document.querySelectorAll('select')];
            selectors.forEach((select) => {
                const i = select.selectedIndex;
                const answer = select.options[i].value;
                if (answer === 'true') {
                    score++;
                }
            });

            const total = selectors.length;
            document.querySelector('.result').innerText = score + '/' + total;

            if (score === total) {
                const confetti = new ConfettiGenerator({ target: 'confetti' });
                confetti.render();
            }

            document.querySelector('button.score-summary').style.display = 'block';  
            
        },
        showAnswers: function (event) {
            event.preventDefault();
            const ul = document.querySelector('.answers');
            const li = document.createElement('li');
            ul.appendChild(li);

            // const questions = document.querySelectorAll('li');
            // questions.forEach(question => {
            //     console.log(question.childNodes);
            //     li.appendChild(question.childNodes[1]);

            const answers = [...document.querySelectorAll('select')];
                answers.forEach((select) => {
                
                    const i = select.selectedIndex;
                    const answer = select.options[i];
                    const answerValue = select.options[i].value;
                    if (answerValue === 'true') {
                        const h3 = document.createElement('h3');
                        h3.innerHTML = 'Correct: ' + answer.innerText ;
                        li.appendChild(h3);
                    } else {
                        const h4 = document.createElement('h4');
                        h4.innerHTML = 'Incorrect: ' + answer.innerText ;
                        li.appendChild(h4);
                    }
                })
              
        }


    }
}

function convertSeconds(s) {
    let min = Math.floor(s / 60);
    let sec = s % 60;
    return ('0'+min).slice(-2) + ':' + ('0'+sec).slice(-2);
  }

  function timer() {
    let sec = 0;
    let timer = setInterval(function () {
        document.querySelector('.timer').innerHTML = convertSeconds(sec);
        sec++;
        document.querySelector('.get-score').addEventListener('click', function(){
            if (sec <= 59 ) {
                clearInterval(timer);
                document.getElementById('extra-points').innerHTML= `<h5>Extra Points: 10</h5>`;
            
            } else if (sec > 59 && sec <= 120 ){
                clearInterval(timer);
                document.getElementById('extra-points').innerHTML= `<h5>Extra Points: 5</h5>`;
   
            } else{
                clearInterval(time);
            }
            
        })
      
    }, 1000);

}
  

const url = 'https://gist.githubusercontent.com/benna100/13f5850bf78f59d9baea915cbbe9f258/raw/ef8f2b137b07b05e8f593cef0281b4f1f0aba79a/JS-3%2520questions';
const hyfQuiz = createQuiz();
hyfQuiz.fetchQuiz(url)
    .then((questions) => hyfQuiz.render(questions));

document.querySelector('.get-score').addEventListener('click', hyfQuiz.showScore);
document.querySelector('.get-score').addEventListener('click', function(){
    document.querySelector('.get-score').style.display = "none";
});


document.querySelector('button.score-summary').addEventListener('click', hyfQuiz.showAnswers);
document.querySelector('button.score-summary').addEventListener('click', function(){
    document.body.scrollTop = 0;
});

document.querySelector('button.score-summary').addEventListener("click", function() {
	document.querySelector('.modal').style.display = "flex";
});

document.querySelector('.close').addEventListener("click", function() {
    document.querySelector('.modal').style.display = "none";
    document.querySelector('.get-score').style.display = "block";
});

document.querySelector('.start-quiz').addEventListener("click", function() {
    document.querySelector('main').style.display = "block";
    timer();
    let song = new Audio('careless-whisper.mp3');
    song.play();
    document.querySelector('.intro').style.display = "none";
});

document.querySelector('.restart-quiz').addEventListener('click', function(){
    document.querySelector('.modal').style.display = "none";
    document.querySelector('main').style.display = "none";
    document.querySelector('.intro').style.display = "block";
});
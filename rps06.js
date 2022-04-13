let color1 = 'var(--color1)' // neongreen
let color2 = 'var(--color2)' // black
let color3 = 'var(--color3)'
let color4 = 'var(--color4)'
const p1_elem = document.querySelector('.onlybtn')
console.log(p1_elem)
    // const p1_elem_qs = document.querySelectorAll('.p1_rpsbutton')
    // console.log(p1_elem_qs)
const p2_btn = Array.from(document.querySelectorAll('.p2_rpsbutton'))
const reset = document.querySelector('.reset')
let p1_score = document.querySelector('.p1_score')
let p2_score = document.querySelector('.p2_score')

// generates random number between 0 and 2
function getRandomInt(max, min) {
    max = Math.floor(max)
    min = Math.ceil(min)
    return Math.floor(Math.random() * ((max + 1) - min) + min)
}

// global state object
let state = {
    p1: {
        num: 0,
        score: 0
    },
    p2: {
        num: 0,
        score: 0
    },
    winner: 'COMPUTER'
}

// resets p2 button colors
function resetColors() {
    p2_btn.forEach(e => e.style.backgroundColor = 'black')
    p2_btn.forEach(e => e.style.color = 'limegreen')
}

// plays game
function playRPS() {

    // display initial scores
    p1_score.innerHTML = state.p1.score
    p2_score.innerHTML = state.p2.score

    p1_elem.addEventListener('click', e => {

        // displays p2 full opacity
        document.querySelector('.p2_playbuttons').style.opacity = '100%'

        // resets p2 button colors
        resetColors()

        // p1 choice; p2 generated choice
        state.p1.num = parseInt(e.target.id)
        state.p2.num = getRandomInt(2, 0)

        // evaluates winner
        if (state.p1.num === state.p2.num) {
            state.winner = "DRAW. NOBODY "
        } else if (state.p1.num === 0 && state.p2.num === 2) {
            state.winner = "PLAYER 1"
            state.p1.score += 1
        } else if (state.p1.num === 2 && state.p2.num === 0) {
            state.winner = "COMPUTER"
            state.p2.score += 1
        } else if (state.p1.num < state.p2.num) {
            state.winner = "COMPUTER"
            state.p2.score += 1
        } else if (state.p1.num > state.p2.num) {
            state.winner = "PLAYER 1"
            state.p1.score += 1
        }

        // changes color of p2 button
        p2_btn[state.p2.num].style.backgroundColor = 'limegreen'
        p2_btn[state.p2.num].style.color = 'black'

        // declares winner
        document.getElementById('result_statement').innerHTML = `${state.winner} WINS`

        // displays current score
        p1_score.innerHTML = state.p1.score
        p2_score.innerHTML = state.p2.score
    })
}

// reset scores and colors
reset.addEventListener('click', e => {
    state.p1.score = 0
    state.p2.score = 0
    p1_score.innerHTML = state.p1.score
    p2_score.innerHTML = state.p2.score
    document.querySelector('.p2_playbuttons').style.opacity = '50%'
    resetColors()
    document.getElementById('result_statement').innerHTML = '&nbsp;'

})
playRPS()
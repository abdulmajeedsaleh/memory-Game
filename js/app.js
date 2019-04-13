
/*
 * Create a list that holds all of your cards
 */
let openCard = [];
let lockedCard = [];
let resetButton = document.getElementsByClassName('restart');
resetButton[0].addEventListener('click',reset);
let moves = 0;
let seconds=0;
let stars = 3;
let star = document.getElementsByClassName('stars');
let cards = ['fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-anchor'
,'fa-leaf','fa-bicycle','fa-diamond','fa-bomb','fa-leaf','fa-bomb','fa-bolt','fa-bicycle'
,'fa-paper-plane-o','fa-cube'];
let orgCards = document.getElementsByClassName('card');
setTimeout(stopwatch, 1000);
for (let card of orgCards) {
    card.classList.remove('open','show','match');
}
shuffleCards();

function shuffleCards() {
    let arr = shuffle(cards);
    let i = 0;
    for (let card of orgCards) {
        card.innerHTML="<i></i>";
        card.firstElementChild.classList.add("fa",arr[i]);
        i++;
    }
}
function reset(){
    document.getElementById('moves').innerHTML = `<span id="moves">0</span>`;
    moves = 0;
    seconds=0;
    stars = 3;
    document.getElementsByClassName('stars')[0].children[0].style.display = ""; 
    document.getElementsByClassName('stars')[0].children[1].style.display = ""; 
    for (let card of orgCards) {
        card.classList.remove('open','show','match');
    }
    
    while(lockedCard.length) {
        lockedCard.pop();
    }
    while(openCard.length) {
        openCard.pop();
    }
    shuffleCards();
}


for (let i = 0; i < orgCards.length; i++) {
    CardOnCilck(i);
}

function CardOnCilck(i) {
    let CardOnClick = i;
    orgCards[i].addEventListener('click', function(e) {
        if (openCard.length != 2) {
            if (!(orgCards[CardOnClick].classList.contains('open', 'show'))) {
                Check(CardOnClick);
            }
        }
    });
}

function Check(Card) {
    let fClcik = orgCards.item(Card);
    orgCards[Card].classList.add('open', 'show');
    openCard.push(fClcik);
    if (openCard.length === 2) {
        if (openCard[0].firstElementChild.className === openCard[1].firstElementChild.className) {
            openCard[0].classList.add('match');
            openCard[1].classList.add('match');
            lockedCard.push(openCard[0]);
            lockedCard.push(openCard[1]);
            openCard.pop();
            openCard.pop();
            move();
        } else {
            openCard[0].classList.add('notmatch');
            openCard[1].classList.add('notmatch');
            move();
            setTimeout(startItem, 1000);
        }
    }
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function move() {
    moves++;
    document.getElementById('moves').innerHTML = `<span id="moves">${moves}</span>`;
    if(moves === 15) {
        document.getElementsByClassName('stars')[0].children[0].style.display = 'none';
         stars--;
    } else if (moves === 30) {
        document.getElementsByClassName('stars')[0].children[1].style.display = 'none';
        stars--;
    } else if (lockedCard.length === 16) {
        setTimeout(function win() {
            Swal.fire("Good job",`You Win with ${moves} Moves and ${stars} Star and you take ${seconds} Seconds to \tfinish the game`, "success");
            reset();
        }, 1000);
    }
}

function stopwatch() {
    seconds++;
    document.getElementById('watch').textContent =  seconds;
    setTimeout(stopwatch, 1000);
}
function startItem() {
    openCard[0].classList.remove('open', 'show', 'notmatch');
    openCard[1].classList.remove('open', 'show', 'notmatch');
    openCard.pop();
    openCard.pop();
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

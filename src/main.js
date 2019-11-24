"use strict";

const cards = [
    { 'cardType': 'Heart', 'value': 9, 'cardSymbol': '🂹', 'cardColor': 'redCard'},
    { 'cardType': 'Tile', 'value': 9 , 'cardSymbol': '🃉', 'cardColor': 'redCard'},
    { 'cardType': 'Clover', 'value': 9 , 'cardSymbol': '🃙', 'cardColor': 'blackCard'},
    { 'cardType': 'Pike', 'value': 9 , 'cardSymbol': '🂩', 'cardColor': 'blackCard'},

    { 'cardType': 'Heart', 'value': 10 , 'cardSymbol': '🂺', 'cardColor': 'redCard'},
    { 'cardType': 'Tile', 'value': 10 , 'cardSymbol': '🃊', 'cardColor': 'redCard'},
    { 'cardType': 'Clover', 'value': 10 , 'cardSymbol': '🃚', 'cardColor': 'blackCard'},
    { 'cardType': 'Pike', 'value': 10 , 'cardSymbol': '🂪', 'cardColor': 'blackCard'},

    { 'cardType': 'Heart', 'value': 11 , 'cardSymbol': '🂻', 'cardColor': 'redCard'},
    { 'cardType': 'Tile', 'value': 11 , 'cardSymbol': '🃋', 'cardColor': 'redCard'},
    { 'cardType': 'Clover', 'value': 11 , 'cardSymbol': '🃛', 'cardColor': 'blackCard'},
    { 'cardType': 'Pike', 'value': 11 , 'cardSymbol': '🂫', 'cardColor': 'blackCard'},

    { 'cardType': 'Heart', 'value': 12 , 'cardSymbol': '🂽', 'cardColor': 'redCard'},
    { 'cardType': 'Tile', 'value': 12 , 'cardSymbol': '🃍', 'cardColor': 'redCard'},
    { 'cardType': 'Clover', 'value': 12 , 'cardSymbol': '🃝', 'cardColor': 'blackCard'},
    { 'cardType': 'Pike', 'value': 12 , 'cardSymbol': '🂭', 'cardColor': 'blackCard'},

    { 'cardType': 'Heart', 'value': 13 , 'cardSymbol': '🂾', 'cardColor': 'redCard'},
    { 'cardType': 'Tile', 'value': 13 , 'cardSymbol': '🃎', 'cardColor': 'redCard'},
    { 'cardType': 'Clover', 'value': 13 , 'cardSymbol': '🃞', 'cardColor': 'blackCard'},
    { 'cardType': 'Pike', 'value': 13 , 'cardSymbol': '🂮', 'cardColor': 'blackCard'},
    
    { 'cardType': 'Heart', 'value': 14 , 'cardSymbol': '🂱', 'cardColor': 'redCard'},
    { 'cardType': 'Tile', 'value': 14 , 'cardSymbol': '🃁', 'cardColor': 'redCard'},
    { 'cardType': 'Clover', 'value': 14 , 'cardSymbol': '🃑', 'cardColor': 'blackCard'},
    { 'cardType': 'Pike', 'value': 14 , 'cardSymbol': '🂡', 'cardColor': 'blackCard'},
];

const possibleOutputs = ['High Card', 'One Pair', 'Two pair', 'Three of a kind', 'Straight', 'Flush ', 'Full house', 'Four of a kind', 'Straight flush', 'Royal flush'];

const mainContentDiv = document.querySelector('.mainContent');
const startButton = document.querySelector('.startGame');
const cardsDiv = document.querySelector('.cards');
const resultDiv = document.querySelector('.result');
const inCards = document.querySelector('.inCards');
const gameButtonsDiv = document.querySelector('.gameButtons');
const windowText = document.querySelector('.windowText');
const computerPointsParagraph = document.querySelector('.computerPoints');
const playerPointsParagraph = document.querySelector('.playerPoints')
const poker = document.querySelector('.poker');

let computerScore = 0;
let playerScore = 0;

let deckSource = Array();

function game() {
    deckSource = [...cards];
    let playerCards = Array();
    const computerCards = Array();

    for(let i = 0; i < 5; i++) {
        playerCards.push( getRandomCard( deckSource ) );
        computerCards.push( getRandomCard( deckSource ) );
    }
    const choosenCards = showCards( playerCards );
    displayWhatInCards( playerCards );
    setDeckForComputer(computerCards, deckSource);

    const button = document.createElement('button');
    button.textContent = 'Confirm';
    button.addEventListener('click', (e) => {
        e.preventDefault();
        button.remove();
        playerCards = [...addMissingCards(choosenCards)];
        resetBoard();
        showFinalCards(playerCards);
        displayWhatInCards(playerCards);
        addGameButtons(playerCards, computerCards);
    });
    poker.appendChild(button);
}

startButton.addEventListener('click', (e) => {
    e.preventDefault();
    startButton.style.display = 'none';
    const animation = mainContentDiv.animate([
        // keyframes
        { opacity: '1' }, 
        {  opacity: '0' }
      ], { 
        // timing options
        duration: 700,
        fill: 'both'
      });
      animation.onfinish = function() {
          mainContentDiv.style.display = 'none';
          game();
          poker.style.display = 'block';
          poker.animate([
              { opacity: '0'},
              { opacity: '1'}
          ], 
          {
              duration: 700,
              fill: 'both'
          });
      }
});

function getRandomCard(deckSource) {
    const randomNumber = getRandomNumber( deckSource.length );
    const randomCard = deckSource[randomNumber]; 
    deckSource.splice(randomNumber, 1);

    return randomCard;
}

function setDeckForComputer(computerCards, deckSource) {
    const powerOfTheCurrentDeck = checkIndexOfResult(computerCards);
    console.log(powerOfTheCurrentDeck);
    if( powerOfTheCurrentDeck >= 4) {
        return void 0;
    }
    switch(powerOfTheCurrentDeck) {
        case 0:
            computerCards.sort( compareNumbers );
            computerCards.splice( 0, 4 );
            break;
        case 1:
        case 2:
        case 3:
            selectRepeatingCards(computerCards);
            break;
        default:
            throw new Error('Something Wrong Happend!');
    }
    for( let i = computerCards.length; i < 5; i++ ) {
        computerCards.push( getRandomCard(deckSource) );
    }
    console.log(computerCards);
}

function compareNumbers(a, b) {
    return a.value - b.value
 }
 
function selectRepeatingCards(arrayOfCards) {
  const countByValue = arrayOfCards.reduce((acc, curr) => {
    acc[curr.value] = (acc[curr.value] || 0) + 1;
    return acc;
  }, {});

  return arrayOfCards.filter(el => countByValue[el.value] !== 1);
}

function isInSequence(arrayOfValues) {
    const result = arrayOfValues.sort( (a,b) => a-b ).reduce( (acc, value) => {
        if(value - acc == 1) {
            return value;
        }
        return 0;
    });
    return Boolean(result);
}

function countMaxDuplicates(array) {
    const obj = array.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
        }, {});
    const maxValue = Math.max(...Object.values(obj));
    return maxValue;
}

function checkIndexOfResult(objectOfCards) {
    
    const colors = Array();
    const values = Array();

    objectOfCards.forEach( ( {cardType, value} ) => {
        colors.push(cardType);
        values.push(value);
    });

    const diffrentColors = new Set(colors);
    const diffrentValues = new Set(values);

    if(diffrentColors.size == 1) {
        if(isInSequence(values)) {
            if(values.sort( (a,b) => a-b )[0] == 10) {
                return 9;
            }
            return 8;
        } 
        return 5;
    } else if(diffrentValues.size == 2) {
        if(countMaxDuplicates(values) == 4) {
            return 7;
        }
        return 6;
    } else if(diffrentValues.size == 3) {
        if(countMaxDuplicates(values) == 3) {
            return 3;
        }
        return 2;
    } else if(diffrentValues.size == 4) {
        return 1;
    } else if(diffrentValues.size == 5) {
        if(isInSequence(values)) {
            return 4;
        }
        return 0;
    } else {
        throw new Error('Too many cards');
    }
}

function showCards(objectOfCards) {
    let cardsSymbols = Array();

    objectOfCards.forEach( ( {cardSymbol, cardColor} ) => {
        cardsSymbols.push( { cardSymbol: cardSymbol, cardColor: cardColor } );
    });

    for(let i = 0; i < cardsSymbols.length; i++) {
        const p = document.createElement('p');
        p.textContent = cardsSymbols[i].cardSymbol;
        p.classList.add(cardsSymbols[i].cardColor);
        p.addEventListener('click', () => {
            const animation = p.animate([
                { opacity: '1'},
                { opacity: '0'}
            ], {
                duration: 700,                
                fill: 'both'
            });
            animation.onfinish = function() {
                p.textContent = '🂠';
                p.animate([
                    { opacity: '0'},
                    { opacity: '1'}
                ], {
                    duration: 700,                
                    fill: 'both'
                });
            }
            objectOfCards[i] = void 0;
            displayWhatInCards(objectOfCards);
        });
        cardsDiv.appendChild(p);
    }
    return objectOfCards;
}

function addMissingCards(objectOfCards) {
    objectOfCards = objectOfCards.filter(n => n);

    for(let i = objectOfCards.length; i < 5; i++) {
        let randomCard = getRandomNumber( deckSource.length );
        objectOfCards.push( deckSource[randomCard] );
        deckSource.splice(randomCard, 1);
    }
    return objectOfCards;
}

function compareResults(playerCards, computerCards) {
    const playerResult  = checkIndexOfResult(playerCards);
    const computerResult = checkIndexOfResult(computerCards)

    if(computerResult > playerResult) {
        computerScore += 2;
        return "Engine Won!";
    } else if(playerResult > computerResult) {
        playerScore += 2;
        return "You Won!";
    } 

    const computerSum  = addValues(computerCards);
    const playerSum  = addValues(playerCards);

    if( computerSum ===  playerSum ) {
        return 'This is draw!'
    }
    else if( computerSum > playerSum ) {
        computerScore += 2;
        return 'Computer Won!';
    }
    else if( playerSum > computerSum ) {
        playerScore += 2;
        return 'Player Won!';
    }
    else {
        throw new Error('Unknown Case!');
    }  
    
} 

function showResult(result) {
    windowText.textContent = '';
    const p = document.createElement('p');
    const button = document.createElement('button');
    const backToPage = document.createElement('button');

    p.textContent = result;
    button.textContent = "Play Again!";
    backToPage.textContent = 'Back To Page!';

    button.addEventListener('click', (e) => {
        e.preventDefault();
        button.remove();
        resetBoard();
        game();
        poker.animate([
            { opacity: '0'},
            { opacity: '1'}
        ], 
        {
            duration: 1000,
            fill: 'both'
        });
    });

    backToPage.addEventListener('click', (e) => {
        e.preventDefault();
        resetBoard();
        mainContentDiv.style.display = 'block';
        poker.style.display = 'none';
        mainContentDiv.animate([
            // keyframes
            { opacity: '0' }, 
            {  opacity: '1' }
          ], { 
            // timing options
            duration: 1000,
            fill: 'both'
          });
        startButton.style.display = 'block';   
    });

    windowText.appendChild(p);
    resultDiv.appendChild(button);
    resultDiv.appendChild(backToPage);
}

function resetBoard() {
    cardsDiv.textContent = '';
    resultDiv.textContent = '';
    windowText.textContent = '';
}

function showFinalCards(objectOfCards) {
    let cardsSymbols = Array();

    objectOfCards.forEach( ( {cardSymbol, cardColor} ) => {
        cardsSymbols.push( { cardSymbol: cardSymbol, cardColor: cardColor } );
    });

    for(let i = 0; i < cardsSymbols.length; i++) {
        const p = document.createElement('p');
        p.classList.add(cardsSymbols[i].cardColor);
        p.textContent = cardsSymbols[i].cardSymbol;
        cardsDiv.appendChild(p);
    }
}

function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

function displayWhatInCards(objectOfCards) {
   const truthyValues = objectOfCards.filter(n => n);

   if(truthyValues.length == 0) {
       return inCards.textContent = 'You have no cards!';
   }

   for (let i = truthyValues.length; i < 5; i++) {
       truthyValues.push( { 'cardType': `None${-i}`, 'value': -i , 'cardSymbol': '🂠' } );
   }
   return inCards.textContent = `You have ${possibleOutputs[ checkIndexOfResult(truthyValues) ]} in Cards!`;
}

function addGameButtons(playerCards, computerCards) {
    const raise = document.createElement('button');
    const pass = document.createElement('button');
    const check = document.createElement('button');

    raise.textContent = 'Raise';
    pass.textContent = 'Pass';
    check.textContent = 'Check';
    const p = document.createElement('p');

    raise.addEventListener('click', () => {
        windowText.textContent = '';
        p.textContent = 'Player Raises!';
        windowText.appendChild(p);
        checkComputerMove( playerCards, computerCards );
    });

    pass.addEventListener('click', () => {   
        computerScore++;
        showResult('Player Passes!');
        cleanButtons();
    });
    check.addEventListener('click', () => {
        windowText.textContent = '';
        p.textContent = 'Player Checks...';
        windowText.appendChild(p);
        const result = compareResults(playerCards, computerCards);
        setTimeout( () => { showResult(result); cleanButtons(); }, 700 );
    });
    gameButtonsDiv.appendChild(raise);
    gameButtonsDiv.appendChild(pass);
    gameButtonsDiv.appendChild(check);
}

function checkComputerMove(playerCards, computerCards) {
    const possibleMoves = [];

    const points = checkIndexOfResult( computerCards ) + 1;
    for( let i = 0; i < points; i++) {
        possibleMoves.push('raise');
    }

    const pass = Math.floor((10 - points)/3);
    for( let i = 0; i < pass; i++ ) {
        possibleMoves.push('pass');
    }

    const check = Math.floor(points/2);
    for( let i = 0; i < check; i++) {
        possibleMoves.push('check');
    }
    console.log(possibleMoves);
    const computerMove = possibleMoves[ getRandomNumber(possibleMoves.length) ];

    switch(computerMove) {

        case 'raise': 
        setTimeout( () => { createWindowParagraph( 'Computer Raises!' ) }, 500 );
            break;

        case 'pass': 
            playerScore++;
            setTimeout( () => { showResult( 'Computer Passes!' ); cleanButtons(); }, 500 );
            break;

        case 'check': 
            setTimeout( () => { createWindowParagraph( 'Computer Checks...' ) }, 500 );
            const result = compareResults(playerCards, computerCards);
            setTimeout( () => { showResult(result); cleanButtons(); }, 1200 );

            break;

        default: 
            throw new Error('Unkown Case!');
    }
}

function addValues(arrayOfCards) {
    const sum = arrayOfCards.reduce( (acc, { value }) => {
        return acc += Number(value);
    }, 0);
    return sum;
}

function cleanButtons() {
    gameButtonsDiv.textContent = '';
}

function createWindowParagraph( message ) {
    windowText.textContent = '';
    const p = document.createElement('p');
    p.textContent = message;
    windowText.appendChild(p);
}

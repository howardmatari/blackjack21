let blackJackGame ={
     you: {
        scoreSpan :  "#your-blackjack-result",
        div:  "#your-box",
        boxSize: ".flex-Blackjack-row-2 div",
        score: 0,
        name: 'player'
    },

    dealer: {
        scoreSpan :  "#dealer-blackjack-result",
        div:  "#dealer-box",
        boxSize: ".flex-Blackjack-row-2 div",
        score: 0,
        name: 'dealer'
    },

    cards: ["2","3","4","5","6","7","8","9","10","K","J","Q","A"],

    cardsMap: { 
        "2":2,
        "3":3,
        "4":4,
        "5":5,
        "6":6,
        "7":7,
        "8":8,
        "9":9,
        "10":10,
        "K":10,
        "J":10,
        "Q":10,
        "A":[1,11]
    },

    
          wins: 0,
          losses: 0,
          draws: 0,
          isStand: false,
          isTurnover: false,
          pressOnce: false,
          inProgress: false
          

    };

    const YOU = blackJackGame["you"];
    const DEALER = blackJackGame["dealer"];

    const hitSound = new Audio("sounds/swish.m4a");
    const winSound = new Audio("sounds/cash.mp3");
    const loseSound = new Audio("sounds/aww.mp3");

    let windowWidth = window.screen.width;
    let windowHeight = window.screen.height;

    let winner;
    console.log("click");

    

                                                                  
    console.log("blackjack-hit-button");

    const DEALBUTTON = document.querySelector("#blackjack-deal-button")
    const RESTARTBUTTON = document.querySelector("#blackjack-restart-button")
    const HITBUTTON = document.querySelector("#blackjack-hit-button")
    const STANDBUTTON = document.querySelector("#blackjack-stand-button")
    STANDBUTTON.addEventListener("click", blackJackStand);
    HITBUTTON.addEventListener("click", blackJackHit);
    DEALBUTTON.addEventListener("click", blackJackDeal);
    RESTARTBUTTON.addEventListener("click", blackJackRestart);
    toggleButtons()
    
    function dealCard(who){
        let card = randomCard();
        updateScore(card, who);
        showScore(who);
        showCard(card, who);
        
    }
    function blackJackHit(){
        if(blackJackGame["isStand"]===false){
            dealCard(YOU)
        }
    }

    function randomCard(){
        let randomIndex = Math.floor(Math.random() * 13);
        return blackJackGame["cards"][randomIndex];

    }

    function showCard(card, activePlayer){
        //if(activePlayer["score"] <= 21)
        {
            //console.log('showing')
            let cardImage = document.createElement("img");
            cardImage.src = `images/${card}.png`;
            cardImage.style = `width: ${widthSize()}; height: ${heightSize()};`;
            

            if(activePlayer["name"] == 'dealer'){
                let dealerImages = document.querySelector("#dealer-box").querySelectorAll("img");
                if(dealerImages.length === 0)
                    cardImage.style.visibility = 'hidden'
            }

            document.querySelector(activePlayer["div"]).appendChild(cardImage);
            hitSound.play();
        }
    }

    function widthSize() {
        if (windowWidth > 1000){
            let newWidthSize = window.screen.width * 0.1;
            return newWidthSize;

        } else {
            return window.screen.width * 0.18;
        }

    }

    function heightSize() {
        if (windowHeight > 700){
            let newheightSize = window.screen.height * 0.18;
            return newheightSize;

        }else {
            return window.screen.height * 0.15;
        }
    }

    function updateScore(card, activePlayer){
        if (card==="A"){
            if(activePlayer["score"] + blackJackGame["cardsMap"][card][1] <= 21){
                activePlayer["score"] += blackJackGame["cardsMap"][card][1];
            }else{
                activePlayer["score"] += blackJackGame["cardsMap"][card][0];
            }
        }else{
            activePlayer["score"] += blackJackGame["cardsMap"][card];
        }

        if (activePlayer["score"] == 21 && activePlayer["name"] == 'player')
            blackJackStand()
    }

    function showScore(activePlayer){
        if(activePlayer["score"] > 21){
            
            document.querySelector(activePlayer["scoreSpan"]).textContent = activePlayer["score"] + " Bust!";
            document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
            if(blackJackGame["inProgress"])
                endGame()
        } else {
            if(activePlayer["name"] == 'dealer'){
                let dealerImages = document.querySelector("#dealer-box").querySelectorAll("img");
                if(blackJackGame["inProgress"] === false)
                    document.querySelector(activePlayer["scoreSpan"]).textContent = activePlayer["score"];
                else
                    document.querySelector(activePlayer["scoreSpan"]).textContent = ''
            }else{
                document.querySelector(activePlayer["scoreSpan"]).textContent = activePlayer["score"];
            }
            
        }
    }



    function blackJackStand() {
        if(blackJackGame.pressOnce === false){
            blackJackGame["isStand"] = true;
             let yourImages = document.querySelector("#your-box").querySelectorAll("img");
        
            while(YOU["score"] > DEALER["score"] && DEALER["score"] < 21) {
                dealCard(DEALER)
            }

            endGame()

            blackJackGame['isTurnover'] = true;
        }
            
        blackJackGame.pressOnce = true;
    }

    function endGame(){
        let dealerImages = document.querySelector("#dealer-box").querySelectorAll("img");
        dealerImages[0].style.visibility = 'visible'
        computeWinner()
        showWinner()
        blackJackGame["inProgress"] = false;
        showScore(DEALER);
        toggleButtons()
    }

    function computeWinner() {
            if(YOU['score'] <= 21){
              if(YOU['score'] > DEALER ['score'] || DEALER ['score']>21)
              {
                 winner = YOU;
              }

              else if (YOU['score'] < DEALER ['score'])
              {
              winner = DEALER;
              }

              else if (YOU['score'] === DEALER ['score']){
              winner = 'Draw';
              }
                
            }
            else if (YOU['score'] > 21 && DEALER ['score'] <= 21){
                winner = DEALER;
            }   
 
            else if (YOU['score'] > 21 && DEALER ['score'] > 21){
                winner = 'NONE';
            }
            return winner;

    }

    function showWinner(){
        let message, messageColor;

        if(winner === YOU){
            message = 'You Won!';
            messageColor ='#00e676';
            document.querySelector('#wins').textContent=blackJackGame['wins']+=1;
            winSound.play();
        }

           
        if(winner === DEALER){
                message = 'You Lost!';
                messageColor ='red';
                document.querySelector('#losses').textContent=blackJackGame['losses']+=1;
                loseSound.play();
            }

        if(winner === 'Draw'){
                message = 'Draw!';
                messageColor ='yellow';
                document.querySelector('#draws').textContent=blackJackGame['draws']+=1;
                loseSound.play();
            }

        if(winner === 'None'){
                message = 'Oh A Bust!';
                messageColor ='orange';
               
                loseSound.play();
            }

            document.querySelector('#blackjack-result').textContent = message;
            document.querySelector('#blackjack-result').style.color = messageColor;
         }

    function blackJackDeal() {
        resetUi()

        blackJackGame["inProgress"] = true;
        blackJackGame["isStand"] = false;
        blackJackGame.pressOnce = false;
        blackJackGame["isTurnOver"] = false;

        dealCard(YOU)
        dealCard(DEALER)
        dealCard(YOU)
        dealCard(DEALER)

        toggleButtons()

 }

function toggleButtons(){
    if(blackJackGame["inProgress"] === true) {
        DEALBUTTON.style.display = 'none'
        RESTARTBUTTON.style.display = 'none'
        HITBUTTON.style.display = 'inline'
        STANDBUTTON.style.display = 'inline'
    }else{
        DEALBUTTON.style.display = 'inline'
        RESTARTBUTTON.style.display = 'inline'
        HITBUTTON.style.display = 'none'
        STANDBUTTON.style.display = 'none'
    }
}
function resetState() {
    document.querySelector('#wins').textContent = 0;
     document.querySelector('#losses').textContent = 0;
     document.querySelector('#draws').textContent = 0;

     blackJackGame.wins = 0;
     blackJackGame.losses = 0;
     blackJackGame.draws = 0;
}

function resetUi(){
    let yourImages = document.querySelector("#your-box").querySelectorAll("img");
    let dealerImages = document.querySelector("#dealer-box").querySelectorAll("img");

    YOU['score'] = DEALER ['score'] = 0;
    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').textContent = 0;

    document.querySelector('#your-blackjack-result').style.color = 'white';
    document.querySelector('#dealer-blackjack-result').style.color ='white';

    document.querySelector('#blackjack-result').textContent = "Let's Play";
    document.querySelector('#blackjack-result').style.color ='white';

    for (let i = 0; i < yourImages.length; i++) {
        yourImages[i].remove();
    }

    for (let i = 0; i < dealerImages.length; i++) {
        dealerImages[i].remove();
    }
}
function blackJackRestart() {

    resetUi();
    resetState();
    

     

}
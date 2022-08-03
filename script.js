let blackJackGame ={
     you: {
        scoreSpan :  "#your-blackjack-result",
        div:  "#your-box",
        boxSize: ".flex-Blackjack-row-2 div",
        score: 0,

    },

    dealer: {
        scoreSpan :  "#dealer-blackjack-result",
        div:  "#your-box",
        boxSize: ".flex-Blackjack-row-2 div",
        score: 0,

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
          pressOnce: false
          

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

    document.querySelector("#blackjack-hit-button").addEventListener("click", blackJackHit);

                                                                  
    console.log("blackjack-hit-button");

    document.querySelector("#blackjack-stand-button").addEventListener("click", blackJackStand);

    function blackJackHit(){
        if(blackJackGame["isStand"]===false){
            let card = randomCard();
            showCard(card, YOU);
            updateScore(card, YOU);
            showScore(YOU);
    }

    function randomCard(){
        let randomIndex = Math.floor(Math.random() * 13);
        return blackJackGame["cards"][randomIndex];

    }

    function showCard(card, activePlayer){
        if(activePlayer["score"] <= 21){
            let cardImage = document.createElement("img");
            cardImage.src = `images/${card}.png`
            cardImage.style = `width: ${widthSize()}; height: ${heightSize()};`;
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
        }

        function showScore(card, activePlayer){
            if(activePlayer["score"] > 21){
                
                document.querySelector(activePlayer["scoreSpan"]).textContent = "Bust!";
                document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
        } else {
            document.querySelector(activePlayer["scoreSpan"]).textContent = activePlayer["score"];
        }
    }



        function blackJackStand() {
             if(blackJackGame.pressOnce === false){

            
             blackJackGame["isStand"] = true;
             let yourImages = document.querySelector("#your-box").querySelectorAll("img");
        

        for (let index = 0; index < yourImages.length; index++) {
             let card = randomCard();
             showCard(card, DEALER );
             updateCard(card, DEALER );
             showScore( DEALER);
         } 
         
         
               blackJackGame["isTurnover"] = true;
        }
            
        
             blackJackGame.pressOnce = true;
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
              winner = DRAW;
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
        }
    }

}
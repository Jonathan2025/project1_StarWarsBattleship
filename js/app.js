// SECTION  Instructions for the Game
// When we click on the instructions button, it will show the instructions
let instructions = document.querySelector("#instructionsBtn")
function instructionsClick () {
    let instructionsModule = document.getElementsByTagName("aside")
    instructionsModule[0].style.display = "block"
}
instructions.addEventListener("click", instructionsClick)

// when we out of it, it will remove the instructions from the screen 
let xout = document.querySelector("#closeInstructions")
function instructionsClose () {
    let instructionsModule = document.getElementsByTagName("aside")
    instructionsModule[0].style.display = "none"
}
xout.addEventListener("click", instructionsClose)


// SECTION  - Create the global game variables 
let cloneArmy = document.querySelector("#cloneCount")
let droidArmy = document.querySelector("#droidCount")
let heros = document.querySelector("#heroCount")
let villans = document.querySelector("#villanCount")
let clonesDestroyed = document.querySelector("#cloneCasualties")
let droidsDestroyed = document.querySelector("#droidCasualties")
let player1Points = document.querySelector("#player1Points")
let player2Points = document.querySelector("#player2Points")
const startBtn = document.querySelector("#start")
let player1pieces = document.getElementsByClassName("player1-piece")
let player2pieces = document.getElementsByClassName("player2-piece")
let randomPlayer1Indexes = []
let randomPlayer2Indexes = []
let playerTurn = document.querySelector("#playerTurn")


// SECTION 1 - Create the game grid 
const grid = document.querySelector('#grid');
//const boxes = document.getElementsByClassName("box");

//add boxes to the grid using for loop
 for(let i=0; i<225; i++){
    const box = document.createElement("div")
    box.classList.add("box")
    box.innerHTML = i +1
    grid.appendChild(box)
}

const boxes = document.getElementsByClassName("box");


// create random indexes in which to add player 1 pieces to the grid 
function randomizePlayer1Pieces(randomPlayer1Indexes, randomPlayer2Indexes){
    while (randomPlayer1Indexes.length < 10) {
        let randomNum = Math.floor(Math.random() * 225) + 1
        // if the random is not already chosen, then add it to the array
        if ((!randomPlayer1Indexes.includes(randomNum)) && (!randomPlayer2Indexes.includes(randomNum))){
            randomPlayer1Indexes.push(randomNum)
        }
    } 
}

// Add player 1 pieces to the grid
function addPlayer1PiecestoGrid(boxes, randomPlayer1Indexes, player1pieces){
    randomPlayer1Indexes.forEach(function(index, i) {
        let image = new Image();
        // set the new image source to the image source of the droids 
        image.src = player1pieces[i].src
        console.log(image.src)
        boxes[index].appendChild(image)
    })
}

// create random indexes in which to add player 2 pieces to the grid 
function randomizePlayer2Pieces(randomPlayer1Indexes, randomPlayer2Indexes) {
    while (randomPlayer2Indexes.length < 10) {
        let randomNum = Math.floor(Math.random() * 225) + 1;
        // if the random is not already chosen, then add it to the array
        if ((!randomPlayer1Indexes.includes(randomNum)) && (!randomPlayer2Indexes.includes(randomNum))){
            randomPlayer2Indexes.push(randomNum)
        }
    }
}

// Add player 2 pieces to the grid 
function addPlayer2PiecestoGrid (boxes,randomPlayer2Indexes, player2pieces) {
    randomPlayer2Indexes.forEach(function(index, i) {
        let image = new Image();
        // set the new image source to the image source of the droids 
        image.src = player2pieces[i].src
        console.log(image.src)
        boxes[index].appendChild(image)
    })
}


// SECTION - Create the player classes 
class Player1 {
    constructor(){
        this.side = "Clone Army"
        this.cloneArmy = document.querySelector("#cloneCount")
        this.clonesDestroyed = document.querySelector("#cloneCasualties")
        this.heros = document.querySelector("#heroCount")
        // initialize the points as 0 for now
        this.points = document.querySelector("#player1Points")
    }

    // getter methods, methods that return information 
    getSide(){
        return this.side
    }

    getArmyCount(){
        return this.cloneArmy.innerHTML
    }

    getCasualties(){
        return this.clonesDestroyed.innerHTML
    }

    getHeroCount(){
        return this.heros.innerHTML
    }

    getPoints(){
        return this.points.innerHTML
    }


    //SECTION - player methods used to highlight target and hit target
    // The user will be able to hover over a 2x2 section of the grid
    targetHover(boxesToHighlightPick){
        // basically highlight the adjacent boxes including the one box you are hovering over
        let boxesToHighlight = boxesToHighlightPick
        // for the boxes within the boxesToHighlight, add them to a class where we can add highlight with css later
        for (const boxToHighlight of boxesToHighlight){
            if(boxToHighlight){
                boxToHighlight.classList.add("highlight")
            }
        }
    }

    // When the user leaves that area that was hovered, UN-highlight 
    targetOutHover(boxesToHighlightPick){
        // basically highlight the adjacent boxes including the one box you are hovering over
        // let boxesToHighlight = [boxes[i], boxes[i+1], boxes[i+20], boxes[i+21]]
        let boxesToHighlight = boxesToHighlightPick
        // for the boxes within the boxesToHighlight, add them to a class where we remove the highlight in css
        for (const boxToHighlight of boxesToHighlight){
            if(boxToHighlight){
                boxToHighlight.classList.remove("highlight")
            }
        }
    }

    //When the player clicks on the area, highlight the area they hit
    targetHit(boxesToHighlightPick){
        // let boxesToHighlight = [boxes[i], boxes[i+1], boxes[i+20], boxes[i+21]]
        let boxesToHighlight = boxesToHighlightPick
        // for the boxes within the boxesToHighlight, add them to a class where we can add highlight with css later
        for (const boxToHighlight of boxesToHighlight){
            if(boxToHighlight){
                boxToHighlight.classList.add("hit-highlight")
            }
        }
    }

//END OF CLASS 
}



// SECTION - PLAYER 2 class creation 
class Player2 extends Player1 {
    constructor(){
        super()
        // the properties that we will be getting for player 2 will be slightly different than player 1
        this.side = "Droid Army"
        this.droidArmy = document.querySelector("#droidCount")
        this.droidsDestroyed = document.querySelector("#droidCasualties")
        this.villans = document.querySelector("#villanCount")
        //this.points = document.querySelector("#player2Points")
        
    }

    // getter methods, methods that return information, these methods slightly different from player 1
    getSide(){
        return this.side
    }

    getArmyCount(){
        return this.droidArmy.innerHTML
    }

    getCasualties(){
        return this.droidsDestroyed.innerHTML
    }

    getHeroCount(){
        return this.villans.innerHTML
    }

    // getPoints(){
    //     return this.points.innerHTML
    // }


    //the other methods like targetHover and targetHit will be 
    //extended from the player 1 class 



//End of the class 
}

//Instantiate the player 1 class
const player1Instance = new Player1()
//Instantiate Class Player 2
const player2Instance = new Player2()



//Functions that arent inside the class (put them outside because they belong in a main game function/object) 
//SECTION - Change the player stats based on what was hit in the strike
function changePlayerStats(boxesToHighlightPick){
    // let boxesHit = [boxes[i], boxes[i+1], boxes[i+20], boxes[i+21]]
    let boxesHit = boxesToHighlightPick
    //for the boxes that were hit...
    for (const boxHit of boxesHit){
        if(boxHit){
            // if there is an image tag inside the box... 
            if(boxHit.getElementsByTagName("img").length >0){
                //get the image tag's source
                const image = boxHit.getElementsByTagName("img")[0]
                let imageSource = image.getAttribute("src")
                // if the box has an image of a clone,
                if ((imageSource.includes('/Images/clone1.png'))|| (imageSource.includes('/Images/clone2.png')) || (imageSource.includes('/Images/clone3.png')) || (imageSource.includes('/Images/clone4.png'))){
                    // then add 1 to the casualties and subtract 1 from the clone army
                    clonesDestroyed.innerHTML = parseInt(clonesDestroyed.innerHTML) + 1
                    cloneArmy.innerHTML = parseInt(cloneArmy.innerHTML) - 1
                //else if the box has an image of a hero 
                } else if ((imageSource.includes('/Images/obiwan.png'))|| (imageSource.includes('/Images/yoda.png'))){
                    // then subtract 1 from heros and add 5 to casualties(clones destroyed) heros are worth more
                    clonesDestroyed.innerHTML = parseInt(clonesDestroyed.innerHTML) + 5
                    heros.innerHTML = parseInt(heros.innerHTML) - 1
                //else if the box has an image of a droid...
                } else if ((imageSource.includes('/Images/droid1.png')) || (imageSource.includes('/Images/droid2.png')) || (imageSource.includes('/Images/droid3.png')) || (imageSource.includes('/Images/droid4.png'))){
                    // then add 1 to the casualties and subtract 1 from the droid army
                    droidsDestroyed.innerHTML = parseInt(droidsDestroyed.innerHTML) + 1
                    droidArmy.innerHTML = parseInt(droidArmy.innerHTML) - 1
                } else if ((imageSource.includes('/Images/dooku.png')) || (imageSource.includes('/Images/grevious.png'))){
                    // then add 5 to the casualties and subtract 1 from villans
                    droidsDestroyed.innerHTML = parseInt(droidsDestroyed.innerHTML) + 5
                    villans.innerHTML = parseInt(villans.innerHTML) - 1
                }
            }
        }
    }
//End of function changePlayerStatus
}

//Section - After a hit has been made, show the location of the clone/droid destroyed
function showLocation(boxesToHighlightPick){
    //let boxesHit = [boxes[i], boxes[i+1], boxes[i+20], boxes[i+21]]
    let boxesHit = boxesToHighlightPick
    //for the boxes that were hit...
    for (const boxHit of boxesHit){
        if(boxHit){
            //show the location of the clone/droid if they were hit
            if(boxHit.getElementsByTagName("img").length >0){
                let childImages = boxHit.querySelectorAll("img")
                childImages.forEach(image => image.style.display = 'block')


                //play lego break sound
                playSound()
                
            }
        }
    }
}


//function play lego breaking sound 

function playSound() {
    const audio = new Audio("Images/lego-breaking.mp3");
    audio.play();
  }


//----------------------------------------------------
//Below Section will start and run the game 


// SECTION - START BUTTON will initiate the game and randomize the game pieces 
// when the player starts the game randomize the board pieces 
startBtn.addEventListener("click", function(){
    player1Click(playerTurn)
    randomizePlayer1Pieces(randomPlayer1Indexes, randomPlayer2Indexes)
    addPlayer1PiecestoGrid(boxes, randomPlayer1Indexes, player1pieces)
    randomizePlayer2Pieces(randomPlayer1Indexes, randomPlayer2Indexes)
    addPlayer2PiecestoGrid (boxes,randomPlayer2Indexes, player2pieces)
    // disable the start button once it is clicked on 
    startBtn.disabled = true
})



// SECTION - Switch turns between players
let currentUser =1
// refer to boxes above

function player1Click(event){
    
    let playerTurn = document.querySelector("#playerTurn")
    playerTurn.innerHTML = "Player one's turn!"
    const boxes = document.getElementsByClassName("box")
    console.log("player 1's turn!")
    
    for (let i=0; i<boxes.length; i++){
        let boxesToHighlightPick = [boxes[i], boxes[i+1], boxes[i+15], boxes[i+16]]
       
        boxes[i].addEventListener("mouseover", function(){
            player1Instance.targetHover(boxesToHighlightPick)
        })
        boxes[i].addEventListener("mouseout", function(){
            player1Instance.targetOutHover(boxesToHighlightPick)
        })
        boxes[i].addEventListener("click", function(){
            player1Instance.targetHit(boxesToHighlightPick)
        })
        // this part of the code will switch to player 2's turn once player 1 clicks on the grid
        currentUser = 2;
        boxes[i].removeEventListener("click", player1Click);
        boxes[i].addEventListener("click", player2Click)
    }

//end of player1click function 
}

function player2Click(event) {

    let playerTurn = document.querySelector("#playerTurn")
    playerTurn.innerHTML = "Player two's turn!"
    const boxes = document.getElementsByClassName("box");
    console.log("player 2 turn !")
    for (let i=0; i<boxes.length; i++){
        let boxesToHighlightPick = [boxes[i], boxes[i+1], boxes[i+15], boxes[i+16]]
        boxes[i].addEventListener("mouseover", function(){
            player2Instance.targetHover(boxesToHighlightPick)
        })
        boxes[i].addEventListener("mouseout", function(){
            player2Instance.targetOutHover(boxesToHighlightPick)
        })
        boxes[i].addEventListener("click", function(){
            player2Instance.targetHit(boxesToHighlightPick)
        })

        // this part of the code will switch to player 1's turn once player 1 clicks on the grid
        currentUser = 1;
        boxes[i].removeEventListener("click", player2Click);
        boxes[i].addEventListener("click", player1Click);

        }
        
    }

// add an event listener for all the boxes on the grid 
for (let i=0; i<boxes.length; i++){
    let boxesToHighlightPick = [boxes[i], boxes[i+1], boxes[i+15], boxes[i+16]]
    boxes[i].addEventListener("click", function (){
        showLocation(boxesToHighlightPick)
    })
    boxes[i].addEventListener("click",function(){
        changePlayerStats(boxesToHighlightPick)
    })
}



//Start here 
// Decide who wins the game 
if (player1Instance.getCasualties() > 5){
    console.log("player 2 wins!!!!!")
    alert("player2 wins")
} else if (player2Instance.getCasualties() > 5){
    alert("player1 wins")
    console.log("player 1 wins!!!!")
}


// write a function that keeps calling 

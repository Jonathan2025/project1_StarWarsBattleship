// SECTION Instructions for the Game
// When we click on the instructions button, it will show the instructions
let instructions = document.querySelector("#instructionsBtn")
function instructionsClick () {
    let instructionsModule = document.getElementsByTagName("aside")
    instructionsModule[0].style.display = "block"
}
instructions.addEventListener("click", instructionsClick)

// when we "x" out of it, it will remove the instructions from the screen 
let xout = document.querySelector("#closeInstructions")
function instructionsClose () {
    let instructionsModule = document.getElementsByTagName("aside")
    instructionsModule[0].style.display = "none"
}
xout.addEventListener("click", instructionsClose)


// SECTION  - Create the global game variables that will be used elsewhere throughout the code
let cloneArmy = document.querySelector("#cloneCount")
let droidArmy = document.querySelector("#droidCount")
let heros = document.querySelector("#heroCount")
let villans = document.querySelector("#villanCount")
let player1Points = document.querySelector("#player1Points")
let player2Points = document.querySelector("#player2Points")
let player1pieces = document.getElementsByClassName("player1-piece")
let player2pieces = document.getElementsByClassName("player2-piece")
let playerTurn = document.querySelector("#playerTurn")
const startBtn = document.querySelector("#start")
const restartButton = document.querySelector("#restartBtn")
let randomPlayer1Indexes = []
let randomPlayer2Indexes = []


// SECTION - Create the game grid 
const grid = document.querySelector('#grid');
//const boxes = document.getElementsByClassName("box");

//add boxes to the grid using for loop
 for(let i=0; i<75; i++){
    const box = document.createElement("div")
    box.classList.add("box")
    box.innerHTML = i +1
    grid.appendChild(box)
}

const boxes = document.getElementsByClassName("box");


// create random indexes in which to add player 1 pieces to the grid 
function randomizePlayer1Pieces(randomPlayer1Indexes, randomPlayer2Indexes){
    while (randomPlayer1Indexes.length < 10) {
        let randomNum = Math.floor(Math.random() * 75) + 1
        // if the random is not already chosen, then add it to the array
        if ((!randomPlayer1Indexes.includes(randomNum)) && (!randomPlayer2Indexes.includes(randomNum))){
            randomPlayer1Indexes.push(randomNum)
        }
    } 
}

// Add player 1 pieces to the grid
function addPlayer1PiecestoGrid(randomPlayer1Indexes,boxes,player1pieces){
    // for each of the random indexes/boxes that were picked
    // Place one of the player 1's characters inside 
    randomPlayer1Indexes.forEach(function(index, i) {
        //create a new image
        let image = new Image();
        // set the new image source to the image source from player 1 game pieces
        image.src = player1pieces[i].src
        console.log(image.src)
        boxes[index].appendChild(image)
        console.log(boxes[index])
    })
}

// create random indexes in which to add player 2 pieces to the grid 
function randomizePlayer2Pieces(randomPlayer1Indexes, randomPlayer2Indexes) {
    while (randomPlayer2Indexes.length < 10) {
        let randomNum = Math.floor(Math.random() * 75) + 1;
        // if the random is not already chosen, then add it to the array
        if ((!randomPlayer1Indexes.includes(randomNum)) && (!randomPlayer2Indexes.includes(randomNum))){
            randomPlayer2Indexes.push(randomNum)
        }
    }
}

// Add player 2 pieces to the grid 
function addPlayer2PiecestoGrid (randomPlayer2Indexes,boxes, player2pieces) {
    // for each of the random indexes/boxes that were picked
    // Place one of the player 2's characters inside 
    randomPlayer2Indexes.forEach(function(index, i) {
        // create a new image, using the image class
        let image = new Image();
        // set the new image source to the image source of the droids 
        image.src = player2pieces[i].src
        console.log(image.src)
        boxes[index].appendChild(image)
        console.log(boxes[index])
    })
}


// SECTION - Create the player classes 
class Player1 {
    constructor(){
        this.side = "Clone Army"
        this.cloneArmy = document.querySelector("#cloneCount")
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

    getHeroCount(){
        return this.heros.innerHTML
    }

    getPoints(){
        return this.points.innerHTML
    }

    // SECTION - player methods used to highlight target and hit target
    // The user will be able to hover over a box over the grid
    targetHover(boxToHighlightPick){
        let boxToHighlight = boxToHighlightPick
        // for boxToHighlight, add it to a class where we can add highlight with css later
        boxToHighlight.classList.add("highlight")
    }

    // When the user leaves that area that was hovered, UN-highlight 
    targetOutHover(boxToHighlightPick){
        // basically highlight the box you are hovering over
        let boxToHighlight = boxToHighlightPick
        // boxtoHighLight, add the box to a class where we remove the highlight in css
        boxToHighlight.classList.remove("highlight")
    }

    //When the player clicks on the area, highlight the area they hit
    targetHit(boxToHighlightPick){
        let boxToHighlight = boxToHighlightPick
        //for the boxToHighlight, add it to a class where we can add highlight with css later
        //make the pointerEvents to "none" so that the player doesnt click on the same box again
        boxToHighlight.style.pointerEvents ='none'
        boxToHighlight.classList.add("hit-highlight")
    }


//END OF Player1 class
}



// SECTION - PLAYER 2 class creation 
class Player2 extends Player1 {
    constructor(){
        super()
        // the properties that we will be getting for player 2 will be slightly different than player 1
        this.side = "Droid Army"
        this.droidArmy = document.querySelector("#droidCount")
        this.points = document.querySelector("#player2Points")
        this.villans = document.querySelector("#villanCount")
        
    }

    // getter methods, methods that return information, these methods slightly different from player 1
    getSide(){
        return this.side
    }

    getArmyCount(){
        return this.droidArmy.innerHTML
    }

    getPoints(){
        return this.points.innerHTML
    }

    getHeroCount(){
        return this.villans.innerHTML
    }

    //the other methods like targetHover and targetHit will be 
    //extended from the player 1 class 


//End of player 2 class 
}

//Instantiate the player 1 class
const player1Instance = new Player1()
//Instantiate the Player 2 class
const player2Instance = new Player2()


//Functions that arent inside the class (put them outside because they belong in a main game function/object) 
//SECTION - Change the player stats based on what was hit in the strike
function changePlayerStats(boxToHighlightPick){
    let boxHit = boxToHighlightPick
        // if there is an image tag inside the box... 
        if(boxHit.getElementsByTagName("img").length >0){
            //get the image tag's source
            const image = boxHit.getElementsByTagName("img")[0]
            let imageSource = image.getAttribute("src")
            // if the box has an image of a clone,
            if ((imageSource.includes('/Images/clone1.png'))|| (imageSource.includes('/Images/clone2.png')) || (imageSource.includes('/Images/clone3.png')) || (imageSource.includes('/Images/clone4.png'))){
                // then add 1 to player 2's points and subtract 1 from the clone army (player 1)
                player2Points.innerHTML = parseInt(player2Points.innerHTML) + 1
                cloneArmy.innerHTML = parseInt(cloneArmy.innerHTML) - 1
            //else if the box has an image of a hero 
            } else if ((imageSource.includes('/Images/obiwan.png'))|| (imageSource.includes('/Images/yoda.png'))){
                // then subtract 1 from heros and add 5 points to player 2 side 
                player2Points.innerHTML = parseInt(player2Points.innerHTML) + 5
                heros.innerHTML = parseInt(heros.innerHTML) - 1
            //else if the box has an image of a droid...
            } else if ((imageSource.includes('/Images/droid1.png')) || (imageSource.includes('/Images/droid2.png')) || (imageSource.includes('/Images/droid3.png')) || (imageSource.includes('/Images/droid4.png'))){
                // then add 1 to player 1's points and subtract 1 from the droid army (player 2 side)
                player1Points.innerHTML = parseInt(player1Points.innerHTML) + 1
                droidArmy.innerHTML = parseInt(droidArmy.innerHTML) - 1
            } else if ((imageSource.includes('/Images/dooku.png')) || (imageSource.includes('/Images/grevious.png'))){
                // then add 5 player 1's points and subtract 1 from villans
                player1Points.innerHTML = parseInt(player1Points.innerHTML) + 5
                villans.innerHTML = parseInt(villans.innerHTML) - 1
            }
        }
    }


//Section - After a hit has been made, show the location of the character destroyed
function showLocation(boxToHighlightPick){
    let boxHit = boxToHighlightPick
        //show the location of the clone/droid if they were hit
        if(boxHit.getElementsByTagName("img").length >0){
            let childImages = boxHit.querySelectorAll("img")
            childImages.forEach(image => image.style.display = 'block')

            //play lego break sound
            playSound()               
        }
    }


// function that removes the character from the player grid if they have been destroyed 
function removeCharacter(boxToHighlightPick){
    // query selector on the grids which house the player pieces
    let boxHit = boxToHighlightPick
        if(boxHit.getElementsByTagName("img").length >0){
            //get the image tag's source
            const image = boxHit.getElementsByTagName("img")[0]
            let imageSource = image.getAttribute("src")
            console.log(imageSource) //http://127.0.0.1:5500/Images/dooku.png
            let shortenedSource = imageSource.substring(imageSource.indexOf("/Images"));
            console.log(shortenedSource)
            let imageToRemove = document.querySelector(`img[src="${shortenedSource}"]`)
            console.log(imageToRemove)
            imageToRemove.parentNode.removeChild(imageToRemove)
        }
    }


//function play lego breaking sound 

function playSound() {
    const audio = new Audio("Images/lego-breaking.mp3");
    audio.play();
  }

// function play wars music 
function playSong() {
    const audio = new Audio("Images/music.mp3");
    audio.play();

}



//----------------------------------------------------
//Below Section will start and run the game 


// SECTION - START BUTTON will initiate the game and randomize the game pieces 
// when the player starts the game randomize the board pieces 
startBtn.addEventListener("click", function(){
    player1Click(playerTurn)
    randomizePlayer1Pieces(randomPlayer1Indexes, randomPlayer2Indexes)
    addPlayer1PiecestoGrid(randomPlayer1Indexes,boxes, player1pieces)
    randomizePlayer2Pieces(randomPlayer1Indexes, randomPlayer2Indexes)
    addPlayer2PiecestoGrid(randomPlayer2Indexes, boxes, player2pieces)
    // disable the start button once it is clicked on 
    startBtn.disabled = true
    playSong()
    document.getElementById("player1table").style.display ="block"
    document.getElementById("player2table").style.display ="block"
    document.getElementById("grid").style.display = "grid"
    document.getElementById("lego").style.display ="none"
    document.getElementById("description").style.display ="none"

})



// SECTION - Switch turns between players
let currentUser =1
// refer to boxes above

function player1Click(event){
    
    //let playerTurn = document.querySelector("#playerTurn")
    playerTurn.innerHTML = "Player one's turn!"

    //change to player 1's background 
    document.body.style.backgroundImage = "url(/Images/player1background.jpeg)"

    // we need to define boxes here again because of how our click functions were set up
    const boxes = document.getElementsByClassName("box")
    
    for (let i=0; i<boxes.length; i++){
        let boxToHighlightPick = boxes[i]
       
        boxes[i].addEventListener("mouseover", function(){
            player1Instance.targetHover(boxToHighlightPick)
        })
        boxes[i].addEventListener("mouseout", function(){
            player1Instance.targetOutHover(boxToHighlightPick)
        })
        boxes[i].addEventListener("click", function(){
            player1Instance.targetHit(boxToHighlightPick)
        })
        // this part of the code will switch to player 2's turn once player 1 clicks on the grid
        currentUser = 2;
        boxes[i].removeEventListener("click", player1Click)
        boxes[i].addEventListener("click", player2Click)
    }

//end of player1click function 
}

function player2Click(event) {

    let playerTurn = document.querySelector("#playerTurn")
    playerTurn.innerHTML = "Player two's turn!"

    // we need to define boxes here again because of how our click functions were set up
    const boxes = document.getElementsByClassName("box");
    console.log("player 2 turn !")

    //change the background on player's 2 turn
    document.body.style.backgroundImage = "url(/Images/player2background.jpeg)"


    for (let i=0; i<boxes.length; i++){
        let boxToHighlightPick = boxes[i]
        boxes[i].addEventListener("mouseover", function(){
            player2Instance.targetHover(boxToHighlightPick)
        })
        boxes[i].addEventListener("mouseout", function(){
            player2Instance.targetOutHover(boxToHighlightPick)
        })
        boxes[i].addEventListener("click", function(){
            player2Instance.targetHit(boxToHighlightPick)
        })

        // this part of the code will switch to player 1's turn once player 1 clicks on the grid
        currentUser = 1;
        boxes[i].removeEventListener("click", player2Click);
        boxes[i].addEventListener("click", player1Click);
        
        }
//end of player 2 click
    }


//SECTION MAIN GAME FUNCTIONALITY
// add an event listener for all the boxes on the grid 
for (let i=0; i<boxes.length; i++){
    let boxToHighlightPick = boxes[i]
    boxes[i].addEventListener("click", function (){
        changePlayerStats(boxToHighlightPick)
        showLocation(boxToHighlightPick)
        removeCharacter(boxToHighlightPick)
        console.log(player1Instance.getPoints())
        console.log(player2Instance.getPoints())

        //SECTION - END GAME Functionality
        //When one of the player gets the max points (18 points), they win the game
        if (player1Instance.getPoints() >= 18 ){
            console.log("player 1 wins!!!!!")
            alert("player1 wins")
            //remove the grids
            document.getElementById("grid").style.display = "none"
            document.getElementById("grid2").style.display = "none"
            document.getElementById("grid3").style.display = "none"
            
            // change the text on the page 
            const winner = document.getElementById("winner")
            winner.style.display ="block"
            winner.innerHTML ="Player 1 Wins!!"

            playEndMusic()
        } else if (player2Instance.getPoints() >= 18){
            alert("player2 wins")
            console.log("player 2 wins!!!!")
            //remove the grids
            document.getElementById("grid").style.display = "none"
            document.getElementById("grid2").style.display = "none"
            document.getElementById("grid3").style.display = "none"

            //change the text on the page
            const winner = document.getElementById("winner")
            winner.style.display ="block"
            winner.innerHTML ="Player 2 Wins!!"

            playEndMusic()
        }
    })
}


function playEndMusic(){
    const audio = new Audio("Images/endsong.mp3");
    audio.play();
}



// SECTION - Can restart the game -- will reload the page
restartButton.addEventListener("click", locationreload)

function locationreload(){
    location.reload()
}


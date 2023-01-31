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



//----------------------------------------------------------------------


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






// SECTION - randomize the placement of the droid chracters on the grid 
function randomizeGamePieces(){
    let player1pieces = document.getElementsByClassName("player1-piece")
    let player2pieces = document.getElementsByClassName("player2-piece")

    // First create a list of random numbers (representing the indexs of the boxes the image will go into )
    let randomPlayer1Indexes = []
    let randomPlayer2Indexes = []
    while (randomPlayer1Indexes.length < 10) {
        let randomNum = Math.floor(Math.random() * 225) + 1
        console.log("in the while loop")
        // if the random is not already chosen, then add it to the array
        if ((!randomPlayer1Indexes.includes(randomNum)) && (!randomPlayer2Indexes.includes(randomNum))){
            randomPlayer1Indexes.push(randomNum)
            console.log(randomNum);
        }
    } console.log(randomPlayer1Indexes)

    while (randomPlayer2Indexes.length < 10) {
        let randomNum = Math.floor(Math.random() * 225) + 1;
        // if the random is not already chosen, then add it to the array
        if ((!randomPlayer1Indexes.includes(randomNum)) && (!randomPlayer2Indexes.includes(randomNum))){
            randomPlayer2Indexes.push(randomNum)
            console.log(randomNum);
        }
    } console.log(randomPlayer2Indexes)
    
    randomPlayer1Indexes.forEach(function(index, i) {
        let image = new Image();
        // set the new image source to the image source of the droids 
        image.src = player1pieces[i].src
        console.log(image.src)
        boxes[index].appendChild(image)
    })


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



//Instantiate the class
const player1Instance = new Player1()


console.log(player1Instance.getSide())
console.log(player1Instance.getArmyCount())
console.log(player1Instance.getCasualties())
console.log(player1Instance.getHeroCount())
console.log(player1Instance.getPoints())




// SECTION - PLAYER 2 class 
class Player2 extends Player1 {
    constructor(){
        super()
        // the properties that we will be getting for player 2 will be slightly different than player 1
        this.side = "Droid Army"
        this.droidArmy = document.querySelector("#droidCount")
        this.droidsDestroyed = document.querySelector("#droidCasualties")
        this.villans = document.querySelector("#villanCount")
        this.points = document.querySelector("#player2Points")
        
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

    getPoints(){
        return this.points.innerHTML
    }


    //the other methods like targetHover and targetHit will be 
    //extended from the player 1 class 



//End of the class 
}


//Instantiate Class Player 2
//Instantiate the class
const player2Instance = new Player2()

console.log("player2")
console.log(player2Instance.getSide())
console.log(player2Instance.getArmyCount())
console.log(player2Instance.getCasualties())
console.log(player2Instance.getHeroCount())
console.log(player2Instance.getPoints())





//Functions that arent inside the class ( put them outside because they belong in a main game function/object) 

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
                if ((imageSource === '/Images/clone1.png')|| (imageSource === '/Images/clone2.png') || (imageSource === '/Images/clone3.png') || (imageSource === '/Images/clone4.png')){
                    // then add 1 to the casualties and subtract 1 from the clone army
                    clonesDestroyed.innerHTML = parseInt(clonesDestroyed.innerHTML) + 1
                    cloneArmy.innerHTML = parseInt(cloneArmy.innerHTML) - 1

                //else if the box has an image of a hero 
                } else if ((imageSource === '/Images/obiwan.png')|| (imageSource === '/Images/yoda.png')){
                    // then subtract 1 from heros and add 5 to casualties(clones destroyed) heros are worth more
                    clonesDestroyed.innerHTML = parseInt(clonesDestroyed.innerHTML) + 5
                    heros.innerHTML = parseInt(heros.innerHTML) - 1
                //else if the box has an image of a droid...
                // instead of using strict equality, we used .includes here since we couldnt seem to get the droid elements to have a relative image source
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
    //console log the amount of allies/enemies destroyed 
    }
        console.log("Clones Destroyed " + clonesDestroyed.innerHTML)
        console.log("Clone Army " + cloneArmy.innerHTML)
        console.log("Droids Destroyed " + droidsDestroyed.innerHTML)
        console.log("Droid Army " + droidArmy.innerHTML)
}

//Section After a hit has been made, show the location of the clone/droid destroyed
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
            }
        }
    }
}




// SECTION - for loop 



// for (let i=0; i<boxes.length; i++){
//     let boxesToHighlightPick = [boxes[i], boxes[i+1], boxes[i+15], boxes[i+16]]
   //EVENT LISTENERS (using a parameter of boxesToHighlightPick)
   // need to insert our function into anonymous functions
    // boxes[i].addEventListener("mouseover", function(){
    //     player1Instance.targetHover(boxesToHighlightPick)
    // })
    // boxes[i].addEventListener("mouseout", function(){
    //     player1Instance.targetOutHover(boxesToHighlightPick)
    // })
    // boxes[i].addEventListener("click", function(){
    //     player1Instance.targetHit(boxesToHighlightPick)
    // })
    // boxes[i].addEventListener("click", function (){
    //     showLocation(boxesToHighlightPick)
    // })
    // boxes[i].addEventListener("click",function(){
    //     changePlayerStats(boxesToHighlightPick)
    // })

    let currentUser =1
    // refer to boxes above


function player1Click(event){
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
        boxes[i].addEventListener("click", function (){
            showLocation(boxesToHighlightPick)
        })
        boxes[i].addEventListener("click",function(){
            changePlayerStats(boxesToHighlightPick)
        })

        // code to switch the player turn to player 2 
        currentUser = 2;
        boxes[i].removeEventListener("click", player1Click);
        boxes[i].addEventListener("click", player2Click)
    }

        
//end of player1click function 
}

function player2Click(event) {
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
        boxes[i].addEventListener("click", function (){
            showLocation(boxesToHighlightPick)
        })
        boxes[i].addEventListener("click",function(){
            changePlayerStats(boxesToHighlightPick)
        })
        
        // code for player 2's click
        currentUser = 1;
        boxes[i].removeEventListener("click", player2Click);
        boxes[i].addEventListener("click", player1Click);

        }
        
      
    }

//start the game 
// .addEventListener("click", player1Click);


//end of player2 click function    
// }


// when the player starts the game randomize the board pieces 
startBtn.addEventListener("click", function(){
    player1Click()
    randomizeGamePieces(),
    startBtn.disabled = true
})
// disable the start button once it is clicked on 

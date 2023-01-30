// SECTION 0 - Create the global game variables 
let cloneArmy = document.querySelector("#cloneCount")
let droidArmy = document.querySelector("#droidCount")
let clonesDestroyed = document.querySelector("#cloneCasualties")
let droidsDestroyed = document.querySelector("#droidCasualties")
// cloneArmy.innerHTML = 10
// droidArmy.innerHTML = 10
// clonesDestroyed.innerHTML = 0
// droidsDestroyed.innerHTML = 0 

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


//SECTION - Be able to drag and drop images onto the grid (Difficult Part)

$(function() {
    $(".player1-piece").draggable({
      revert: "invalid",
      helper: "clone"
    });
    $(".box").droppable({
      drop: function(event, ui) {
        //$(ui.draggable).appendTo(this).fadeOut();
        let droppedItem = $(ui.draggable)
        $(this).append(droppedItem)
      }
    });
  });

  $(function() {
    $(".player2-piece").draggable({
      revert: "invalid",
      helper: "clone"
    });
    $(".box").droppable({
      drop: function(event, ui) {
        //$(ui.draggable).appendTo(this).fadeOut();
        let droppedItem = $(ui.draggable)
        $(this).append(droppedItem)
      }
    });
  });







// SECTION - Create the player classes 
class Player1 {
    constructor(){
        this.side = "Clone Army"
        this.cloneArmy = document.querySelector("#cloneCount")
        this.clonesDestroyed = document.querySelector("#cloneCasualties")
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
                console.log(boxHit)
                const image = boxHit.getElementsByTagName("img")[0]
                let imageSource = image.getAttribute("src")
                console.log(imageSource)
                // if the box has an image of a clone,
                if (imageSource === '/Images/clone1.png'){
                    // then add 1 to the casualties and subtract 1 from the clone army
                    clonesDestroyed.innerHTML = parseInt(clonesDestroyed.innerHTML) + 1
                    cloneArmy.innerHTML = parseInt(cloneArmy.innerHTML) - 1
                //else if the box has an image of a droid...
                } else if (imageSource === '/Images/droid1.png') {
                    // then add 1 to the casualties and subtract 1 from the clone army
                    droidsDestroyed.innerHTML = parseInt(droidsDestroyed.innerHTML) + 1
                    droidArmy.innerHTML = parseInt(droidArmy.innerHTML) - 1
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











//Instantiate the class
const player1Instance = new Player1()







// SECTION - when the user HOVERS over an area, that area will highlight
// When they click on an area, it will show a hit marker

for (let i=0; i<boxes.length; i++){
    let boxesToHighlightPick = [boxes[i], boxes[i+1], boxes[i+15], boxes[i+16]]
   //EVENT LISTENERS (using a parameter of boxesToHighlightPick)
   // need to insert our function into anonymous functions
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
//end of the for loop    
}

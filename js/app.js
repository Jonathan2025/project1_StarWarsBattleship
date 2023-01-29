// SECTION 0 - Create the global game variables 
let cloneArmy = document.querySelector("#cloneCount")
    cloneArmy.innerHTML = 100
let droidArmy = document.querySelector("#droidCount")
    droidArmy.innerHTML = 100
let clonesDestroyed = document.querySelector("#cloneCasualties")
    clonesDestroyed.innerHTML =0
let droidsDestroyed = document.querySelector("#droidCasualties")
    droidsDestroyed.innerHTML = 0 
const boxes = document.getElementsByClassName("box");

// SECTION 1 - Create the Grid 
const grid = document.getElementById("grid")

//add boxes to the grid using for loop
for(let i=0; i<400; i++){
    const box = document.createElement("div")
    box.classList.add("box")
    box.innerHTML = i +1
    grid.appendChild(box)
}


// Section 2 - when the user HOVERS over an area, that area will highlight
// When they click on an area, it will show a hit marker

for (let i=0; i<boxes.length; i++){
    let boxesToHighlightPick = [boxes[i], boxes[i+1], boxes[i+20], boxes[i+21]]
   //EVENT LISTENERS (using a parameter of boxesToHighlightPick)
   // need to insert our function into anonymous functions
    boxes[i].addEventListener("mouseover", function(){
        targetHover(boxesToHighlightPick)
    })
    boxes[i].addEventListener("mouseout", function(){
        targetOutHover(boxesToHighlightPick)
    })
    boxes[i].addEventListener("click", function(){
        targetHit(boxesToHighlightPick)
    })
    boxes[i].addEventListener("click", function (){
        showLocation(boxesToHighlightPick)
    })
    boxes[i].addEventListener("click",function(){
        changePlayerStats(boxesToHighlightPick)
    })
//end of the for loop    
}

    // The user will be able to hover over a 2x2 section of the grid
    function targetHover(boxesToHighlightPick){
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
    function targetOutHover(boxesToHighlightPick){
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
    function targetHit(boxesToHighlightPick){
        // let boxesToHighlight = [boxes[i], boxes[i+1], boxes[i+20], boxes[i+21]]
        let boxesToHighlight = boxesToHighlightPick
        // for the boxes within the boxesToHighlight, add them to a class where we can add highlight with css later
        for (const boxToHighlight of boxesToHighlight){
            if(boxToHighlight){
                boxToHighlight.classList.add("hit-highlight")
            }
        }
    }

//Section 3 Scatter clone army and droid army on the grid
const cloneImage = ['images/clone1.png'] 
const droidImage = ['images/droid1.png']

let numOfClones = 100 //100
let numOfDroids = 100 //100

let selectedClones = []
let selectedDroids = []

//scatter clones randomly across on the battle field 
while (selectedClones.length < numOfClones){
    // scatter most of the clones within the top 3/4 of the grid
        let randomIndex = Math.floor(Math.random() * 300)
        let randomBox = boxes[randomIndex]
        // if the random index that was chosen is in NOT already in the selectedBoxes array then
        if((!selectedDroids.includes(randomIndex)) && (!selectedClones.includes(randomIndex))){
            // push that random index to the selected clones array
            selectedClones.push(randomIndex)
            // with the random boxes add a clone image to them
            const clone = document.createElement("img")
            clone.src = cloneImage
            console.log(clone.src)
            randomBox.appendChild(clone)
        }
}

// Scatter droids randomly on the battlefield
while (selectedDroids.length < numOfDroids){
    //put more of the droids on the bottom 3/4 of the grid (between boxes (the min) 100 and (the max) 400 or (boxes.length))
    let randomIndex = Math.floor(Math.random() * (400 - 100 + 1 )) + 100 // the plus "1" is to make sure we include the maximum value (400) in the range 
    let randomBox = boxes[randomIndex]
        if((!selectedDroids.includes(randomIndex)) && (!selectedClones.includes(randomIndex))){
            // push that random index to the selected droids
            selectedDroids.push(randomIndex)
            // with the random boxes add a droid image to them
            const droid = document.createElement("img")
            droid.src = droidImage
            console.log(droid.src)
            randomBox.appendChild(droid)

        }  
}


//SECTION 4 Count how many clones or droids have been destroyed 

    //Change the player stats based on what was hit in the strike
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
                    if (imageSource === 'images/clone1.png'){
                        // then add 1 to the casualties and subtract 1 from the clone army
                        clonesDestroyed.innerHTML = parseInt(clonesDestroyed.innerHTML) + 1
                        cloneArmy.innerHTML = parseInt(cloneArmy.innerHTML) - 1
                    //else if the box has an image of a droid...
                    } else if (imageSource === 'images/droid1.png') {
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

//Section 5 After a hit has been made, show the location of the clone/droid destroyed
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


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
    // within the grid, the user will be able to hover over a 2x2 section of the grid
    boxes[i].addEventListener("mouseover", function(){
        // basically highlight the adjacent boxes including the one box you are hovering over
        let boxesToHighlight = [boxes[i], boxes[i+1], boxes[i+20], boxes[i+21]]
        // for the boxes within the boxesToHighlight, add them to a class where we can add highlight with css later
        for (const boxToHighlight of boxesToHighlight){
            if(boxToHighlight){
                boxToHighlight.classList.add("highlight")
            }
        }

    })

    // when the user leaves that area that was hovered, UN-highlight using the same concepts above
    boxes[i].addEventListener("mouseout", function(){
        // basically highlight the adjacent boxes including the one box you are hovering over
        let boxesToHighlight = [boxes[i], boxes[i+1], boxes[i+20], boxes[i+21]]
        // for the boxes within the boxesToHighlight, add them to a class where we remove the highlight in css
        for (const boxToHighlight of boxesToHighlight){
            if(boxToHighlight){
                boxToHighlight.classList.remove("highlight")
            }
        }

    })
    //When the player clicks on the area, then highlight the area they hit
    boxes[i].addEventListener("click", function(){
        let boxesToHighlight = [boxes[i], boxes[i+1], boxes[i+20], boxes[i+21]]
        // for the boxes within the boxesToHighlight, add them to a class where we can add highlight with css later
        for (const boxToHighlight of boxesToHighlight){
            if(boxToHighlight){
                boxToHighlight.classList.add("hit-highlight")
            }
        }
    })

//end of the for loop    
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
            randomBox.appendChild(clone)
        }
}

// Scatter droids randomly on the battlefield
while (selectedDroids.length < numOfDroids){
    //put more of the droids on the bottom 3/4 of the grid (between boxes (the min) 100 and (the max) 400 or (boxes.length))
    let randomIndex = Math.floor(Math.random() * (400 - 100 + 1 ) + 100) // the plus "1" is to make sure we include the maximum value (400) in the range 
    let randomBox = boxes[randomIndex]
        if((!selectedDroids.includes(randomIndex)) && (!selectedClones.includes(randomIndex))){
            // push that random index to the selected droids
            selectedDroids.push(randomIndex)
            // with the random boxes add a droid image to them
            const droid = document.createElement("img")
            droid.src = droidImage
            randomBox.appendChild(droid)

        }  
}


// SECTION 6 just to see how we can count how many clones/droids are in the battle field
//PROBABLY WONT NEED SINCE WE ALREADY KNOW HOW MANY ARE IN THE BATTLEFIELD
// for (let i=0; i<boxes.length; i++){
//     //access the image source of each box
//     const image = boxes[i].getElementsByTagName("img")[0]
//     let imageSource = image.getAttribute("src")
//     if (imageSource === 'images/clone1.png'){
//         // if the box has an image of a clone, then add 1 to the clone army (variable in section 0)
//         cloneArmy += 1
//         //else if its a droid then add 1 to the droid army
//     } else if (imageSource === 'images/droid1.png') {
//         droidArmy += 1
//     }
// }

console.log(cloneArmy)
console.log(droidArmy)


//SECTION 4 Count how many clones or droids have been destroyed 

// first let count how many boxes were clicked on first 
for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", function(){
        let boxesHit = [boxes[i], boxes[i+1], boxes[i+20], boxes[i+21]]
        //for the boxes that were hit...
        for (const boxHit of boxesHit){
            if(boxHit){
                // if there is an image tag inside the box... 
                if(boxHit.getElementsByTagName("img").length >0){
                console.log(boxHit)
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
    })

//end of the for loop
}


//Section 5 After a hit has been made, show the location of the clone/droid destroyed
for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", function(){
        let boxesHit = [boxes[i], boxes[i+1], boxes[i+20], boxes[i+21]]
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
 
    })

//end of the for loop
}

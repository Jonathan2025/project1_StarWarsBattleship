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
const boxes = document.getElementsByClassName("box");

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
    // when the user leaves that area that was hovered, UNhighlight using the same concepts above
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
    //Section 3 When the player clicks on the area, then highlight the area they hit
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


// SECTION 4 Add images to the boxes on the grid of the droid army
//use the variable boxes above to access the boxes on the grid 
const droidImage = ['images/droid1.png']

for(let i=0; i<boxes.length/2; i++){
    const droid = document.createElement("img")
    droid.src = droidImage
    boxes[i].appendChild(droid)
}

// SECTION 5 Add images to the boxes on the grid of the clone army 
const cloneImage = ['images/clone1.png']

for(let i=boxes.length/2; i<boxes.length; i++){
    const clone = document.createElement("img")
    clone.src = cloneImage
    boxes[i].appendChild(clone)
}


// SECTION 6 just to see how we can count how many clones/droids are in the battle field
let cloneArmy = 0 
let droidArmy = 0

for (let i=0; i<boxes.length; i++){
    //access the image source of each box
    const image = boxes[i].getElementsByTagName("img")[0]
    let imageSource = image.getAttribute("src")
    if (imageSource === 'images/clone1.png'){
        // if the box has an image of a clone, then add 1 to the clone army
        cloneArmy += 1
        //else if its a droid then add 1 to the droid army
    } else if (imageSource === 'images/droid1.png') {
        droidArmy += 1
    }
}

console.log(cloneArmy)
console.log(droidArmy)


//SECTION 7 Count how many clones or droids have been destroyed 
let clonesDestroyed = 0
let droidsDestroyed = 0 
let boxesDestroyed = 0 

// first let count how many boxes were clicked on first 
for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", function(){
        let boxesHit = [boxes[i], boxes[i+1], boxes[i+20], boxes[i+21]]
        // for the boxes within the boxesToHighlight, add them to a class where we can add highlight with css later
        for (const boxHit of boxesHit){
            if(boxHit){
                const image = boxHit.getElementsByTagName("img")[0]
                let imageSource = image.getAttribute("src")
                if (imageSource === 'images/clone1.png'){
                    // if the box has an image of a clone, then add 1 to the clone army
                    clonesDestroyed += 1
                //else if its a droid then add 1 to the droid army
                } else if (imageSource === 'images/droid1.png') {
                    droidsDestroyed += 1
                } 
            } 
        //console log the amount of allies/enemies destroyed 
        }console.log(droidsDestroyed)
        console.log(clonesDestroyed)
    })

//end of the for loop
}



// function countTroopsDestroyed(boxes){
//         //access the div class, if it has been hit it would say "box hit-highlight"
//         let className = boxes[i].className[1]
//         console.log(className)
//         if (className === "hit-hightlight"){
//             //access the image source from above
//             if (imageSource === 'images/clone1.png'){
//                 clonesDestroyed += 1
//                 console.log(clonesDestroyed)
//             } else if (imageSource === 'images/droid1.png'){
//                 droidsDestroyed += 1
//                 console.log(droidsDestroyed)
//             }
//         }
//     }


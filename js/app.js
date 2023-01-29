// SECTION 0 - Create the global game variables 
let cloneArmy = document.querySelector("#cloneCount")
let droidArmy = document.querySelector("#droidCount")
let clonesDestroyed = document.querySelector("#cloneCasualties")
let droidsDestroyed = document.querySelector("#droidCasualties")
cloneArmy.innerHTML = 10
droidArmy.innerHTML = 10
clonesDestroyed.innerHTML = 0
droidsDestroyed.innerHTML = 0 

// SECTION 1 - Create the game grid 
const grid = document.querySelector('#grid');
//const grid = document.getElementById("grid")
const boxes = document.getElementsByClassName("box");
console.log(boxes.length)
//add boxes to the grid using for loop
 for(let i=0; i<225; i++){
    const box = document.createElement("div")
    box.classList.add("box")
    box.innerHTML = i +1
    grid.appendChild(box)
}




// // SECTION - create the grid housing player 1 game pieces 
// const grid2 = document.getElementById("grid2")

// // add boxes to grid 2 using a for loop 
// for(let i=0; i<10; i++){
//     const box2 = document.createElement("div")
//     box2.classList.add("box2")
//     box2.innerHTML = i +1
//     grid2.appendChild(box2)
// }

// //SECTION - Create the grid housing player 2 game pieces
// const grid3 = document.getElementById("grid3")

// // add boxes to grid 2 using a for loop 
// for(let i=0; i<10; i++){
//     const box3 = document.createElement("div")
//     box3.classList.add("box3")
//     box3.innerHTML = i +1
//     grid3.appendChild(box3)
// }


//SECTION - Be able to drag and drop images onto the grid

//grid 2 will house player 1's game pieces
const grid2 = document.querySelector('#grid2');
const grid3 = document.querySelector('#grid3')
// grid will be the main game grid that is being dragged to
// DRAG AND DROP was probably the most difficult part of the code

grid2.addEventListener('dragstart', function(event) {
    // event has several properties and methods
    // setData is a method of the 'DataTranfer' interface in HTML Drag and Drop API, that is used to set the data to be transferred
    // during a drag and drop event 
    // it consists of 2 arguments (the type of data being set, and the actual data)
    //'text/html' is the type of data being set
  event.dataTransfer.setData('text/html', event.target.outerHTML);
});

grid3.addEventListener('dragstart', function(event) {
    event.dataTransfer.setData('text/html', event.target.outerHTML);
  });

grid.addEventListener('drop', function(event) {
    // use preventDefault to prevent the default behavior of the event
  event.preventDefault();
  // event is an object that represents the current state of an event such in this case a "drag and drop" event
  // target refers to the ELEMENT that the event is currently being processed for
  const targetBox = event.target;

  // make sure the element that is being dragged is dropped INTO a box inside the grid
  // this is a conditional statement that checks if the drop target has the class"box"
  // if it does not, then the function will return and STOPS executing the rest of the function
  if (!targetBox.classList.contains('box')) {
    return;
  }

  const imgHTML = event.dataTransfer.getData('text/html');
  targetBox.innerHTML += imgHTML;

  // remove the image from grid1
  const removedImg = event.dataTransfer.getData('text/html');
  // created a variable called temporary element used to store the referemce to removedImg
  const tempEl = document.createElement('div');
  tempEl.innerHTML = removedImg;
  // removed image is a refernce to the image element that is being dragged
  const removedImage = tempEl.firstChild;
  // we remove "removedImage" from the parent node which is the grid 1 element
  removedImage.parentNode.removeChild(removedImage);
});

grid.addEventListener('dragover', function(event) {
    // we need to allow the main game grid to be able to act as a drop target 
    // for the purposes of oout drag and drop 
    // we need to prevent the default behavior of the "dragover" event
  event.preventDefault();
});

// SECTION 2 ENDS HERE






// SECTION - when the user HOVERS over an area, that area will highlight
// When they click on an area, it will show a hit marker

for (let i=0; i<boxes.length; i++){
    let boxesToHighlightPick = [boxes[i], boxes[i+1], boxes[i+15], boxes[i+16]]
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
// const cloneImage = ['images/clone1.png'] 
// const droidImage = ['images/droid1.png']

// let numOfClones = 100 //100
// let numOfDroids = 100 //100

// let selectedClones = []
// let selectedDroids = []

// //scatter clones randomly across on the battle field 
// while (selectedClones.length < numOfClones){
//     // scatter most of the clones within the top 3/4 of the grid
//         let randomIndex = Math.floor(Math.random() * 300)
//         let randomBox = boxes[randomIndex]
//         // if the random index that was chosen is in NOT already in the selectedBoxes array then
//         if((!selectedDroids.includes(randomIndex)) && (!selectedClones.includes(randomIndex))){
//             // push that random index to the selected clones array
//             selectedClones.push(randomIndex)
//             // with the random boxes add a clone image to them
//             const clone = document.createElement("img")
//             clone.src = cloneImage
//             console.log(clone.src)
//             randomBox.appendChild(clone)
//         }
// }

// // Scatter droids randomly on the battlefield
// while (selectedDroids.length < numOfDroids){
//     //put more of the droids on the bottom 3/4 of the grid (between boxes (the min) 100 and (the max) 400 or (boxes.length))
//     let randomIndex = Math.floor(Math.random() * (400 - 100 + 1 )) + 100 // the plus "1" is to make sure we include the maximum value (400) in the range 
//     let randomBox = boxes[randomIndex]
//         if((!selectedDroids.includes(randomIndex)) && (!selectedClones.includes(randomIndex))){
//             // push that random index to the selected droids
//             selectedDroids.push(randomIndex)
//             // with the random boxes add a droid image to them
//             const droid = document.createElement("img")
//             droid.src = droidImage
//             console.log(droid.src)
//             randomBox.appendChild(droid)

//         }  
// }


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


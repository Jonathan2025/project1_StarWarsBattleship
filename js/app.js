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


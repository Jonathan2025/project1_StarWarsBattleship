// SECTION 1 - Create the Grid 
const grid = document.getElementById("grid")

//add boxes to the grid using for loop
for(let i=0; i<144; i++){
    const box = document.createElement("div")
    box.classList.add("box")
    box.innerHTML = i +1
    grid.appendChild(box)
}


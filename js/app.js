// SECTION 1 - Create the Grid 
const grid = document.getElementById("grid")

for(let i=0; i<6; i++){
    //add boxes to the grid
    const box = document.createElement("div")
    box.classList.add("box")
    box.innerHTML = i +1
    grid.appendChild(box)
}


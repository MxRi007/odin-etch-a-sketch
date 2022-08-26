const editor = document.querySelector('#editor');
const btnSize = document.querySelector('#gridSize');
const btnColor = document.querySelector('#color');

btnSize.addEventListener('click', promptGrid);

function promptGrid(){
    let size = +prompt('Please enter a grid size between 10 - 100 pixels.');
    while(true){
        if(size === null || size === ''){
            break;
        } else if(isNaN(size)){
            size = +prompt('That\'s not a number. Please enter a number between 10 - 100 pixels.');
            continue;
        } else if(size > 100 || size < 10){
            size = +prompt('That\'s number is not in the range. Please enter a number between 10 - 100 pixels.');
            continue;
        } else {
            editor.replaceChildren();
            buildGrid(size);
            break;
        }  
    }

}

let mousedown = false;
let coordinates = [];

function buildGrid(length){
    for(let i = 1; i <= length; i++){
        for(let j = 1; j <= length; j++){
            
       
        const square = document.createElement('div');
        
        coordinates.push([i, j, square]);
        
        square.classList.add('square');
        square.style.width = `${960/length}px`;
        square.style.height = `${960/length}px`;

        square.addEventListener('mouseover', () => {
            if(mousedown){
                setColor(square);
            }
        });

        square.addEventListener('mousedown', () => {
            setColor(square);
            mousedown = true;
        });

        square.addEventListener('mouseup', () => {
            mousedown = false;
        });

        editor.appendChild(square);

        }
    }
    console.log(coordinates);
}

function setColor(element){
    element.style.backgroundColor = btnColor.value;
}


buildGrid(40);






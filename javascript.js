const editor = document.querySelector('#editor');
const btnSize = document.querySelector('#gridSize');
const btnColor = document.querySelector('#color');
const btnRandomColors = document.querySelector('#randomColors');
const btnGradualColors = document.querySelector('#gradualColors');


let randomColors = false;
let gradualColors = false;


btnRandomColors.addEventListener('click', () => {
    randomColors = !randomColors;
    randomColors ? 
    btnRandomColors.textContent = 'random colors: on' :
    btnRandomColors.textContent = 'random colors: off';

});

btnGradualColors.addEventListener('click', () => {
    gradualColors = !gradualColors;
    gradualColors ? 
    btnGradualColors.textContent = 'gradual colors: on' :
    btnGradualColors.textContent = 'gradual colors: off';

});


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

            if(gradualColors){
                let rgb = square.style.backgroundColor.slice(4,-1).split(',');
                let r = rgb[0];
                let g = rgb[1];
                let b = rgb[0];

                square.style.backgroundColor = `rgb(${r-25},${g-25}, ${b-25} )`;
            }
        });

        square.addEventListener('mousedown', () => {
            if(!gradualColors){
                setColor(square);
                mousedown = true;
                
            }


        });

        square.addEventListener('mouseup', () => {
            mousedown = false;
        });

        editor.appendChild(square);

        }
    }
}

function setColor(element){
    if(randomColors){
        element.style.backgroundColor = getRandomColor();
    }  else {
        element.style.backgroundColor = btnColor.value;
    }

}

function getRandomColor(){
    let r = Math.round((Math.random() *255) + 1);
    let g = Math.round((Math.random() *255) + 1);
    let b = Math.round((Math.random() *255) + 1);


    return `rgb(${r}, ${g}, ${b})`;
}

buildGrid(40);






const editor = document.querySelector('#editor');

function buildGrid(length){
    for(let i = 0; i < length*length; i++){
        const square = document.createElement('div');
        square.classList.add('square');
        square.addEventListener('click', () =>{
            square.style.backgroundColor = 'black';
        });
        editor.appendChild(square);
        }
}

buildGrid(16);




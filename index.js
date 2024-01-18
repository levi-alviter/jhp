// References to DOM Elements
const d = document;
const prevBtn = d.getElementById('prev-btn');
const nextBtn = d.getElementById('next-btn');
const book = d.getElementById('book');

//Event Listener
prevBtn.addEventListener('click',goPrevPage);
nextBtn.addEventListener('click',goNextPage);

// Business logic
let currentLocation = 1;
let papersArray = [...d.querySelectorAll('.paper')];
let numOfPapers = papersArray.length;
let maxLocation = numOfPapers + 1;
let counter = numOfPapers;

//Asigning zIndex dinamically
let zIndexDinamyc = numOfPapers;
papersArray.forEach((item)=>{
    item.style.zIndex = zIndexDinamyc;
    zIndexDinamyc--;
});

function openBook(){
    book.style.transform = 'translateX(50%)';
    prevBtn.style.transform = 'translate(-180px)';
    nextBtn.style.transform = 'translate(180px)';
}

function closeBook(isAtBeginning) {
    if(isAtBeginning)
        book.style.transform = 'translate(0%)';
    else 
        book.style.transform = 'translate(100%)';
        
    prevBtn.style.transform = 'translate(0px)';
    nextBtn.style.transform = 'translate(0px)';
}

function goNextPage(){
    if(currentLocation < maxLocation){
        papersArray[currentLocation-1].classList.add('flipped');

        if(currentLocation === 1){
            openBook();
            // Primera página jamás cambia de z-index
        }
        else{
            //Cuando una página es pasada de derecha a izquierda, adquiere un layer mayor que la anterior
            let layer = parseInt(papersArray[currentLocation-2].style.zIndex) + 1;
            papersArray[currentLocation-1].style.zIndex = layer;
            //El counter es una bandera que permite saber que número de layer le toca a una página que es regresada de izquierda a derecha
            counter--;
        }
        if(currentLocation === numOfPapers)
            closeBook(false);

        currentLocation++;
    }
    papersArray.forEach((item,index)=>{
        console.log(index,papersArray[index].style.zIndex);
    });
}

function goPrevPage(){
    if(currentLocation > 1){
        papersArray[currentLocation-2].classList.remove('flipped');

        if(currentLocation === maxLocation)
            openBook();
        else{
            // Cuando una página regresa (de izquierda a derecha) entonces el counter le indica que posición de z-index debe tomar la página anterior, no a la que estamos pasando ahora, esa mantiene su z-index hasta que otra hoja se encime.
            papersArray[currentLocation-1].style.zIndex = counter;
            counter++;
        }
        if(currentLocation === 2){
            //Esta línea permite mostrar la portada de inicio cuando volvemos de regreso
            papersArray[currentLocation-2].style.zIndex = counter;
            closeBook(true);    
        }
            
    }
    currentLocation--;
    // papersArray.forEach((item,index)=>{
        // console.log(index,papersArray[index].style.zIndex);
    // });
}
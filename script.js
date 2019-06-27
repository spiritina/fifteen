let arr = [],
    fieldModel = [[], [], [], []],
    field = document.getElementById('field'),
    zero = [3,3], 
    final = [[1,2,3,4],[5,6,7,8], [9,10,11,12], [13,14,15,0]];

generateRandomArray();
if(isSolvable(arr)){ 
buildFieldModel();} else {
    let tmp = arr[0];
    arr[0] = arr[1];
    arr[1] = tmp;
    buildFieldModel();
}

function generateRandomArray() {
    for (let i = 0; i < 15; i++) {
        arr[i] = i+1;
    }
    arr.sort(randomizeArray).push(0);
}


function buildFieldModel() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            fieldModel[j].push(arr[i + (j * 4)]);
            if(i==3&&j==3){drawZero(i,j)}else{drawNumber(arr[i + j * 4], i, j);}
    }}
    console.log(fieldModel);
}

function randomizeArray(a, b) {
    return Math.random() - 0.5;
}
function drawZero(x,y){
    let div = document.createElement('div');
    div.classList.add('number');
    div.classList.add('zero');
    setPositionOfNumber(div, x,y);
    field.appendChild(div);
}

function drawNumber(i, x, y) {
    let div = document.createElement('div');
    div.innerHTML = i;
    div.classList.add('number');
    if (i == 0) {
        div.innerHTML = '';
        div.classList.add('zero');
    };
    
    setPositionOfNumber(div, x,y);
    div.addEventListener('click', function(){
        let currentCoordinates = getCoordinates(this);
        console.log(zero);
        if ((Math.abs(currentCoordinates[0]-zero[0])+Math.abs(currentCoordinates[1]-zero[1]))==1){
            changeElementWithZero(this, currentCoordinates);
            isGameEnded();
            }
    })
    field.appendChild(div);
}
function changeElementWithZero(elem, currentCoordinates){
    console.log(currentCoordinates);
let zeroDiv = document.getElementsByClassName('zero')[0];
    setPositionOfNumber(zeroDiv, currentCoordinates[0], currentCoordinates[1]);
    setPositionOfNumber(elem, zero[0], zero[1]);
    let tmp = fieldModel[currentCoordinates[1]][currentCoordinates[0]];
    console.log(tmp);
    fieldModel[currentCoordinates[1]][currentCoordinates[0]] = 0;
    fieldModel[zero[1]][zero[0]] = tmp;
    zero = currentCoordinates;
    console.log(fieldModel);
}

function isGameEnded(){
    for (let i=0; i<fieldModel.length; i++){
        for(let j=0; j<fieldModel[i].length; j++){
            if (fieldModel[j][i]!=final[j][i]){return false}
        }
    }
    
        alert('You won!');
    generateRandomArray();
if(isSolvable(arr)){ 
buildFieldModel();} else {
    let tmp = arr[0];
    arr[0] = arr[1];
    arr[1] = tmp;
    buildFieldModel();
    zero = [3,3];
}
    return true
    }
    

 function isSolvable(a){
     let kDisorder = 0;
      for ( let i = 1; i< a.length-1; i++){
        for (let j = i-1; j >= 0; j--) {
            if (a[j] > a[i]) kDisorder++;
        }}
      return !(kDisorder % 2); } 

function setPositionOfNumber(elem, x,y){
    elem.style.left = (25*x + '%');
    elem.style.top = (25 * y + '%');
    elem.setAttribute('data-x', x);
    elem.setAttribute('data-y', y);
}

function getCoordinates(elem){
    let x = +elem.dataset.x;
    let y = +elem.dataset.y;
    
    return [x,y];
}
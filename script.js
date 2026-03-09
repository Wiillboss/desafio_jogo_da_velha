//Inicial Data
let square = {
    a1: '',a2: '',a3: '',
    b1: '',b2: '',b3: '',
    c1: '',c2: '',c3: ''
};
let player ='';
let warning ='';
let playing = false;

reset();

//Events
document.querySelector('.reset').addEventListener('click', reset);
//document.querySelector('div[data-item=a1]').addEventListener('click', itemClick); OBS: Fazendo essa opção, teria que ser feito para os 9
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});




//Functions
function itemClick(event){
    let item = event.target.getAttribute('data-item');
    if(square[item] === ''){
        square[item] = player;
        renderSquare();
        tooglePlayer();
    }
}

function reset () {
    //limpando
    warning = '';

    //escolhendo aleatóriamente um player
    let random = Math.floor(Math.random() *2);
    player = (random ===0) ? 'x': 'O';

    //zerando o tabuleiro - OBS: formas de acessar um objeto em JS (square[i] ou square['a1'])
    for(let i in square){
        square[i] = '';
    }

    playing = true;

    //rendenizando as informações - transformando os dados do square (tabuleiro) para visual (preencher)

    renderSquare();
    renderInfo();
}

function renderSquare() {
    for(let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`)
        item.innerHTML = square[i];
    }

    checkGame();
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
    
}

function tooglePlayer(){
    
    /*if(player === 'x'){
        player = 'o';
    }else{
        player = 'x';
    }*/

    player = (player === 'x') ? 'o' : 'x';
    renderInfo();
}

function checkGame(){
    if(checkWinnerFor('x')){
        warning = ' O "x" venceu';
        player = false;

    }else if( checkWinnerFor('o')){
        warning = 'O "o" venceu';
        player = false;

    }else if(isFull()){
        warning = 'Deu empate';
        player = false;

    }
}

function checkWinnerFor(player){
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,b1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for(let w in pos){
        let pArray = pos[w].split(','); // a1, a2, a3
        let hasWon = pArray.every(option => square[option] === player);
        if(hasWon){
            return true;
        }
    }

    return false;
}

function isFull(){

}
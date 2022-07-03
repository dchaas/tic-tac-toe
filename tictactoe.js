// create the player factory function
let Player = (mark) => {
    let _name = 'Player';
    let marker = mark;

    const setName = function(newName) {
        _name = newName;
    }

    const getName = function() {
        return _name;
    }

    return {marker, setName, getName}
};

// create the game state module
let game = (()=>{
    const player1 = Player('o');
    const player2 = Player('x');
    let _activePlayer = player1;
    const turn = document.querySelector('#name');

    const _render = function() {
        turn.innerHTML=`${_activePlayer.getName()} (${_activePlayer.marker})`;
    };

    const changePlayer = ()=> {
        _activePlayer = (_activePlayer===player1) ? player2 : player1;
        _render();
    };

    const getActivePlayer = ()=> {
        return _activePlayer;
    };

    _render();
    return {getActivePlayer,changePlayer};
})();

// create the gameboard with a module
const gameboard = ((gm)=> {
    let board = ['','','','x','','','','',''];
    const spaces = document.querySelectorAll('.space');

    const _init = () => {
        for (let i=0; i<spaces.length; i++) {
            spaces[i].addEventListener('click',updateBoard)
        }
        _render();
    }

    const _render = () => {
        board.forEach((square,i)=>{
            // get the DOM element
            const space = document.querySelector(`#box${i+1}`);
            space.textContent = square;
        });
    }

    const updateBoard = function(event) {
        // check to see if the box is already filled
        console.log(event.target.id);
        if (event.target.textContent === '') {
            let index = event.target.id.replace('box','');
            board[index-1] = gm.getActivePlayer().marker;
            console.log(gm);
            gm.changePlayer();
            _render();
        } 
    };
    _init();
    return  {board,updateBoard,_render};
})(game);



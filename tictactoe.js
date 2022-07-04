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
    const namesBtn = document.querySelector('.setnames');
    const form = document.querySelector('form');
    let _activePlayer = player1;
    let _gameActive = true;
    let _winner = '';
    const turn = document.querySelector('#name');

    const _render = function() {
        if ((!_gameActive) && (_winner==='')) {
            turn.innerHTML=`Game Over - DRAW!`;
            turn.classList.add('gameover');    
        } else if (!_gameActive) {
            let winPlayer = _winner===player1.marker ? player1 : player2;
            turn.innerHTML=`Game Over - ${winPlayer.getName().toUpperCase()} with ${winPlayer.marker.toUpperCase()}s wins!`;    
            turn.classList.add('gameover');
        } else {
            turn.innerHTML=`${_activePlayer.getName()}'s turn - ${_activePlayer.marker.toUpperCase()}s`;
            turn.classList.remove('gameover');
        }
    };

    const changePlayer = ()=> {
        _activePlayer = (_activePlayer===player1) ? player2 : player1;
        _render();
    };

    const getActivePlayer = ()=> {
        return _activePlayer;
    };

    const newGame = ()=> {
        _gameActive = true;
        _activePlayer = player1;
        form.style.visibility = 'visible';
        _winner = '';
    };

    const setNames = ()=> {
        let p1 = document.querySelector('input[name="player1"]');
        let p2 = document.querySelector('input[name="player2"]');
        player1.setName(p1.value);
        player2.setName(p2.value);
        p1.value = '';
        p2.value = '';
        form.style.visibility = 'hidden';
        _render();
    };

    const checkResult = function(bd) {            
        console.log(bd[0],bd[1],bd[2]);
        if ((bd[0]===bd[1]) && (bd[1]===bd[2]) && bd[0]!=='') {
            _gameActive=false;
            _winner=bd[0];
        } else if ((bd[0]===bd[3]) && (bd[3]===bd[6]) && bd[0]!=='') {
            _gameActive=false;
            _winner=bd[0];
        } else if ((bd[0]===bd[4]) && (bd[4]===bd[8]) && bd[0]!=='') {
            _gameActive=false;
            _winner=bd[0];
        } else if ((bd[1]===bd[4]) && (bd[4]===bd[7]) && bd[1]!=='') {
            _gameActive=false;
            _winner=bd[1];
        } else if ((bd[2]===bd[5]) && (bd[5]===bd[8]) && bd[2]!=='') {
            _gameActive=false;
            _winner=bd[2];
        } else if ((bd[2]===bd[4]) && (bd[4]===bd[6]) && bd[2]!=='') {
            _gameActive=false;
            _winner=bd[2];
        }  else if ((bd[3]===bd[4]) && (bd[4]===bd[5]) && bd[3]!=='') {
            _gameActive=false;
            _winner=bd[3];
        }  else if ((bd[6]===bd[7]) && (bd[7]===bd[8]) && bd[6]!=='') {
            _gameActive=false;
            _winner=bd[6];
        } else if (bd.findIndex(element => element==='')<0) {
            _gameActive=false;
        }
        _render();
        return _gameActive;
    };

    namesBtn.addEventListener('click',setNames);
    _render();
    return {getActivePlayer,changePlayer,checkResult,newGame};
})();

// create the gameboard with a module
const gameboard = ((gm)=> {
    let board = ['','','','','','','','',''];
    const spaces = document.querySelectorAll('.space');
    const newGame = document.querySelector('#newgame');

    const _init = () => {
        for (let i=0; i<spaces.length; i++) {
            spaces[i].addEventListener('click',updateBoard)
        }

        newGame.addEventListener('click',clearBoard);

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
        let playing = gm.checkResult(board);
        if ((event.target.textContent === '') && (playing)) {
            let index = event.target.id.replace('box','');
            board[index-1] = gm.getActivePlayer().marker;
            console.log(gm);
            playing = gm.checkResult(board);
            gm.changePlayer();
            
            _render();
        } 
    };

    const clearBoard = function() {
        board = ['','','','','','','','',''];
        _render();
        gm.newGame();
    };

    _init();
    return  {};
})(game);



// create the gameboard with a module
const gameboard = (()=> {
    let board = ['x','x','o','o','x','o','x','o','o'];

    const _render = () => {
        board.forEach((square,i)=>{
            // get the DOM element
            const space = document.querySelector(`#box${i+1}`);
            space.textContent = square;
        });
    }

    const updateBoard = function() {

    };

    return  {board,updateBoard,_render};
})();

gameboard._render();
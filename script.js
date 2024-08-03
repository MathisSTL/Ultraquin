document.addEventListener('DOMContentLoaded', () => {
    const taquinContainer = document.getElementById('taquin');
    const size = 6;
    const tiles = Array.from({ length: 35 }, (_, i) => i + 1);
    tiles.push(''); // Adding the blank tile

    tiles.forEach((tile) => {
        const tileElement = document.createElement('div');
        tileElement.classList.add('tile');
        if (tile === '') {
            tileElement.classList.add('blank');
        } else {
            tileElement.textContent = tile;
        }
        taquinContainer.appendChild(tileElement);
    });

    // Mélanger le puzzle en effectuant 1000 mouvements aléatoires
    for (let i = 0; i < 1000; i++) {
        makeRandomMove();
    }

    taquinContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('tile') && !e.target.classList.contains('blank')) {
            moveTile(e.target);
        }
    });

    function moveTile(tile) {
        const blankTile = document.querySelector('.tile.blank');
        const tileIndex = Array.prototype.indexOf.call(taquinContainer.children, tile);
        const blankIndex = Array.prototype.indexOf.call(taquinContainer.children, blankTile);

        const tileRow = Math.floor(tileIndex / size);
        const tileCol = tileIndex % size;
        const blankRow = Math.floor(blankIndex / size);
        const blankCol = blankIndex % size;

        const isAdjacent = (tileRow === blankRow && Math.abs(tileCol - blankCol) === 1) ||
                           (tileCol === blankCol && Math.abs(tileRow - blankRow) === 1);

        if (isAdjacent) {
            swapTiles(tile, blankTile);
            checkIfSolved();
        }
    }

    function swapTiles(tile1, tile2) {
        const temp = document.createElement('div');
        taquinContainer.replaceChild(temp, tile1);
        taquinContainer.replaceChild(tile1, tile2);
        taquinContainer.replaceChild(tile2, temp);
    }

    function makeRandomMove() {
        const blankTile = document.querySelector('.tile.blank');
        const blankIndex = Array.prototype.indexOf.call(taquinContainer.children, blankTile);
        const blankRow = Math.floor(blankIndex / size);
        const blankCol = blankIndex % size;

        const possibleMoves = [];

        if (blankRow > 0) possibleMoves.push(blankIndex - size); // Move up
        if (blankRow < size - 1) possibleMoves.push(blankIndex + size); // Move down
        if (blankCol > 0) possibleMoves.push(blankIndex - 1); // Move left
        if (blankCol < size - 1) possibleMoves.push(blankIndex + 1); // Move right

        const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        const tileToMove = taquinContainer.children[randomMove];
        swapTiles(tileToMove, blankTile);
    }

    function checkIfSolved() {
        const tiles = taquinContainer.children;
        for (let i = 0; i < tiles.length - 1; i++) {
            if (tiles[i].textContent != i + 1) {
                return;
            }
        }
        const bravoMessage = document.createElement('div');
        bravoMessage.textContent = 'W';
        bravoMessage.classList.add('bravo-message');
        document.body.appendChild(bravoMessage);
    }
});

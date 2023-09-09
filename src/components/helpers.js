// assumptions: n is the size of the game board i.e., game board is of n x n.
// squares is a flat array of size n^2 representing the game board, where n^2 is the total number of cells.
export const calculateWinner = (squares, k) => {
    const n = Math.sqrt(squares.length);
    for (let index = 0; index < squares.length; index++) {
        if (squares[index]){
            let countRow = 1, countCol = 1, countDiagL2R = 1, countDiagR2L = 1;
            for (let i = 1; i < k; i++){
                (index % n) + i < n && squares[index] === squares[index+i] ? countRow += 1 : countRow = 1; //Check Row
                (index + i*n) < n**2 && squares[index] === squares[index+i*n] ? countCol += 1 : countCol = 1; //Check Column
                (index % n) + i < n && (index + i*n) < n**2 && squares[index] === squares[index+i*(n+1)] ? countDiagL2R += 1 : countDiagL2R = 1; //Diag left to right
                (index % n) - i >= 0 && (index + i*n) < n**2 && squares[index] === squares[index+i*(n-1)] ? countDiagR2L += 1 : countDiagR2L = 1; //Diag right to left
                if (countRow === k || countCol === k || countDiagL2R === k || countDiagR2L === k) {
                    return squares[index];
                }
            }
        } 
    }
    return null;
}

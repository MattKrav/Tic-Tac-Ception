const initialState = {
    activeParentQuadrants: [4],
    boardValues: [
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
    ],
    overallBoardValues: [null, null, null, null, null, null, null, null, null],
    gameOver: false,
    currentTurn: 'X',
}

export default function game(state = initialState, action) {

    switch (action.type) {
        case 'USERMOVED': {
            const { parentQuadrant, childQuadrant } = action.payload

            let newBoardValues = state.boardValues
            newBoardValues[parentQuadrant][childQuadrant] = state.currentTurn
            //state.boardValues[state.currentParentQuadrant][childQuadrant] = state.currentTurn

            let newOverallBoardValues = state.overallBoardValues
            newOverallBoardValues[parentQuadrant] = quadrantWinner(newBoardValues[parentQuadrant])
            //state.overallBoardValues[state.currentParentQuadrant] = quadrantWinner(state.boardValues[state.currentParentQuadrant])

            let newActiveParentQuadrants = [childQuadrant]
            if (newOverallBoardValues[childQuadrant]) newActiveParentQuadrants = newOverallBoardValues.map((value, i) => value ? null : i).filter(value => value !== null)

            let newGameOver = state.gameOver
            newGameOver = quadrantWinner(state.overallBoardValues) != null

            return {
                ...state,
                activeParentQuadrants: newActiveParentQuadrants,
                boardValues: newBoardValues,
                overallBoardValues: newOverallBoardValues,
                currentTurn: state.currentTurn === 'X' ? 'O' : 'X',
                gameOver: newGameOver
            }
        }
        default:
            return state
    }
}

const quadrantWinner = (quadrant) => {
    if (quadrant[0] !== null && quadrant[0] === quadrant[1] && quadrant[1] === quadrant[2]) return quadrant[0]
    if (quadrant[3] !== null && quadrant[3] === quadrant[4] && quadrant[4] === quadrant[5]) return quadrant[3]
    if (quadrant[6] !== null && quadrant[6] === quadrant[7] && quadrant[7] === quadrant[8]) return quadrant[6]

    if (quadrant[0] !== null && quadrant[0] === quadrant[3] && quadrant[3] === quadrant[6]) return quadrant[0]
    if (quadrant[1] !== null && quadrant[1] === quadrant[4] && quadrant[4] === quadrant[7]) return quadrant[1]
    if (quadrant[2] !== null && quadrant[2] === quadrant[5] && quadrant[5] === quadrant[8]) return quadrant[2]

    if (quadrant[0] !== null && quadrant[0] === quadrant[4] && quadrant[4] === quadrant[8]) return quadrant[0]
    if (quadrant[2] !== null && quadrant[2] === quadrant[4] && quadrant[4] === quadrant[6]) return quadrant[2]

    return null
}
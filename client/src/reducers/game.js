const initialState = {
    currentParentQuadrant: 4,
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
    freeMove: false,
    currentTurn: 'X',
}

export default function game(state = initialState, action) {
    switch (action.type) {
        case 'USERMOVED': {
            const newBoardValues = state.boardValues
            newBoardValues[state.currentParentQuadrant][action.payload] = state.currentTurn
            //state.boardValues[state.currentParentQuadrant][action.payload] = state.currentTurn

            const newOverallBoardValues = state.overallBoardValues
            newOverallBoardValues[state.currentParentQuadrant] = quadrantWinner(state.boardValues[state.currentParentQuadrant])
            //state.overallBoardValues[state.currentParentQuadrant] = quadrantWinner(state.boardValues[state.currentParentQuadrant])

            return {
                ...state,
                currentParentQuadrant: action.payload,
                boardValues: newBoardValues,
                //boardValues: state.boardValues,
                overallBoardValues: newOverallBoardValues,
                currentTurn: state.currentTurn === 'X' ? 'O' : 'X'
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

    if (quadrant[1] !== null && quadrant[1] === quadrant[4] && quadrant[4] === quadrant[7]) return quadrant[1]
    if (quadrant[2] !== null && quadrant[2] === quadrant[5] && quadrant[5] === quadrant[8]) return quadrant[2]

    return null
}
import produce from "immer"

const initialState = {
    activeParentQuadrants: [4],
    boardValues: loadNullArray(9),
    overallBoardValues: loadNullArray(1),
    gameOver: false,
    gameWinner: '',
    currentTurn: 'X',
}

export default function game(state = initialState, action) {
    switch (action.type) {
        case 'USER_MOVED': {
            const { parentQuadrant, childQuadrant } = action.payload

            const nextState = produce(state, draftState => {
                // this places our X or O in the child quadrant that was just clicked
                draftState.boardValues[parentQuadrant][childQuadrant] = state.currentTurn
                // check if the last move resulted in a quadrant win
                draftState.overallBoardValues[parentQuadrant] = quadrantWinner(draftState.boardValues[parentQuadrant])
                // set the next active parent to whichever child quadrant was clicked
                draftState.activeParentQuadrants = [childQuadrant]
                // the logic below handles returning many playable quadrants when play is sent to a completed quadrant
                if (draftState.overallBoardValues[childQuadrant]) {
                    draftState.activeParentQuadrants =
                        draftState.overallBoardValues.map((value, i) => value ? null : i).filter(value => value !== null)
                }
                // check if the last move caused an overall win
                draftState.gameOver = quadrantWinner(draftState.overallBoardValues) != null
                if (draftState.gameOver) {
                    draftState.gameWinner = quadrantWinner(draftState.overallBoardValues)
                }
            })

            return {
                ...state,
                ...nextState,
                currentTurn: state.currentTurn === 'X' ? 'O' : 'X',
            }
        }
        case 'GAME_RESET': {
            return initialState
        }
        default:
            return state
    }
}

function loadNullArray(numberOfArrays) {
    if (numberOfArrays < 1) return []
    if (numberOfArrays === 1) return [null, null, null, null, null, null, null, null, null]
    let newNullArray = []
    for (let i = 0; i < numberOfArrays; i++) {
        newNullArray.push(loadNullArray(1))
    }
    return newNullArray
}

function quadrantWinner(quadrant) {
    // rows
    if (quadrant[0] && quadrant[0] === quadrant[1] && quadrant[1] === quadrant[2]) return quadrant[0]
    if (quadrant[3] && quadrant[3] === quadrant[4] && quadrant[4] === quadrant[5]) return quadrant[3]
    if (quadrant[6] && quadrant[6] === quadrant[7] && quadrant[7] === quadrant[8]) return quadrant[6]
    // columns
    if (quadrant[0] && quadrant[0] === quadrant[3] && quadrant[3] === quadrant[6]) return quadrant[0]
    if (quadrant[1] && quadrant[1] === quadrant[4] && quadrant[4] === quadrant[7]) return quadrant[1]
    if (quadrant[2] && quadrant[2] === quadrant[5] && quadrant[5] === quadrant[8]) return quadrant[2]
    // crosses
    if (quadrant[0] && quadrant[0] === quadrant[4] && quadrant[4] === quadrant[8]) return quadrant[0]
    if (quadrant[2] && quadrant[2] === quadrant[4] && quadrant[4] === quadrant[6]) return quadrant[2]

    if (!quadrant.includes(null)) return "tie"

    return null
}
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import SmallBoard from '../smallBoard/SmallBoard'
import { BoardWrapper, BigBoardQuadrant } from '../../styles/boardStyles'

// const movableSpace = 'yellow'
// const xSpace = 'green'
// const oSpace = 'purple'

// const quadrantColorMapper = (quadrantWinner) => {
// 	return {
// 		null: 'yellow'
// 	}[quadrantWinner]
// }

export default function BigBoard() {

	const dispatch = useDispatch()

	// TODO: WHY THIS DO THIS
	// const currentParentQuadrant = useSelector(state => state.game.currentParentQuadrant)
	// const testBigBoard = useSelector(state => state.game.boardValues)

	const {
		boardValues: testBigBoard,
		currentTurn,
		activeParentQuadrants,
		gameOver,
		overallBoardValues
	} = useSelector(state => state.game)

	const handleUserMove = (parentQuadrant, childQuadrant) => {
		dispatch({ type: 'USER_MOVED', payload: { parentQuadrant, childQuadrant } })
	}

	const handleGameReset = () => {
		dispatch({ type: 'GAME_RESET' })
	}

	return (
		<>
			<BoardWrapper size="150px">
				{testBigBoard.map(
					(quadrantValues, i) =>
						<BigBoardQuadrant
							key={i}
							quadPosition={i}
							winner={overallBoardValues[i]}
							isCurrentParentQuadrant={activeParentQuadrants.includes(i)}
							isClickableTest={activeParentQuadrants.includes(i) && !gameOver}
							borderType='5px solid black'>
							<SmallBoard
								parentQuadrant={i}
								quadrantValues={quadrantValues}
								isInCurrentParentQuadrant={activeParentQuadrants.includes(i)}//<-- REMOVE
								isClickableTest={activeParentQuadrants.includes(i) && !gameOver}// <----CLEANUP
								onUserMove={handleUserMove} />
						</BigBoardQuadrant>
				)}
			</BoardWrapper>
			{
				!gameOver ?
					<h3>Current Turn: {currentTurn}</h3> :
					<h1>GAME OVER: {currentTurn} is a Loser</h1>
			}
			<button onClick={handleGameReset}>RESET GAME</button>
			{/* <h1 >{!gameOver ? `Current Turn: ${currentTurn}` : `GAME OVER: ${currentTurn} is a Loser`}</h1> */}
		</>
	)
}

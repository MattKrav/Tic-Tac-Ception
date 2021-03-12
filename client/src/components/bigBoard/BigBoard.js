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
		currentParentQuadrant,
		currentTurn,
		//overallBoardValues,
	} = useSelector(state => state.game)

	const handleUserMove = (smallQuadrantIndex) => {
		dispatch({ type: 'USERMOVED', payload: smallQuadrantIndex })
	}

	return (
		<>
			<BoardWrapper size="150px">
				{testBigBoard.map(
					(quadrantValues, i) =>
						<BigBoardQuadrant
							key={i}
							quadPosition={i}
							isCurrentParentQuadrant={i === currentParentQuadrant}
							borderType='5px solid black'>
							<SmallBoard
								quadrantValues={quadrantValues}
								isInCurrentParentQuadrant={i === currentParentQuadrant}
								onUserMove={handleUserMove} />
						</BigBoardQuadrant>
				)}
			</BoardWrapper>
			<h1 >{`Current Turn: ${currentTurn}`}</h1>
		</>
	)
}

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import SmallBoard from '../smallBoard/SmallBoard'
import { BoardWrapper, BigBoardQuadrant } from '../../styles/boardStyles'

export default function BigBoard() {

	const dispatch = useDispatch()

	const {
		boardValues,
		activeParentQuadrants,
		gameOver,
		overallBoardValues
	} = useSelector(state => state.game)

	const handleUserMove = (parentQuadrant, childQuadrant) => {
		dispatch({ type: 'USER_MOVED', payload: { parentQuadrant, childQuadrant } })
	}

	return (
		<>
			<BoardWrapper size="300px">
				{boardValues.map(
					(quadrantValues, i) =>
						<BigBoardQuadrant
							key={i}
							quadPosition={i}
							winner={overallBoardValues[i]}
							isCurrentParentQuadrant={activeParentQuadrants.includes(i)}
							isClickableTest={activeParentQuadrants.includes(i) && !gameOver}
							borderType='10px solid black'>
							<SmallBoard
								parentQuadrant={i}
								quadrantValues={quadrantValues}
								isInCurrentParentQuadrant={activeParentQuadrants.includes(i)}//<-- REMOVE
								isClickableTest={activeParentQuadrants.includes(i) && !gameOver}// <----CLEANUP
								onUserMove={handleUserMove} />
						</BigBoardQuadrant>
				)}
			</BoardWrapper>
		</>
	)
}

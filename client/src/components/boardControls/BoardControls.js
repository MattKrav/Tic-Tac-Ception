import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux'

export const BoardControlWrapper = styled.div`
	display: flex;
	justify-content: space-between;
    align-items: center;
    width: 900px; //TODO: DONT HARDCODE THIS
    margin: 0 auto;
`;

export default function BoardControls({ isGameOver, gameWinner, currentTurn }) {

    const dispatch = useDispatch()

    const handleGameReset = () => {
        dispatch({ type: 'GAME_RESET' })
    }

    const currentTurnDisplay = () => {
        return <h2>CURRENT TURN: {currentTurn}</h2>
    }

    const gameOverDisplay = () => {
        if (gameWinner !== "tie") return <h2>GAME OVER: {gameWinner} is a Winner</h2>
        return <h2>GAME OVER: DRAW</h2>
    }

    //probs a better way to do this
    if (isGameOver) {
        return (
            <BoardControlWrapper>
                {gameOverDisplay()}
                <Button variant="contained" color="primary" onClick={handleGameReset}>RESTART GAME</Button>
            </BoardControlWrapper>
        )
    } else {
        return (
            <BoardControlWrapper>
                {currentTurnDisplay()}
                <Button variant="contained" color="primary" onClick={handleGameReset}>RESET GAME</Button>
            </BoardControlWrapper>
        )
    }
}

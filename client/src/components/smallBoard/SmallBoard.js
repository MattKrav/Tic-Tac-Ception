import React from 'react'

import { BoardWrapper, SmallBoardQuadrant } from '../../styles/boardStyles'

export default function SmallBoard({ quadrantValues, isInCurrentParentQuadrant, onUserMove }) {

    return (
        <BoardWrapper size="45px">
            {quadrantValues.map(
                (quadrantValue, i) => {
                    const isClickable = isInCurrentParentQuadrant && !quadrantValue
                    return <SmallBoardQuadrant
                        key={i}
                        quadPosition={i}
                        isClickable={isClickable}
                        borderType='2px solid red'
                        onClick={() => isClickable && onUserMove(i)}>
                        {quadrantValue}
                    </SmallBoardQuadrant>
                })}
        </BoardWrapper>
    )
}

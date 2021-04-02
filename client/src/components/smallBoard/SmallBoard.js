import React from 'react'

import { BoardWrapper, SmallBoardQuadrant } from '../../styles/boardStyles'

export default function SmallBoard({ parentQuadrant, isClickableTest, quadrantValues, isInCurrentParentQuadrant, onUserMove }) {

    return (
        <BoardWrapper size="90px">
            {quadrantValues.map(
                (quadrantValue, i) => {
                    const isClickable = isClickableTest && !quadrantValue//isInCurrentParentQuadrant && !quadrantValue
                    return <SmallBoardQuadrant
                        key={i}
                        quadPosition={i}
                        isClickable={isClickable}
                        borderType='4px solid red'
                        onClick={() => isClickable && onUserMove(parentQuadrant, i)}>
                        {quadrantValue}
                    </SmallBoardQuadrant>
                })}
        </BoardWrapper>
    )
}

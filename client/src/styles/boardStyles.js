import styled from 'styled-components'

// export const black_border = `8px solid black`;
// export const red_border = `5px solid red`

const quadrantBorderMapper = (i) => {
    return [
        //left top right bottom borders
        [0, 0, 1, 1],//topleft
        [0, 0, 0, 1],//top
        [1, 0, 0, 1],//topright
        [0, 0, 1, 1],//middleleft
        [0, 0, 0, 1],//middle
        [1, 0, 0, 1],//middleright
        [0, 0, 1, 0],//bottomleft
        [0, 0, 0, 0],//bottom
        [1, 0, 0, 0],//bottomright
    ][i]
}

export const BoardWrapper = styled.div`
	display: grid;
	grid-template-columns: ${({ size }) => `${size} ${size} ${size}`};
	grid-template-rows: ${({ size }) => `${size} ${size} ${size}`};
	justify-content: center;
`;

export const BoardQuadrant = styled.div`
	font-size: large;
	display: flex;
	justify-content: center;
	align-items: center;
	border-left: ${({ quadPosition, borderType }) => quadrantBorderMapper(quadPosition)[0] ? borderType : "null"};
	border-top: ${p => quadrantBorderMapper(p.quadPosition)[1] ? p.borderType : "null"};
	border-right: ${p => quadrantBorderMapper(p.quadPosition)[2] ? p.borderType : "null"};
    border-bottom: ${p => quadrantBorderMapper(p.quadPosition)[3] ? p.borderType : "null"};
`;

//Big board and small board handle highlighting with different logic---------------
export const BigBoardQuadrant = styled(BoardQuadrant)`
    background-color: ${p => p.isClickableTest ? `yellow` : `null`};
    ${({ winner }) => winner === 'X' && `background-color: rgb(255, 166, 77)`}
    ${({ winner }) => winner === 'O' && `background-color: hsl(300, 100%, 80%)`}
    ${({ winner }) => winner === 'tie' && `background-color: hsl(217, 8%, 72%)`}
`;

export const SmallBoardQuadrant = styled(BoardQuadrant)`
    &:hover {
        background-color: ${p => p.isClickable ? `goldenrod` : `null`};
    }
    font-size: 50px;
`;
//----------------------------------------------------------------------------------

import React from 'react'
import styled from 'styled-components'
import { ButtonGroup, Button, styled as materialStyled } from '@material-ui/core'
import { useLocation } from "react-router-dom";

const AppTitle = styled.div`
    font-size: 50px;
    color: white;
    padding-left: 5px;
`;

const NavigationWrapper = styled.div`
	display: flex;
    flex-direction: row;
	justify-content: space-evenly;
    align-items: center;
    width: 100%;
    background-color: black;
	padding-left: 10px;
	padding-right: 10px;
`;

// used to style the material ui button
const StyledButton = materialStyled(({ isCurrentPage, ...other }) => <Button {...other} />)({
	fontFamily: 'Righteous, cursive',
	fontSize: '17px',
	color: (props) => props.isCurrentPage ? 'yellow' : 'white',
})

export default function TopNavBar({ navDetails }) {
	let location = useLocation();
	return (
		<NavigationWrapper>
			<AppTitle>TIC-TAC-CEPTION</AppTitle>
			<ButtonGroup variant="text" aria-label="text primary button group">
				{navDetails.map(({ name, path }) =>
					<StyledButton key={name} size="large" href={path} isCurrentPage={path === location.pathname}>{name}</StyledButton>
				)}
			</ButtonGroup>
		</NavigationWrapper>
	)
}

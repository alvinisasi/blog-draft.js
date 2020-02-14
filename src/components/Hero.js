import React from 'react'
import styled from 'styled-components'
import logo from '../img/rocket-icon.svg'

const Cover = styled.div`
	background-image: url(https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80);
	background-size: cover !important;
	background-position: center;
	background-repeat: no-repeat;
	height: 500px;
	width: 100%;
	margin-top: 80px;

	@media(max-width: 768px){
		height: 300px;
		width: 100%;
	}
`

const Column = styled.div`
	height: 500px;
	z-index: 2;
	background: rgba(0,0,0,0.5);
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	color: #fff;

	@media(max-width: 768px){
		height: 300px;
		width: 100%;
	}
`

export default function Hero(){
	return(
		<Cover>
			<Column>
				<img alt='logo' src={logo} />
				<h2>Hi, I'm Alvin!</h2>
				<span>This is my personal blog</span>
			</Column>
		</Cover>
	)
}
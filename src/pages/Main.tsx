import React from 'react';
import Container from 'react-bootstrap/Container';
import './Main.css';
import ItemBlock from '../components/ItemBlock';

const Main = () => {
	return (
		<Container className="screen" >
			<Container className="top">
				<ItemBlock />
				<ItemBlock />
				<ItemBlock />
				<ItemBlock />
			</Container>
			<Container className="down">
				<ItemBlock style={{width:'30%'}} />
				<ItemBlock />
			</Container>
		</Container>
	);
};

export default Main;
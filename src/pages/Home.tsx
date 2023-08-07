import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import './Home.css';
import ItemBlock from '../components/ItemBlock';
import Vr from '../components/Vr';
import NextButton from '../components/NextButton';

const Home = () => {
	const navigate = useNavigate();
	const [selectedCloud, setSelectedCloud] = useState('')

    const nextHandler = () => {
		// next 버튼 누르면 auth 페이지로 라우팅
		if (selectedCloud === 'on-premise') {
			navigate('/auth');
		} else {
			navigate('/migration');
		} 
    };

	return (
		<div className="home" >
            <Container className="top">
                <h1>Harmonica</h1>
				<h3>Serverless Switch Platform for Hybrid Cloud</h3>
			</Container>
			<Container className="mid">
				<NextButton
					onClick={nextHandler}
					className={selectedCloud !== '' ? 'next-button-active' : 'next-button'}
					style={{width: '25vw', height: '6vh', fontSize: '30px'}}
				>
					Next
                </NextButton>
			</Container>
			<Container className="down">
				<ItemBlock onClick={(e) => { setSelectedCloud('on-premise');}}>
					<div
						style={{
							width: '100%',
							color: '#4b4b4b',
							fontStyle: 'bold',
							fontSize: '2.1vw',
							textAlign: 'center',
						}}
					>
						On-Premise
					</div>
				</ItemBlock>
                <Vr />
				<ItemBlock onClick={(e) => { setSelectedCloud('oracle-cloud');}}>
					<img src="assets/Oracle_Cloud_Platform-Logo.wine.png" alt='home icon' style={{width: '100%'}}/>
				</ItemBlock>
				<ItemBlock style={{pointerEvents:'none', background:'#fafafa', boxShadow:'0px 0px 4px rgba(0, 0, 0, 0.25)'}}>
					<img src="assets/Amazon_Web_Services-Logo.wine.png" alt='home icon' style={{width: '60%'}}/>
				</ItemBlock>
				<ItemBlock style={{pointerEvents:'none', background:'#fafafa', boxShadow:'0px 0px 4px rgba(0, 0, 0, 0.25)'}}>
					<img src="assets/Google_Cloud_Platform-Logo.wine.png" alt='home icon' style={{width: '100%'}}/>
				</ItemBlock>
			</Container>
		</div>
	);
};

export default Home;
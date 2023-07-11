import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import './Home.css';
import ItemBlock from '../components/ItemBlock';
import Vr from '../components/Vr';
import NextButton from '../components/NextButton';

const Home = () => {
	const navigate = useNavigate();
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
		// 클라우드 버튼 누르면 -> next 버튼 활성화
        setIsButtonClicked(true);
    };

    const nextHandler = () => {
		// next 버튼 누르면 auth 페이지로 라우팅
		if(isButtonClicked) {
			navigate('/auth');
		}
    };

	return (
		<Container className="home" >
            <Container className="top">
                <h1>Harmonica</h1>
				<h3>Serverless Switch Platform for Hybrid Cloud</h3>
			</Container>
			<Container className="mid">
				<NextButton
					onClick={nextHandler}
					className={isButtonClicked ? 'next-button-active' : 'next-button'}
					style={{width: '25vw', height: '6vh'}}
				>
					Next
                </NextButton>
			</Container>
			<Container className="down">
				<ItemBlock onClick={clickHandler}>온프렘</ItemBlock>
                <Vr />
				<ItemBlock onClick={clickHandler}>OCI</ItemBlock>
				<ItemBlock style={{pointerEvents:'none', background:'#fafafa'}}>AWS</ItemBlock>
				<ItemBlock style={{pointerEvents:'none', background:'#fafafa'}}>GCP</ItemBlock>
			</Container>
		</Container>
	);
};

export default Home;

/*
TODO
- 컴포넌트 배치
- 클라우드 버튼 누르면 -> next 버튼 활성화
- next 버튼 누르면 auth 페이지로 라우팅
- css 작업
- 시간 되면 hover 추가
*/
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from '../components/lottie/animation_pink_check.json'; 

const Completed = () => {
    const [showCompleted, setShowCompleted] = useState(false);
    const [opacity, setOpacity] = useState(0);
    const [endpoint, setEndpoint] = useState<string | undefined>();
    const navigate = useNavigate();
    const location = useLocation();
    const receivedFormData = location.state?.endpoint;

    useEffect(() => {
        setEndpoint(receivedFormData)
    }, [receivedFormData]);

    // div창 렌더링
    useEffect(() => {
        if (showCompleted) {
            setOpacity(0);
            setTimeout(() => setOpacity(1), 100);
        }
    }, [showCompleted]);

    const style = {
        width: '40vw',
    };

    const handleAnimationComplete = () => {
        setShowCompleted(true);
    }

    const handleClick = (event: React.MouseEvent<HTMLHeadingElement>) => {
        navigate('/');
      }

    const divStyle = {
        opacity: opacity,
        transition: 'opacity 1s ease-in-out',
    }

    return (
        <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            {!showCompleted && (
                <Lottie 
                    animationData={animationData}
                    loop={false} 
                    autoplay={true}
                    style={style} 
                    rendererSettings={{preserveAspectRatio: 'xMidYMid slice'}}
                    onComplete={handleAnimationComplete}
                />
            )}
            {showCompleted && (
                <div style={divStyle}>
                    <div
                        style={{
                            marginLeft: '1.5vw',
                            fontSize: '1.8vw',
                        }}
                    >
                        Completed!🚀
                    </div>
                    <div style={{
                        marginTop: '1.5vh',
                        backgroundColor: 'white',
                        color: '#4b4b4b',
                        borderRadius: '12px',
                        fontSize: '1vw',
                        width: '40vw',
                        height: '35vh',
                        padding: '3vh 5vw',
                        boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
                        justifyContent: 'center',
                        // alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <p>Congratulations!🎉</p>
                        <p>Migration is completed~✧٩(ˊωˋ*)و✧</p>
                        <p>You can run this on the endpoint below👇</p>
                        <p>
                            <a href={endpoint} target="_blank" rel="noopener noreferrer">
                                {endpoint}
                            </a>
                        </p>
                        <p></p>
                        <p>Thank you. See you again~👋</p>
                    </div>
                    <div
                        onClick={handleClick}
                        style={{
                            marginTop: '1.5vh',
                            marginRight: '1.5vw',
                            textAlign: 'right',
                            cursor: 'pointer',
                            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.25)',
                            textDecoration: 'underline',
                        }}
                    >
                        Go Home
                    </div>
                </div>
            )}
        </div>
    );
};

export default Completed;
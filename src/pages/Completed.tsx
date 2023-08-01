import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InProgressSpinner from '../components/InProgressSpinner';
import Lottie from 'lottie-react';
import animationData from '../components/lottie/animation_pink_check.json'; 

const Completed = () => {
    const [loading, setLoading] = useState(false);
    const [showCompleted, setShowCompleted] = useState(false);
    const [opacity, setOpacity] = useState(0);
    const navigate = useNavigate();

    // spinner 유지 훅
    useEffect(() => {
        setTimeout(() => setLoading(!loading), 2000);
    }, []);

    // div창 렌더링
    useEffect(() => {
        if (showCompleted) {
            setOpacity(0);
            setTimeout(() => setOpacity(1), 100);
        }
    }, [showCompleted]);

    // 로딩 중이라면 spinner 보여주기
    if (loading === false) return <InProgressSpinner />;

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
                        Complted!🚀
                    </div>
                    <div style={{
                        marginTop: '1.5vh',
                        backgroundColor: '#efefef',
                        color: '#4b4b4b',
                        borderRadius: '12px',
                        fontSize: '1vw',
                        width: '50vw',
                        height: '35vh',
                        padding: '2vh 2vw',
                        boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)'
                    }}>
                        <p>echo "# nonono" README.md</p>
                        <p>git init</p>
                        <p>git add README.md</p>
                        <p>git commit -m "first commit"</p>
                        <p>git branch -M main</p>
                        <p>git remote add origin https://github.com/noooey/nonono.git</p>
                        <p>git push -u origin main</p>
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
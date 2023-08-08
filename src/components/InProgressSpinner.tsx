import { useEffect, useState, useMemo } from 'react';
import Lottie from 'lottie-react';
import animationData from './lottie/animation_music.json'; 

const InProgressSpinner = () => {

    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const messages = useMemo(() => [
        "The harmonica is playing...🎵",
        "Migration is in progress...🛠️",
        "Please wait a little longer...💦",
        "It'll be done soon...🚀"
    ], []);  

    useEffect(() => {
    const interval = setInterval(() => {
        setCurrentMessageIndex((currentMessageIndex + 1) % messages.length);
    }, 2500);

    // useEffect의 반환 함수는 컴포넌트 unmount 시에 호출되며, 여기서는 interval을 clear해줍니다.
    return () => clearInterval(interval);
    }, [currentMessageIndex, messages]);

    const style = {
        width: '40vw',
    };

    return (
        <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 0 20vh 0'}}>
            <Lottie 
                animationData={animationData}
                loop={true} 
                autoplay={true}
                style={style} 
                rendererSettings={{preserveAspectRatio: 'xMidYMid slice'}}
            />
            <img src="harmonica.png" alt='home icon' style={{width: '15vw', position: 'absolute', bottom: '35vh'}}/>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '20vw',
                    padding: '1vh 1vw',
                    background: 'white',
                    borderTop: '2px solid #dddddd',
                    borderBottom: '2px solid #dddddd',
                    boxShadow: 'inset 0 0px 4px rgba(0, 0, 0, 0.25)',
                    borderRadius: '10px 10px 10px 10px',
                }}
            >
                <div
                    style={{
                        color: '#4b4b4b',
                        textAlign: 'center',
                        fontSize: '1vw',
                    }}
                >
                    {messages[currentMessageIndex]}
                </div>
            </div>
        </div>
    );
};

export default InProgressSpinner;

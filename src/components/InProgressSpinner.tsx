import React from 'react';
import Lottie from 'lottie-react';
import animationData from './lottie/animation_music.json'; 

const InProgressSpinner = () => {

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
                    color: '#4b4b4b',
                    textAlign: 'center',
                    fontSize: '1vw'
                }}
            >
                In progress...🚀
            </div>
        </div>
    );
};

export default InProgressSpinner;

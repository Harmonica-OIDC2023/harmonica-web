import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ItemBlock from '../components/ItemBlock';
import AuthForm from '../components/AuthForm';
import './Main.css';
import NextButton from '../components/NextButton';

interface FormData {
	fnapp_name: string;
	fnfnc_name: string;
	apigw_name: string;
	apideploy_name: string;
}

const Auth2 = () => {
	const [formData, setFormData] = useState<FormData>({
		fnapp_name: '',
        fnfnc_name: '',
        apigw_name: '',
        apideploy_name: ''
	});

	const navigate = useNavigate();
	const [isFormComplete, setIsFormComplete] = useState(false);

	const nextHandler = () => {
		// next 버튼 누르면 auth 페이지로 라우팅
		if(isFormComplete) {
			navigate('/migration');
		}
	};

	const handleInputChange = (name: string, value: string | File) => {
		setFormData((prevFormData) => ({
		...prevFormData,
		[name]: value,
		}));
	};

	// Check if all form fields have a value
	useEffect(() => {
		const isComplete = Object.values(formData).every((value) => value !== '' && value !== null);
		setIsFormComplete(isComplete);
	}, [formData]);

	return (
		<div className="screen">
			<ItemBlock style={{ width: '30%' }}>
				auth process bar
			</ItemBlock>
			<ItemBlock style={{ display: 'flex', flexDirection: 'column' }}>
				<div className="form-container" style={{ display: 'flex', flexDirection: 'column', width: '100%', marginBlockEnd: '5vh'}}>
					<AuthForm
						label="FNAPP_NAME"
						name="fnapp_name"
						value={formData.fnapp_name}
						type="text"
						onInputChange={handleInputChange}
						infoLink='https://github.com/Harmonica-OIDC2023/harmonica-web'
					/>
					<AuthForm
						label="FNFNC_NAME"
						name="fnfnc_name"
						value={formData.fnfnc_name}
						type="text"
						onInputChange={handleInputChange}
						infoLink='https://github.com/Harmonica-OIDC2023/harmonica-web'
					/>
					<AuthForm
						label="APIGW_NAME"
						name="apigw_name"
						value={formData.apigw_name}
						type="text"
						onInputChange={handleInputChange}
						infoLink='https://github.com/Harmonica-OIDC2023/harmonica-web'
					/>
					<AuthForm
						label="APIDEPLOY_NAME"
						name="apideploy_name"
						value={formData.apideploy_name}
						type="text"
						onInputChange={handleInputChange}
						infoLink='https://github.com/Harmonica-OIDC2023/harmonica-web'
					/>
				</div>
				<NextButton
					disabled={!isFormComplete}
					className={isFormComplete ? 'next-button-active' : 'next-button'}
					onClick={nextHandler}
					style={{width: '25vw', height: '6vh', fontSize: '30px'}}
				>
					Next
				</NextButton>
			</ItemBlock>
		</div>
	);
};

export default Auth2;
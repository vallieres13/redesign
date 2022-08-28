import React from 'react';
import { useNavigate } from "react-router-dom";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import gsap from "gsap";

gsap.registerPlugin(ScrollToPlugin);

interface componentProps {
	className?: string,
	gradient?: string,
	go?: string,
	style?: any,
	children?: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined
}

const defaultProps: componentProps = {
	className: '',
	gradient: '',
	go: '',
	style: undefined,
	children: undefined
};

const Button = (props: componentProps = defaultProps) => {

	const navigate = useNavigate();

	const go = (url: string) => {
		// window.scrollTo({ top: 0, behavior: 'smooth' });
		gsap.to(window, {
			scrollTo: 0,
			duration: .75,
			ease: 'power4'
		});

		navigate(url);
	}

	const handleClickCard = () => {
		if(props.go !== '' || props.go !== undefined) {
			go(props.go as string);
		}
	};

	return (
		<button onClick={handleClickCard} className={`card ` + (props.className ?? '')} style={{ backgroundImage: props.gradient, ...props.style }}>
			{props.children}
		</button>
	);

};

export default Button;
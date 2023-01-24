import React, { useEffect } from 'react';
import gsap from 'gsap';

interface componentProps {
	height?: number,
}

const defaultProps: componentProps = {
	height: undefined,
};

const Preloader = (props: componentProps = defaultProps) => {

	useEffect(() => {
		/* Change Background colour */
		gsap.to('body', {
			backgroundImage: 'none'
		});

		const preloader = document.querySelector('.preloader');

		gsap.fromTo(preloader, {
			autoAlpha: 0
		}, {
			autoAlpha: 1,
			duration: .5,
			delay: .25
		});
	}, []);

	let verticalPadding: number = 35;

	/* Set the custom height prop */
	if(props.height) {
		verticalPadding = props.height / 2;
	}

	return (
		<div className="preloader" style={{ padding: verticalPadding + 'vh 0' }}>
			<div className="spinner"></div>
			<p>Loading ...</p>
		</div>
	);

};

export default Preloader;
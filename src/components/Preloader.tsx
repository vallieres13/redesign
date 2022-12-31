import React, { useEffect } from 'react';
import gsap from 'gsap';

const Preloader = () => {

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

	return (
		<div className="preloader">
			<div className="spinner"></div>
			<p>Loading ...</p>
		</div>
	);

};

export default Preloader;
import React, { useEffect } from 'react';
import gsap from 'gsap';

/* Static */
import DropImage from '../static/images/drop.jpg';

const Labs = () => {

	const animate = () => {
		gsap.to('body', {
			backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(30,40,65,1) 80%)'
		});

		gsap.fromTo('.labs', {
			autoAlpha: 0
		}, {
			autoAlpha: 1,
			duration: 2.5
		})
	};

	useEffect(() => {
		animate();
	});

	return (
		<>
			<section className="labs">
				<div className="background" style={{ backgroundImage: 'url(' + DropImage + ')' }}></div>
				<section className="header container">
					<h1>A digital drop<br />of inspiration.</h1>
					<div className="disclaimer">
						This page will be published soon.
					</div>
				</section>
				<section className="container" style={{ marginTop: '25rem' }}>

				</section>
			</section>
		</>
	);

};

export default Labs;
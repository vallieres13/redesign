import React, { useEffect } from 'react';
import gsap from 'gsap';

/* Static */
import DropImage from '../static/images/labs/drop.jpg';

const Labs = () => {

	const __title = 'AI Canvas';

	const animate = () => {
		gsap.to('body', {
			backgroundImage: 'none'
		});

		gsap.fromTo('.labs', {
			autoAlpha: 0
		}, {
			autoAlpha: 1,
			duration: 2.5
		})
	};

	useEffect(() => {

		/* Document Title */
		document.title = __title + process.env.REACT_APP_TITLE;

		animate();
	});

	return (
		<>
			<section className="labs">
				<div className="background" style={{ backgroundImage: 'url(' + DropImage + ')' }}></div>
				<section className="header container">
					<h1>A digital drop<br />of inspiration.</h1>
					<div className="disclaimer">
						This section will be available soon.
					</div>
				</section>
				<section className="container" style={{ marginTop: '25rem' }}>

				</section>
			</section>
		</>
	);

};

export default Labs;
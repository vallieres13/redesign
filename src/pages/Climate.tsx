import React from 'react';
import gsap from "gsap";

const Climate = () => {

	/* Change Background colour */
	gsap.to('body', {
		backgroundImage: 'linear-gradient(rgb(32, 48, 37) 0%, rgb(21, 21, 22) 100%)'
	});

	return (
		<>
			<section className="climate container">
				<section className="heading">
					<h1>We care about the climate.</h1>
				</section>
			</section>
		</>
	);

};

export default Climate;
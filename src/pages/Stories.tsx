import React from 'react';
import gsap from "gsap";

const Stories = () => {

	/* Change Background colour */
	gsap.to('body', {
		backgroundImage: 'linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)'
	});

	return (
		<>
			<h1>Stories</h1>
		</>
	);

};

export default Stories;
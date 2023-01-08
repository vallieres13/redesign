import React, {useEffect} from 'react';
import gsap from "gsap";

const Hire = () => {

	/* Change Background colour */
	gsap.to('body', {
		backgroundImage: 'none'
	});

	useEffect(() => {
		/* Document Title */
		document.title = 'Hire Me' + process.env.REACT_APP_TITLE;
	});

	return (
		<>
			<section className="page-text container">
				<h1 className="title">Hire Me</h1>
				<ul className="breadcrumbs">
					<li><a href="#">Home</a></li>
					<li>Hire Me</li>
				</ul>
				<div className="page-text-content paper">
					<p>This is a text content.</p>
				</div>
			</section>
		</>
	);

};

export default Hire;
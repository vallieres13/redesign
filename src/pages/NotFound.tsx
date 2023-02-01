import React, { useEffect } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import Breadcrumbs from "../components/Breadcrumbs";

const NotFound = () => {

	const __title = "Page Not Found";

	const animate = () => {
		/* Change Background colour */
		gsap.to('body', {
			backgroundImage: 'none'
		});

		/* Heading Horizontal Line */
		let hr = document.querySelector('.header hr') as HTMLHRElement;
		gsap.fromTo(hr, {
			opacity: 0,
			xPercent: -150
		}, {
			opacity: 1,
			xPercent: 0,
			duration: 2.5,
			delay: 0,
			ease: 'expo'
		});

		/* Heading Title */
		let heading = document.querySelector('.header h1') as HTMLHeadingElement;
		heading.innerHTML = heading.textContent!.replace(/\S/g, '<span class="letter">$&</span>');
		let nameLetters = heading.querySelectorAll(':scope .letter');

		gsap.fromTo(nameLetters, {
			opacity: 0,
			xPercent: 40
		}, {
			opacity: 1,
			xPercent: 0,
			duration: .2,
			stagger: .025,
			ease: 'power1',
			delay: .25
		});
	};

	useEffect(() => {
		/* Document Title */
		document.title = __title + process.env.REACT_APP_TITLE;

		animate();
	});

	return (
		<>
			<section className="notfound container">
				<section className="header">
					<h1>404</h1>
					<hr />
					<Breadcrumbs current={__title} />
				</section>
			</section>
		</>
	);

};

export default NotFound;
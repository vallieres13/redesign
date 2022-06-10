import React, { useEffect } from 'react';
import gsap from 'gsap';

/* Images */
import Person from '../static/images/portfolio.jpg';

const About = () => {

	const roles = [
		'Full Stack Web Development',
		'Live Interaction Design',
		'Video Production',
		'Freelancing'
	];

	useEffect(() => {
		/* Change Background colour */
		gsap.to('body', {
			backgroundImage: 'linear-gradient(90deg, black 0%, black 100%)'
		});

		/* Animate Titles */
		gsap.fromTo('.person', {
			autoAlpha: 0,
			yPercent: 20
		}, {
			autoAlpha: 1,
			yPercent: 0,
			ease: 'power4',
			duration: .5
		});

		let name = document.querySelector('.name') as HTMLHeadingElement;
		name.innerHTML = name.textContent!.replace(/\S/g, '<span class="letter">$&</span>');
		let nameLetters = name.querySelectorAll(':scope .letter');

		gsap.fromTo(nameLetters, {
			opacity: 0,
			xPercent: 40
		}, {
			opacity: 1,
			xPercent: 0,
			duration: .2,
			stagger: .025,
			ease: 'power1',
			delay: .4
		});

		setTimeout(() => {
			gsap.fromTo('.role', {
				autoAlpha: 0,
				yPercent: 40
			}, {
				autoAlpha: 1,
				yPercent: 0,
				duration: .5,
				ease: 'power4',
				stagger: .15
			});
		}, 750);

	});

	const handleClickRole = (e: React.MouseEvent) => {
		/* Flicker Effect */
		gsap.to(e.target, {
			autoAlpha: 0,
			repeat: 2,
			yoyo: true,
			duration: .1
		});
		gsap.to(e.target, {
			autoAlpha: 1,
			duration: .1,
			delay: .3
		});

		/* Scroll after Flicker Effect ended */

	};

	return (
		<>
			<section className="portfolio container">
				<section className="portfolio_intro">
					<img src={Person} className="person" alt="Felix Hebgen" />
					<div className="title">
						<h1 className="name">Felix Hebgen</h1>
						<p className="roles">
							{roles.map((role, index) => {
								return (
									<span className="role" onClick={handleClickRole} key={index}>
										<a href="/">{role}</a><br />
									</span>
								);
							})}
						</p>

					</div>
				</section>
			</section>
		</>
	);

};

export default About;
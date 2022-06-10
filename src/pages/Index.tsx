import React, { useEffect } from 'react';
import gsap from 'gsap';

/* Images */
// import Wavy from '../static/images/wavy-true.svg';

const Index = () => {

	useEffect(() => {

		let title = document.querySelector('.title') as HTMLHeadingElement;
		title.innerHTML = title.textContent!.replace(/\S+/g, '<span class="word">$&</span>');

		const words = document.querySelectorAll('.word');

		gsap.fromTo(words, {
			y: 100,
			autoAlpha: 0
		}, {
			y: 0,
			autoAlpha: 1,
			stagger: .1
		});

		/* Title Shadow */
		setTimeout(() => {
			gsap.to(title, {
				textShadow: '-20px 20px 0 rgba(255, 255, 255, .075)',
				duration: .5
			});
		}, 650);

		/* Display Pattern Background */
		gsap.fromTo('.pattern', {
			autoAlpha: 0
		}, {
			autoAlpha: .15,
			delay: .75,
			duration: 1
		});

	});

	return (
		<section className="promo container">
			{/*
			<div className="decor" />
			<div className="decor2" />
			*/}
			<h1 className="title">Creative Design, made for humans.</h1>
			{/* <img src={Wavy} alt="" /> */}
		</section>
	);

};

export default Index;
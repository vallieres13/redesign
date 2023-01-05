import React, { useEffect } from 'react';
import gsap from "gsap";

/* Components */
import Card from '../components/containers/Card';

/* Static */
import SeedlingImage from '../static/images/future/giraffe.png';
import KoalaImage from '../static/images/future/koala.png';
import Windmillimage from '../static/images/future/windmill.png';

/* Logos */
import WWFLogo from '../static/images/logos/wwf.png';
import TreesLogo from '../static/images/logos/trees.png';


const Climate = () => {

	const animate = () => {
		/* Change Background colour */
		gsap.to('body', {
			backgroundImage: 'linear-gradient(rgb(32, 48, 37) 0%, rgb(21, 21, 22) 100%)'
		});

		/* Animate Title */
		let heading = document.querySelector('.heading h1') as HTMLHeadingElement;
		heading.innerHTML = heading.textContent!.replace(/\S+/g, '<span class="word">$&</span>');

		const words = document.querySelectorAll('.word');

		gsap.fromTo(words, {
			y: 100,
			autoAlpha: 0
		}, {
			y: 0,
			autoAlpha: 1,
			stagger: .1
		});


		/* Logos */
		gsap.fromTo('.logos', {
			autoAlpha: 0
		}, {
			autoAlpha: 1,
			delay: .75,
			duration: 1
		});

		/* Dashboard Cards */
		let dashboard = document.querySelector('.dashboard') as HTMLHeadingElement;
		const cards = dashboard.querySelectorAll(':scope > .card');

		gsap.fromTo(cards, {
			y: 25,
			autoAlpha: 0
		}, {
			y: 0,
			autoAlpha: 1,
			duration: .25,
			stagger: .1,
			ease: 'power4',
			delay: .45,
			clearProps: 'scale'
		});


	};

	useEffect(() => {

		/* Document Title */
		document.title = 'Our Future' + process.env.REACT_APP_TITLE;

		animate();
	});

	return (
		<>
			<section className="climate container">
				<section className="heading">
					<h1>We care about our future.</h1>
					<div className="logos">
						<img src={TreesLogo} alt="Trees for the Future" />
						<img src={WWFLogo} alt="WWF Germany" />
					</div>
				</section>
				<section className="dashboard grid">
					<Card>
						<h2>We plant <span>trees</span>.</h2>
						<p>
							Together with <a href="https://trees.org/" target="_blank" rel="noreferrer">Trees for the Future</a>, I donate to charity depending on how many page views I receive in a month.<br />
							<small>** 5,000 page views equal 1 tree. You make it happen.<br />The amount of trees donated is capped at 25 a month.</small>
						</p>
						<img src={SeedlingImage} alt="Seedling" id="cover_future" />
					</Card>
					<Card gradient="linear-gradient(#2F2F2F 0%, #222222 100%)">
						<h2>CO2 🌿<br /><span>Neutral</span>.</h2>
						<p>
							This website is run entirely on renewable energy and supports the vision of a green future for everyone.<br />
							<small>** The Oracle Cloud Infrastructure has aimed to achieve full climate neutrality by 2025.</small>
						</p>
						<img src={Windmillimage} alt="Windmills" id="cover_windmill" />
					</Card>
					<Card gradient="linear-gradient(#2F2F2F 0%, #222222 100%)">
						<h2 style={{ fontSize: '55pt', lineHeight: '65pt', marginRight: '-20px' }}>Ads for <span>charity</span>.</h2>
						<p>
							As a recurring donator to the non-profit organisation <a href="https://www.wwf.de/" target="_blank" rel="noreferrer">WWF</a>, I continue to aim towards an ongoing contribution to the preseveration of our precious nature.<br />
							<small>** Complementary advertisements will be placed carefully, no pop-ups, placements or promoted inline links.</small>
						</p>
						<img src={KoalaImage} alt="Koala" id="cover_charity" />
					</Card>
				</section>
			</section>
		</>
	);

};

export default Climate;
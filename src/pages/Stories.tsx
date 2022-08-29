import React, {useEffect} from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { CSSPlugin } from 'gsap/CSSPlugin';

/* Components */
import Card from "../components/containers/Card";
import Button from "../components/forms/Button";

/* Thumbnails */
import Thumbnail from '../static/images/articles/thumbnail.jpg';
import Thumbnail2 from '../static/images/articles/thumbnail4.jpg';
import Thumbnail3 from '../static/images/articles/thumbnail5.jpg';
import Thumbnail4 from '../static/images/articles/thumbnail6.jpg';

/* gsap Register */
gsap.registerPlugin(CustomEase);
gsap.registerPlugin(CSSPlugin);


const Stories = () => {

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

		/* Dashboard Cards */
		let dashboard = document.querySelector('.dashboard') as HTMLHeadingElement;
		const cards = dashboard.querySelectorAll(':scope > .card, .separator');

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
			clearProps: 'all'
		});

	};

	useEffect(() => {
		animate();
	});


	return (
		<>
			<section className="stories container">
				<section className="header">
					<h1>Stories</h1>
					<hr />
					<ul className="breadcrumbs">
						<li><a href="#">Home</a></li>
						<li>Stories</li>
					</ul>
				</section>
				<section className="dashboard grid" style={{ marginTop: '-50px' }}>
					<Card className="grid article article-big span-3">
						<div className="thumbnail span-2" style={{ backgroundImage: 'url(' + Thumbnail + ')' }}></div>
						<div className="span-1">
							<h3>New Samsung Drone exceeds Expectations</h3>
							<p className="cutoff">
								Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.<br /><br />
								Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. ...<br /><br />
								<Button>Read more</Button>
							</p>
						</div>
					</Card>
					<div className="separator span-3">
						<span>⮝&nbsp; Promoted Article&nbsp;</span>
					</div>
					<Card className="article span-2">
						<div className="thumbnail" style={{ backgroundImage: 'url(' + Thumbnail3 + ')' }}></div>
						<div>
							<h3>Using react-router-dom v6 more efficiently</h3>
							<p className="cutoff stdsmall">
								Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.<br /><br />
								Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. ...<br /><br />
								<Button>Read more</Button>
							</p>
						</div>
					</Card>
					<Card className="article span-1">
						<div className="thumbnail" style={{ backgroundImage: 'url(' + Thumbnail2 + ')' }}></div>
						<div>
							<h3>I'm impressed by this new MacBook</h3>
							<p className="cutoff stdsmall">
								Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.<br /><br />
								Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. ...<br /><br />
								<Button>Read more</Button>
							</p>
						</div>
					</Card>
					<Card className="article span-1">
						<div className="thumbnail" style={{ backgroundImage: 'url(' + Thumbnail4 + ')' }}></div>
						<div>
							<h3>Why Crypto.com was Doomed to Fail</h3>
							<p className="cutoff">
								Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.<br /><br />
								Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. ...<br /><br />
								<Button>Read more</Button>
							</p>
						</div>
					</Card>
				</section>
			</section>
		</>
	);

};

export default Stories;
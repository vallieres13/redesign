import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* Components */
import Card from '../components/containers/Card';
import Button from '../components/forms/Button';

/* Static */
import PersonDimmed from '../static/images/portfolio-dimmed.png';
import CodeImage from '../static/images/code.png';
import DesignImage from '../static/images/design.png';
import StoryImage from '../static/images/stories.png';
import ScrollDownGIF from '../static/images/scroll.gif';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {

	useEffect(() => {

		let heading = document.querySelector('.title') as HTMLHeadingElement;
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

		/* Title Shadow */
		setTimeout(() => {
			gsap.to(heading, {
				textShadow: '-20px 20px 0 rgba(255, 255, 255, .075)',
				duration: .5
			});
		}, 650);

		/* Display Pattern Background */
		/* -- disable initial pattern display
		gsap.to('.pattern', {
			autoAlpha: .1,
			delay: .75,
			duration: 1
		});
		*/

		gsap.to('.pattern', {
			x: -1000,
			y: -500,
			repeat: -1,
			repeatDelay: 1,
			yoyo: true,
			ease: 'none',
			duration: 50
		});

		/* Scroll Trigger */
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.dashboard',
				start: 'top 90%',
				end: '+=850',
				scrub: true,
				toggleActions: 'play reverse'
			}
		});

		tl.from('.pattern', { opacity: .2 })
			.to('.pattern', { opacity: .04, duration: 10 })
			.from('.dashboard', { opacity: .6, filter: 'grayscale(1)' })
			.to('.dashboard', { opacity: 1, filter: 'grayscale(0)', duration: 5 })
			.to('.scrolldown', { opacity: 0, transform: 'scale(1, 0)', duration: 4 });

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

	});

	return (
		<>
			<div className="pattern" />
			<section className="promo container">
				<h1 className="title">Creative Design, made for humans.</h1>
			</section>
			<section className="dashboard container grid">
				<div className="span-3 scrolldown">
					<img src={ScrollDownGIF} alt="Scroll Down" />
				</div>
				<Card className="span-2" gradient="linear-gradient(165deg, #2c4735 0%, #1d243e 60%, #101124 90%)" style={{ minHeight: '375px' }} go="/labs">
					<h2>Discover<br />new ideas.</h2>
					<p>Take a look into a collection of my public canvases and get inspired by new and innovative design choices you might have never seen before.</p>
					<p className="tags">#design #ideas #inspiration #labs</p>
					<Button style={{ margin: '10px 0 0 -3px' }}>Get inspired</Button>
					<img src={DesignImage} alt="Design" id="cover_design" />
				</Card>
				<Card go="/about" gradient={`url('` + PersonDimmed + `')`}>
					<h2>Hi👋</h2>
					<p style={{ maxWidth: "175px" }}>I’m Felix and welcome to my new website. Want to get to know me? Check out my profile or drop me a message if you like the page.</p>
					<Button style={{ margin: '10px 0 0 -3px' }}>About Me</Button>
				</Card>
				<Card go="/stories" gradient="linear-gradient(155deg, hsl(240deg 2% 8%) 0%, hsl(225deg 16% 10%) 31%, hsl(218deg 28% 11%) 45%, hsl(215deg 35% 13%) 55%, hsl(215deg 42% 15%) 65%, hsl(214deg 43% 16%) 77%, hsl(215deg 41% 16%) 100%)">
					<h2>Stories.</h2>
					<p className="cutoff blue">
						Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. 📷📷 At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 💯😅 Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua ...
						<br /><br />
						<Button style={{ margin: '10px 0 0 -3px' }}>Read more</Button>
					</p>
					<img src={StoryImage} alt="Stories" id="cover_stories" />
				</Card>
				<Card className="span-2" gradient="linear-gradient(90deg, rgb(45, 33, 38) 0%, rgb(28, 36, 44) 100%)" go="/about">
					<h2>Web-<br />Development.</h2>
					<p>My job has become to one of the most important things in today's era of technology.<br />Check out my development & design profile in the about section.</p>
					<p className="tags">#webdev #react #laravel #rest #wordpress</p>
					<Button style={{ margin: '10px 0 0 -3px' }}>Visit portfolio</Button>
					<img src={CodeImage} alt="Code" id="cover_webdev" />
				</Card>
				<Card go="/co2" gradient="linear-gradient(to bottom, #203025 0%, #151516 100%)">
					<h2>CO2 🌿<br />Neutral.</h2>
					<p>
						This website is run entirely on renewable energy and supports the vision of a green future for everyone.<br />
						<small>** The Oracle Cloud Infrastructure has aimed to achieve full climate neutrality by 2025.</small>
					</p>
				</Card>
				<Card go="/hire">
					<h2>Hire Me.</h2>
					<p>You can offer me a job in software engineering or front-end web design? I'm always happy to see gigs I could be part in.</p>
					<p>Feel free to get an impression of myself and evaluate if I qualify.</p>
					<Button style={{ margin: '10px 0 0 -3px', backgroundImage: 'linear-gradient(210deg, hsl(0deg 0% 80%) 0%, hsl(0deg 0% 74%) 38%, hsl(0deg 0% 50%) 100%)', color: 'rgba(0, 0, 0, .8)' }}>Download CV</Button>
				</Card>
				<Card go="/sayhi">
					<h2>Say Hi!</h2>
					<p className="cutoff black">
						Is there anything else you would like to tell me? Drop me a message and I will get back to you.<br /><br />
						<Button style={{ margin: '10px 0 0 -3px', backgroundColor: '#111111', color: '#888888', textTransform: 'none', width: '80%', textAlign: 'left' }}>Name</Button>
						<Button style={{ margin: '10px 0 0 -3px', backgroundColor: '#111111', color: '#888888', textTransform: 'none', width: '80%', textAlign: 'left' }}>Message Title</Button>
					</p>
				</Card>
			</section>
		</>
	);

};

export default Index;
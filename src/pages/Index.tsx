import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from "react-router-dom";

/* Components */
import Card from '../components/containers/Card';
import Button from '../components/forms/Button';

/* Static */
import PersonDimmed from '../static/images/landing/portfolio-dimmed.png';
import DesignImage from '../static/images/landing/design.png';
import StoryImage from '../static/images/landing/stories.png';
import WindmillImage from "../static/images/future/windmill.png";
import ArrowRight from '../static/images/icons/arrow-right.png';
import ScrollDownGIF from '../static/images/landing/scroll.gif';

/* GSAP Register */
gsap.registerPlugin(ScrollTrigger);

const Index = () => {

	const navigate = useNavigate();

	useEffect(() => {

		/* Document Title */
		document.title = 'Home' + process.env.REACT_APP_TITLE;

		/* Change Background colour */
		gsap.to('body', {
			backgroundImage: 'black',
			duration: 1
		});


		/* Scroll Trigger for dashboard */
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.dashboard',
				start: 'top 65%',
				end: '+=550',
				toggleActions: 'restart reverse reverse reverse',
				scrub: true
			},
			ease: 'power4'
		});

		tl.fromTo('.dashboard', { opacity: .2, filter: 'grayscale(1)' },
			{ opacity: 1, filter: 'grayscale(0)', duration: 4 })
			.to('.scrolldown', { opacity: 0, transform: 'scale(1, 0)', duration: 4 });


		/* Dashboard Cards Animation (fade all other cards, when one is hovered */
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

		cards.forEach((el) => {
			el.addEventListener('mouseenter', () => {
				cards.forEach((elx) => {
					if(elx === el) return;
					gsap.to(elx, {
						autoAlpha: .6,
						duration: .2
					});
				});
			});

			el.addEventListener('mouseleave', () => {
				cards.forEach((elx) => {
					gsap.to(elx, {
						autoAlpha: 1,
						duration: .2
					});
				});
			});
		});




		/* Animate Promo Title */
		const promo = document.querySelector('.promo') as HTMLElement;
		const button = promo.querySelector(':scope > button') as HTMLButtonElement;

		gsap.fromTo(button, {
			autoAlpha: 0
		}, {
			autoAlpha: 1,
			duration: .5,
			delay: .6,
			onComplete: () => {
				gsap.to(button, {
					clearProps: 'all'
				})
			}
		});


		/* Heading Title Slider */

		const showTitle = () => {
			const title = promo.querySelector(':scope > h1') as HTMLHeadingElement;
			title.innerHTML = title.textContent!.replace(/\S+/g, '<span class="word">$&</span>');

			const words = document.querySelectorAll('.word');

			gsap.fromTo(words, {
				y: 50,
				autoAlpha: 0
			}, {
				y: 0,
				autoAlpha: 1,
				duration: .3,
				stagger: .1
			});
		};

		const hideTitle = () => {
			const words = document.querySelectorAll('.word');

			gsap.fromTo(words, {
				y: 0,
				autoAlpha: 1
			}, {
				y: 50,
				autoAlpha: 0,
				duration: .05,
				stagger: .1
			});
		};

		const titles = [
			'Hi I\'m Felix Hebgen.',
			'I make modern websites.',
			'... and code REST APIs.',
			'I manage Databases.',
			'I build Artificial Intelligence.'
		];

		let currSlide = 0;
		const changeTitle = () => {
			const title = promo.querySelector(':scope > h1') as HTMLHeadingElement;
			currSlide = currSlide === (titles.length - 1) ? 0 : ++currSlide;
			title.innerHTML = titles[currSlide];
		};

		const slide = () => {
			hideTitle();
			setTimeout(() => {
				changeTitle();
				showTitle();
			}, 500);
		};

		/* Interval for Title slide */
		const interval = setInterval(() => {
			slide();
		}, 5000);

		/* Initial Show Title on component load */
		showTitle();

		/* Cleanup */
		return () => {
			hideTitle();
			clearInterval(interval);
		}
	});

	return (
		<>
			<section className="promo container">
				<h1>Hi, I'm Felix Hebgen.</h1>
				<button onClick={() => navigate('/about')}><span className="coloured">Get To Know Me</span> <img src={ArrowRight} alt="" /></button>
			</section>
			<section className="dashboard container grid">
				<div className="span-3 scrolldown">
					<img src={ScrollDownGIF} alt="Scroll Down" />
				</div>
				<Card className="span-2" gradient="linear-gradient(165deg, #2c4735 0%, #1d243e 60%, #101124 90%)" go="/labs">
					<h2>Discover<br />stunning ideas.</h2>
					<div className="description">
						<p>Take a closer look at a collection of my public canvases of AI generated design and get inspired by new and innovative design choices you might have never seen before.</p>
						<p className="tags">#design #ideas #inspiration #labs #ai</p>
						<Button>Get inspired</Button>
					</div>
					<img src={DesignImage} alt="Design" id="cover_design" />
				</Card>
				<Card go="/about" gradient={`url('` + PersonDimmed + `')`}>
					<h2>Hi👋</h2>
					<div className="description">
						<p style={{ maxWidth: "175px" }}>I’m Felix, a full-stack web and app dev.<br />I design mockups, code APIs and build software. Find out more in my portfolio.</p>
						<Button>About Me</Button>
					</div>
				</Card>
				<Card go="/stories">
					<h2>Stories.</h2>
					<div className="description">
						<p>Read my latest thoughts on a bunch of different things, ranging from 💾💻 AI development to the review of gadgets and other technologies 📷📡 &hellip;</p>
						<p>There's no comment section yet.</p>
						<p className="tags">#blog #articles #updates #tech</p>
						<Button>Visit the blog</Button>
					</div>
					<img src={StoryImage} alt="Stories" id="cover_stories" />
				</Card>
				<Card className="span-2" gradient="linear-gradient(90deg, rgb(45, 33, 38) 0%, rgb(28, 36, 44) 100%)" go="/article/14-im-impressed-by-this-new-macbook">
					<h2>Supercharge<br />automation with AI.</h2>
					<div className="description">
						<p>I'm constantly looking out for new challenges. My non-professional projects currently revolve around the development of useful Artificial Intelligence.</p>
						<p className="tags">#ai #intelligence #automation #science #experiments</p>
						<Button>Read Article</Button>
					</div>
					{/* <img src={CodeImage} alt="Code" id="cover_webdev" /> */}
				</Card>
				<Card go="/future">
					<h2>CO2 🌿<br />Neutral.</h2>
					<div className="description">
						<p>
							This website is run entirely on renewable energy and supports the vision of a green future for everyone.<br />
							<small>** The Oracle Cloud Infrastructure has aimed to achieve full climate neutrality by 2025.</small>
						</p>
					</div>
					<img src={WindmillImage} alt="Windmills" id="cover_windmill" />
				</Card>
				<Card go="/hire">
					<h2>Hire Me.</h2>
					<div className="description">
						<p>I'm currently looking for a new job. Do you need someone for software engineering or web design? I might qualify.<br /><br />Drop me a message and I will get back to you a•s•a•p.</p>
						<Button style={{ backgroundImage: 'linear-gradient(210deg, hsl(0deg 0% 80%) 0%, hsl(0deg 0% 74%) 38%, hsl(0deg 0% 50%) 100%)', color: 'rgba(0, 0, 0, .8)' }}>Download CV</Button>
					</div>
				</Card>
				{/*
				<Card go="/sayhi">
					<h2>Say Hi!</h2>
					<p className="cutoff black">
						Is there anything else you would like to tell me? Drop me a message and I will get back to you.<br /><br />
						<Button style={{ margin: '10px 0 0 -3px', backgroundColor: '#111111', color: '#888888', textTransform: 'none', width: '80%', textAlign: 'left' }}>Name</Button>
						<Button style={{ margin: '10px 0 0 -3px', backgroundColor: '#111111', color: '#888888', textTransform: 'none', width: '80%', textAlign: 'left' }}>Message ...</Button>
					</p>
				</Card>
				*/}
			</section>

		</>
	);

};

export default Index;
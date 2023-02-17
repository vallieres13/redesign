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

/* GSAP Register */
gsap.registerPlugin(ScrollTrigger);

const Index = () => {

	const __title = 'Home';
	const navigate = useNavigate();

	useEffect(() => {

		/* Document Title */
		document.title = __title + process.env.REACT_APP_TITLE;

		/* Change Background colour */
		gsap.to('body', {
			backgroundImage: 'none',
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
			const splitTitle = title.textContent!.replace(/\S+/g, '<span class="word">$&</span>');

			const word = splitTitle.split('<span');
			let doubleSplitTitle = '';
			word.forEach((word: string) => {
				doubleSplitTitle += '<span class="wordparent"><span' + word + '</span>';
			});

			title.innerHTML = doubleSplitTitle;

			const words = document.querySelectorAll('.word');

			gsap.fromTo(words, {
				yPercent: 100,
				autoAlpha: 0
			}, {
				autoAlpha: 1,
				duration: 1,
				stagger: .2,
				yPercent: 0,
				ease: 'power4',
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
			'Heyya!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I\'m Felix Hebgen.',
			'I make modern websites.',
			'I\'ve got&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; >4 years of experience.',
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
				<h1>Heyaa!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I'm Felix Hebgen.</h1>
				<button onClick={() => navigate('/about')}><span className="coloured">Get To Know Me</span> <img src={ArrowRight} alt="" /></button>
			</section>
			<section className="dashboard container grid">
				<Card className="span-2" gradient="linear-gradient(90deg, rgb(45, 33, 38) 0%, rgb(28, 36, 44) 100%)" go="/article/40-how-i-built-this-website">
					<h2>This Website<br />Is Open-Source.</h2>
					<div className="description">
						<p>This website is hosted by Oracle but has its own open-source respository on GitHub. Are you curious to know how I built it? Visit the blog to read more about it.</p>
						<p className="tags">#opensource #github #react #typescript #source</p>
						<Button>Learn more</Button>
					</div>
					<img src={DesignImage} alt="Design" id="cover_design" />
				</Card>
				<Card className="span about" go="/about" gradient={`url('` + PersonDimmed + `')`}>
					<h2>Hi👋</h2>
					<div className="description">
						<p style={{ maxWidth: "175px" }}>I’m Felix, a full-stack web and app dev.<br />I design mockups, code APIs and build software. Find out more in my portfolio.</p>
						<Button>About Me</Button>
					</div>
				</Card>
				<Card className="future" go="/future">
					<h2>CO<sub>2</sub> 🌿<br />Neutral.</h2>
					<div className="description">
						<p>
							This website is run entirely on renewable energy and supports the vision of a green future for everyone.<br />
							<small>** The Oracle Cloud Infrastructure has aimed to achieve full climate neutrality by 2025.</small>
						</p>
					</div>
					<img src={WindmillImage} alt="Windmills" id="cover_windmill" />
				</Card>
				<Card go="/stories">
					<h2>Stories.</h2>
					<div className="description">
						<p>Read my latest thoughts on a bunch of different things, ranging from 💾💻 AI development to the review of gadgets and other technologies 📷📡 &hellip;</p>
						<p className="tags">#blog #articles #updates #tech</p>
						<Button>Visit the blog</Button>
					</div>
					<img src={StoryImage} alt="Stories" id="cover_stories" />
				</Card>
				{/*
				<Card go="/hire">
					<h2>Hiring?</h2>
					<div className="description">
						<p>I'm exploring new employment opportunities in web dev & design and believe my skills and experience make me a strong candidate.<br /><br />Drop me a message and I'll make the effort to get back to you — a•s•a•p.</p>
						<Button style={{ backgroundImage: 'linear-gradient(210deg, hsl(0deg 0% 80%) 0%, hsl(0deg 0% 74%) 38%, hsl(0deg 0% 50%) 100%)', color: 'rgba(0, 0, 0, .8)' }}>Download CV</Button>
					</div>
				</Card>
				*/}
			</section>

		</>
	);

};

export default Index;
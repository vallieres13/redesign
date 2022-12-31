import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* Components */
import Card from '../components/containers/Card';
import Button from '../components/forms/Button';

/* Static */
import PersonDimmed from '../static/images/landing/portfolio-dimmed.png';
import DesignImage from '../static/images/landing/design.png';
import StoryImage from '../static/images/landing/stories.png';
import WindmillImage from "../static/images/future/windmill.png";
import ArrowRight from '../static/images/icons/arrow-right.png';

/* Landing Images */
import Landing2 from '../static/images/promo/landing2.png';
import Landing3 from '../static/images/promo/landing3.png';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {

	useEffect(() => {

		/* Change Background colour */
		gsap.to('body', {
			backgroundImage: 'linear-gradient(0deg, rgba(0,0,0,1) 60%, rgba(31,22,38,1) 90%, rgba(52,29,60,1) 100%)',
			duration: 1
		});

		let promo = document.querySelector('.promo') as HTMLDivElement;
		let heading = promo.querySelector(':scope > h1') as HTMLHeadingElement;
		let cta = promo.querySelector(':scope > button') as HTMLHeadingElement;

		let anim: gsap.core.Tween;


		const showPromo = () => {

			gsap.to(heading, {
				autoAlpha: 1,
				duration: 1,
				delay: .5
			});

			gsap.to(cta, {
				visibility: 'visible',
				duration: 1,
				delay: .5
			});

			promo.classList.add('visible');

			gsap.to(promo, {
				onComplete: () => {
					setTimeout(() => {
						promo.classList.add('ready');
						anim = gsap.to(promo, {
							duration: 60,
							backgroundPosition: '-900px -300px',
							repeat: -1,
							yoyo: true,
							ease: 'sine'
						});
					}, 1000);
				},
				duration: 1,
				backgroundPosition: '0 0',
				transition: 1
			});

		};

		const hidePromo = () => {
			anim.pause();

			gsap.to(promo, {
				duration: .2,
				transition: .2,
				backgroundPosition: '0 0',
				ease: 'sine',

				onComplete: () => {
					setTimeout(() => {
						/* promo BG has reset to its 0 0 position, now pause and remove repeatable */
						anim.pause();
						promo.classList.remove('ready');

						/* only then start doing the fade away: */
						gsap.to(promo, {
							onComplete: () => {
								setTimeout(() => {
									promo.classList.remove('visible');
									gsap.to(promo, {
										/* reset to initial position */
										backgroundPosition: '0 1650px'
									})
								}, 200);
							},
							duration: .4,
							backgroundPosition: '0 3650px',
							transition: .4
						});
					}, 200);

				}
			});

			gsap.to(heading, {
				autoAlpha: 0,
				duration: .25,
				delay: .25
			});

			gsap.to(cta, {
				visibility: 'hidden',
				duration: .25,
				delay: .25
			});

		};

		const changePromoMeta = (options: { title: string, image: string, accent: string, softAccent: string, ctaText: string, gradient: string }): void => {
			heading.innerHTML = options.title;
			(heading.querySelector(':scope > span') as HTMLSpanElement).style.color = options.accent;
			promo.style.background = 'linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url(' + options.image + ')';
			promo.style.backgroundRepeat = 'no-repeat';
			(cta.querySelector(':scope > span') as HTMLSpanElement).innerHTML = options.ctaText;
			cta.style.backgroundColor = options.softAccent;

			/* Change Background colour */
			gsap.to('body', {
				backgroundImage: options.gradient
			});
		};

		showPromo();

		const sliders = [
			{
				title: 'This is an <span>alternative</span> title.',
				image: Landing2,
				accent: '#e191d7',
				softAccent: '#FAEBF8',
				gradient: 'linear-gradient(0deg, rgba(0,0,0,1) 60%, rgba(31,22,38,1) 90%, rgba(52,29,60,1) 100%)',
				ctaText: 'Alternative Button'
			},
			{
				title: 'Yet another <span>alternative</span> slider.',
				image: Landing3,
				accent: '#7EA4CD',
				softAccent: '#DAE5F1',
				gradient: 'linear-gradient(0deg, rgba(0,0,0,1) 60%, rgba(22,28,38,1) 90%, rgba(29,38,60,1) 100%)',
				ctaText: 'Yet Another Alternative Button'
			}
		];

		/* -- Manage slider position in sequence (iteration) */
		let sliderIteration = 0;
		const slide = () => {
			hidePromo(); // - takes about .6 seconds

			setTimeout(() => {

				sliderIteration++;
				sliderIteration = (sliderIteration === sliders.length ? 0 : sliderIteration);
				changePromoMeta(sliders[sliderIteration]);

			}, 700);

			setTimeout(() => {
				showPromo();
			}, 1000);
		};

		/* Initial cooldown when first slider appears on page visit */
		let cooldown = true;
		promo.classList.add('switching');
		setTimeout(() => {
			cooldown = false;
			promo.classList.remove('switching');
		}, 1800);

		/* Click cooldown during slider switching (approx. 3 seconds) */
		promo.addEventListener('click', () => {
			if(cooldown) return;
			slide();
			promo.classList.add('switching');

			cooldown = true;
			setTimeout(() => {
				cooldown = false;
				promo.classList.remove('switching');
			}, 3000);
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
			{ opacity: 1, filter: 'grayscale(0)', duration: 4 });



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
						autoAlpha: .5,
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

	});

	return (
		<>
			<section className="promo container">
				<h1 className="title">This is an <span>alternative</span> title.</h1>
				<button><span>Alternative Button</span> <img src={ArrowRight} alt="" /></button>
			</section>
			<section className="dashboard container grid">
				<Card className="span-2" gradient="linear-gradient(165deg, #2c4735 0%, #1d243e 60%, #101124 90%)" go="/labs">
					<h2>Discover<br />stunning ideas.</h2>
					<div className="description">
						<p>Take a closer look at a collection of my public canvases and get inspired by new and innovative design choices you might have never seen before.</p>
						<p className="tags">#design #ideas #inspiration #labs</p>
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
						<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr. 💯😅 Lorem ipsum dolor sit amet, sed diam voluptua ...</p>
						<p>Lorem ipsum dolor sit amet ...</p>
						<p className="tags">#articles #tech</p>
						<Button>Read more</Button>
					</div>
					<img src={StoryImage} alt="Stories" id="cover_stories" />
				</Card>
				<Card className="span-2" gradient="linear-gradient(90deg, rgb(45, 33, 38) 0%, rgb(28, 36, 44) 100%)" go="/ai">
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
						<p>Do you need someone for software engineering or web design? I might qualify. Drop me a message and I will get back to you a•s•a•p.</p>
						<p>There's so much more about me you haven't seen. Let me introduce myself to you.</p>
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
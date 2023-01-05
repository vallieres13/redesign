import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useNavigate } from "react-router-dom";

/* Images */
import Person from '../static/images/about/portfolio.jpg';
import Webdev from '../static/images/about/webdev.png';
import Design from '../static/images/about/design.png';
import Video from '../static/images/about/video.png';

/* Logos */
import LaravelLogo from '../static/images/logos/laravel.png';
import ReactLogo from '../static/images/logos/react.png';
import phpLogo from '../static/images/logos/php.png';
import tsLogo from '../static/images/logos/typescript.png';
import htmlLogo from '../static/images/logos/html.png';
import LumenLogo from '../static/images/logos/lumen.png';
import csharpLogo from '../static/images/logos/csharp.png';

import aeLogo from '../static/images/logos/ae.png';
import meLogo from '../static/images/logos/me.png';
import prLogo from '../static/images/logos/pr.png';
import psLogo from '../static/images/logos/ps.png';
import vegasLogo from '../static/images/logos/vegas.png';

import xdLogo from '../static/images/logos/xd.png';
import figmaLogo from '../static/images/logos/figma.png';
import webflowLogo from '../static/images/logos/webflow.png';
import aiLogo from '../static/images/logos/ai.png';

/* Customers */
import ladadiLogo from '../static/images/logos/ladadi.png';
import odenwaldLogo from '../static/images/logos/odenwaldkreis.png';
import offenbachLogo from '../static/images/logos/offenbach.png';
import deineitLogo from '../static/images/logos/deineit.png';
import ragbitLogo from '../static/images/logos/ragbit.png';
import stortrecLogo from '../static/images/logos/stortrec.png';
import ArrowRight from "../static/images/icons/arrow-right.png";

/* GSAP Register */
gsap.registerPlugin(ScrollToPlugin);

const About = () => {

	const navigate = useNavigate();

	const roles = [
		{
			title: 'Full Stack Web Development',
			section: 'webdev'
		},
		{
			title: 'Live Interaction Design',
			section: 'design'
		},
		{
			title: 'Video Production',
			section: 'video'
		},
		{
			title: 'Who I work for',
			section: 'customers'
		},
		{
			title: 'Impressions',
			section: 'impressions'
		}
	];

	useEffect(() => {

		/* Document Title */
		document.title = 'About Me' + process.env.REACT_APP_TITLE;

		gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
		root.style.setProperty('--borderColor', 'transparent');

		/* Change Background colour */
		gsap.to('body', {
			backgroundImage: 'none'
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


		/* Fade in vertical line */
		setTimeout(() => {
			root.style.setProperty('--borderColor', '#111111');
		}, 1000);


		let hoverElement: null|HTMLDivElement = null;

		/* Init hover effect for software logos */
		const logos = document.querySelectorAll('.portfolio .logos img') as NodeListOf<HTMLImageElement>;
		logos.forEach((logo: HTMLImageElement) => {
			logo.addEventListener('mouseover', () => {
				const display = logo.getAttribute('alt') as string;
				const name = logo.getAttribute('data-name') as string;
				logo.src = require('../static/images/logos/' + name + '-normal.png');

				const tooltip = document.createElement('span') as HTMLDivElement;
				hoverElement = tooltip;

				tooltip.classList.add('tooltip');
				tooltip.innerHTML = display;
				gsap.fromTo(tooltip, {
					autoAlpha: 0,
					y: 10
				}, {
					y: 0,
					autoAlpha: 1,
					duration: .1
				});

				logo.insertAdjacentElement('beforebegin', tooltip);
			});

			logo.addEventListener('mouseleave', () => {
				const tooltip = hoverElement as HTMLDivElement;
				hoverElement = null;

				gsap.fromTo(tooltip, {
					autoAlpha: 1,
					y: 0
				}, {
					y: 10,
					autoAlpha: 0,
					duration: .1
				});

				setTimeout(() => {
					tooltip.remove();
				}, 1000)

				const name = logo.getAttribute('data-name');
				logo.src = require('../static/images/logos/' + name + '.png');
			});
		});


		/* Cleanup */
		return () => {
			gsap.to('.person', {
				autoAlpha: 0,
				yPercent: 20
			});

			gsap.to('.role', {
				autoAlpha: 0,
				yPercent: 40
			});

		};
	});


	const root = document.querySelector(':root') as HTMLElement;

	const handleHoverRole = (e: React.MouseEvent) => {
		gsap.to(e.target, {
			autoAlpha: 1,
			duration: .1
		});

		root.style.setProperty('--borderColor', '#333333');
	};

	const handleUnhoverRole = (e: React.MouseEvent) => {
		gsap.to(e.target, {
			autoAlpha: .6,
			duration: .1
		});

		root.style.setProperty('--borderColor', '#111111');
	};

	const handleClickRole = (e: React.MouseEvent) => {
		/* Flicker Effect */
		gsap.to(e.target, {
			autoAlpha: 0,
			repeat: 2,
			yoyo: true,
			duration: .1
		});
		gsap.to(e.target, {
			autoAlpha: .6,
			duration: .1,
			delay: .3
		});

		(e.target as HTMLAnchorElement).classList.add('active');

		setTimeout(() => {
			/* Scroll after Flicker Effect ended */
			const section = (e.target as HTMLSpanElement).getAttribute('data-section') as string;
			goToSection(section);

			(e.target as HTMLAnchorElement).classList.remove('active');
		}, 400);

	};

	const goToSection = (section: string) => {
		gsap.to(window, {
			scrollTo: {
				y: '.portfolio .' + section,
				offsetY: 150
			},
			duration: 1,
			overwrite: true,
			ease: 'power3'
		});
	};

	return (
		<>
			<section className="portfolio container-wide">
				<section className="intro">
					<img src={Person} className="person" alt="Felix Hebgen" />
					<div className="title">
						<h1 className="name">Felix &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Hebgen</h1>
						<p className="roles">
							{roles.map(({ title, section }, index) => {
								return (
									<span className="role" onClick={handleClickRole} onMouseOver={handleHoverRole} onMouseLeave={handleUnhoverRole} key={index}>
										<a href="#!" className="nocursor" data-section={section}>{title}</a><br />
									</span>
								);
							})}
						</p>
					</div>
				</section>
				<section className="webdev right">
					<div className="title">
						<h2 className="name highlighted">Web & App<br />Development</h2>
						<div className="description">
							<div className="imessage">
								<p className="from-me">
									I'm a Full-Stack Developer. From database management, to complex interface design with JavaScript libraries, to writing an API from scratch or using Backend frameworks like Kotlin with Bootspring. I've done just about everything.
								</p>
							</div>
						</div>
						<div className="logos">
							<div className="logo-disclaimer">I usually work with …</div>
							<img src={LaravelLogo} data-name="laravel" alt="Laravel" />
							<img src={LumenLogo} data-name="lumen" alt="Lumen" />
							<img src={ReactLogo} data-name="react" alt="ReactJS" />
							<img src={tsLogo} data-name="typescript" alt="TypeScript" />
							<img src={htmlLogo} data-name="html" alt="HTML & CSS" />
							<img src={csharpLogo} data-name="csharp" alt=".NET C#" />
							<img src={phpLogo} data-name="php" alt="php 8.1" />
						</div>
					</div>
					<div className="image">
						<img src={Webdev} alt="Web Development" />
					</div>
				</section>
				<section className="design left">
					<div className="image">
						<img src={Design} alt="Interaction Design" />
					</div>
					<div className="title">
						<h2 className="name highlighted">Interaction<br />Design</h2>
						<div className="description">
							<div className="imessage">
								<p className="from-them">
									I make full enterprise-ready webdesigns that never fail to impress. My qualities range from simple one-pagers to full structures of creative, modern, responsive and smart UI / UX design.
								</p>
							</div>
						</div>
						<div className="logos">
							<div className="logo-disclaimer">I usually work with …</div>
							<img src={psLogo} data-name="ps" alt="Adobe Photoshop" />
							<img src={xdLogo} data-name="xd" alt="Adobe Experience Design" />
							<img src={aiLogo} data-name="ai" alt="Adobe Illustrator" />
							<img src={figmaLogo} data-name="figma" alt="Figma" />
							<img src={webflowLogo} data-name="webflow" alt="Webflow" />
						</div>
					</div>
				</section>
				<section className="video right">
					<div className="title">
						<h2 className="name highlighted" style={{ marginLeft: '12rem' }}>Video Production</h2>
						<div className="description">
							<div className="imessage">
								<p className="from-me">
									I make videos that keep the viewer's attention and build up atmosphere that is required for just about any scenario. Special effects, fast cuts, custom audio and a lot of energy.
								</p>
							</div>
						</div>
						<div className="logos">
							<div className="logo-disclaimer">I usually work with …</div>
							<img src={prLogo} data-name="pr" alt="Adobe Premiere Pro" />
							<img src={aeLogo} data-name="ae" alt="Adobe After Effects" />
							<img src={meLogo} data-name="me" alt="Adobe Media Encoder" />
							<img src={psLogo} data-name="ps" alt="Adobe Photoshop" />
							<img src={vegasLogo} data-name="vegas" alt="VEGAS Pro 19.0" />
						</div>
					</div>
					<div className="image">
						<img src={Video} alt="Video Production" />
					</div>
				</section>
				<section className="customers">
					<h3>I worked together with …</h3>
					<ul>
						<li><img src={ladadiLogo} alt="Landkreis Darmstadt, Dieburg" /></li>
						<li><img src={odenwaldLogo} alt="Odenwaldkreis" /></li>
						<li><img src={offenbachLogo} alt="Odenwaldkreis" /></li>
						<li><img src={deineitLogo} alt="DeineIT.com" /></li>
						<li><img src={ragbitLogo} alt="RAGBIT®NET" /></li>
						<li><img src={stortrecLogo} alt="StorTrec AG" /></li>
					</ul>
					<h4>Ready to add your name to the list?</h4>
					<p>Let's work on your new project, together.</p>
					<button onClick={() => navigate('/hire')}><span className="coloured">Drop me a message</span> <img src={ArrowRight} alt="" /></button>
				</section>
				<section className="impressions">
					<h3>Impressions</h3>
					<p>// TODO: Add carousel with impression images</p>
				</section>
			</section>
		</>
	);

};

export default About;
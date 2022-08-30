import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

/* Images */
import Person from '../static/images/about/portfolio.jpg';
import Webdev from '../static/images/about/webdev.png';

/* Logos */
import LaravelLogo from '../static/images/logos/webdev/laravel.png';
import ReactLogo from '../static/images/logos/webdev/react.png';
import phpLogo from '../static/images/logos/webdev/php.png';
import jsLogo from '../static/images/logos/webdev/javascript.png';
import tsLogo from '../static/images/logos/webdev/typescript.png';
import htmlLogo from '../static/images/logos/webdev/html.png';
import LumenLogo from '../static/images/logos/webdev/lumen.png';

import aeLogo from '../static/images/logos/video/ae.png';
import meLogo from '../static/images/logos/video/me.png';
import prLogo from '../static/images/logos/video/pr.png';
import psLogo from '../static/images/logos/video/ps.png';
import vegasLogo from '../static/images/logos/video/vegas.png';


const About = () => {

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
			title: 'Freelancing',
			section: 'freelancing'
		}
	];

	useEffect(() => {

		gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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

	});

	const handleHoverRole = (e: React.MouseEvent) => {
		gsap.to(e.target, {
			autoAlpha: 1,
			duration: .1
		});
	};

	const handleUnhoverRole = (e: React.MouseEvent) => {
		gsap.to(e.target, {
			autoAlpha: .6,
			duration: .1
		})
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
			scrollTo: '.portfolio .' + section,
			duration: 1,
			overwrite: true,
			ease: 'power3'
		});
	}

	return (
		<>
			<section className="portfolio container-wide">
				<section className="intro">
					<img src={Person} className="person" alt="Felix Hebgen" />
					<div className="title">
						<h1 className="name">Felix Hebgen</h1>
						<p className="roles">
							{roles.map(({ title, section }, index) => {
								return (
									<span className="role" onClick={handleClickRole} onMouseOver={handleHoverRole} onMouseLeave={handleUnhoverRole} key={index}>
										<a href="#" className="nocursor" data-section={section}>{title}</a><br />
									</span>
								);
							})}
						</p>
					</div>
				</section>
				<section className="webdev right">
					<div className="title">
						<h2 className="name highlighted">Web&nbsp;&nbsp;<br />Development</h2>
						<div className="description">
							<div className="imessage">
								<p className="from-me">
									Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
								</p>
							</div>
						</div>
						<div className="logos">
							<img src={LaravelLogo} alt="Laravel" />
							<img src={LumenLogo} alt="Lumen" />
							<img src={ReactLogo} alt="React" />
							<img src={jsLogo} alt="JavaScript" />
							<img src={tsLogo} alt="TypeScript" />
							<img src={htmlLogo} alt="HTML & CSS" />
							<img src={phpLogo} alt="php" />
						</div>
					</div>
					<div className="image">
						<img src={Webdev} alt="Web Development" />
					</div>
				</section>
				<section className="design left">
					<div className="image">
						<img src={Webdev} alt="Web Development" />
					</div>
					<div className="title">
						<h2 className="name highlighted">Interaction<br />&nbsp;Design</h2>
						<div className="description">
							<div className="imessage">
								<p className="from-them">
									Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
								</p>
							</div>
						</div>
						<div className="logos">
							<img src={prLogo} alt="Adobe Premiere Pro" />
							<img src={aeLogo} alt="Adobe After Effects" />
							<img src={meLogo} alt="Adobe Media Encoder" />
							<img src={psLogo} alt="Adobe Photoshop" />
							<img src={vegasLogo} alt="VEGAS Pro 19.0" />
						</div>
					</div>
				</section>
				<section className="webdev right">
					<div className="title">
						<h2 className="name highlighted" style={{ marginLeft: '12rem' }}>Video&nbsp;<br />Production</h2>
						<div className="description">
							<div className="imessage">
								<p className="from-me">
									Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
								</p>
							</div>
						</div>
						<div className="logos">
							<img src={LaravelLogo} alt="Laravel" />
							<img src={LumenLogo} alt="Lumen" />
							<img src={ReactLogo} alt="React" />
							<img src={jsLogo} alt="JavaScript" />
							<img src={tsLogo} alt="TypeScript" />
							<img src={htmlLogo} alt="HTML & CSS" />
							<img src={phpLogo} alt="php" />
						</div>
					</div>
					<div className="image">
						<img src={Webdev} alt="Web Development" />
					</div>
				</section>
				<section className="design left">
					<div className="image">
						<img src={Webdev} alt="Web Development" />
					</div>
					<div className="title">
						<h2 className="name highlighted">&nbsp; Off-Work<br />Freelancing</h2>
						<div className="description">
							<div className="imessage">
								<p className="from-them">
									Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
								</p>
							</div>
						</div>
						<div className="logos">
							<img src={prLogo} alt="Adobe Premiere Pro" />
							<img src={aeLogo} alt="Adobe After Effects" />
							<img src={meLogo} alt="Adobe Media Encoder" />
							<img src={psLogo} alt="Adobe Photoshop" />
							<img src={vegasLogo} alt="VEGAS Pro 19.0" />
						</div>
					</div>
				</section>
				{/*
				<section>
					<div className="skills">

						<div className="skill">
							<div className="skill-name">PHP</div>
							<div className="skill-bar">
								<div className="skill-per" data-per="95%" style={{ maxWidth: '95%' }}></div>
							</div>
						</div>
						<div className="skill">
							<div className="skill-name">JavaScript</div>
							<div className="skill-bar">
								<div className="skill-per" data-per="75%" style={{ maxWidth: '75%' }}></div>
							</div>
						</div>
						<div className="skill">
							<div className="skill-name">React.js</div>
							<div className="skill-bar">
								<div className="skill-per" data-per="65%" style={{ maxWidth: '65%' }}></div>
							</div>
						</div>
						<div className="skill">
							<div className="skill-name">Laravel</div>
							<div className="skill-bar">
								<div className="skill-per" data-per="50%" style={{ maxWidth: '50%' }}></div>
							</div>
						</div>
					</div>
				</section>
				*/}
			</section>
		</>
	);

};

export default About;
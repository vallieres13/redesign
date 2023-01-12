import React, { useEffect } from 'react';
import gsap from 'gsap';
import { Document, pdfjs, Page } from 'react-pdf';
import { Link } from 'react-router-dom';

/* Static */
import pdfIcon from "../static/images/icons/pdf.png";
import rightArrowIcon from "../static/images/icons/arrow-right.png";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Hire = () => {

	/* Change Background colour */
	gsap.to('body', {
		backgroundImage: 'none'
	});

	useEffect(() => {
		/* Document Title */
		document.title = 'Hire Me' + process.env.REACT_APP_TITLE;

		/* Animate Content */
		const content = document.querySelectorAll('.page-text-content') as NodeListOf<HTMLDivElement>;
		gsap.fromTo(content, {
			autoAlpha: 0,
			y: 40
		}, {
			autoAlpha: 1,
			y: 0,
			duration: .35,
			delay: .5,
			stagger: .15
		});

		const title = document.querySelector('.title') as HTMLDivElement;
		title.innerHTML = title.textContent!.replace(/\S/g, '<span class="letter">$&</span>');
		let titleLetters = title.querySelectorAll(':scope .letter');

		gsap.fromTo(titleLetters, {
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

		const breadcrumbs = document.querySelector('.breadcrumbs') as HTMLDivElement;
		gsap.fromTo(breadcrumbs, {
			autoAlpha: 0
		}, {
			autoAlpha: 1,
			duration: .5,
			delay: .5
		});

	});

	return (
		<>
			<section className="page-text container">
				<h1 className="title">Hire Me</h1>
				<ul className="breadcrumbs">
					<li><Link to="/">Home</Link></li>
					<li>Hire Me</li>
				</ul>
				<div className="page-text-content paper">
					<h3 style={{ marginBottom: '1rem' }}>Information</h3>
					<p>Are you looking for a developer? Download my CV or checkout the <Link to="/about">About Me</Link> page for more about myself.</p>
					<p>I've proven my qualifications as a developer through collaborative projects in which I worked with other software engineers. The spectrum of my work so far goes from database management, designing drafts and prototyping, teaching basic web design in schools and developing API interfaces from scratch.</p>
					<p>I'm ready to move to a different place, because I've been planning to do that anyways. I was eyeing Darmstadt as the new place to be, but that's mostly up to my employer.</p>
					<p>Do you have any questions or would you like to call? I am motivated to introduce myself again in person so we can get to know each other better.</p>
					<p><img src={pdfIcon} alt="Download File" /><a href="/lebenslauf.pdf">Download CV</a></p>
					<p><img src={rightArrowIcon} alt="Visit Page" /><Link to="/about">About Me</Link></p>
				</div>
				<div className="page-text-content paper resume">
					<Document file={{ url: '/lebenslauf.pdf' }}>
						<Page pageNumber={1} scale={1.475} />
					</Document>
				</div>
			</section>
		</>
	);

};

export default Hire;
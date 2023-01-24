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
					<p>Are you looking for a developer? Please feel free to review my CV or visit the <Link to="/about">About Me</Link> page to learn more about my background and qualifications.</p>
					<p>I've demonstrated my proficiency as a developer through various collaborative projects with other software engineers. My experience ranges from database management, designing design drafts and prototyping, to teaching basic web design in schools, and developing API interfaces from scratch.</p>
					<p>I'm open to relocating and had planned to do so in the near future. While Darmstadt, Mannheim and Frankfurt am Main are part of particular interest to me, the location is ultimately dependent on the employer.</p>
					<p>If you have any further questions or would like to schedule a call, I'm more than happy to introduce myself further and discuss any potential opportunities.</p>
					<p><img src={pdfIcon} alt="Download File" /><a href="https://backend.felixhebgen.de/wp-content/uploads/2023/01/Lebenslauf-Felix-Hebgen.pdf">Download CV</a></p>
					<p><img src={rightArrowIcon} alt="Visit Page" /><Link to="/about">About Me</Link></p>
				</div>
				<div className="page-text-content paper resume">
					<Document file={{ url: 'lebenslauf.pdf' }}>
						<Page pageNumber={1} scale={1.475} />
						<Page pageNumber={2} scale={1.475} />
						<Page pageNumber={3} scale={1.475} />
					</Document>
				</div>
			</section>
		</>
	);

};

export default Hire;
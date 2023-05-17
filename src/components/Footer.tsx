import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import gsap from 'gsap';

const Footer = () => {

	const thisYear = new Date().getFullYear();
	const location = useLocation();
	const [ pastLocation, setPastLocation ] = useState('');

	const navigate = useNavigate();

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		const href = (e.target as HTMLAnchorElement).getAttribute('href') as string;

		if(href.startsWith('https://')) {
			window.open(href, '_blank')!.focus();
		} else {
			navigate(href);
		}
	};

	useEffect(() => {
		if(location.pathname === pastLocation) return;
		setPastLocation(location.pathname);

		gsap.fromTo('footer', {
			autoAlpha: 0
		}, {
			autoAlpha: 1,
			delay: .1,
			duration: .5
		})
	}, [location, pastLocation]);

	return (
		<footer className="container">
			<div className="right">
				<ul>
					<li><a href="/future" className="small" onClick={handleClick}>Our Future</a></li>
					<li><a href="https://backend.felixhebgen.de/feed" className="small" onClick={handleClick}>RSS Feed</a></li>
					<li><a href="https://www.felixhebgen.de/sitemap.xml" className="small" onClick={handleClick}>Sitemap</a></li>
					<li><a href="/hire" className="small" onClick={handleClick}>Contact</a></li>
					<li><a href="/privacy-policy" className="small" onClick={handleClick}>Privacy Policy</a></li>
					<li><a href="/imprint" className="small" onClick={handleClick}>Imprint</a></li>
				</ul>
			</div>
			<div className="left">
				<div className="copyright">
					Copyright &copy; 2012 — {thisYear} Felix Hebgen. All Rights Reserved.<br />
					Built with React & WordPress. Made in Germany. 🌳🌲
				</div>
			</div>
		</footer>
	);

};

export default Footer;
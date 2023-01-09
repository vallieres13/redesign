import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import gsap from 'gsap';

const Footer = () => {

	const location = useLocation();
	const [ pastLocation, setPastLocation ] = useState('');

	const navigate = useNavigate();

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		const href = (e.target as HTMLAnchorElement).getAttribute('href') as string;

		if(href.startsWith('https://') || href.startsWith('http://')) {
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
			<div className="left">
				<div className="copyright">
					Copyright &copy; 2012 — 2022 Felix Hebgen. All Rights Reserved.<br />
					Made in Höchst im Odenwald, Hessen, Germany. 🌳🌲
				</div>
			</div>
			<div className="right">
				<ul>
					<li><a href="/future" onClick={handleClick}>Our Future</a></li>
					<li><a href="http://backend.cynthia.sec.aqui.vscx.eu/feed/" onClick={handleClick}>RSS Feed</a></li>
					<li><a href="http://localhost:3000/sitemap.xml" onClick={handleClick}>Sitemap</a></li>
					<li><a href="/hire" onClick={handleClick}>Contact</a></li>
					<li><a href="/privacy-policy" onClick={handleClick}>Privacy Policy</a></li>
					<li><a href="/imprint" onClick={handleClick}>Imprint</a></li>
				</ul>
			</div>
		</footer>
	);

};

export default Footer;
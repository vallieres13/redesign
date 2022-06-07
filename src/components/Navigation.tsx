import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import gsap from 'gsap';
// import { debounce } from 'debounce';

const Navigation = () => {

	const { pathname } = useLocation();

	const [ navigating, setNavigating ] = useState(false);

	const clickedItem = (e: React.MouseEvent) => {
		/*
		const body = document.querySelector('body');
		body!.style.backgroundColor = '#006464';
		*/
		if(navigating) return;
		setNavigating(true);

		const anchor = (e.target as HTMLLIElement).querySelector('a');

		gsap.to(anchor, {
			autoAlpha: 0,
			repeat: 2,
			yoyo: true,
			duration: .1
		});
		gsap.to(anchor, {
			autoAlpha: 1,
			duration: .1,
			delay: .3
		});

	};


	// const [ isHovered, setIsHovered ] = useState(false);

	// const debouncedHandleMouseEnter = debounce(() => setIsHovered(true), 350);

	const hoverItem = () => {
		const content = document.querySelector('.content');

		console.log('Mouse entered');

		gsap.to(content, {
			autoAlpha: .6,
			duration: .3
		});

		gsap.to('body', {
			backgroundImage: 'linear-gradient(90deg, rgba(142,0,170,1) 0%, rgba(189,0,127,1) 60%)'
		});
	};

	/*
	useEffect(() => {
		if(!isHovered) return;
		gsap.to('body', {
			backgroundImage: 'linear-gradient(90deg, rgba(142,0,170,1) 0%, rgba(189,0,127,1) 60%)',
			duration: .3
		});
	}, [isHovered]);
	*/

	const unhoverItem = () => {
		const content = document.querySelector('.content');

		// setIsHovered(false);
		// debouncedHandleMouseEnter.clear();

		gsap.to(content, {
			autoAlpha: 1,
			duration: .3
		});

		gsap.to('body', {
			backgroundImage: 'linear-gradient(90deg, rgba(0,57,100,1) 0%, rgba(0,100,100,1) 68%)'
		});
	};

	return (
		<div className="nav">
			<ul>
				<li onMouseOver={hoverItem} onMouseLeave={unhoverItem} onClick={clickedItem}><NavLink to="/Portfolio" className={([ '/' ].some(url => pathname.startsWith(url)) ? 'active' : '')} data-hover="Portfolio"><span>Portfolio</span></NavLink></li>
				<li><NavLink to="/About" className={({ isActive }) => (isActive ? 'active' : '')} data-hover="Über mich"><span>Über mich</span></NavLink></li>
				<li><NavLink to="/stories" className={({ isActive }) => (isActive ? 'active' : '')} data-hover="Stories"><span>Stories</span></NavLink></li>
				<li><NavLink to="/Contact" className={({ isActive }) => (isActive ? 'active' : '')} data-hover="Kontakt"><span>Kontakt</span></NavLink></li>
			</ul>
		</div>
	);

};

export default Navigation;
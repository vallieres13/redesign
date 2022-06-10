import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import gsap from 'gsap';

const Navigation = () => {

	const [ navigating, setNavigating ] = useState(false);

	const clickedItem = (e: React.MouseEvent) => {
		e.preventDefault();

		if(navigating) return;
		setNavigating(true);

		gsap.to('.cursor__ball--big',  {
			scale: 0,
			duration: .08
		});

		gsap.to('.cursor__ball--small',  {
			opacity: 0,
			duration: .08
		});

		gsap.to(e.target, {
			autoAlpha: 0,
			repeat: 2,
			yoyo: true,
			duration: .1
		});
		gsap.to(e.target, {
			autoAlpha: 1,
			duration: .1,
			delay: .3
		});

	};


	const [ rememberBackground, setRememberBackground ] = useState('');

	const hoverItem = (e: React.MouseEvent) => {
		const content = document.querySelector('.main');

		setRememberBackground(document.body.style.backgroundImage);

		gsap.to(content, {
			autoAlpha: .5,
			ease: 'power2',
			duration: .3
		});

		gsap.to('body', {
			backgroundImage: (e.target as HTMLAnchorElement).getAttribute('data-colour') as string,
			duration: .3
		});
	};


	const unhoverItem = () => {
		const content = document.querySelector('.main');

		if(navigating) {
			setNavigating(false);
			return;
		}

		gsap.to(content, {
			autoAlpha: 1,
			ease: 'power2',
			duration: .3
		});

		gsap.to('body', {
			backgroundImage: (rememberBackground === '' ? 'linear-gradient(90deg, black 0%, black 100%)' : rememberBackground),
			duration: .3
		});
	};

	const items = [
		{
			title: 'Projects',
			url: 'projects',
			colour: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(80,80,80,1) 100%)'
		},
		{
			title: 'Stories',
			url: 'stories',
			colour: 'linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)'
		},
		{
			title: 'About',
			url: 'about',
			colour: 'linear-gradient(90deg, black 0%, black 100%)'
		},
		{
			title: 'Hire me',
			url: 'hire',
			colour: 'linear-gradient(90deg, #4be8c1 0%, #4be8c1 100%)'
		},
	];

	return (
		<div className="nav">
			<ul>
				{items.map((items, index) => {
					return (
						<li onMouseOver={hoverItem} onMouseLeave={unhoverItem} onClick={clickedItem} key={index}>
							<NavLink to={'/' + items.url} className={({ isActive }) => (isActive ? 'active' : '')} data-colour={items.colour} data-hover={items.title}>
								<span>{items.title}</span>
							</NavLink>
						</li>
					);
				})}
			</ul>
		</div>
	);

};

export default Navigation;
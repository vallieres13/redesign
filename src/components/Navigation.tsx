import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import gsap from 'gsap';

const Navigation = () => {

	const [ navigating, setNavigating ] = useState(false);

	const clickedItem = (e: React.MouseEvent) => {
		e.preventDefault();

		if(navigating) return;
		setNavigating(true);

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
		const footer = document.querySelector('footer');

		setRememberBackground(document.body.style.backgroundImage);

		gsap.to(content, {
			autoAlpha: .5,
			ease: 'power2',
			duration: .3
		});

		gsap.to(footer, {
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
		const footer = document.querySelector('footer');

		if(navigating) {
			setNavigating(false);
		}

		gsap.to(content, {
			autoAlpha: 1,
			ease: 'power2',
			duration: .3
		});

		gsap.to(footer, {
			autoAlpha: 1,
			ease: 'power2',
			duration: .3
		});

		gsap.to('body', {
			backgroundImage: (rememberBackground === '' ? 'none' : rememberBackground),
			duration: .3
		});
	};

	const items = [
		{
			title: 'Design Labs',
			url: 'labs',
			colour: 'none'
		},
		{
			title: 'Stories',
			url: 'stories',
			colour: 'none'
		},
		{
			title: 'About',
			url: 'about',
			colour: 'none'
		},
		{
			title: 'Hire me',
			url: 'hire',
			colour: 'none'
		},
	];

	return (
		<>
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
		</>
	);

};

export default Navigation;
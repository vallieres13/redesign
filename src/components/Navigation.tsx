import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import gsap from 'gsap';

const Navigation = () => {

	const [ navigating, setNavigating ] = useState(false);

	const clickedItem = (e: React.MouseEvent) => {
		e.preventDefault();

		if(navigating) return;
		setNavigating(true);

		(e.target as HTMLElement).classList.add('active');

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

	const clickedMobileItem = (e: React.MouseEvent) => {
		clickedItem(e);

		setTimeout(() => {
			handleClickHamburger();
			setNavigating(false);
		}, 400);
	};

	const hoverItem = () => {
		if(navigating) return;

		const content = document.querySelector('.main');
		const footer = document.querySelector('footer');

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
	};

	const items = [
		{
			title: 'AI Canvas',
			url: 'labs',
			colour: 'none'
		},
		{
			title: 'Stories',
			url: 'stories',
			colour: 'none'
		},
		{
			title: 'About Me',
			url: 'about',
			colour: 'none'
		},
		{
			title: 'Hire Me',
			url: 'hire',
			colour: 'none'
		}
	];


	const handleClickHamburger = () => {
		const hamburger = document.querySelector('.hamburger') as HTMLDivElement;
		const isMenuOpen = (hamburger.className.includes('active'));

		hamburger.classList.toggle('active');

		if (isMenuOpen) {
			closeMobileNav();
		} else {
			openMobileNav();
		}
	};

	const openMobileNav = () => {
		const mobileNav = document.querySelector('.mobile-nav') as HTMLDivElement;
		const mobileNavLinks = mobileNav.querySelectorAll(':scope > ul > li') as NodeListOf<HTMLLIElement>;

		/* Open Menu */
		gsap.fromTo(mobileNav, {
			x: 475
		}, {
			x: 0,
			duration: .4,
			ease: "power4"
		});

		gsap.fromTo(mobileNavLinks, {
			x: 475
		}, {
			x: 0,
			duration: .5,
			delay: .05,
			ease: "power3",
			stagger: .025
		});
	};

	const closeMobileNav = () => {
		const mobileNav = document.querySelector('.mobile-nav') as HTMLDivElement;
		const mobileNavLinks = mobileNav.querySelectorAll(':scope > ul > li') as NodeListOf<HTMLLIElement>;

		/* Close Menu */
		gsap.fromTo(mobileNav, {
			x: 0
		}, {
			x: 475,
			duration: .4,
			ease: "power4"
		});

		gsap.fromTo(mobileNavLinks, {
			x: 0
		}, {
			x: 475,
			duration: .3,
			ease: "power3",
			stagger: .025
		});
	};

	return (
		<>
			<div className="nav">
				<ul>
					{items.map((items, index) => {
						return (
							<li onMouseOver={hoverItem} onMouseLeave={unhoverItem} onClick={clickedItem} key={index}>
								<NavLink to={'/' + items.url} className={({ isActive }) => (isActive ? 'active' : '')} data-colour={items.colour} data-hover={items.title}>
									<span>{items.title}</span>{items.url === 'hire' ? <sup>Looking!</sup> : <></>}
								</NavLink>
							</li>
						);
					})}
				</ul>
				<div className="hamburger" onClick={handleClickHamburger}>
					<div>
						<span></span>
						<span></span>
					</div>
				</div>
			</div>
			<div className="mobile-nav">
				<ul>
					{items.map((items, index) => {
						return (
							<li onClick={clickedMobileItem} key={index}>
								<NavLink to={'/' + items.url} className={({ isActive }) => (isActive ? 'active' : '')} data-colour={items.colour} data-hover={items.title}>
									<span>{items.title}</span>{items.url === 'hire' ? <sup>Looking!</sup> : <></>}
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
import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import Cursor from '../Cursor';


const Content = (props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {


	const bigBall = document.querySelector('.cursor__ball--big') as HTMLDivElement;
	const smallBall = document.querySelector('.cursor__ball--small') as HTMLDivElement;


	// Listeners
	document.body.addEventListener('mousemove', onMouseMove);

	let cursorInit = false;

	// Move the cursor
	function onMouseMove(e: MouseEvent) {
		let move = .35;

		if(!cursorInit) {
			cursorInit = true;
			// console.log('First time moving cursor.');
			move = 0.1;
		}

		let _epX = e.pageX + 24;
		let _epY = e.pageY - 14;

		gsap.to('.cursor__ball--big',  {
			x: _epX,
			y: _epY,
			duration: move,
			delay: .03,
			ease: 'sine'
		});

		let epX = e.pageX + 35;
		let epY = e.pageY - 7;

		gsap.to('.cursor__ball--small', {
			x: epX,
			y: epY,
			duration: .1
		});
	}


	const location = useLocation();
	const [ pastLocation, setPastLocation ] = useState('');

	useEffect(() => {
		if(location.pathname === pastLocation) return;

		setPastLocation(location.pathname);
		window.scrollTo({ top: 0, behavior: 'smooth' });
		animate();

		console.log('Page switch');

		initHoverableAnimation(false);

		// eslint-disable-next-line
	}, [location]);


	const initHoverableAnimation = (all: boolean = false) => {

		let hoverables: NodeListOf<HTMLAnchorElement>;

		if(all) {
			hoverables = document.querySelectorAll('a');
		} else {
			hoverables = document.querySelectorAll('.content a');
		}


		console.log('Called');
		console.log(all);
		for(let i = 0; i < hoverables.length; i++) {
			hoverables[i].removeEventListener('mouseenter', onMouseHover);
			hoverables[i].removeEventListener('mouseleave', onMouseHoverOut);

			hoverables[i].addEventListener('mouseenter', onMouseHover);
			hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
		}

		// Hover an element
		function onMouseHover() {
			// console.log('Hovering');
			if(!bigBall) return;
			if(!smallBall) return;

			gsap.to(bigBall, {
				scale: 4,
				duration: .4,
				ease: 'sine',
				opacity: 1
			});
			gsap.to(smallBall, {
				opacity: .5
			});
		}
		function onMouseHoverOut() {
			if(!bigBall) return;
			if(!smallBall) return;

			gsap.to(bigBall, {
				scale: 1,
				duration: .3,
				ease: 'sine',
				opacity: .1
			});
			gsap.to(smallBall, {
				opacity: 1
			});
		}
	}

	useEffect(() => {
		initHoverableAnimation(true);
	});


	const animate = () => {
		const content = document.querySelector('.content') as HTMLDivElement;

		gsap.fromTo(content, {
			autoAlpha: 0
		}, {
			autoAlpha: 1,
			duration: .5
		})

		setTimeout(() => {
			content.style.mixBlendMode = 'difference';
		}, 750);
	};

	return (
		<div className="container content">
			<Cursor />
			{props.children}
		</div>
	);
};

export default Content;
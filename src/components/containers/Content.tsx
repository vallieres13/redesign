import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const Content = (props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {

	const location = useLocation();
	const [ pastLocation, setPastLocation ] = useState('');

	useEffect(() => {
		if(location.pathname === pastLocation) return;

		setPastLocation(location.pathname);

		// window.scrollTo({ top: 0, behavior: 'smooth' });
		gsap.to(window, {
			scrollTo: 0,
			duration: .75,
			ease: 'power4'
		});

		animate();

	}, [location, pastLocation]);


	/* Page Switch animation */
	const animate = () => {
		const content = document.querySelector('.main') as HTMLDivElement;

		gsap.fromTo(content, {
			autoAlpha: 0
		}, {
			autoAlpha: 1,
			duration: .5
		});
	};

	return (
		<div className="content">
			<div className="main">
				{props.children}
			</div>
		</div>
	);
};

export default Content;
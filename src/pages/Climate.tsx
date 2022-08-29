import React from 'react';
import gsap from "gsap";

/* Components */
import Card from '../components/containers/Card';

/* Static */
import SeedlingImage from '../static/images/future/giraffe.png';
import KoalaImage from '../static/images/future/koala.png';
import Windmillimage from '../static/images/future/windmill.png';

/* Logos */
import WWFLogo from '../static/images/logos/climate/wwf.png';
import TreesLogo from '../static/images/logos/climate/trees.png';


const Climate = () => {

	/* Change Background colour */
	gsap.to('body', {
		backgroundImage: 'linear-gradient(rgb(32, 48, 37) 0%, rgb(21, 21, 22) 100%)'
	});

	return (
		<>
			<section className="climate container">
				<section className="heading">
					<h1>We care about our future.</h1>
					<div className="logos">
						<img src={TreesLogo} alt="Trees for the Future" />
						<img src={WWFLogo} alt="WWF Germany" />
					</div>
				</section>
				<section className="dashboard grid">
					<Card>
						<h2>We plant <span>trees</span>.</h2>
						<p>
							Together with <a href="https://trees.org/" target="_blank">Trees for the Future</a>, we donate to charity depending on how many page views we receive in a month.<br />
							<small>** 5,000 page views equal 1 tree. You make it happen.<br />The amount of trees donated is capped at 25 a month.</small>
						</p>
						<img src={SeedlingImage} alt="Seedling" id="cover_future" />
					</Card>
					<Card gradient="linear-gradient(#2F2F2F 0%, #222222 100%)">
						<h2 style={{ fontSize: '55pt', lineHeight: '65pt', marginRight: '-20px' }}>Ad-revenue for <span>charity</span>.</h2>
						<p>
							As a recurring donator to the non-profit organisation <a href="https://www.wwf.de/" target="_blank">WWF</a>, I continue to aim towards an ongoing contribution to the preseveration of our precious nature.<br />
							<small>** Complementary advertisements will be placed carefully, no pop-ups, placements or promoted inline links.</small>
						</p>
						<img src={KoalaImage} alt="Koala" id="cover_charity" />
					</Card>
					<Card gradient="linear-gradient(#2F2F2F 0%, #222222 100%)">
						<h2>CO2 🌿<br /><span>Neutral</span>.</h2>
						<p>
							This website is run entirely on renewable energy and supports the vision of a green future for everyone.<br />
							<small>** The Oracle Cloud Infrastructure has aimed to achieve full climate neutrality by 2025.</small>
						</p>
						<img src={Windmillimage} alt="Windmills" id="cover_windmill" />
					</Card>
				</section>
			</section>
		</>
	);

};

export default Climate;
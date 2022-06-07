import React from 'react';

/* Images */
import Wavy from '../static/images/wavy-true.svg';

const Index = () => {

	return (
		<React.Fragment>
			<section className="promo">
				{/*
				<div className="decor" />
				<div className="decor2" />
				*/}
				<h1>Web Design<br /><span>von heute</span></h1>
				<img src={Wavy} alt="" />
			</section>
			<section className="articles">
				<h2>mehr lesen</h2>
				<div className="grid">
					<div className="article">

					</div>
				</div>
			</section>
		</React.Fragment>
	);

};

export default Index;
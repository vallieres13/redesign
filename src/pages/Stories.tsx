import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { CSSPlugin } from 'gsap/CSSPlugin';

/* Components */
import Card from "../components/containers/Card";
import Button from "../components/forms/Button";
import Preloader from "../components/Preloader";

/* Services */
import Request from "../services/Request";

/* gsap Register */
gsap.registerPlugin(CustomEase);
gsap.registerPlugin(CSSPlugin);

const Stories = () => {

	const animate = () => {

		/* Change Background colour */
		gsap.to('body', {
			backgroundImage: 'none'
		});

		/* Heading Horizontal Line */
		let hr = document.querySelector('.header hr') as HTMLHRElement;
		gsap.fromTo(hr, {
			opacity: 0,
			xPercent: -150
		}, {
			opacity: 1,
			xPercent: 0,
			duration: 2.5,
			delay: 0,
			ease: 'expo'
		});

		/* Heading Title */
		let heading = document.querySelector('.header h1') as HTMLHeadingElement;
		heading.innerHTML = heading.textContent!.replace(/\S/g, '<span class="letter">$&</span>');
		let nameLetters = heading.querySelectorAll(':scope .letter');

		gsap.fromTo(nameLetters, {
			opacity: 0,
			xPercent: 40
		}, {
			opacity: 1,
			xPercent: 0,
			duration: .2,
			stagger: .025,
			ease: 'power1',
			delay: .25
		});

		/* Dashboard Cards */
		let dashboard = document.querySelector('.dashboard') as HTMLHeadingElement;
		const cards = dashboard.querySelectorAll(':scope > .card, .separator');

		gsap.fromTo(cards, {
			y: 25,
			autoAlpha: 0
		}, {
			y: 0,
			autoAlpha: 1,
			duration: .25,
			stagger: .1,
			ease: 'power4',
			delay: .45,
			clearProps: 'all'
		});

	};

	const [ endpointCalled, setEndpointCalled ] = useState(false);
	const [ posts, setPosts ] = useState({} as any);
	let tags = [] as any;
	let medias = [] as any;

	const [ tagNames, setTagNames ] = useState([] as any);
	const [ featuredMedia, setFeaturedMedia ] = useState([] as any);

	const loadPosts = async () => {
		await Request.get('/posts?per_page=5')
			.then(response => response.json())
			.then(async (data) => {
				setPosts(data);

				data.forEach((post: any) => {
					const postTags = post.tags;
					tags.push(...postTags);

					const postFeaturedMedias = post.featured_media;
					medias.push(postFeaturedMedias);
				});

				let tagString = tags.map((tag: number) => { return tag; });
				tagString.slice(0, -1);

				await Request.get('/tags?include=' + tagString + '&per_page=25')
					.then(response => response.json())
					.then(data => {
						data.forEach((tagData: any) => {
							let tagNamesInner = tagNames;
							tagNamesInner[tagData.id] = tagData.name;
							setTagNames(tagNamesInner);
						});
					});


				let mediaString = medias.map((media: number) => { return media; });
				mediaString.slice(0, -1);

				await Request.get('/media?include=' + mediaString)
					.then(response => response.json())
					.then(data => {
						data.forEach((mediaData: any) => {
							let featuredMediaInner = featuredMedia;
							featuredMediaInner[mediaData.id] = mediaData.source_url;
							setFeaturedMedia(featuredMediaInner);
						});
					});

			});
	};

	useEffect(() => {

		/* Document Title */
		document.title = 'Loading …';

		setEndpointCalled(false);
		loadPosts().then(() => {

			/* Document Title */
			document.title = 'Stories' + process.env.REACT_APP_TITLE;

			setEndpointCalled(true);

			/* setTimeout required because the component will otherwise not render */
			setTimeout(() => {
				animate();
			}, 0);
		});
	}, []);

	const excerpt = (content: string, length: number = 440) => {
		let excerpt: string;
		excerpt = content.substr(0, length) + '…';
		excerpt = excerpt.replace(/&#8217;/gi, '\'');
		return excerpt;
	}

	const getMonthName = (month: number) => {
		const date = new Date();
		date.setMonth(month - 1);
		return date.toLocaleString('en-GB', { month: 'long' });
	}

	const formatDate = (date: string) => {
		let newDate = new Date(date);
		return newDate.getDate() + '. ' + getMonthName(newDate.getMonth()) + ' ' + newDate.getFullYear();
	}

	const sequence = [ 2, 1, 1, 2 ];

	return (
		<>
			{
				endpointCalled ?
					<>
						<section className="stories container">
							<section className="header">
								<h1>Stories</h1>
								<hr />
								<ul className="breadcrumbs">
									<li><Link to="/" className="small">Home</Link></li>
									<li>Stories</li>
								</ul>
							</section>
							<section className="dashboard grid" style={{ marginTop: '-50px' }}>
								<Card className="grid article article-big span-3" go={"/article/" + posts[0].id + '-' + posts[0].slug}>
									<div className="thumbnail span-2" style={{ backgroundImage: 'url(' + featuredMedia[posts[0].featured_media] + ')' }}></div>
									<div className="span-1">
										<h3 dangerouslySetInnerHTML={{ __html: posts[0].title.rendered }}></h3>
										<div className="details">
											<ul className="tags">
												{
													posts[0].tags.map((tag: number, index: number) => {
														return (
															<li key={index}>{tagNames[tag]}</li>
														);
													})
												}
											</ul>
										</div>
										<p className="cutoff">
											<span dangerouslySetInnerHTML={{ __html: excerpt(posts[0].content.rendered) }}></span>
											<Button>Read more</Button>
										</p>
									</div>
								</Card>
								<div className="separator span-3">
									<span>⮝&nbsp; Promoted Article&nbsp;</span>
								</div>
								{

									posts.map((post: any, index: number) => {
										if(post.id === posts[0].id) return false;
										const span = sequence[--index];

										return (
											<Card className={"article span-" + span} go={"/article/" + post.id + '-' + post.slug} key={index}>
												<div className="thumbnail" style={{ backgroundImage: 'url(' + featuredMedia[post.featured_media] + ')' }}></div>
												<div>
													<div className="details">
														<ul className="tags">
															{
																post.tags.map((tag: number, index: number) => {
																	return (
																		<li key={index}>{tagNames[tag]}</li>
																	);
																})
															}
														</ul>
													</div>
													<h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h3>
													<div className="timestamp">
														<p>{formatDate(post.date)}</p>
													</div>
												</div>
											</Card>
										);
									})
								}
							</section>
						</section>
					</>
				:
					<Preloader />
			}
		</>
	);

};

export default Stories;
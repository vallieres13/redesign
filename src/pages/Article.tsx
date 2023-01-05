import React, {useEffect, useState} from 'react';
import gsap from 'gsap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

/* Components */
import Card from '../components/containers/Card';
import Preloader from '../components/Preloader';

/* Article */
import ArrowRight from '../static/images/icons/arrow-right.png';
import Author from '../static/images/authors/author.png';

/* Services */
import Request from "../services/Request";

/* GSAP Register */
gsap.registerPlugin(ScrollToPlugin);

const Article = () => {

	const location = useLocation();

	const navigate = useNavigate();
	const params = useParams();
	const root = document.querySelector(':root') as HTMLElement;

	const articleId = (params.id as string).split('-')[0];

	const animate = () => {

		/* Change Background colour */
		gsap.to('body', {
			backgroundImage: 'none'
		});

		/* Heading Title */
		let heading = document.querySelector('.header h1') as HTMLHeadingElement;
		heading.innerHTML = heading.textContent!.replace(/\S+/g, '<span class="word">$&</span>');

		const words = document.querySelectorAll('.word');

		gsap.fromTo(words, {
			y: 50,
			autoAlpha: 0
		}, {
			y: 0,
			autoAlpha: 1,
			duration: .3,
			stagger: .1
		});

		/* Fade in phantom text top and bottom */
		setTimeout(() => {
			let opacity = 10;
			for(let i = 0; i < opacity; i++) {
				setTimeout(() => {
					root.style.setProperty('--opacityArticleTitle', '' + (i / 10));
				}, i * 50);
			}
		}, 150);


		/* Animate Article Image */
		const image = document.querySelector('.header .image');

		gsap.fromTo(image, {
			y: 40,
			autoAlpha: 0
		}, {
			y: 0,
			autoAlpha: 1,
			duration: .25
		});


		/* Animate Author Badge */
		const author = document.querySelector('.header .author') as HTMLDivElement;

		gsap.fromTo(author, {
			y: 10,
			autoAlpha: 0
		}, {
			y: 0,
			autoAlpha: 1,
			duration: .25,
			delay: .6
		});


		/* Hover effect for article image */
		const articleImage = document.querySelector('.story .header .image') as HTMLDivElement;
		articleImage.addEventListener('mouseover', () => {
			glowPhantomText();
		});
		articleImage.addEventListener('mouseleave', () => {
			unglowPhantomText();
		});

		/* Link author badge to about page */
		author.addEventListener('click', () => {
			gsap.to(window, {
				scrollTo: {
					y: '#article-meta',
					offsetY: 250
				},
				duration: .75,
				ease: 'power4'
			});
		});

		/* Link author badge to about page */
		const author_card = document.querySelector('.author-card') as HTMLDivElement;
		author_card.addEventListener('click', () => {
			gsap.to(window, {
				scrollTo: 0,
				duration: .75,
				ease: 'power4'
			});

			navigate('/about');
		});


	};

	const glowPhantomText = () => {
		gsap.to('.story .header .phantom', {
			textShadow: '0 0 2px #333333, 0 0 2px #333333, 0 0 2px #333333, 0 0 2px #333333'
		});
	};

	const unglowPhantomText = () => {
		gsap.to('.story .header .phantom', {
			textShadow: '0 0 2px #181818, 0 0 2px #181818, 0 0 2px #181818, 0 0 2px #181818'
		});
	};

	const [ endpointCalled, setEndpointCalled ] = useState(false);
	const [ post, setPost ] = useState({} as any);
	const [ postImage, setPostImage ] = useState('');

	const [ posts, setPosts ] = useState({} as any);
	let tags = [] as any;
	let medias = [] as any;

	const [ tagNames, setTagNames ] = useState([] as any);
	const [ featuredMedia, setFeaturedMedia ] = useState([] as any);

	const loadPosts = async () => {
		await Request.get('/posts?per_page=3')
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

				await Request.get('/tags?include=' + tagString)
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

	const loadPost = async () => {
		await Request.get('/posts/' + articleId)
			.then(response => response.json())
			.then(async (data) => {
				setPost(data);

				/* Document Title Update */
				document.title = data.title.rendered.replace(/&#8217;/ig, '\'') + process.env.REACT_APP_TITLE;

				await Request.get('/media/' + data.featured_media)
					.then(response => response.json())
					.then((data) => {
						setPostImage(data.source_url);
					});

				await loadPosts().then(() => { });
			});
	};

	useEffect(() => {

		/* Document Title Init */
		document.title = 'Loading …' + process.env.REACT_APP_TITLE;

		setEndpointCalled(false);
		loadPost().then(() => {
			setEndpointCalled(true);

			/* setTimeout required because the component will otherwise not render */
			setTimeout(() => {
				animate();
			}, 0);
		});
	}, [location]);

	const getMonthName = (month: number) => {
		const date = new Date();
		date.setMonth(month - 1);
		return date.toLocaleString('en-GB', { month: 'long' });
	}

	const formatDate = (date: string) => {
		let newDate = new Date(date);
		return newDate.getDate() + '. ' + getMonthName(newDate.getMonth()) + ' ' + newDate.getFullYear();
	}

	return (
		<>
			{
				endpointCalled ?
					<>
						<section className="story container">
							<section className="header">
								<span className="phantom" dangerouslySetInnerHTML={{ __html: post.title.rendered }}></span>
								<h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h1>
								<div className="author">
									<img src={Author} alt="Author" />
									<p>
										Felix Hebgen<br />
										<small className="details">is the author <img src={ArrowRight} alt="Arrow Right" /></small>
									</p>
								</div>
								<span className="phantom" dangerouslySetInnerHTML={{ __html: post.title.rendered }}></span>
								<img className="image" src={postImage} alt="Article Thumbnail" />
							</section>
							<section className="article-content" dangerouslySetInnerHTML={{ __html: post.content.rendered }}></section>
							<section className="meta" id="article-meta">
								<div className="author-card">
									<img src={Author} alt="Author" />
									<div className="details">
										<h3>Felix Hebgen</h3>
										<p>Article Author</p>
									</div>
								</div>
								<div className="date-card">
									<div className="details">
										<h3>{formatDate(post.date)}</h3>
										<p>Published</p>
									</div>
								</div>
								<div className="category-card">
									<div className="details">
										<h3>Technology</h3>
										<p>Category</p>
									</div>
								</div>
								<div className="views-card">
									<div className="details">
										<h3>1,252,374</h3>
										<p>Readers</p>
									</div>
								</div>
								<div className="readtime-card">
									<div className="details">
										<h3><span style={{ fontFamily: 'sans-serif' }}>~</span> 2 Min.</h3>
										<p>Read Time</p>
									</div>
								</div>
							</section>
							<div className="readmore">
								<h3>Read more</h3>
								<hr />
							</div>
						</section>
						<section className="stories container" style={{ margin: '7rem auto 4rem' }}>
							<section className="dashboard grid" style={{ marginTop: '-50px' }}>
								{
									posts.map((post: any, index: number) => {
										return (
											<Card className="article span-1" go={"/article/" + post.id + '-' + post.slug} key={index}>
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

export default Article;
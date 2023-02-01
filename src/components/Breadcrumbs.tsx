import React from 'react';
import { Link } from 'react-router-dom';

interface componentProps {
	current: string
}

const defaultProps: componentProps = {
	current: 'Sample'
}

const Breadcrumbs = (props: componentProps = defaultProps) => {

	return (
		<ul className="breadcrumbs">
			<li><Link to="/" className="small">Home</Link></li>
			<li>{props.current}</li>
		</ul>
	)

};

export default Breadcrumbs;
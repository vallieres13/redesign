import React from 'react';

const Cursor = () => {

	return (
		<div className="cursor">
			<div className="cursor__ball cursor__ball--big ">
				<svg height="30" width="30">
					<circle cx="15" cy="15" r="12" strokeWidth="0"/>
				</svg>
			</div>

			<div className="cursor__ball cursor__ball--small">
				<svg height="10" width="10">
					<circle cx="5" cy="5" r="4" strokeWidth="0"/>
				</svg>
			</div>
		</div>
	);

};

export default Cursor;
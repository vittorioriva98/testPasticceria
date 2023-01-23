import React from "react";

function Spacer({ width, height }) {
	return (
		<div
			style={{
				width: width,
				height: height,
			}}
		/>
	);
}

Spacer.defaultProps = {
	width: "0",
	height: "0",
};

export default Spacer;

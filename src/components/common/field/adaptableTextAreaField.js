import React, { useRef } from "react";
import "./field.css";

export const AdaptableTextAreaField = (props) => {
	return (
		<div
			className="adaptable-textarea-field"
			contentEditable={props.editable}
			aria-multiline="true"
			onChange={props.onChange}
		>
			{props.text}
		</div>
	);
};

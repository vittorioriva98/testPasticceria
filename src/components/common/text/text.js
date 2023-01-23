import { PropTypes } from "prop-types";
import React from "react";
import styled from "styled-components";
import { withTranslation } from "react-i18next";

const TextCustom = styled.label`
	font-family: "Roboto", sans-serif;
	margin: 0;
	font-weight: ${(props) =>
		props.weight == "bold" ? "700" : props.weight == "medium" ? "500" : "400"};

	&.xxlarge {
		font-size: 24px;
		color: ${(props) => (props.color ? props.color : "var(--black)")};
	}

	&.xlarge {
		font-size: 18px;
		color: ${(props) => (props.color ? props.color : "var(--black)")};
	}

	&.large {
		font-size: 16px;
		color: ${(props) => (props.color ? props.color : "var(--black)")};
	}

	&.medium {
		font-size: 16px;
		color: ${(props) => (props.color ? props.color : "var(--grey-2)")};
	}

	&.small {
		font-size: 14px;
		color: ${(props) => (props.color ? props.color : "var(--grey-2)")};
	}

	&.xsmall {
		font-size: 12px;
		color: ${(props) => (props.color ? props.color : "var(--darkgrey)")};
	}

	&.xxsmall {
		font-size: 10px;
		color: ${(props) => (props.color ? props.color : "var(--darkgrey)")};
	}

	& > .cursor-pointer {
		cursor: pointer;
	}
`;

export const Text = withTranslation()((props) => {

	const { t } = props;

	const getTag = (size, weight) => {
		let tag = "";

		switch (size) {
			case "xxlarge":
				tag = "h2";
				break;
			case "xlarge":
				tag = "label";
				break;
			case "large":
				if (weight == "bold") {
					tag = "label";
				} else if (weight == "medium") {
					tag = "label";
				} else {
					tag = "p";
				}
				break;
			case "medium":
				if (weight == "bold") {
					tag = "label";
				} else if (weight == "medium") {
					tag = "label";
				} else {
					tag = "p";
				}
				break;
			case "small":
				tag = "span";
				break;
			case "xsmall":
				tag = "span";
				break;
		}

		return tag;
	};

	return (
		<TextCustom
            id={props.id}
			as={getTag(props.size, props.weight)}
			size={props.size}
			weight={props.weight}
			color={props.color}
			style={props.style}
			className={props.className + " " + props.size}
			onClick={props.onClick || undefined}
			title={props.title}
		>
			{typeof props.children == "string" ? props.children.lastIndexOf(":") < 0 ? t(props.children) : props.children : props.children}
		</TextCustom>
	);
});

Text.propTypes = {
	size: PropTypes.oneOf([
		"xxlarge",
		"xlarge",
		"large",
		"medium",
		"small",
		"xsmall",
		"xxsmall",
	]),
	weight: PropTypes.oneOf(["bold", "medium", "regular"]),
};

Text.defaultProps = {
	size: "medium",
	weight: "regular",
};

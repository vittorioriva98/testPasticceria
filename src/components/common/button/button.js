import React, { Fragment } from "react";
import { Button, Spinner } from "react-bootstrap";
import styled from "styled-components";
import {Loader} from "../../index";

const ButtonCustom = styled(Button)`
	& {
		display: flex;
		align-items: center;
		box-shadow: none !important;
		border: 2px solid;
		height: 40px !important;
		padding: ${(props) =>
			props.children && props.children.length > 1
				? "0px 18px 0px 18px"
				: "0px 32px 0px 32px"};
		border-radius: 6px;
		height: fit-content;
		line-height: 1 !important;
		${(props) => (props.centerchildren ? "justify-content: center;" : "")};
		transform: scale(1);
		transition: transform 300ms ease;
	}

	& > :not(svg):first-child {
		margin-left: 6px;
	}
	& > :not(svg):last-child {
		margin-right: 6px;
	}

	& > :not(svg):first-child:last-child {
		margin-left: 0px;
		margin-right: 0px;
	}

	& > * {
		transition: 0.2s;
	}

	& > svg {
		width: 24px;
		height: 24px;
		transition: 0.2s;
	}

	&:hover {
		transform: scale(1.02);
		transition: transform 300ms ease;
	}

	&.btn-primary {
		background-color: var(--pink);
		border-color: var(--pink);

		&:hover {
			background-color: var(--pink);
			border-color: var(--pink);
		}
		& > * {
			color: var(--white) !important;
		}
	}

	&.btn-outline-primary {
		background-color: transparent;
		border-color: var(--pink);
		color: var(--pink);

		&:hover {
			background-color: transparent;
			border-color: var(--pink);
			&,
			& > * {
				color: var(--pink) !important;
			}
		}
		& > * {
			color: var(--pink) !important;
		}
	}

	&.btn-secondary {
		background-color: var(--grey-2);
		border-color: var(--grey-2);

		&:hover {
			background-color: var(--darkgrey);
			border-color: var(--darkgrey);
		}
		& > * {
			color: var(--white) !important;
		}
	}

	&.btn-outline-secondary {
		background-color: transparent;
		border-color: var(--grey-2);
		color: var(--grey-2);

		&:hover {
			background-color: transparent;
			border-color: var(--darkgrey);
			&,
			& > * {
				color: var(--darkgrey) !important;
			}
		}
		& > * {
			color: var(--grey-2) !important;
		}
	}

	&.btn-outline-dark {
		background-color: transparent;
		border-color: var(--black);
		color: var(--black);

		&:hover {
			background-color: transparent;
			border-color: var(--darkgrey);
			&,
			& > * {
				color: var(--darkgrey) !important;
			}
		}
		& > * {
			color: var(--black) !important;
		}
	}

	&.btn-outline-darkgrey {
		background-color: transparent;
		border-color: var(--darkgrey);
		color: var(--darkgrey);

		&:hover {
			background-color: transparent;
			border-color: var(--black);
			&,
			& > * {
				color: var(--black) !important;
			}
		}
		& > * {
			color: var(--darkgrey) !important;
		}
	}

	&.btn-success {
		background-color: var(--green);
		border-color: var(--green);

		&:hover {
			background-color: var(--black);
			border-color: var(--black);
		}
		& > * {
			color: var(--white) !important;
		}
	}

	&.btn-warning {
	}

	&.btn-danger {
	}

	&.btn-info {
	}

	&.btn-dark {
		background-color: var(--black);
		border-color: var(--black);

		&:hover {
			background-color: black;
			border-color: black;
		}
		& > * {
			color: var(--white) !important;
		}
	}

	&.btn-light {
	}

	&.btn-link {
		border: none;
		color: var(--grey-2);
		text-decoration: none;
		padding-right: 0px;
		padding-left: 0px;

		&:hover {
			color: var(--black);
			text-decoration: underline;
			& > * {
				color: var(--black);
			}
		}
	}
`;

export const ButtonWrapper = (props) => {
	function onClickListener(e) {
		props.onClick();
	}

	return (
		<ButtonCustom
			className={props.className}
			variant={props.variant}
			type={props.type}
			value={props.value}
			href={props.href}
			size={props.size}
			active={props.active}
			disabled={props.disabled}
			centerchildren={props.centerchildren}
			onClick={(e) => {
				if (props.onClick) {
					props.onClick()
				}
			}}
			style={props.style}
		>
			{props.isLoading ? (
				<Fragment>
					<Loader
						size="sm"
					/>
				</Fragment>
			) : (
				props.children
			)}
		</ButtonCustom>
	);
};

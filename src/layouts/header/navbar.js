import { PropTypes } from "prop-types";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setToast, setUser } from "../../services/reducers";
import { withTranslation } from "react-i18next";
import { LogoHeader } from "../../assets";
import { LoginModal, Text, Toast } from "../../components";

const Container = styled.div`
	width: 100%;
	max-width: 100%;
	height: 70px;
	min-height: 70px;
	position: sticky;
	top: 0;
	z-index: 1000;

	background: var(--pink);

	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	padding-left: 24px;
	padding-right: 24px;

	border-bottom: 1px solid var(--grey-1);

	#logo {
		width: 60px;
		height: 60px;
	}
	#title {
		margin-left: 24px;
	}
	#login {
		cursor: pointer;
		&:hover {
			text-decoration: underline;
		}
	}
`;

export const Navbar = withTranslation()((props) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user || {})
	const toast = useSelector((state) => state.toast || {})
	
	const [showLoginModal, setShowLoginModal] = useState(false)

	const logout = () => {
		dispatch(setUser({}))
	}

	return (
		<Container
			className={props.className}
			showMenu={props.showMenu}
			isMenuOpen={props.isMenuOpen}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
				}}
			>
				<img
					alt="logo"
					id="logo"
					src={LogoHeader}
				/>
				<Text
					id="title"
					size="xxlarge"
					weight="bold"
					color="var(--white)"
				>
					{"navbar.title"}
				</Text>
			</div>
			<>
				<Text
					id="login"
					size="small"
					weight="bold"
					color="var(--white)"
					onClick={() => {
						user && user.email ?
						logout()
						:
						setShowLoginModal(true)
					}}
				>
					{user && user.email ? "navbar.logout" : "navbar.login"}
				</Text>
				<LoginModal
					show={showLoginModal}
					onCancel={() => {setShowLoginModal(false)}}
				/>
			</>
			<Toast
				show={toast.show}
				delay={toast.delay}
				autohide={toast.autohide}
				title={toast.title}
				description={toast.description}
				variant={toast.variant}
				onClose={() => {
					dispatch(
						setToast({
							show: false,
							title: "",
							description: "",
							variant: toast.variant,
						})
					)
				}}
			/>
		</Container>
	);
});

Navbar.propTypes = {
	showMenu: PropTypes.bool,
	isMenuOpen: PropTypes.bool,
};

Navbar.defaultProps = {
	showMenu: false,
	isMenuOpen: false,
};

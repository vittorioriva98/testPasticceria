import React, { useState, useEffect, useMemo } from "react"
import { useDispatch } from "react-redux"
import { Modal, Container } from "react-bootstrap"
import { Text, Button, TextField, Divider, Spacer, Toast } from "../index"
import { authentication } from "../../services/network"
import { setUser, setToast } from "../../services/reducers"

export const Login = (props) => {

	const dispatch = useDispatch();

	const [email, setEmail] = useState("");
  	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const isFormValid = useMemo(() => !(email != "" && password != ""), [email, password]);

	const executeAuthentication = () => {
		const data = {
			email,
			password
		}
		authentication(data, (result) => {
			if (result) {
				dispatch(setUser(result))
				if(props.onCancel) {
					props.onCancel()
				}
			} else {
				dispatch(setToast({
					show: true,
					title: "login.error_title",
					description: "login.error_description",
					variant: "danger"
				}))
			}
		})
	}

	return (
		<Modal
			show={props.show}
			onHide={props.onHide}
			onCancel={props.onCancel}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			dialogClassName="modal-footer-no-border-top modal-padding"
		>
			<Modal.Body>
				<Container>
					<Text size="xxlarge" weight="medium" color="var(--black)">
						{"login.title"}
					</Text>
					<Text color="var(--darkgrey)">
						{"login.description"}
					</Text>

					<Spacer width="100%" height="38px"/>

					<TextField
						id="email"
						required
						type="email"
						placeholder={"login.email_placeholder"}
						onChange={(id, value, isValid) => {
							if (isValid) {
							setEmail(value);
							} else {
							setEmail("");
							}
						}}
					/>

					<Spacer width="100%" height="16px"/>

					<TextField
						id="password"
						required
						type="password"
						placeholder={"login.password_placeholder"}
						onChange={(id, value, isValid) => {
							if (isValid) {
							setPassword(value);
							} else {
							setPassword("");
							}
						}}
					/>
					
					<Spacer width="100%" height="40px"/>
					<Divider/>
					<Spacer width="100%" height="40px"/>

					<Button
						variant="primary"
						onClick={executeAuthentication}
						isLoading={isLoading}
						disabled={isFormValid}
						centerchildren
						style={{
							width: "100%",
						}}
					>
						<Text
							size="small"
							weight="medium"
						>
							{"login.btn_submit"}
						</Text>
					</Button>
					<Spacer width="100%" height="12px"/>
					<Button
						variant="secondary"
						onClick={props.onCancel}
						centerchildren
						style={{
							width: "100%"
						}}
					>
						<Text size="small" weight="medium">
							{"btn_cancel"}
						</Text>
					</Button>
				</Container>
			</Modal.Body>
		</Modal>
	)

}
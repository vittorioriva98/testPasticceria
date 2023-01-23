import { PropTypes } from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";
import { isEmailValid, isPasswordValid } from "../../../services/utils";
import { Text } from "../../index";
import { withTranslation } from "react-i18next";
import { useDebounce } from "../../../services/utils";

const FormControlCustom = styled(Form.Control)`
	${(props) =>
		props.padding
			? "padding: " + props.padding + ";"
			: "6px 20px 6px 20px !important;"}
	height: 40px !important;

	${(props) => (props.color ? "color: " + props.color + ";" : "")}

	&,
	&.form-control[readonly],
	&:focus {
		background-color: ${(props) =>
			props.lightbackground ? "var(--white) !important" : "var(--grey-field)"};
		box-shadow: none !important;
		border-color: var(--grey-1);
		${(props) => (props.color ? "color: " + props.color + ";" : "")}
		${(props) => (props.noborder ? "border: none" : "")};
	}

	&::placeholder {
		/* Chrome, Firefox, Opera, Safari 10.1+ */
		color: var(--grey-2);
		opacity: 1; /* Firefox */
	}

	&:-ms-input-placeholder {
		/* Internet Explorer 10-11 */
		color: var(--grey-2);
	}

	&::-ms-input-placeholder {
		/* Microsoft Edge */
		color: var(--grey-2);
	}
`;

export const TextField = withTranslation()((props) => {

	const { t } = props;

	const [internalValue, setInternalValue] = useState(props.value);

	const fieldRef = useRef();

	const [hasFocus, setHasFocus] = useState(false);

	const [canShowError, setCanShowError] = useState(false);

	const [isValueValid, setIsValueValid] = useState(!props.required);

	const debounce = useDebounce();

	useEffect(() => {
		if	(internalValue != props.value) {
			setInternalValue(props.value);
		}
	}, [props.value]);

	useEffect(() => {
		launchValidate();
	}, [hasFocus]);

	useEffect(() => {
		if (!isValueValid && hasFocus && !canShowError) {
			setCanShowError(true);
		}
	}, [isValueValid]);

	const launchValidate = () => {
		if (props.required) {
			setIsValueValid(returnIfValueIsValid(fieldRef.current.value));
		}
	};

	const returnIfValueIsValid = (value) => {
		let isValid = true;

		if (props.type && !props.readOnly) {
			if (props.type == "text") {
				isValid = value != ""; //setIsValueValid();
			} else if (props.type == "email") {
				isValid = isEmailValid(value); //setIsValueValid(isEmailValid(value));
			} else if (props.type == "password") {
				isValid = isPasswordValid(value); //setIsValueValid(isPasswordValid(value));
			}
		}

		return isValid;
	};

	const onValueUpdate = (value) => {

		debounce(() => {
			launchValidate();
			if (props.onChange) {
				props.onChange(
					props.id,
					value,
					returnIfValueIsValid(value)
				);
			}
		}, 100);
		
	}

	return (
		<Form.Group
			className={props.className}
			style={{ ...props.style, width: "100%" }}
		>
			{props.label ? (
				<Text
					size="small"
					weight={"medium"}
					color={props.labelColor || "var(--darkgrey)"}
				>
					{t(props.label)}
				</Text>
			) : (
				""
			)}

			<FormControlCustom
				ref={fieldRef}
				id={props.id}
				defaultValue={props.defaultValue || undefined}
				value={internalValue}
				type={props.type}
				noborder={props.noborder}
				lightbackground={props.lightbackground}
				placeholder={t(props.placeholder)}
				disabled={props.disabled}
				readOnly={props.readOnly}
				color={props.color}
				autoFocus={props.autoFocus}
				isInvalid={canShowError && !isValueValid}
				padding={props.padding}
				onChange={(e) => {
					setInternalValue(e.target.value);
					onValueUpdate(e.target.value);
				}}
				onKeyPress={props.onKeyPress}
				onFocus={(e) => {
					if (props.onFocus) {
						props.onFocus(props.id, true);
					}

					setHasFocus(true);
				}}
				onBlur={(e) => {
					if (props.onFocus) {
						props.onFocus(props.id, false);
					}

					setCanShowError(true);
					setHasFocus(false);
				}}
			/>

			{props.suggestion ? (
				<Form.Text id="passwordHelpBlock" muted>
					{t(props.suggestion)}
				</Form.Text>
			) : (
				""
			)}
		</Form.Group>
	);
});

TextField.propTypes = {
	type: PropTypes.oneOf(["text", "email", "password", "number"]),
	lightbackground: PropTypes.bool,
};

TextField.defaultProps = {
	type: "text",
	defaultValue: "",
	readOnly: false,
	required: false,
	lightbackground: false,
};

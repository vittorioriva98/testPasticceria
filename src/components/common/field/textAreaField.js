import React, {useState, useEffect} from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";
import { Text } from "../index";
import { PropTypes } from "prop-types";
import { withTranslation } from "react-i18next";
import { useDebounce } from "../../hooks";

const TextAreaCustom = styled.textarea`
	width: 100%;
	resize: none;
	padding: 11px 20px;
	border: 1px solid var(--grey-1);
	border-radius: 6px;
	background-color: var(--grey-field);
	outline: none;
`;

const TextAreaField = (props) => {
	const { t } = props;

	const [internalValue, setInternalValue] = useState(props.value);
	const debounce = useDebounce();

	useEffect(() => {
		if	(internalValue != props.value) {
			setInternalValue(props.value);
		}
	}, [props.value]);

	const onValueUpdate = (value) => {

		debounce(() => {
			if(props.onChange) {
				if(props.id) {
					props.onChange(props.id, value);
				} else {
					props.onChange(value);
				}
				
			}
		}, 100);
		
	}

	return (
		<Form.Group className={props.className} style={{ ...props.style }}>
			{props.label ? (
				<Text size="small" weight="medium" color={props.labelColor}>
					{t(props.label)}
				</Text>
			) : (
				""
			)}

			<TextAreaCustom
				className="form-textarea"
				rows={props.rows}
				placeholder={props.placeholder ? t(props.placeholder) : t("hint_insert")}
				value={internalValue}
				onChange={(e) => {
					const value = e.target.value;
					setInternalValue(value);
					onValueUpdate(value);
				}}
			/>
		</Form.Group>
	);
};

TextAreaCustom.propTypes = {
	label: PropTypes.string,
	rows: PropTypes.number,
	placeholder: PropTypes.string,
};

TextAreaCustom.defaultProps = {
	rows: 5,
};

export default withTranslation()(TextAreaField);

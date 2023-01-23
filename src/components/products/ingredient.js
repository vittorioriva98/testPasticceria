import { Delete as DeleteIcon } from "@material-ui/icons";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import { Text, TextField } from "../";

const Div = styled.div`
	display: flex;
	align-items: center;
`;

const DivClick = styled(Div)`
    height: 100%;
    padding-top: 20px;
	&,
	& > * {
		cursor: pointer;
        text-decoration: underline;
	}
`;

export const Ingredient = (props) => {
	const data = props.data;
	const onChangeListener = (id, value, isValid) => {
		if (props.onChange) {
			data[id] = value;
			props.onChange(data);
		}
	};

	return (
		<Row>
            <Col lg={4}>
                <TextField
                    id="name"
                    value={data.name}
                    type="text"
                    label={"ingredient.name"}
                    placeholder={"hint_insert"}
                    onChange={onChangeListener}
                />
            </Col>
            <Col lg={3}>
                <TextField
                    id="qty"
                    value={data.qty}
                    type="text"
                    label={"ingredient.qty"}
                    placeholder={"hint_insert"}
                    onChange={onChangeListener}
                />
            </Col>
            <Col lg={3}>
                <TextField
                    id="um"
                    value={data.um}
                    type="text"
                    label={"ingredient.um"}
                    placeholder={"hint_insert"}
                    onChange={onChangeListener}
                />
            </Col>
            <Col lg={2}>
                <DivClick
					onClick={(e) => {
						if (props.onDelete) {
							props.onDelete(data.id);
						}
					}}
				>
					<DeleteIcon
						style={{
							color: "var(--grey-2)",
							width: "20px",
							height: "20px",
							marginRight: "8px",
							marginBottom: "2px",
						}}
					/>
					<Text
						size="medium"
						weight="medium"
						color={"var(--grey-2)"}
					>
						{"ingredient.delete"}
					</Text>
				</DivClick>
            </Col>
			
		</Row>
	);
};

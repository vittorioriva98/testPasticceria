import { Delete as DeleteIcon } from "@material-ui/icons";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import { Text } from "../";

const Div = styled.div`
	display: flex;
	align-items: left;
`;

export const RowIngredient = (props) => {
	const ingredient = props.ingredient;

	return (
		<Div>
            <Text
                size="small"
                weight="regular"
            >
                {ingredient.name + ", " + ingredient.qty + " " + ingredient.um}
            </Text>
        </Div>
	);
};

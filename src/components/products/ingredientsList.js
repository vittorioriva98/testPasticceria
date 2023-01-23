import { Add as AddIcon } from "@material-ui/icons";
import React, { useState } from "react";
import styled from "styled-components";
import { Ingredient, Spacer, Text } from "..";

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const Div = styled.div`
	width: 190px;
	display: flex;
	align-items: center;

	&,
	& > * {
		cursor: pointer;
        text-decoration: underline;
	}
`;

export const IngredientsList = (props) => {
	let list = props.list || [];

	const addItem = () => {
		if (
			list.filter(
				(item) =>
					item.qty === "" && item.um === ""
			).length === 0
		) {
			list = list.concat([
				{
					qty: "",
					um: ""
				},
			]);

			if (props.onListChange) {
				props.onListChange(list);
			}
		}
	};

	const updateItem = (index, newItem) => {
		list[index] = newItem;

		if (props.onListChange) {
			props.onListChange(list);
		}
	};

	const removeItem = (index) => {
		list = list.filter((item, item_index) => item_index != index);

		if (props.onListChange) {
			props.onListChange(list);
		}
	};

	return (
		<Wrapper style={props.style}>
			{list.map((ingrediend, index) => (
				<>
					{index > 0 ? <Spacer width="100%" height="16px"/> : ""}
					<Ingredient
						key={index}
						data={ingrediend}
						onChange={(newItem) => {
							updateItem(index, newItem);
						}}
						onDelete={(id) => {
							removeItem(index);
						}}
					/>
				</>
			))}
			<Spacer width="100%" height="20px"/>
			<Div
				onClick={(e) => {
					addItem();
				}}
				style={{
					userSelect: "none",
				}}
			>
				<AddIcon
					style={{
						color: "var(--grey-2)",
						width: "20px",
						height: "20px",
						marginRight: "8px",
						marginBottom: "2px",
					}}
				/>
				<Text
					size="large"
					weight="medium"
					color={"var(--grey-2)"}
				>
					{"ingredientsList.add"}
				</Text>
			</Div>
		</Wrapper>
	);
};

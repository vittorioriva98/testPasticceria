import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import {
	Home
} from "../pages";
import {
	HOME
} from "./constants";

export const RouterConfig = () => {
	const user = useSelector((state) => state.user || {});
	return (
		<Routes>
			<Route path="*" element={<Home />} />
		</Routes>
	);
};

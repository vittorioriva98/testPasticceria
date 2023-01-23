import { Add as AddIcon } from "@material-ui/icons";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import React, { useEffect, useState } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import { TextField } from "../";

export const DocumentField = withTranslation()((props) => {

	const { t } = props;

	return (
		<div
			style={props.style}
		>
			<Row className="mb-3">
				<Col xs={10}>
					<TextField
						type="text"
						label={t(props.label)|| ""}
						lightbackground
						readOnly
						value={props.value || ""}
					/>
				</Col>
				<Col
					xs={2}
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
					className="mt-sm-2 mt-md-0"
				>
					<a
						href={props.iconLink}
						target="_blank"
						style={{
							alignSelf: "end",
							marginBottom: "10px",
							color: "initial"
						}}
					>
						<FileDownloadOutlinedIcon
							style={{
								width: "28px",
								height: "28px",
								cursor: "pointer"
							}}
						/>
					</a>
				</Col>
			</Row>
		</div>
	);
});

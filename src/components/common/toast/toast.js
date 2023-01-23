import React from "react"
import { ToastContainer, Toast } from "react-bootstrap";
import { withTranslation } from "react-i18next";

export const ToastWrapped = withTranslation()((props) => {
    const {t} = props

    return (
        <ToastContainer position="top-end" className="p-3">
            <Toast
                onClose={props.onClose}
                show={props.show || false}
                delay={props.delay || 5000}
                autohide={props.autohide || true}
                bg={props.variant || "primary"}
            >
                <Toast.Header>
                    <strong className="me-auto">{t(props.title) || ""}</strong>
                </Toast.Header>
                <Toast.Body className="text-white">
                    {t(props.description) || ""}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    )

})
import React, { useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { Modal, Container } from "react-bootstrap"
import { v4 as uuidv4 } from 'uuid';
import moment from "moment"
import { Text, Button, TextField, Divider, Spacer, IngredientsList } from "../index"
import { addProduct, updateProduct, deleteProduct } from "../../services/network"
import { setToast } from "../../services/reducers"

export const ProductEdit = (props) => {

    const dispatch = useDispatch()
    const product = props.product
    const [isLoading, setIsLoading] = useState(false)
    const isFormValid = useMemo(() => product && product.name != "" && product.price > 0, [props.product])

    const save = () => {
        if(isFormValid) {
            if (product && product.id) {

                updateProduct(product.id, product, (success) => {
                    if(success) {
                        networkOperationSuccess()
                    } else {
                        networkOperationFailure()
                    }
                    setIsLoading(false)
                })
                setIsLoading(true)

            } else {
                const newProduct = {
                    ...product,
                    id: uuidv4(),
                    createdAt: moment().format()
                }
                addProduct(newProduct.id, newProduct, (success) => {
                    if(success) {
                        networkOperationSuccess()
                    } else {
                        networkOperationFailure()
                    }
                    setIsLoading(false)
                })
                setIsLoading(true)

            }
        }
    }

    const remove = () => {
        deleteProduct(product.id, (success) => {
            if(success) {
                networkOperationSuccess()
            } else {
                networkOperationFailure()
            }
            setIsLoading(false)
        })
        setIsLoading(true)
    }

    const onChange = (productModified) => {
        if(props.onChange) {
            props.onChange(productModified)
        }
    }

    const networkOperationSuccess = () => {
        dispatch(
            setToast({
                show: true,
                variant: "success",
                title: "network_success.title",
                description: "network_success.description"
            })
        )
        if(props.onCancel) {
            props.onCancel()
        }
    }

    const networkOperationFailure = () => {
        dispatch(
            setToast({
                show: true,
                variant: "danger",
                title: "network_error.title",
                description: "network_error.description"
            })
        )
    }

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            onCancel={props.onCancel}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="modal-footer-no-border-top modal-padding"
        >
            <Modal.Body>
                <Container>
                    <Text size="xxlarge" weight="medium" color="var(--black)">
                        {product && product.id ? "productEdit.title_update_product" : "productEdit.title_new_product"}
                    </Text>
                    <Text color="var(--darkgrey)">
                        {"productEdit.description"}
                    </Text>

                    <Spacer width="100%" height="38px"/>

                    <TextField
                        id="name"
                        required
                        type="text"
                        label={"productEdit.name_label"}
                        placeholder={"hint_insert"}
                        value={product.name}
                        onChange={(id, value, isValid) => {
                            onChange({
                                ...product,
                                name: value
                            })
                        }}
                    />

                    <Spacer width="100%" height="16px"/>

                    <TextField
                        id="price"
                        required
                        type="number"
                        label={"productEdit.price_label"}
                        placeholder={"hint_insert"}
                        value={product.price}
                        onChange={(id, value, isValid) => {
                            onChange({
                                ...product,
                                price: value
                            })
                        }}
                    />

                    <Spacer width="100%" height="16px"/>

                    <TextField
                        id="qty"
                        required
                        type="number"
                        label={"productEdit.qty_label"}
                        placeholder={"hint_insert"}
                        value={product.qty}
                        onChange={(id, value, isValid) => {
                            onChange({
                                ...product,
                                qty: value
                            })
                        }}
                    />

                    <Spacer width="100%" height="24px"/>

                    <Text color="var(--darkgrey)">
                        {"productEdit.ingredients_title"}
                    </Text>

                    <Spacer width="100%" height="8px"/>

                    <IngredientsList
                        list={product.ingredients || []}
                        onListChange={(list) => {
                            onChange({
                                ...product,
                                ingredients: list
                            })
                        }}
                    />
                    
                    <Spacer width="100%" height="40px"/>
                    <Divider/>
                    <Spacer width="100%" height="40px"/>

                    <Button
                        variant="primary"
                        onClick={save}
                        isLoading={isLoading}
                        disabled={!isFormValid}
                        centerchildren
                        style={{
                            width: "100%",
                        }}
                    >
                        <Text
                            size="small"
                            weight="medium"
                        >
                            {"productEdit.btn_submit"}
                        </Text>
                    </Button>
                    <Spacer width="100%" height="12px"/>
                    {
                        product && product.id ?
                            <>
                                <Button
                                    variant="outline-secondary"
                                    onClick={remove}
                                    isLoading={isLoading}
                                    centerchildren
                                    style={{
                                        width: "100%",
                                    }}
                                >
                                    <Text
                                        size="small"
                                        weight="medium"
                                    >
                                        {"productEdit.btn_delete"}
                                    </Text>
                                </Button>
                                <Spacer width="100%" height="12px"/>
                            </>
                        :
                            ""
                    }
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
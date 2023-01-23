import React, { useEffect, useMemo, useState } from "react"
import styled from "styled-components";
import { Add as AddIcon, List as ListIcon } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux"
import { Row, Col } from "react-bootstrap";
import { setProducts } from "../../services/reducers"
import { getProducts } from "../../services/network"
import { isProductTooOld } from "../../services/utils";
import { ProductEditModal, Button, Card, Text, Spacer, ProductCard, Loader } from "../../components"

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: var(--grey-background);
    padding: 24px;
    align-items: center;
`;


const Home = (props) => {

    const dispatch = useDispatch()
    const products = useSelector(state => state.products)
    const user = useSelector(state => state.user)
    const [productSelected, setProductSelected] = useState({})
    const [showProductModal, setShowProductModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const isAdminLogged = useMemo(() => user && user.email, [user])

    const productsFiltered = useMemo(() => isAdminLogged ? products : products.filter((product) => !isProductTooOld(product.createdAt)), [products, user])

    useEffect(() => {
        executeGetProducts()
    }, [])

    const executeGetProducts = async () => {
        setIsLoading(true)
        getProducts((result) => {
            if(!result) {
                result = []
            }
            dispatch(setProducts([...result]))
            setIsLoading(false)
        });
    }

    return (
        <Container>
            {
                isAdminLogged ?
                (
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "end"
                        }}
                    >
                        <Button
                            variant="primary"
                            onClick={() => { 
                                setShowProductModal(true)
                            }}
                        >
                            <AddIcon
                                style={{
                                    marginRight: "8px",
                                }}
                            />
                            <Text size="small" weight="medium">
                                {"home.new"}
                            </Text>
                        </Button>
                    </div>
                )
                :
                ""
            }
            <Spacer width="100%" height="48px"/>
            {
                isLoading ?
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <Loader
                        layer={3}
                        color="var(--pink)"
                    />
                </div>
                :
                products && products.length ?
                    (
                        <Row style={{
                            width: "100%"
                        }}>
                            
                            {
                                productsFiltered.map(
                                    (product) => 
                                        <Col
                                            lg={4}
                                            md={6}
                                            sm={12}
                                            style={{
                                                marginTop: "6px"
                                            }}
                                        >
                                            <ProductCard
                                                product={product}
                                                key={product.id}
                                                onClick={() => {
                                                    if(isAdminLogged) {
                                                        setProductSelected({...product})
                                                        setShowProductModal(true)
                                                    }
                                                }}
                                            />
                                        </Col>
                                )
                            }
                            
                        </Row>
                    )
                    
                :
                    <>
                        <ListIcon
                            style={{
                                width: "36px",
                                height: "36px",
                                color: "var(--grey-2)"
                            }}
                        />
                        <Spacer width="100%" height="16px"/>
                        <Text
                            size="large"
                            weight="bold"
                            color="var(--grey-2)"
                        >
                            {"home.list_empty"}
                        </Text>
                    </>
            }
            
            <ProductEditModal
                show={showProductModal}
                product={productSelected}
                onChange={(productModified) => {
                    setProductSelected(productModified)
                }}
                onCancel={() => {
                    setShowProductModal(false)
                    setProductSelected({})
                }}
            />
        </Container>
    )
}

export default Home
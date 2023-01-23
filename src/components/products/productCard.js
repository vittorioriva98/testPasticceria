import React, { useMemo } from "react"
import styled from "styled-components";
import { isProductOld, isProductTooOld, getPriceDiscounted } from "../../services/utils";
import { Card, Text, RowIngredient } from "../index"

const Container = styled.div`
	width: 100%;
	max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    padding-top: 12px;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 12px;

    .card-content-overlay {
        display: none;
        transform: scaleY(0);
        transition: transform 500ms ease;

        width: 100%;
        flex-direction: column;S
    }

    &:hover .card-content-overlay {
        display: flex;
        transform: scaleY(1);
    }

`;

const Footer = styled.div`
	width: 100%;
	max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;

    padding-top: 6px;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 6px;
`;


export const ProductCard = (props) => {
    const product = props.product
    
    const productOld = useMemo(() => isProductOld(product.createdAt), [props.product])
    const productTooOld = useMemo(() => isProductTooOld(product.createdAt), [props.product])

    return (
        <Card
            onClick={props.onClick}
            style={{
                cursor: "pointer"
            }}
        >
            <Container className="card-hoover-appear">
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <Text
                        size="large"
                        weight="medium"
                        color="var(--dark)"
                    >
                        {product.name}
                    </Text>
                    <Text
                        size="medium"
                        weight="medium"
                        color="var(--grey-2)"
                    >
                        {getPriceDiscounted(product.createdAt, product.price)} €
                    </Text>
                </div>
                <div
                    className="card-content-overlay"
                >
                    {
                        product && product.ingredients && product.ingredients.length > 0 ?
                            product.ingredients.map((ingredient) => <RowIngredient ingredient={ingredient}/>)
                        :
                            ""
                    }
                </div>
            </Container>
            {
                productOld || productTooOld ?
                    <Footer
                        style={{
                            backgroundColor: productTooOld ? "var(--red)" : productOld ? "var(--green)" : ""
                        }}
                    >
                        <Text
                            size="small"
                            weight="bold"
                            color="var(--white)"
                        >
                            {productTooOld ? "productCard.too_old" : productOld ? "productCard.discount" : ""}
                        </Text>
                    </Footer>
                :
                    ""
            }
        </Card>
    )
}
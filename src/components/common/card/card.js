import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 100%;

  transform: scale(1.00);
  transition: transform 300ms ease;

  background: var(--white);

  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.centerChildren ? "center" : "")};

  border: 1px solid var(--grey-1);

  border-radius: 6px;

  &:hover,
  &:focus-within {
    transform: scale(1.02);
    transition: transform 300ms ease;
  }

`;

export const Card = (props) => {
  return (
    <Container className={props.className} centerChildren={props.centerChildren} onClick={props.onClick} style={props.style}>
      {props.children}
    </Container>
  );
};

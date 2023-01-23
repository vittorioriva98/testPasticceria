import React from "react";
import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import { RouterConfig } from "../../routes/routerConfig";


const Container = styled.div`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: var(--grey-background);
`;

export const Body = (props) => {

  return (
    <BrowserRouter>
      <Container>
        <RouterConfig />
      </Container>
    </BrowserRouter>
  );
};

import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 100%;
  height: 1px;

  background-color: var(--grey-1);
`;

export const Divider = (props) => {
  return <Container className={props.className} style={props.style} />;
};

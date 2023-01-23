import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import styled from "styled-components";
// Redux
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";
import { store } from "./config/store";
import { Navbar, Body } from "./layouts";

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  min-height: 100%;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;

  background-color: var(--grey-background);
`;

const App = () => {

  let persistor = persistStore(store);

  return (
    <>
      <div>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Container>
              <Navbar/>
              <Body/>
            </Container>
          </PersistGate>
        </Provider>
      </div>
    </>
  );
}

export default withTranslation()(App);
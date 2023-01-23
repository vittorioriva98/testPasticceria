import React, { Fragment } from "react";
import styled from "styled-components";
import { PropTypes } from "prop-types";

const DivCustom = styled.div`
    &.size-sm {
        width: 1em;
        height: 1em;
    }
    &.size-md {
        width: 70px;
        height: 70px;
    }
    &.size-lg {
        width: 100px;
        height: 100px;
    }
`;

const SpinnerCustom = styled.div`
    & {
        ${props => props.layer > 1 ? "position: absolute;" : ""}
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 0.25em solid ${props => props.color ? props.color : ""};
        border-right: 0.25em solid transparent;
        border-radius: 50%;
        animation: 1s linear infinite spinner-border;
    }
    &.spinner-sm {
        width: 1em;
        height: 1em;
    }
    &.layer-0 {
        animation-direction: reverse;
    }
    &.layer-1 {
        top: 7.5px;
        left: 7.5px;
        right: 7.5px;
        bottom: 7.5px;
        border: 0.25em solid ${props => props.color ? props.color : ""};
        animation-duration: 0.8s;
    }
    &.layer-2 {
        top: 15px;
        left: 15px;
        right: 15px;
        bottom: 15px;
        animation-duration: 1.2s;
    }
    &.spinner-md {
        width: 70px;
        height: 70px;

        &.layer-1 {
            width: 55px;
            height: 55px;
        }
        &.layer-2 {
            width: 40px;
            height: 40px;
        }

    }
    &.spinner-lg {
        width: 100px;
        height: 100px;

        &.layer-1 {
            width: 85px;
            height: 85px;
        }
        &.layer-2 {
            width: 70px;
            height: 70px;
        }
    }
`

export const Loader = (props) => {

    const addLayer = () => {

        const list = [
            
        ];

        for(let i=0;i<props.layer;i++) {
            list[i] = <SpinnerCustom
                layer={props.layer}
                as={props.as}
                className={`spinner-${props.size} layer-${i}`}
                size={props.size}
                color={props.color}
                style={props.style}
            />
        }

        return list;

    }
    
  return (
      <DivCustom
        className={`size-${props.size}`}
        style={{
            position: props.layer > 1 ? "relative" : "",
            display: "flex"
        }}
      >
        {addLayer()}
      </DivCustom>
  );
};

Loader.propTypes = {
    as: PropTypes.string,
    size: PropTypes.oneOf(["sm", "md", "lg"]),
    layer: PropTypes.oneOf([1, 2, 3])
};

Loader.defaultProps = {
	as: "div",
    size: "md",
    layer: 1
};

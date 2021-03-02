import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

export type Theme = "dark" | "light";
export interface PickerProps {
    theme: Theme;
}

const Picker: React.FC<PickerProps> = props => {
    return (
        <div>
            Welcome to the Persian Mobile Date and Time picker - <Title>{props.theme}</Title>
        </div>
    )
}

export default Picker;

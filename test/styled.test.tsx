import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";
import styled from "styled-components";
const MyText = styled.h1`
  color: black;
  font-size: 12px;
`;

test("button-test", () => {
  render(<MyText as="h3" />);
});

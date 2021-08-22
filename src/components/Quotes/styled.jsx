import styled from "styled-components";

export const QuoteWrapper = styled.div`
  cursor: pointer;
  position: fixed;
  left: 50%;
  bottom: 22px;
  transform: translate(-50%, -3%);
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.2;
  font-family: "Fira Mono", monospace;
  font-size: 1em;
  font-weight: bold;
  text-align: center;
  text-shadow: rgb(50, 50, 50) 0 0 10px;
  padding-bottom: 24px;
`;

export const Quote = styled.div`
  margin-top: 1rem;
`;

export const Author = styled.div`
  margin-top: 1rem;
`;

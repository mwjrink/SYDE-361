import styled from "styled-components";
import { BoxShadow } from "../../style/utils";
import { defaults } from "../../style/Containers.Styled";
import { BoxShadowHoverFragment } from "../../style/CommonEffects.Styled";

const main = "#546e7a";
const accent_color = "#64b5f6";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  background: none;
  border: none;

  margin: 20px;
  border-radius: 2px;
  border: none;
  /* box-shadow: ${BoxShadow(4)};
  padding: 16px;

  width: 1000px;
  height: 400px; */
`;

export const ParameterContainer = styled.div`
  width: 250px;
`;

export const Parameter = styled.div`
  display: flex;
  justify-content: space-between;
  width: 175px;
  margin: 12px;
`;

export const Input = styled.textarea`
  resize: none;
  height: 1.25rem;
  width: 100px;
`;

export const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: none;
  border: none;
`;

export const Button = styled.button`
  padding: 10px;
  border-radius: 50vh;
  border: none;
  background: ${accent_color};
  outline: none;
  margin: 4px;

  box-shadow: ${BoxShadow(4)};
`;

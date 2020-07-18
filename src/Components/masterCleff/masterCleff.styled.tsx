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
  
  border-radius: 2px;
  border: none;

  width: 500px;
  height: 50px;
`;

export const PlaybackButton = styled.button`
  padding: 10px;
  border-radius: 50vh;
  border: none;
  background: ${accent_color};
  outline: none;
  margin: 4px;

  box-shadow: ${BoxShadow(4)};
`;

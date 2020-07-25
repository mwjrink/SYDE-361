import styled from "styled-components";
import { BoxShadow } from "../../style/utils";

const main = "#546e7a";
const accent_color = "#64b5f6";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: Georgia, serif;
`;

export const TopBarContainer = styled.div`
  top: 0;
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: space-between;
`;

export const TitleContainer = styled.div`
  border: 1px solid black;
  padding: 12px 24px 12px 24px;
  font-size: 2rem;
  border-radius: 4px;
  border: none;
  box-shadow: ${BoxShadow(4)};
  margin: 4px;
`;

export const CollaboratorsContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid black;
  padding: 12px 24px 12px 24px;
  font-size: 2rem;
  border-radius: 4px;
  border: none;
  box-shadow: ${BoxShadow(4)};
  margin: 4px;
`;

export const ProfilePicture = styled.div`
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 4px;
  text-align: center;
  font-size: 2rem;
  background: ${accent_color};
  box-shadow: ${BoxShadow(4)};
  margin-left: 10px;
`;

export const MasterContainer = styled.div`
  display: flex;
  height: 72px;
  justify-content: center;
  font-size: 2rem;
  border-radius: 4px;
  border: none;
  box-shadow: ${BoxShadow(4)};
  margin: 4px;
  padding: 0px 24px;
  padding-left: 25px;
  align-self: center;
  align-items: center;
`;

export const AudioContainer = styled.div`
  border: 1px solid black;
  width: 600px;
  margin: 0px 8px 0px 8px;
`;

export const MasterButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const PlaybackButton = styled.div`
  margin: 0px 8px 0px 8px;
  border: none;
  border-radius: 50vh;
`;

export const MainContentContainer = styled.div`
  height: 100%;  
  display: flex;
  justify-content: space-between;
  margin-right: 12px;
`;

export const InnerBranchesContainer = styled.div`
  border: none;
  flex: 1;
  font-size: 1.5rem;
  color: grey;
`;

export const ButtonsContainer = styled.div`
  border: none;
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const BranchContainer = styled.div`
  width: 100%;

  font-size: 2rem;

  display: flex;
  flex-direction: column;

  border-radius: 4px;
  border: none;
  box-shadow: ${BoxShadow(4)};
  margin: 8px;
  padding: 16px;
`;

export const ChatContainer = styled.div`
  width: 27%;
  border: 1px solid black;
  font-size: 2rem;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 4px;
  border: none;
  box-shadow: ${BoxShadow(4)};
  margin: 8px 8px 8px 16px;
`;

export const Button = styled.button`
  padding: 0px 15px;
  font-size: 1rem;
  margin: 4px;
  border-radius: 15px;
  background: ${accent_color};
  outline: none;
  border: 2px solid black;
  cursor: pointer;
  box-shadow: ${BoxShadow(4)};
`;

export const Track = styled.div`
  width: 96%;
  height: 80px;
  margin: 4px 0px;
  display: flex;
  align-items: center;
  padding: 4px 24px;
  font-size: 1.65rem;
  justify-content: space-between;
  border-radius: 4px;
  box-shadow: ${BoxShadow(4)};
`;

export const Empty = styled.div`
  width: 200px;
`;

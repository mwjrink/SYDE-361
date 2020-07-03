import styled from "styled-components";
import { BoxShadow } from "../../style/utils";

const main = "#546e7a";
const accent_color = "#64b5f6";

export const Container = styled.div`
  width: 100%;
  height: 97.5%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TopBarContainer = styled.div`
  /* position: absolute; */
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const TitleContainer = styled.div`
  border: 1px solid black;
  padding: 12px 24px 12px 24px;
  font-size: 3rem;
  border-radius: 4px;
  border: none;
  box-shadow: ${BoxShadow(4)};
  margin: 4px;
`;

export const CollaboratorsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;
  padding: 12px 24px 12px 24px;
  width: 30%;
  font-size: 2rem;
  border-radius: 4px;
  border: none;
  box-shadow: ${BoxShadow(4)};
  margin: 4px;
  max-width: 450px;
`;

export const ProfilePicture = styled.div`
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50vh;
  text-align: center;
  font-size: 2rem;
  background: ${accent_color};
  box-shadow: ${BoxShadow(4)};
`;

export const MasterContainer = styled.div`
  display: flex;
  justify-content: center;
  font-size: 2rem;
  border-radius: 4px;
  border: none;
  box-shadow: ${BoxShadow(4)};
  margin: 4px;
  padding: 16px;
  max-width: 70%;
  align-self: center;
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
  height: 80%;
  display: flex;
  justify-content: space-between;
  margin-right: 12px;
`;

export const InnerBranchesContainer = styled.div`
  border: none;
  height: 90%;
`;

export const ButtonsContainer = styled.div`
  border: none;
  height: 5%;
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const BranchContainer = styled.div`
  width: 70%;
  height: 100%;

  font-size: 2rem;

  display: flex;
  flex-direction: column;

  border-radius: 4px;
  border: none;
  box-shadow: ${BoxShadow(4)};
  margin: 4px;
  padding: 8px;
`;

export const ChatContainer = styled.div`
  width: 27%;
  border: 1px solid black;
  height: 100%;
  font-size: 2rem;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 4px;
  border: none;
  box-shadow: ${BoxShadow(4)};
  margin: 4px;
  background: grey;
`;

export const Button = styled.button`
  padding: 8px;
  font-size: 1rem;
  margin: 4px;
  background: ${accent_color};
  outline: none;
  border-radius: 4px;
  border: none;
  box-shadow: ${BoxShadow(4)};
`;

export const Track = styled.div`
  width: 96%;
  height: 40px;
  border: 1px solid black;
  margin: 4px 0px;
  display: flex;
  align-items: center;
  padding: 4px 16px;
  font-size: 1.5rem;
  justify-content: space-between;
`;

export const Empty = styled.div`
  width: 200px;
`;

export const Commit = styled.div`
  width: 97%;
  height: 30px;
  padding: 0px 12px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid black;
`;

export const Description = styled.div`
  width: 400px;
`;


export const Name = styled.div`
  width: 200px;
`;
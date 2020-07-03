import React from "react";
import {
  Container,
  TopBarContainer,
  TitleContainer,
  CollaboratorsContainer,
  ProfilePicture,
  MasterContainer,
  AudioContainer,
  MasterButtonsContainer,
  PlaybackButton,
  MainContentContainer,
  ChatContainer,
  BranchContainer,
  InnerBranchesContainer,
  ButtonsContainer,
  Button,
  Track,
  Empty,
} from "./audacity.styled";

export function Audacity() {
  return (
    <Container>
      <TopBarContainer>
        <TitleContainer>Track 1</TitleContainer>
        <CollaboratorsContainer>
          Collaborators:
          <ProfilePicture />
          <ProfilePicture />
          <ProfilePicture>+</ProfilePicture>
        </CollaboratorsContainer>
      </TopBarContainer>
      <MasterContainer>
        Master:
        <AudioContainer />
        <MasterButtonsContainer>
          <PlaybackButton>▶</PlaybackButton>
          <PlaybackButton>⏸</PlaybackButton>
          <PlaybackButton>⏹</PlaybackButton>
        </MasterButtonsContainer>
      </MasterContainer>
      <MainContentContainer>
        {/* <ChatContainer>
          Chat:
          <textarea />
        </ChatContainer> */}
        <BranchContainer>
          Your Branch:
          <InnerBranchesContainer>
            <Track>
            </Track>
            <Track>
            </Track>
            <Track>
            </Track>
            <Track>
            </Track>
          </InnerBranchesContainer>
          <ButtonsContainer>
            <Button>New Layer</Button>
            <Button>Branch</Button>
            <Button>Merge into Master</Button>
          </ButtonsContainer>
        </BranchContainer>
      </MainContentContainer>
    </Container>
  );
}

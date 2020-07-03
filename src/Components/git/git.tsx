import React, { useState } from "react";
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
  Commit,
  Description,
  Name,
} from "./git.styled";

export function GitThing() {
  const [branch, setBranch] = useState(true);
  const toggleBranch = () => setBranch((value) => !value);
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
        <ChatContainer>
          Chat:
          <textarea />
        </ChatContainer>

        <BranchContainer>
          {branch ? (
            <>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                Your Branch:
                <Button onClick={() => toggleBranch()}>Toggle Window</Button>
              </div>
              <InnerBranchesContainer>
                <Track>
                  <Empty>1. Drum </Empty>
                  <MasterButtonsContainer>
                    <PlaybackButton>▶</PlaybackButton>
                    <PlaybackButton>⏸</PlaybackButton>
                    <PlaybackButton>⏹</PlaybackButton>
                  </MasterButtonsContainer>
                  <PlaybackButton>X</PlaybackButton>
                </Track>
                <Track>
                  <Empty>2. Bass </Empty>
                  <MasterButtonsContainer>
                    <PlaybackButton>▶</PlaybackButton>
                    <PlaybackButton>⏸</PlaybackButton>
                    <PlaybackButton>⏹</PlaybackButton>
                  </MasterButtonsContainer>
                  <PlaybackButton>X</PlaybackButton>
                </Track>
                <Track>
                  <Empty>3. Melody </Empty>
                  <MasterButtonsContainer>
                    <PlaybackButton>▶</PlaybackButton>
                    <PlaybackButton>⏸</PlaybackButton>
                    <PlaybackButton>⏹</PlaybackButton>
                  </MasterButtonsContainer>
                  <PlaybackButton>X</PlaybackButton>
                </Track>
                <Track>
                  <Empty>4. Harmony </Empty>
                  <MasterButtonsContainer>
                    <PlaybackButton>▶</PlaybackButton>
                    <PlaybackButton>⏸</PlaybackButton>
                    <PlaybackButton>⏹</PlaybackButton>
                  </MasterButtonsContainer>
                  <PlaybackButton>X</PlaybackButton>
                </Track>
              </InnerBranchesContainer>
              <ButtonsContainer>
                <Button>New Layer</Button>
                <Button>Branch</Button>
                <Button>Merge into Master</Button>
              </ButtonsContainer>
            </>
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                Commits:
                <Button onClick={() => toggleBranch()}>Toggle Window</Button>
              </div>

              <Commit>
                <Name>{"b7358c7"}</Name>
                <Name>{"Taylor Swift"}</Name>
                <Description>
                  {"Merged my chill beats into the master track"}
                </Description>
                <div>{"Jun 3 2020"}</div>
              </Commit>
              <Commit>
                <Name>{"jd8eh4n"}</Name>
                <Name>{"You"}</Name>
                <Description>
                  {"Made a cool beat"}
                </Description>
                <div>{"Jun 2 2020"}</div>
              </Commit>
              <Commit>
                <Name>{"ajem83h"}</Name>
                <Name>{"Taylor Swift"}</Name>
                <Description>
                  {"Working on my drum track"}
                </Description>
                <div>{"Jun 2 2020"}</div>
              </Commit>
              <Commit>
                <Name>{"j2kd9sj"}</Name>
                <Name>{"Taylor Swift"}</Name>
                <Description>
                  {"Starting work on my drum track"}
                </Description>
                <div>{"Jun 2 2020"}</div>
              </Commit>
              <Commit>
                <Name>{"eiwnxp2"}</Name>
                <Name>{"You"}</Name>
                <Description>
                  {"Merged my vocals track into master"}
                </Description>
                <div>{"Jun 1 2020"}</div>
              </Commit>
              <Commit>
                <Name>{"4mslg0"}</Name>
                <Name>{"Taylor Swift"}</Name>
                <Description>
                  {"Initial commit"}
                </Description>
                <div>{"Jun 1 2020"}</div>
              </Commit>
            </>
          )}
        </BranchContainer>
      </MainContentContainer>
    </Container>
  );
}

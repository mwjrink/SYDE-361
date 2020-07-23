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
import { MasterCleff } from "../masterCleff/masterCleff";

interface AudacityProps {
  importTrack: () => void;
  generateTrack: () => void;
  manualTrack: () => void;
  tracks: {
    title: string,
    file: any,
    type: string,
    index: number,
    audio: any
  }[];
  removeTrack: (index: number) => void;
  playTrack: (index: number) => void;
  stopTrack: (index: number) => void;
  openTrack: (index: number) => void;
  playMaster: () => void;
  stopMaster: () => void;
}

export function Audacity({ importTrack, generateTrack, manualTrack, tracks, removeTrack, playTrack, stopTrack, openTrack, playMaster, stopMaster }: AudacityProps) {
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
        <MasterCleff abcNotation="K:C\n|: cccc|cccc|cccc|cccc :|" parserParams={{}} engraverParams={{ responsive: "resize" }} renderParams={{ viewportHorizontal: true }} />
        <MasterButtonsContainer>
          <button style={{ backgroundColor: "rgb(239, 239, 239)" }} onClick={playMaster}>
            Play
      </button>
          <button style={{ backgroundColor: "rgb(239, 239, 239)" }} onClick={stopMaster}>
            Stop
      </button>
        </MasterButtonsContainer>
      </MasterContainer>
      <MainContentContainer>
        {/* <ChatContainer>
          Chat:
          <textarea />
        </ChatContainer> */}
        <BranchContainer>
          Tracks:
          <InnerBranchesContainer>
            {tracks.length === 0
              ? `No tracks`
              : tracks.map((track, index) => (
                <Track key={index}>
                  {track.title}

                  <div>
                    {track.type != 'Import' ?
                      <button style={{ backgroundColor: "rgb(239, 239, 239)" }} onClick={() => openTrack(index)}>
                        Edit
                    </button>
                      : ''}
                    <button style={{ backgroundColor: "rgb(239, 239, 239)" }} onClick={() => playTrack(index)}>
                      Play
                    </button>
                    <button style={{ backgroundColor: "rgb(239, 239, 239)" }} onClick={() => stopTrack(index)}>
                      Stop
                    </button>
                    <button style={{ backgroundColor: "rgb(239, 239, 239)" }} onClick={() => removeTrack(index)}>
                      X
                    </button>
                  </div>
                </Track>
              ))}
          </InnerBranchesContainer>
          <ButtonsContainer>
            <Button onClick={importTrack}>Import Track</Button>
            <Button onClick={generateTrack}>Generate Track</Button>
            <Button onClick={manualTrack}>Manual Track</Button>
          </ButtonsContainer>
        </BranchContainer>
      </MainContentContainer>
    </Container>
  );
}

import React from 'react'
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
} from './audacity.styled'

interface AudacityProps {
    importTrack: () => void
    generateTrack: () => void
    manualTrack: () => void
    tracks: string[]
    removeTrack: (index: number) => void
}

export function Audacity({ importTrack, generateTrack, manualTrack, tracks, removeTrack }: AudacityProps) {
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
                        {tracks.map((track, index) => (
                            <Track key={index}>
                                {track}
                                <button onClick={() => removeTrack(index)}>X</button>
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
    )
}

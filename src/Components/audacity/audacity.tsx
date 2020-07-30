import React, {Fragment} from "react";
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
import { BoxShadow } from "../../style/utils";
import user from "./user.png"
import add from "./add.png"
import play from "./play.png"
import stop from "./stop.png"
import audio from "./audio.jpg"
import x from "./x.png"
import edit from "./edit.png"
import arrow from "./arrow.png"

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
          <ProfilePicture style={{ background: "#ef64f6", marginLeft: "25px", borderRadius: "50vh" }}><img src={user} title="Taylor S" style={{ height: "45px", width: "45px", cursor: "default", padding: "2.5px" }}></img></ProfilePicture>
          <ProfilePicture style={{ background: "#62f5c9", borderRadius: "50vh" }}><img src={user} title="Justin B" style={{ height: "45px", width: "45px", cursor: "default", padding: "2.5px" }}></img></ProfilePicture>
          <ProfilePicture style={{borderRadius: "50vh"}}><img src={add} title="Add Collaborator" style={{ height: "45px", width: "45px", cursor: "pointer", padding: "2px" }}></img></ProfilePicture>
        </CollaboratorsContainer>
      </TopBarContainer>
      <MasterContainer>
        Master:
        <div style={{ width: "500px", height: "inherit", padding: "0px 12px" }}>
          {tracks.length != 0 ? <img src={audio} style={{ cursor: "default", padding: "12px", height: "48px", width: "400px" }} /> : ''}
        </div>
        {/* <MasterCleff abcNotation="K:C\n|: cccc|cccc|cccc|cccc :|" parserParams={{}} engraverParams={{ responsive: "resize" }} renderParams={{ viewportHorizontal: true }} /> */}
        {tracks.length != 0 ?
          <MasterButtonsContainer>
            <ProfilePicture style={{ background: "#6afc8a" }}><img src={play} title="Play Track" style={{ height: "45px", width: "45px", cursor: "pointer", padding: "2.5px 2.5px 2.5px 5px" }} onClick={playMaster}></img></ProfilePicture>
            <ProfilePicture style={{ background: "#faac64" }}><img src={stop} title="Stop Track" style={{ height: "45px", width: "45px", cursor: "pointer", padding: "2.25px" }} onClick={stopMaster}></img></ProfilePicture>
          </MasterButtonsContainer> :
          <MasterButtonsContainer>
            <ProfilePicture style={{ background: "gray" }}><img src={play} title="Play Track" style={{ height: "45px", width: "45px", cursor: "default", padding: "2.5px 2.5px 2.5px 5px" }} onClick={playMaster}></img></ProfilePicture>
            <ProfilePicture style={{ background: "gray" }}><img src={stop} title="Stop Track" style={{ height: "45px", width: "45px", cursor: "default", padding: "2.25px" }} onClick={stopMaster}></img></ProfilePicture>
          </MasterButtonsContainer>
        }
      </MasterContainer>
      <MainContentContainer>
        <ChatContainer>
          Chat
          <div style={{flex: "1", color: "gray", padding: "10px"}}> <label>Taylor S. has joined the chat. <br/> Justin B. has joined the chat.</label> </div>
          <input type="text" style={{height: "45px", fontSize: "large", borderRadius: "10px", border: "0px",  boxShadow: BoxShadow(4), padding: "0px 15px", background: "lightgray", color: "gray"}} placeholder="Type a message!"/>
        </ChatContainer>
        <BranchContainer>
          Layers
          <InnerBranchesContainer>
            {tracks.length === 0
              ? <Fragment>
                <div style={{marginTop: "100px"}}><label style={{fontSize: "large"}}>No layers. Add a layer below!</label></div>
                <img src={arrow} style={{cursor: "default", height: "125px", transform: "translate(250px, 50px) rotate(90deg)"}}></img>
                </Fragment>
              : tracks.map((track, index) => (
                <Track key={index}>
                  {track.title}

                  <div style={{display: "flex", alignItems: "center"}}>
                    {track.type != 'Import' ?
                    <ProfilePicture style={{ background: "#fafa64" }}><img src={edit} title="Edit Track" style={{ height: "28px", width: "28px", cursor: "pointer", padding: "10px" }} onClick={() => openTrack(index)}></img></ProfilePicture>
                      : ''}
                    <ProfilePicture style={{ background: "#6afc8a" }}><img src={play} title="Play Track" style={{ height: "45px", width: "45px", cursor: "pointer", padding: "2.5px 2.5px 2.5px 5px" }} onClick={() => playTrack(index)}></img></ProfilePicture>
                    <ProfilePicture style={{ background: "#faac64" }}><img src={stop} title="Stop Track" style={{ height: "45px", width: "45px", cursor: "pointer", padding: "2.25px" }} onClick={() => stopTrack(index)}></img></ProfilePicture>
                    <ProfilePicture style={{ background: "#fa6464" }}><img src={x} title="Remove Track" style={{ height: "36px", width: "36px", cursor: "pointer", padding: "5.5px" }} onClick={() => removeTrack(index)}></img></ProfilePicture>
                  </div>
                </Track>
              ))}
          </InnerBranchesContainer>
          <ButtonsContainer>
            <Button onClick={importTrack}>Import Layer</Button>
            <Button onClick={generateTrack}>Generate Layer</Button>
            <Button onClick={manualTrack}>Manual Layer</Button>
          </ButtonsContainer>
        </BranchContainer>
      </MainContentContainer>
    </Container>
  );
}

// @ts-ignore
import abcjs from "abcjs";
import React, { Component } from "react";
import generateMusic from "./generateMusic";
import {
  Button,
  Container,
  ButtonContainer,
  MainContainer,
  ParameterContainer,
  Parameter,
  Input,
} from "./abcts-styled";

type abcState = {
  abcNotation: string;
  parserParams: object;
  engraverParams: object;
  renderParams: object;
};

export class Abcts extends Component<
  {
    abcNotation: string;
    parserParams: object;
    engraverParams: object;
    renderParams: object;
  },
  abcState
> {
  uniqueNumber = Date.now() + Math.random();
  staff = undefined;
  midi = new abcjs.synth.CreateSynth();

  renderAbcNotation(
    abcNotation: string,
    parserParams: object,
    engraverParams: object,
    renderParams: object
  ) {
    this.staff = abcjs.renderAbc(
      "abcjs-result-" + this.uniqueNumber,
      abcNotation,
      parserParams,
      engraverParams,
      renderParams
    );
  }

  componentDidMount() {
    const {
      abcNotation,
      parserParams,
      engraverParams,
      renderParams,
    } = this.props;
    this.renderAbcNotation(
      abcNotation,
      parserParams,
      engraverParams,
      renderParams
    );
    this.regenerate();
  }

  componentDidUpdate() {
    const {
      abcNotation,
      parserParams,
      engraverParams,
      renderParams,
    } = this.state;
    this.renderAbcNotation(
      abcNotation,
      parserParams,
      engraverParams,
      renderParams
    );
  }

  play() {
    if (abcjs.synth.supportsAudio()) {
      // window.AudioContext =
      //   window.AudioContext ||
      //   window.webkitAudioContext ||
      //   navigator.mozAudioContext ||
      //   navigator.msAudioContext;
      var audioContext = new window.AudioContext();
      audioContext.resume().then(() => {
        return this.midi
          .init({
            visualObj: this.staff![0],
            audioContext: audioContext,
            // @ts-ignore
            millisecondsPerMeasure: this.staff[0].millisecondsPerMeasure(),
          })
          .then((response: any) => {
            // console.log(response); // this contains the list of notes that were loaded.
            // midiBuffer.prime actually builds the output buffer.
            return this.midi.prime();
          })
          .then(() => {
            // At this point, everything slow has happened. midiBuffer.start will return very quickly and will start playing very quickly without lag.
            this.midi.start();
            return Promise.resolve();
          })
          .catch(function (error: any) {
            if (error.status === "NotSupported") {
              var audioError = document.querySelector(".audio-error");
              if (audioError != null) audioError.setAttribute("style", "");
            } else console.warn("synth error", error);
          });
      });
    } else {
      var audioError = document.querySelector(".audio-error");
      if (audioError != null) audioError.setAttribute("style", "");
    }
  }

  stop() {
    this.midi.stop();
  }

  regenerate() {
    this.setState((current) => ({
      ...current,
      abcNotation: generateMusic({
        bars: 4,
        timeSignature: [4, 4],
        key: "G",
        mutations: 100,
        generations: 100,
      }).join(""),
    }));
  }

  render() {
    return (
      <Container>
        <h1>The Song</h1>

        <MainContainer>
          <ParameterContainer>
            <Parameter>
              {`Tempo:`}
              <Input />
            </Parameter>
            <Parameter>
              {`Key:`}
              <Input />
            </Parameter>
            <Parameter>
              {`Instrument:`}
              <Input />
            </Parameter>
            <Parameter>
              {`Reverb:`}
              <Input />
            </Parameter>
          </ParameterContainer>
          <div
            id={"abcjs-result-" + this.uniqueNumber}
            style={{ width: "100%" }}
          />
        </MainContainer>
        <ButtonContainer>
          <Button onClick={() => this.play()}>Play</Button>
          <Button onClick={() => this.stop()}>Stop</Button>
          <Button onClick={() => this.regenerate()}>Generate</Button>
          <Button>Cancel</Button>
          <Button>Save</Button>
        </ButtonContainer>
      </Container>
    );
  }
}

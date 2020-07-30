// @ts-ignore
import abcjs from "abcjs";
import React, { Component, useRef } from "react";
import generateMusic from "./generateMusic";
import { Button, Container, ButtonContainer, MainContainer, ParameterContainer, Parameter, Input } from "./abcts-styled";

type abcState = {
  abcNotation: string;
  parserParams: object;
  engraverParams: object;
  renderParams: object;
  keyInput: string;
};

export class Abcts extends Component<
  {
    abcNotation: string;
    parserParams: object;
    engraverParams: object;
    renderParams: object;
    close: () => void;
    setMusic: (music: any) => void;
    existingIndex: Number;
  },
  abcState
> {
  uniqueNumber = Date.now() + Math.random();
  staff = undefined;
  midi = new abcjs.synth.CreateSynth();
  key = "C";
  bars = 4;
  upbeatedness = 1.0;
  note_density = 10;
  generations = 100;

  constructor(
    props: Readonly<{
      abcNotation: string;
      parserParams: object;
      engraverParams: object;
      renderParams: object;
      close: () => void;
      setMusic: (title: string) => void;
      existingIndex: Number;
    }>
  ) {
    super(props);

    this.state = {
      abcNotation: "",
      parserParams: {},
      engraverParams: {},
      renderParams: {},
      keyInput: "C",
    };
    this.regenerate = this.regenerate.bind(this);
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.renderAbcNotation = this.renderAbcNotation.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.render = this.render.bind(this);
    this.close = this.close.bind(this);
    this.save = this.save.bind(this);
  }

  renderAbcNotation(abcNotation: string, parserParams: object, engraverParams: object, renderParams: object) {
    this.staff = abcjs.renderAbc("abcjs-result-" + this.uniqueNumber, abcNotation, parserParams, engraverParams, renderParams);
  }

  componentDidMount() {
    const { abcNotation, parserParams, engraverParams, renderParams, existingIndex } = this.props;
    this.renderAbcNotation(abcNotation, parserParams, engraverParams, renderParams);
    if (existingIndex === -1) {
      this.regenerate();
    } else {
      this.setState((current) => ({
        ...current,
        abcNotation: abcNotation,
      }));
    }
  }

  componentDidUpdate() {
    const { abcNotation, parserParams, engraverParams, renderParams } = this.state;
    this.renderAbcNotation(abcNotation, parserParams, engraverParams, renderParams);
  }

  close() {
    this.midi.stop();
    this.props.close();
  }

  save() {
    this.midi.stop();
    this.props.setMusic({ title: "Generated", file: this.state.abcNotation, type: "Generate", index: this.props.existingIndex });
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
        bars: this.bars,
        timeSignature: [4, 4],
        key: this.key,
        generations: this.generations,
        upbeatedness: this.upbeatedness,
        note_density: this.note_density < 2 ? 2 : this.note_density,
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
              {`Bars:`}
              <Input placeholder={this.bars.toString()} onChange={(event) => (this.bars = Number.parseInt(event.currentTarget.value) ?? 4)} />
            </Parameter>
            <Parameter>
              {`Key:`}
              <Input placeholder={this.key} onChange={(event) => (this.key = event.currentTarget.value)} />
            </Parameter>
            <Parameter>
              {`Sparsity:`}
              <Input placeholder={this.note_density.toString()} onChange={(event) => (this.note_density = Number.parseInt(event.currentTarget.value))} />
            </Parameter>
            <Parameter>
              {`Upbeatedness:`}
              <Input placeholder={this.upbeatedness.toString() + ".0"} onChange={(event) => (this.upbeatedness = Number.parseFloat(event.currentTarget.value))} />
            </Parameter>
            <Parameter>
              {`Generations:`}
              <Input placeholder={this.generations.toString()} onChange={(event) => (this.generations = Number.parseInt(event.currentTarget.value))} />
            </Parameter>
          </ParameterContainer>
          <div id={"abcjs-result-" + this.uniqueNumber} style={{ width: "100%" }} />
        </MainContainer>
        <ButtonContainer style={{ justifyContent: "space-between", width: "100%" }}>
          <div>
            <Button onClick={() => this.play()}>Play</Button>
            <Button onClick={() => this.stop()}>Stop</Button>
          </div>
          <Button onClick={() => this.regenerate()}>Generate</Button>
          <div>
            <Button style={{ backgroundColor: "#f76874" }} onClick={this.close}>
              Cancel
            </Button>
            <Button style={{ backgroundColor: "#6afc8a" }} onClick={this.save}>
              Save
            </Button>
          </div>
        </ButtonContainer>
      </Container>
    );
  }
}

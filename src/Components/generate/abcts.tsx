// @ts-ignore
import abcjs from 'abcjs'
import React, { Component, useRef } from 'react'
import generateMusic from './generateMusic'
import { Button, Container, ButtonContainer, MainContainer, ParameterContainer, Parameter, Input } from './abcts-styled'

type abcState = {
    abcNotation: string
    parserParams: object
    engraverParams: object
    renderParams: object
    keyInput: string
}

export class Abcts extends Component<
    {
        abcNotation: string
        parserParams: object
        engraverParams: object
        renderParams: object
        close: () => void
        setMusic: (music: any) => void
        existingIndex: Number
    },
    abcState
    > {
    uniqueNumber = Date.now() + Math.random()
    staff = undefined
    midi = new abcjs.synth.CreateSynth()
    key = 'C'

    constructor(
        props: Readonly<{
            abcNotation: string
            parserParams: object
            engraverParams: object
            renderParams: object
            close: () => void
            setMusic: (title: string) => void
            existingIndex: Number
        }>
    ) {
        super(props)

        this.state = {
            abcNotation: '',
            parserParams: {},
            engraverParams: {},
            renderParams: {},
            keyInput: 'C',
        }
        this.regenerate = this.regenerate.bind(this)
        this.play = this.play.bind(this)
        this.stop = this.stop.bind(this)
        this.renderAbcNotation = this.renderAbcNotation.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.componentDidUpdate = this.componentDidUpdate.bind(this)
        this.render = this.render.bind(this)
        this.close = this.close.bind(this)
        this.save = this.save.bind(this)
    }

    renderAbcNotation(abcNotation: string, parserParams: object, engraverParams: object, renderParams: object) {
        this.staff = abcjs.renderAbc('abcjs-result-' + this.uniqueNumber, abcNotation, parserParams, engraverParams, renderParams)
    }

    componentDidMount() {
        const { abcNotation, parserParams, engraverParams, renderParams, existingIndex } = this.props
        this.renderAbcNotation(abcNotation, parserParams, engraverParams, renderParams)
        if(existingIndex === -1){
            this.regenerate()
        }
        else{
            this.setState((current) => ({
                ...current,
                abcNotation: abcNotation
            }))
        }
    }

    componentDidUpdate() {
        const { abcNotation, parserParams, engraverParams, renderParams } = this.state
        this.renderAbcNotation(abcNotation, parserParams, engraverParams, renderParams)
    }

    close() {
        this.midi.stop();
        this.props.close();
    }

    save() {
        this.midi.stop();
        this.props.setMusic({title: 'Generated', file: this.state.abcNotation, type: 'Generate', index: this.props.existingIndex});
    }

    play() {
        if (abcjs.synth.supportsAudio()) {
            // window.AudioContext =
            //   window.AudioContext ||
            //   window.webkitAudioContext ||
            //   navigator.mozAudioContext ||
            //   navigator.msAudioContext;
            var audioContext = new window.AudioContext()
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
                        return this.midi.prime()
                    })
                    .then(() => {
                        // At this point, everything slow has happened. midiBuffer.start will return very quickly and will start playing very quickly without lag.
                        this.midi.start()
                        return Promise.resolve()
                    })
                    .catch(function (error: any) {
                        if (error.status === 'NotSupported') {
                            var audioError = document.querySelector('.audio-error')
                            if (audioError != null) audioError.setAttribute('style', '')
                        } else console.warn('synth error', error)
                    })
            })
        } else {
            var audioError = document.querySelector('.audio-error')
            if (audioError != null) audioError.setAttribute('style', '')
        }
    }

    stop() {
        this.midi.stop()
    }

    regenerate() {
        this.setState((current) => ({
            ...current,
            abcNotation: generateMusic({
                bars: 4,
                timeSignature: [4, 4],
                key: 'this.key',
                generations: 100,
            }).join(''),
        }))
    }

    render() {
        return (
            <Container>
                <h1>The Song</h1>

                <MainContainer>
                    <ParameterContainer>
                        <Parameter>
                            {`Tempo:`}
                            <Input placeholder="150" />
                        </Parameter>
                        <Parameter>
                            {`Key:`}
                            <Input value={this.key} onChange={(event) => (this.key = event.currentTarget.value)} />
                        </Parameter>
                        <Parameter>
                            {`Instrument:`}
                            <Input placeholder="Piano" />
                        </Parameter>
                        <Parameter>
                            {`Reverb:`}
                            <Input />
                        </Parameter>
                    </ParameterContainer>
                    <div id={'abcjs-result-' + this.uniqueNumber} style={{ width: '100%' }} />
                </MainContainer>
                <ButtonContainer style={{justifyContent: 'space-between', width: '100%' }}>
                    <div>
                        <Button style={{backgroundColor: "#ef64f6"}} onClick={() => this.play()}>Play</Button>
                        <Button style={{backgroundColor: "#ef64f6"}} onClick={() => this.stop()}>Stop</Button>
                    </div>
                    <Button onClick={() => this.regenerate()}>Generate</Button>
                    <div>
                        <Button style={{ backgroundColor: '#fa6464' }} onClick={this.close}>Cancel</Button>
                        <Button style={{ backgroundColor: '#6afc8a' }} onClick={this.save}>Save</Button>
                    </div>
                </ButtonContainer>
            </Container>
        )
    }
}

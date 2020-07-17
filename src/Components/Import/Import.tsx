import React, { Component } from 'react'
import './Import.css'

class Import extends Component<any, any> {
    dropRef: React.RefObject<HTMLDivElement>
    constructor(props: any) {
        super(props)

        this.state = {
            file: null,
            audio: null,
            errorMessage: false,
        }
        this.dropRef = React.createRef<HTMLDivElement>()

        this.startAudio = this.startAudio.bind(this)
        this.stopAudio = this.stopAudio.bind(this)
    }

    componentDidMount() {
        let div = this.dropRef.current
        div?.addEventListener('dragover', this.handleDrag)
        div?.addEventListener('drop', this.handleDrop)
    }

    componentWillUnmount() {
        let div = this.dropRef.current
        div?.removeEventListener('dragover', this.handleDrag)
        div?.removeEventListener('drop', this.handleDrop)
    }

    handleDrag = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
    }

    handleDrop = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        console.log(e.dataTransfer.files)
        if (e.dataTransfer.files && e.dataTransfer.files.length === 1 && e.dataTransfer.files[0].type === 'audio/mpeg') {
            this.setState({ file: e.dataTransfer.files[0] }, () => {
                this.setState({ audio: new Audio(URL.createObjectURL(this.state.file)) })
            })
            this.setState({ errorMessage: false })
        } else {
            this.setState({ errorMessage: true })
        }
    }

    startAudio() {
        this.state.audio.play()
    }

    stopAudio() {
        this.state.audio.pause()
    }

    render() {
        return (
            // <div className="App" >
            //   <header className="App-header">
            <div className="popup">
                <h2 style={{ color: 'black', textAlign: 'left', marginLeft: '0.5em' }}>Import:</h2>
                <div className="drop-inner" ref={this.dropRef}>
                    <h4 style={{ color: 'darkcyan' }}>Drop audio file here!</h4>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', flex: '1', textAlign: 'left' }}>
                    <label className={!this.state.errorMessage ? 'hidden' : ''} style={{ color: 'red' }}>
                        Error: File not supported. Please import .mp3 files only.
                    </label>
                    <label className={this.state.file === null ? 'hidden' : ''}>Current File: {this.state.file === null ? '' : this.state.file.name}</label>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
                    <div>
                        <button onClick={this.startAudio} style={{ marginRight: '10px' }}>
                            Play
                        </button>
                        <button onClick={this.stopAudio}>Stop</button>
                        <div className="audio-error" style={{ display: 'none' }}>
                            Audio is not supported in this browser.
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <button style={{ backgroundColor: 'green', marginRight: '10px', marginLeft: '10px' }} onClick={() => this.props.save(this.state.audio)}>
                            Save
                        </button>
                        <button style={{ backgroundColor: 'red' }} onClick={this.props.close}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
            //   </header>
            // </div>
        )
    }
}

export default Import

import React, { Component, useState } from "react";
import abcjs from "abcjs";
import "./Manual.css";
import WholeNote from "./images/WholeNote.png";
import DHalfNote from "./images/DHalfNote.png";
import HalfNote from "./images/HalfNote.png";
import DQuarterNote from "./images/DQuarterNote.png";
import QuarterNote from "./images/QuarterNote.png";
import DEighthNote from "./images/DEighthNote.png";
import EighthNote from "./images/EighthNote.png";
import SixteenthNote from "./images/SixteenthNote.png";
import QuarterRest from './images/QuarterRest.png';
import Sharp from "./images/Sharp.png";
import Natural from "./images/Natural.png";
import Flat from "./images/Flat.png";
import BarLine from "./images/BarLine.png";
import DBarLine from "./images/DBarLine.png";
import A3 from "./images/A3.png";
import B3 from "./images/B3.png";
import C3 from "./images/C3.png";
import D3 from "./images/D3.png";
import E3 from "./images/E3.png";
import F3 from "./images/F3.png";
import G3 from "./images/G3.png";
import A4 from "./images/A4.png";
import B4 from "./images/B4.png";
import C4 from "./images/C4.png";
import D4 from "./images/D4.png";
import E4 from "./images/E4.png";
import F4 from "./images/F4.png";
import G4 from "./images/G4.png";
import A5 from "./images/A5.png";
import B5 from "./images/B5.png";
import C5 from "./images/C5.png";
import white from "./images/white.png";

class Manual extends Component {
    constructor(props) {
        super(props);
        //ABCvalue[X, Title, Key, Meter, Tempo, Rhythm, UNL, Body]
        this.state = {
            ABCvalue: {
                X: "1",
                T: "Untitled",
                K: "C",
                M: "4/4",
                Q: "60",
                R: "",
                L: "1/4",
                "": "||",
            },
            staff: null,
            midi: new abcjs.synth.CreateSynth(),
            selectedPitch: null,
            abcShowing: false,
            showHelp: false,
            lastNoteAdded: {
                startChar: null,
                endChar: null
            }
        };

        this.removeNote = this.removeNote.bind(this);
        this.registerPitch = this.registerPitch.bind(this);
        this.clearPitch = this.clearPitch.bind(this);
        this.registerAccidental = this.registerAccidental.bind(this);
        this.registerLength = this.registerLength.bind(this);
        this.registerOther = this.registerOther.bind(this);
        this.addABCVal = this.addABCVal.bind(this);
        this.updateStaff = this.updateStaff.bind(this);
        this.createABCString = this.createABCString.bind(this);
        this.startAudio = this.startAudio.bind(this);
        this.stopAudio = this.stopAudio.bind(this);
        this.toggleAdvanced = this.toggleAdvanced.bind(this);
        this.updateProp = this.updateProp.bind(this);
        this.closeAdvanced = this.closeAdvanced.bind(this);
        this.save = this.save.bind(this)
        this.close = this.close.bind(this)
    }

    componentDidMount() {
        this.setState({
            staff: this.createEditor()
        })

        if (this.props.abcNotation != null) {
            this.setState({
                ABCvalue: this.props.abcNotation
            }, () => {
                this.setState({
                    staff: this.createEditor()
                })
            })
        }
    }

    createEditor() {
        return new abcjs.Editor("abc", {
            canvas_id: "staff",
            warnings_id: "warnings",
            abcjsParams: {
                clickListener: this.removeNote
            }
        })
    }

    removeNote(note) {
        var offset = 0;

        for (const [key, value] of Object.entries(this.state.ABCvalue)) {
            if (key !== "") {
                //SEE CREATEABCSTRING() BELOW
                offset += key.length + value.length + 4;
            }
        }

        if (note.startChar - offset != 0) {
            const newVal = {
                ...this.state.ABCvalue,
                "": this.state.ABCvalue[""].slice(0, note.startChar - offset) + this.state.ABCvalue[""].slice(note.endChar - offset),
            };
            this.setState({ ABCvalue: newVal }, () => {
                this.setState({
                    staff: this.createEditor()
                })
            });
        }
    }

    clearPitch(event) {
        this.setState({ selectedPitch: null });
    }

    registerPitch(event) {
        this.setState({ selectedPitch: event.target.id });
    }

    registerAccidental(event) {
        if (this.state.selectedPitch !== null) {
            this.setState({
                selectedPitch: event.target.id + this.state.selectedPitch,
            });
        } else {
            console.log("Please select pitch");
        }
    }

    registerLength(event) {
        if (this.state.selectedPitch !== null) {
            this.addABCVal(this.state.selectedPitch + event.target.id);
            this.setState({ selectedPitch: null });
        } else {
            console.log("Please select pitch");
        }
    }

    registerOther(event) {
        this.addABCVal(event.target.id);
    }

    addABCVal(val) {
        const newNote = {
            "startChar": this.createABCString().trim().length + 1,
            "endChar": this.createABCString().trim().length + val.length
        }

        this.setState({
            lastNoteAdded: newNote
        })

        const newVal = {
            ...this.state.ABCvalue,
            "": this.state.ABCvalue[""] + " " + val,
        };
        this.setState({ ABCvalue: newVal }, () => {
            this.setState({
                staff: this.createEditor()
            })
        });
    }

    updateStaff(event) {
        const newVal = { ...this.state.ABCvalue, "": event.target.value };
        this.setState({ ABCvalue: newVal }, () => {
            this.setState({
                staff: this.createEditor()
            })
        });
    }

    createABCString() {
        var abcString = "";
        for (const [key, value] of Object.entries(this.state.ABCvalue)) {
            if (key !== "") {
                abcString += key + ": " + value + " \n";
            } else {
                abcString += value;
            }
        }
        return abcString;
    }

    async startAudio() {
        if (abcjs.synth.supportsAudio()) {
            var visualObj = await abcjs.renderAbc("audioStaff", this.createABCString());
            var midiBuffer = this.state.midi;
            window.AudioContext = window.AudioContext || window.webkitAudioContext || navigator.mozAudioContext || navigator.msAudioContext;
            var audioContext = new window.AudioContext();
            audioContext.resume().then(function () {
                return midiBuffer
                    .init({
                        visualObj: visualObj[0],
                        audioContext: audioContext,
                        millisecondsPerMeasure: visualObj[0].millisecondsPerMeasure(),
                    })
                    .then(function (response) {
                        return midiBuffer.prime();
                    })
                    .then(function () {
                        midiBuffer.start();
                        return Promise.resolve();
                    })
                    .catch(function (error) {
                        if (error.status === "NotSupported") {
                            var audioError = document.querySelector(".audio-error");
                            audioError.setAttribute("style", "");
                        } else console.warn("synth error", error);
                    });
            });
        } else {
            var audioError = document.querySelector(".audio-error");
            audioError.setAttribute("style", "");
        }
    }

    stopAudio() {
        this.state.midi.stop();
    }

    toggleAdvanced() {
        this.setState({ openAdvanced: !this.state.openAdvanced });
    }

    closeAdvanced() {
        this.setState({
            staff: this.createEditor()
        });
        this.toggleAdvanced();
    }

    updateProp(event) {
        const newVal = {
            ...this.state.ABCvalue,
            [event.target.id]: event.target.value,
        };
        this.setState({ ABCvalue: newVal });
    }

    save() {
        this.state.midi.stop();
        this.props.save({ title: this.state.ABCvalue['T'], file: this.state.ABCvalue, type: 'Manual', index: this.props.existingIndex });
    }

    close() {
        this.state.midi.stop();
        this.props.close()
    }

    render() {
        return (
            <div className="popup" onKeyDown={this.log}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}><h2
                    style={{
                        color: "black",
                        textAlign: "left",
                        marginLeft: "1em",
                        marginBottom: "0",
                    }}
                >
                        Manual:
        </h2>
                    <button
                        style={{ height: "20px", width: "60px", outline: "none", marginTop: '1em', marginRight: "10px" }}
                        onClick={() =>
                            this.setState((current) => ({
                                ...current,
                                showHelp: true,
                            }))
                        }
                    >
                        Help
                    </button>
                </div>
                <div className={!this.state.showHelp ? "hidden" : "form-popup"}>
                    <div className="form-container">
                        <h3 style={{ color: "black", marginBottom: "10px" }}>Instructions</h3>
                        <div style={{ flex: "1", textAlign: 'left', padding: '0px 25px' }}>
                            <br />1. Choose desired pitch
                            <br />2. Select accidental (if necessary)
                            <br />3. Choose desired note length
                            <br />4. Add bar lines (if necessary)
                            <br />5. Repeat
                            <br />
                            <br />Click on the note to remove.
                            <br />
                            <br />Alternatively, if you are familiar with ABC Notation, feel free to input using the ABC Notation textbox!
                            <br />
                            <br />Happy writing!
                        </div>
                        <div>
                            <button type="button" onClick={() =>
                                this.setState((current) => ({
                                    ...current,
                                    showHelp: false,
                                }))
                            }>
                                Close
                  </button>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        flex: "1",
                        display: "flex",
                        overflowY: "auto",
                        width: "100%",
                        alignSelf: "center",
                        justifyContent: "center",
                    }}
                >
                    <div id="staff"></div>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        maxHeight: "225px",
                        overflow: "auto",
                        margin: "0px 5px",
                    }}
                >
                    <div
                        style={{
                            textAlign: "left",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                        }}
                    >
                        <label>1. Pitch or Rest</label>
                        <div className="group-div">
                            <img id="A," className="select-button-pitch" onClick={this.registerPitch} src={A3} height={"40px"} width={"40px"} alt="A3" />
                            <img id="B," className="select-button-pitch" onClick={this.registerPitch} src={B3} height={"40px"} width={"40px"} alt="B3" />
                            <img id="C" className="select-button-pitch" onClick={this.registerPitch} src={C3} height={"40px"} width={"40px"} alt="C3" />
                            <img id="D" className="select-button-pitch" onClick={this.registerPitch} src={D3} height={"40px"} width={"40px"} alt="D3" />
                            <img id="E" className="select-button-pitch" onClick={this.registerPitch} src={E3} height={"40px"} width={"40px"} alt="E3" />
                            <img id="F" className="select-button-pitch" onClick={this.registerPitch} src={F3} height={"40px"} width={"40px"} alt="F3" />
                            <img id="G" className="select-button-pitch" onClick={this.registerPitch} src={G3} height={"40px"} width={"40px"} alt="G3" />
                            <img id="A" className="select-button-pitch" onClick={this.registerPitch} src={A4} height={"40px"} width={"40px"} alt="A4" />
                            <img id="B" className="select-button-pitch" onClick={this.registerPitch} src={B4} height={"40px"} width={"40px"} alt="B4" />
                            <img id="c" className="select-button-pitch" onClick={this.registerPitch} src={C4} height={"40px"} width={"40px"} alt="C4" />
                            <img id="d" className="select-button-pitch" onClick={this.registerPitch} src={D4} height={"40px"} width={"40px"} alt="D4" />
                            <img id="e" className="select-button-pitch" onClick={this.registerPitch} src={E4} height={"40px"} width={"40px"} alt="E4" />
                            <img id="f" className="select-button-pitch" onClick={this.registerPitch} src={F4} height={"40px"} width={"40px"} alt="F4" />
                            <img id="g" className="select-button-pitch" onClick={this.registerPitch} src={G4} height={"40px"} width={"40px"} alt="G4" />
                            <img id="a" className="select-button-pitch" onClick={this.registerPitch} src={A5} height={"40px"} width={"40px"} alt="A5" />
                            <img id="b" className="select-button-pitch" onClick={this.registerPitch} src={B5} height={"40px"} width={"40px"} alt="B5" />
                            <img id="c'" className="select-button-pitch" onClick={this.registerPitch} src={C5} height={"40px"} width={"40px"} alt="C5" />
                            <img id="z" className="select-button-pitch" onClick={this.registerPitch} src={QuarterRest} height={"40px"} width={"40px"} alt="" />
                        </div>
                    </div>
                    <div style={{ textAlign: "left" }} className={!this.state.selectedPitch ? "invisible" : ""}>
                        <label>2. Accidentals</label>
                        <div className="group-div-optional">
                            <img id="^" className="select-button" onClick={this.registerAccidental} src={Sharp} height={"25px"} width={"25px"} alt="Sharp" />
                            <img id="=" className="select-button" onClick={this.registerAccidental} src={Natural} height={"25px"} width={"25px"} alt="Natural" />
                            <img id="_" className="select-button" onClick={this.registerAccidental} src={Flat} height={"25px"} width={"25px"} alt="Flat" />
                        </div>
                    </div>
                    <div style={{ textAlign: "left" }} className={!this.state.selectedPitch ? "invisible" : ""}>
                        <label>3. Note Length</label>
                        <div className="group-div-notelength">
                            <img id="4" className="select-button" onClick={this.registerLength} src={WholeNote} height={"25px"} width={"25px"} alt="WholeNote" />
                            <img id="3" className="select-button" onClick={this.registerLength} src={DHalfNote} height={"25px"} width={"25px"} alt="DHalfNote" />
                            <img id="2" className="select-button" onClick={this.registerLength} src={HalfNote} height={"25px"} width={"25px"} alt="HalfNote" />
                            <img id="3/2" className="select-button" onClick={this.registerLength} src={DQuarterNote} height={"25px"} width={"25px"} alt="DQuarterNote" />
                            <img id="1" className="select-button" onClick={this.registerLength} src={QuarterNote} height={"25px"} width={"25px"} alt="QuarterNote" />
                            <img id="3/4" className="select-button" onClick={this.registerLength} src={DEighthNote} height={"25px"} width={"25px"} alt="DEighthNote" />
                            <img id="1/2" className="select-button" onClick={this.registerLength} src={EighthNote} height={"25px"} width={"25px"} alt="EighthNote" />
                            <img id="1/4" className="select-button" onClick={this.registerLength} src={SixteenthNote} height={"25px"} width={"25px"} alt="SixteenthNote" />
                        </div>
                    </div>
                    <div style={{ textAlign: "left" }}>
                        <label>4. Other</label>
                        <div className="group-div-optional">
                            <img id="|" className="select-button" onClick={this.registerOther} src={BarLine} height={"25px"} width={"25px"} alt="BarLine" />
                            <img id="|]" className="select-button" onClick={this.registerOther} src={DBarLine} height={"25px"} width={"25px"} alt="DBarLine" />
                            <button
                                id="&#10;"
                                className="select-button"
                                style={{
                                    height: "50px",
                                    width: "50px",
                                    backgroundColor: "white",
                                }}
                                onClick={this.registerOther}
                            >
                                New <br /> Line
              </button>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        margin: "10px",
                        marginBottom: "0",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row"
                        }}
                    >
                        <label style={{ marginLeft: "0" }}>ABC Notation:</label>
                        <button
                            style={{ height: "20px", width: "60px", outline: "none", margin: "2px 10px" }}
                            onClick={() =>
                                this.setState((current) => ({
                                    ...current,
                                    abcShowing: !current.abcShowing,
                                }))
                            }
                        >
                            {this.state.abcShowing ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    {this.state.abcShowing ? <textarea style={{ minHeight: "75px" }} value={this.state.ABCvalue[""]} onChange={this.updateStaff}></textarea> : ''}
                    <textarea id="abc" className={'hidden'} value={this.createABCString()} readOnly> </textarea>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "10px",
                    }}
                >
                    <div>
                        <div id="audioStaff" hidden> </div>
                        <button onClick={this.startAudio}>Play</button>
                        <button onClick={this.stopAudio}>Stop</button>
                        <div className="audio-error" style={{ display: "none" }}>
                            Audio is not supported in this browser.
            </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                        }}
                    >
                        <button className="open-button" onClick={this.toggleAdvanced}>
                            Advanced Options
            </button>

                        <div className={!this.state.openAdvanced ? "hidden" : "form-popup"}>
                            <form action="/action_page.php" className="form-container">
                                <h3 style={{ color: "black", marginBottom: "10px" }}>Advanced Options</h3>
                                <div style={{ flex: "1" }}>
                                    <table
                                        style={{
                                            width: "100%",
                                            padding: "0px 15px",
                                            textAlign: "left",
                                        }}
                                    >
                                        <colgroup>
                                            <col style={{ width: "35%" }} />
                                            <col style={{ width: "65%" }} />
                                        </colgroup>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <label style={{ fontSize: "large" }}>
                                                        <b>Title: </b>
                                                    </label>
                                                </td>
                                                <td>
                                                    <input type="text" id="T" placeholder="Enter Title" defaultValue={this.state.ABCvalue["T"]} onChange={this.updateProp} required></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label style={{ fontSize: "large" }}>
                                                        <b>Key: </b>
                                                    </label>
                                                </td>
                                                <td>
                                                    <input type="text" id="K" placeholder="Enter Key (append 'm' for minor)" defaultValue={this.state.ABCvalue["K"]} onChange={this.updateProp} required></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label style={{ fontSize: "large" }}>
                                                        <b>Meter: </b>
                                                    </label>
                                                </td>
                                                <td>
                                                    <input type="text" id="M" placeholder="Enter Meter (ex. 4/4)" defaultValue={this.state.ABCvalue["M"]} onChange={this.updateProp} required></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label style={{ fontSize: "large" }}>
                                                        <b>Tempo: </b>
                                                    </label>
                                                </td>
                                                <td>
                                                    <input type="text" id="Q" placeholder="Enter Tempo" defaultValue={this.state.ABCvalue["Q"]} onChange={this.updateProp} required></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label style={{ fontSize: "large" }}>
                                                        <b>Rhythm: </b>
                                                    </label>
                                                </td>
                                                <td>
                                                    <input type="text" id="R" placeholder="Enter Rhythm" defaultValue={this.state.ABCvalue["R"]} onChange={this.updateProp} required></input>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div>
                                    <button type="button" onClick={this.closeAdvanced}>
                                        Close
                  </button>
                                </div>
                            </form>
                        </div>
                        <button style={{ backgroundColor: "#f76874" }} onClick={this.close}>
                            Cancel
            </button>
                        <button style={{ backgroundColor: "#6afc8a" }} onClick={this.save}>
                            Save
            </button>

                    </div>
                </div>
            </div>
        );
    }
}

export default Manual;

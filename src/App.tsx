import React, { useState } from "react";
import { Abcts } from "./Components/generate/abcts";
import generateMusic from "./Components/generate/generateMusic";
import { Router, Route, Switch } from "react-router";
import { createBrowserHistory } from "history";
import { GitThing } from "./Components/git/git";
import { Audacity } from "./Components/audacity/audacity";
import Import from "./Components/Import/Import";
import Modal from "./Components/modal/modal";
import Manual from "./Components/manual/Manual";
// @ts-ignore
import abcjs from "abcjs";

// adding a track through the manual, generate etc is not intuitive
// hide abc notation in manual
// put the advanced options on the screen in place of abc notation

// tracks need to show the notes on the staff
// master track looks like a text field
// manual flow is unintuitive
const history = createBrowserHistory();

function App() {
  const [importModalOpen, setImportModelOpen] = useState(false);
  const [generateModalOpen, setGenerateModelOpen] = useState(false);
  const [manualModalOpen, setManualModelOpen] = useState(false);
  const [tracks, setTracks] = useState<any>([]);
  let trackAudio = new abcjs.synth.CreateSynth();
  let trackIndex = null;

  const openImportModal = () => {
    setImportModelOpen(true);
  };

  const closeImportModal = () => {
    setImportModelOpen(false);
  };

  const openGenerateModal = () => {
    setGenerateModelOpen(true);
  };

  const closeGenerateModal = () => {
    setGenerateModelOpen(false);
  };

  const openManualModal = () => {
    setManualModelOpen(true);
  };

  const closeManualModal = () => {
    setManualModelOpen(false);
  };

  const play = async (index: number) => {
    console.log(tracks[index]);
    if (tracks[index][2] == 'Manual' || tracks[index][2] == 'Generate') {
      trackAudio = new abcjs.synth.CreateSynth();
      if (abcjs.synth.supportsAudio()) {
        var midiBuffer = trackAudio;
        var visualObj = await abcjs.renderAbc("staff", tracks[index][1]);
        var audioContext = new window.AudioContext();
        audioContext.resume().then(function () {
          return midiBuffer
            .init({
              visualObj: visualObj[0],
              audioContext: audioContext,
              millisecondsPerMeasure: visualObj[0].millisecondsPerMeasure(),
            })
            .then(function (response: any) {
              return midiBuffer.prime();
            })
            .then(function () {
              midiBuffer.start();
              return Promise.resolve();
            })
            .catch(function (error: any) {
              if (error.status === "NotSupported") {
                console.log("Audio unsupported")
              } else console.warn("synth error", error);
            });
        })
      }
    } 
    else if (tracks[index][2] == 'Import') {
      trackAudio = tracks[index][1];
      trackAudio.play();
    }
  }

  const stop = () => {
    trackAudio.pause();
  }

  const open = (index: number) => {
    trackIndex = index;
    if (tracks[index][2] == 'Manual') {
      setManualModelOpen(true);
    }
    else if (tracks[index][2] == 'Generate') {
      setGenerateModelOpen(true);
    }
    //TO-DO attach open to the modal
  }

  const setMusic = (url: {}) => {
    closeImportModal();
    closeGenerateModal();
    closeManualModal();
    if (!url) return;
    setTracks((current: any) => [...current, Object.values(url)]);
  };

  return (
    <div className="App">
      <Modal open={importModalOpen} close={closeImportModal}>
        <Import close={closeImportModal} save={setMusic} />
      </Modal>
      <Modal open={generateModalOpen} close={closeGenerateModal}>
        <Abcts
          abcNotation="K:C\n|::|"
          parserParams={{}}
          engraverParams={{ responsive: "resize" }}
          renderParams={{ viewportHorizontal: true }}
          close={closeGenerateModal}
          setMusic={setMusic}
        />
      </Modal>
      <Modal open={manualModalOpen} close={closeManualModal}>
        <Manual close={closeManualModal} save={setMusic}/>
      </Modal>
      <Router history={history}>
        <Switch>
          <Route path="/generateui">
            <Abcts
              abcNotation="K:C\n|::|"
              parserParams={{}}
              engraverParams={{ responsive: "resize" }}
              renderParams={{ viewportHorizontal: true }}
              close={closeGenerateModal}
              setMusic={setMusic}
            />
          </Route>
          <Route path="/git-thing">
            <GitThing />
          </Route>
          <Route path="/import">
            <Import />
          </Route>
          <Route path="/manual">
            <Manual close={() => { }} save={() => { }} />
          </Route>
          <Route path="/">
            <Audacity
              importTrack={openImportModal}
              generateTrack={openGenerateModal}
              manualTrack={openManualModal}
              tracks={tracks}
              removeTrack={(index) =>
                setTracks((current: any) => {
                  const val = current.slice(0);
                  val.splice(index, 1);
                  return val;
                })
              }
              playTrack={play}
              stopTrack={stop}
              openTrack={open}
            />
            <div id="staff" hidden></div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

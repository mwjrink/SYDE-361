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
  const [tracks, setTracks] = useState(["Piano"]);

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

  const setMusic = (url: typeof Audio) => {
    closeImportModal();
    closeGenerateModal();
    closeManualModal();
    if (!url) return;
    setTracks((current) => [...current, url?.name ?? url.toString()]);
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
        <Manual close={closeManualModal} save={setMusic} />
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
            <Manual close={() => {}} save={() => {}} />
          </Route>
          <Route path="/">
            <Audacity
              importTrack={openImportModal}
              generateTrack={openGenerateModal}
              manualTrack={openManualModal}
              tracks={tracks}
              removeTrack={(index) =>
                setTracks((current) => {
                  const val = current.slice(0);
                  val.splice(index, 1);
                  return val;
                })
              }
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

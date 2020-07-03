import React from "react";
import { Abcts } from "./Components/generate/abcts";
import generateMusic from "./Components/generate/generateMusic";
import { Router, Route, Switch } from "react-router";
import { createBrowserHistory } from "history";
import { GitThing } from "./Components/git/git";
import { Audacity } from "./Components/audacity/audacity";

const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route path="/generateui">
            <Abcts
              abcNotation="K:C\n|::|"
              parserParams={{}}
              engraverParams={{ responsive: "resize" }}
              renderParams={{ viewportHorizontal: true }}
            />
          </Route>
          <Route path="/git-thing">
            <GitThing />
          </Route>
          <Route path="/trello">
            <GitThing />
            {/* // TODO */}
          </Route>
          <Route path="/audacity">
            <Audacity />
            {/* // TODO */}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

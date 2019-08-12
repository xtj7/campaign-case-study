import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './app.scss';
import CampaignListPage from "../campaign/page/campaign-page";
import {Container} from "@material-ui/core";

const App: React.FC = () => {
  return (
      <Container maxWidth="md" className="mainContainer">
          <Switch>
              <Route exact path="/" component={CampaignListPage} />
          </Switch>
      </Container>
  );
};

export default App;

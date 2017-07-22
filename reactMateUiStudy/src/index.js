import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


import MyAwesomeReactComponent from './components/MyAwesomeReactComponent';
import MyAutoComplete from "./components/MyAutoComplete";
import BadgeExampleSimple from "./components/MyBadge";
import MyBottomNav from "./components/MyBottomNav";
import MyButtons from "./components/MyButtons";
import MyCard from "./components/MyCard";
import MyDatePicker from "./components/MyDatePicker";
import MyDialog from "./components/MyDialog";
import MyDrawer from "./components/MyDrawer";
import MyList from "./components/MyList";
import MyPaper from "./components/MyPaper";
import MyProgress from "./components/MyProgress";
import MyTabs from "./components/MyTabs";

injectTapEventPlugin();





const App = () => (
  <MuiThemeProvider>
	  <div>
	    <MyAwesomeReactComponent/>
	    <MyAutoComplete />
	    <BadgeExampleSimple />
	    <MyBottomNav />
	    <MyButtons />
	    <MyCard />
	    <MyDatePicker />
	    <MyDialog />
	    <MyDrawer />
	    <MyList />
	    <MyPaper />
	    <MyProgress />
	    <MyTabs />
	  </div>
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
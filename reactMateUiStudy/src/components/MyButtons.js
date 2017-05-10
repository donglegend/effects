import React from 'react';
import {FlatButton, RaisedButton, FloatingActionButton} from 'material-ui';

import FontIcon from 'material-ui/FontIcon';
import ActionAndroid from 'material-ui/svg-icons/action/android';

import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentLink from 'material-ui/svg-icons/content/link';
import ContentClear from 'material-ui/svg-icons/content/clear';


const FloatingActionButtonExampleSimple = () => (
	<div>
		<FloatingActionButton>
			<ContentAdd />
		</FloatingActionButton>
		<FloatingActionButton>
			<ContentLink />
		</FloatingActionButton>
		<FloatingActionButton>
			<ContentClear />
		</FloatingActionButton>
	</div>
)


const styles = {
	uploadButton: {
		verticalAlign: 'middle'
	},
	uploadInput: {
		cursor: 'pointer',
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		width: "100%",
		opacity: 0
	}
}

const FlatButtonExampleComplex = () => (
	<div>

		<FlatButton
	      label="上传图片"
	      labelPosition="before"
	      style={styles.uploadButton}
	      containerElement="label"
	    >
	    	<input type="file" style={styles.uploadInput} />
	    </FlatButton>
	    <FlatButton label="Label before" labelPosition="before" primary={true} icon={<ActionAndroid />} />
		<FlatButton
	      href="https://github.com/callemall/material-ui"
	      target="_blank"
	      label="GitHub Link"
	      secondary={true}
	      icon={<FontIcon className="muidocs-icon-custom-github" />}
	    />
	</div>
)
 
// simple flatButton
const  FlatButtonExampleSimple = () => (
	<div>
		<FlatButton label="Default" />
		<FlatButton label="Primary" primary={true} />
		<FlatButton label="Secondary" secondary={true} />
		<FlatButton label="Disabled" disabled={true} />
	</div>
)


const RaisedButtonExampleSimple = () => (
	<div>
		<RaisedButton label="Default" />
		<RaisedButton label="Primary" primary={true}/>
		<RaisedButton label="Secondary" secondary={true}/>
		<RaisedButton label="Disabled" disabled={true}/>
		<br />
		<RaisedButton label="Full width" fullWidth={true} />
	</div>
)

// class  Buttons 
class MyButtons extends React.Component {
	render() {

		return (
			<div>
				<FlatButtonExampleSimple />
				<FlatButtonExampleComplex />

				<RaisedButtonExampleSimple />

				<FloatingActionButtonExampleSimple />
			</div>
		)

	}
}


export default MyButtons;
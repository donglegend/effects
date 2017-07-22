import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default class DialogExampleSimple extends React.Component {
	state = {
		open: false,
	}
	handleOpen =  () => {
		this.setState({open: true})
	}
	handleClose =  () => {
		this.setState({open: false})
	}
	render() {
		const actions = [
			<FlatButton label="取消" primary={true} onTouchTap={this.handleClose}/>,
			<FlatButton label="提交" primary={true} keyboardFocused={true} onTouchTap={this.handleClose}/>
		];
		return (
			<div>
				<RaisedButton label="Dialog" onTouchTap={this.handleOpen} />
				<Dialog 
					title="Dialog Actions"
					actions={actions}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}>
					The actions in this window were passed in as an array of React objects
				</Dialog>
			</div>
		)
	}
}
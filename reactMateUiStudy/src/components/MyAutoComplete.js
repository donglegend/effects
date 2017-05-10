import React, {Component} from "react";

import AutoComplete from "material-ui/AutoComplete";

export default class AutoCompleteExampleSimple extends Component {
	state = {
		dataSource: [],
	}
	handleUpdateInput = (value) => {
		this.setState({
			dataSource: [
				value,
				value + this.getStr(),
				value + this.getStr()
			]
		})
	}
	getStr() {
		return (~~(Math.random() * (1 << 24))).toString(16)
	}
	render() {
		return (
			<div>
				<AutoComplete hintText="Type anything" 
				dataSource={this.state.dataSource}
				onUpdateInput = {this.handleUpdateInput}
				floatingLabelText="Full width"
				fullWidth={true}/>
			</div>
		)
	}
}
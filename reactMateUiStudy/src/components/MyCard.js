import React from 'react';
import {
	Card,
	CardActions,
	CardHeader,
	CardMedia,
	CardTitle,
	CardText
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const CardExampleWithAvatar = () => ( < Card >
	< CardHeader title = "Avatar"
	subtitle = "donglegend"
	avatar = "/res/images/2.png" / >
	<CardText>
	Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
	</CardText>
	<CardActions>
		<FlatButton label="Action one"/>
		<FlatButton label="Action two"/>
	</CardActions>
	< /Card>
)


export default CardExampleWithAvatar;
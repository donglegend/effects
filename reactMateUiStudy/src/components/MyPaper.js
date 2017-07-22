import React from 'react';
import Paper from 'material-ui/Paper';

const style = {
  height: 100,
  width: "20%",
  margin: 5,
  textAlign: 'center',
  display: 'inline-block',
};

const PaperExampleSimple = () => (
  <div>
    <Paper style={style} zDepth={1} />
    <Paper style={style} zDepth={2} />
    <Paper style={style} zDepth={3} />
    <Paper style={style} zDepth={4} />
  </div>
);

export default PaperExampleSimple;
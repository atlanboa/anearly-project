import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
  },
}));

const RadioButtonsGroup = (props) => {
  const classes = useStyles();

  const handleChange = event => {
    props.setGender(event.target.value==="남" ? 1 : 2);
  };

  return (
    <div>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">성별</FormLabel>
        <RadioGroup row aria-label="gender" name="gender2" onChange={handleChange}>
          <FormControlLabel
            value="남"
            control={<Radio color="primary" />}
            label="남"
            labelPlacement="start"
          />
          <FormControlLabel
            value="여"
            control={<Radio color="primary" />}
            label="여"
            labelPlacement="start"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
export default RadioButtonsGroup;
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
    width: "100%",
  },
  label: {
    color: "red",
  }
}));


export default function VoteSelect(props) {
  const classes = useStyles();

  const handleChange = (event) => {
    props.setValue(props.index, event.target.value);
  };

  // console.log(props.currentValue)

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <RadioGroup aria-label={"voteSelect"+props.idx} name={"voteSelect"+props.idx} onChange={handleChange}>
        {
          props.selects.map((select, idx) => {
            return (
              <FormControlLabel
                className={props.valid?"":classes.label}
                value={String(select.id)}
                control={<Radio color="primary" />}
                label={select.content}
                labelPlacement="end"
                //key={select.survey_list_id}
                key={idx}
              />
            )
          }
        )}
      </RadioGroup>
    </FormControl>
  )
}
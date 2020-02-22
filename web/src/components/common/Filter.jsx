import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Grid
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
}));

const MyFilter = () => {
  const classes = useStyles();
  const [checks, setCheck] = useState({
    Category1: false,
    Category2: false,
    Category3: false,
    Category4: false
  });
  const { Category1, Category2, Category3, Category4 } = checks;

  

  const handleChange = name => event => {
    setCheck({ ...checks, [name]: event.target.checked });
  };
  const handleAllChecked = event => {
    var json = {};
    Object.keys(checks).forEach(function(key) {
        
        json[key] = event.target.checked;

        
    });
    setCheck(json);
  };
  return (
    <Grid className={classes.root}>
      <FormControl component="fieldset">
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox value="All" onClick={handleAllChecked} />}
            label="All"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={Category1}
                onChange={handleChange("Category1")}
                value="Category1"
              />
            }
            label="키보드"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={Category2}
                onChange={handleChange("Category2")}
                value="Category2"
              />
            }
            label="마우스"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={Category3}
                onChange={handleChange("Category3")}
                value="Category3"
              />
            }
            label="모니터"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={Category4}
                onChange={handleChange("Category4")}
                value="Category4"
              />
            }
            label="권대민"
          />
        </FormGroup>
      </FormControl>
    </Grid>
  );
};

export default MyFilter;

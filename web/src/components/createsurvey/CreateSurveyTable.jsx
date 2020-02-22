import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';

import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  paper: {
    margin: "0 auto",
    border: "1px solid black",
    overflow: "auto",
    maxWidth: 800,
  },
  table: {
    minWidth: 400,
    padding: "0px",
  },
  cell: {
    marginBottom: "50px",
    backgroundColor: "#D0D3D4",
  },
  inputField: {
    width: `calc(100% - ${30}px)`,
    size: "small",
  },
});

const categories = ["모두", "남", "여"]
export default function CreateSurveyTable(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });
  
  const selectHandleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value,
    });
    props.categoryChange(event.target.value)
  };

  const selectGenderChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value
    })
    props.genderCategoryChange(event.target.value)
  }
  
  const [value, setValue] = React.useState("0");
  const handleChange = event => {
    setValue(event.target.value);
    props.optionChange(event);
  };

  const [startDate, setStartDate] = React.useState(new Date());
  const handleStartDateChange = date => {
    setStartDate(date);
    props.dateChange(date, 0);
  };
  const [endDate, setEndDate] = React.useState(new Date());
  const handleEndDateChange = date => {
    setEndDate(date);
    props.dateChange(date, 1);
  };
  const [launchDate, setLaunchDate] = React.useState(new Date());
  const handleLaunchDateChange = date => {
    setLaunchDate(date);
    props.dateChange(date, 2);
  };
  return (
    <Paper className={classes.paper}>
      <Table className={classes.table} size="small" aria-label="customized table">
        <TableBody>
          <TableRow>
            <TableCell className={classes.cell}>참여시 리워드</TableCell>
            <TableCell>
              <TextField
                className={classes.inputField}
                type="Number"
                onChange={props.rewardChange}
                inputProps={{ 'min': props.minimumPointPerParticipant }}
                helperText={props.minimumPointPerParticipant + "이상으로 입력해 주세요."}
                error={!props.validList.pointIsValid}
              />원
            </TableCell>
            <TableCell className={classes.cell}>최대 참여 인원수</TableCell>
            <TableCell>
              <TextField
                className={classes.inputField}
                type="Number"
                onChange={props.participantChange}
                inputProps={{ 'min': props.minimumParticipantNumber }}
                helperText={props.minimumParticipantNumber + "이상으로 입력해 주세요."}
                error={!props.validList.participantIsValid}
              />명
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.cell}>설문 기간 옵션</TableCell>
            <TableCell>
              <div>
                <FormControl component="fieldset">
                  <RadioGroup
                    value={value}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="0"
                      control={<Radio color="primary" />}
                      label="기간설정"
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio color="primary" />}
                      label="마감시까지"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </TableCell>
            <TableCell className={classes.cell}>설문 기간</TableCell>
            <TableCell>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    id="startDate-picker-dialog"
                    format="MM/dd/yyyy"
                    value={startDate}
                    onChange={handleStartDateChange}
                    KeyboardButtonProps={{'aria-label': 'change date',}}
                    helperText="시작일은 오늘 이후로 입력해 주세요."
                    error={!props.validList.startDateIsValid}
                  /><br></br>
                  <KeyboardDatePicker
                    id="endDate-picker-dialog"
                    format="MM/dd/yyyy"
                    value={endDate}
                    onChange={handleEndDateChange}
                    KeyboardButtonProps={{'aria-label': 'change date',}}  //?
                    helperText="종료일은 시작일 이후로 입력해 주세요."
                    error={!props.validList.endDateIsValid}
                  />
              </MuiPickersUtilsProvider>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.cell}>상품명</TableCell>
            <TableCell>
              <TextField
                className={classes.inputField}
                onChange={props.productNameChange}
                error={!props.validList.productNameIsValid}
              />
            </TableCell>
            <TableCell className={classes.cell}>예상 가격</TableCell>
            <TableCell>
              <TextField
                className={classes.inputField}
                type="Number"
                onChange={props.priceChange}
                inputProps={{ 'min': props.minimumProductPrice }}
                helperText={props.minimumProductPrice + "이상으로 입력해 주세요."}
                error={!props.validList.priceIsValid}
              />원
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.cell}>출시(예정)일</TableCell>
            <TableCell>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  id="launchDate-picker-dialog"
                  format="MM/dd/yyyy"
                  value={launchDate}
                  onChange={handleLaunchDateChange}
                  KeyboardButtonProps={{'aria-label': 'change date'}}
                />
              </MuiPickersUtilsProvider>
            </TableCell>
            <TableCell className={classes.cell}>카테고리</TableCell>
            <TableCell>
              <Select
                native
                value={state.age}
                onChange={selectHandleChange('age')}
                name="age"
                inputProps={{
                  id: 'age-native-required',
                }}
              >
                {props.categories.map(value => (
                  <option
                    key={value}
                    value={value}
                  >
                    {value}
                  </option>
                ))
                }
              </Select>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.cell}>
              선호 성별
            </TableCell>
            <TableCell>
              <Select
                native
                value={state.preferGender}
                onChange={selectGenderChange('gender')}
                name="gender"
                inputProps={{
                  id: 'gender-native-required',
                }}
              >
                {categories.map(value => (
                  <option
                    key={value}
                    value={value}
                  >
                    {value}
                  </option>
                ))
                }
              </Select>
            </TableCell>
            <TableCell className={classes.cell}>
              선호 연령
            </TableCell>
            <TableCell>
              <TextField
                className={classes.inputField}
                type="Number"
                onChange={props.preferAgeChange}
                inputProps={{ 'min': 0 }}
                helperText={"0살 이상으로 입력해 주세요. 0살은 연령상관 없음"}
                error={!props.validList.ageIsValid}
              />살
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

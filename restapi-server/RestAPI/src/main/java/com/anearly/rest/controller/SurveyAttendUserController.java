package com.anearly.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anearly.rest.db.dto.SurveyAttendUserDto;
import com.anearly.rest.db.service.SurveyAttendUserService;

@CrossOrigin
@RestController
@RequestMapping("/surveyattenduserapi")
public class SurveyAttendUserController {

	@Autowired
	SurveyAttendUserService surveyAttendUserService;

	@GetMapping("/surveyattenduser")
	public ResponseEntity<List<SurveyAttendUserDto>> selectAllSurveyAttendUser() throws Exception {

		List<SurveyAttendUserDto> list = null;
		list = surveyAttendUserService.selectAllSurveyAttendUser();

		if (list == null)
			return new ResponseEntity("Not An Existed Survey", HttpStatus.NO_CONTENT);
		else
			return new ResponseEntity(list, HttpStatus.OK);
	}

	@GetMapping("/surveyattenduser/surveyid/{id}")
	public ResponseEntity<List<SurveyAttendUserDto>> selectAllSurveyAttendUserBySurveyId(@PathVariable int id)
			throws Exception {

		List<SurveyAttendUserDto> rDto = null;
		rDto = surveyAttendUserService.selectAllSurveyAttendUserBySurveyId(id);

		if (rDto == null)
			return new ResponseEntity("Not An Existed Survey:List:Item:Result", HttpStatus.NO_CONTENT);
		else
			return new ResponseEntity(rDto, HttpStatus.OK);
	}

	@GetMapping("/surveyattenduser/id/{id}")
	public ResponseEntity<SurveyAttendUserDto> selectSurveyAttendUser(@PathVariable int id) throws Exception {

		SurveyAttendUserDto rDto = null;
		rDto = surveyAttendUserService.selectSurveyAttendUser(id);

		if (rDto == null)
			return new ResponseEntity("Not An Existed Survey", HttpStatus.NO_CONTENT);
		else
			return new ResponseEntity(rDto, HttpStatus.OK);
	}

	@PostMapping("/surveyattenduser")
	public ResponseEntity<SurveyAttendUserDto> insertSurveyAttendUser(@RequestBody SurveyAttendUserDto dto)
			throws Exception {

		surveyAttendUserService.insertSurveyAttendUser(dto);

//		SurveyAttendUserDto rDto = surveyAttendUserService.selectSurvey(dto)

		return new ResponseEntity("A Survey is Created", HttpStatus.OK);
	}

	@PutMapping("/surveyattenduser")
	public ResponseEntity<SurveyAttendUserDto> updateSurveyAttendUser(@RequestBody SurveyAttendUserDto dto)
			throws Exception {

		surveyAttendUserService.updateSurveyAttendUser(dto);

//		SurveyAttendUserDto rDto = surveyAttendUserService.selectSurvey(dto)

		return new ResponseEntity("A Survey is Updated", HttpStatus.OK);
	}

	@DeleteMapping("/surveyattenduser/{id}")
	public ResponseEntity<SurveyAttendUserDto> deleteSurveyAttendUser(@PathVariable int id) throws Exception {

		surveyAttendUserService.deleteSurveyAttendUser(id);

//		SurveyAttendUserDto rDto = surveyAttendUserService.selectSurvey(dto)

		return new ResponseEntity("A Survey is Updated", HttpStatus.OK);
	}

}

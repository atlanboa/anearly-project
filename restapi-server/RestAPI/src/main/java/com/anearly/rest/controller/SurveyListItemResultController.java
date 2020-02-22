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

import com.anearly.rest.db.dto.SurveyListItemResultDto;
import com.anearly.rest.db.service.SurveyListItemResultService;

@CrossOrigin
@RestController
@RequestMapping("/surveylistitemresultapi")
public class SurveyListItemResultController {

	@Autowired
	SurveyListItemResultService surveyListItemResultService;

	@GetMapping("/surveylistitemresults")
	public ResponseEntity<List<SurveyListItemResultDto>> selectAllSurveyListItemResult() throws Exception {
		List<SurveyListItemResultDto> list = null;
		list = surveyListItemResultService.selectAllSurveyListItemResult();
		if (list == null)
			return new ResponseEntity("Not An Existed Survey:List:Item:Result", HttpStatus.NO_CONTENT);
		else
			return new ResponseEntity(list, HttpStatus.OK);
	}

	@GetMapping("/surveylistitemresult/{id}")
	public ResponseEntity<SurveyListItemResultDto> selectSurveyListItemResult(@PathVariable int id) throws Exception {
		SurveyListItemResultDto rDto = null;
		rDto = surveyListItemResultService.selectSurveyListItemResult(id);
		if (rDto == null)
			return new ResponseEntity("Not An Existed Survey:List:Item:Result", HttpStatus.NO_CONTENT);
		else
			return new ResponseEntity(rDto, HttpStatus.OK);
	}

	@GetMapping("/surveylistitemresult/surveylistitemid/{id}")
	public ResponseEntity<List<SurveyListItemResultDto>> selectAllSurveyListItemResultBySurveyListItemId(
			@PathVariable int id) throws Exception {
		List<SurveyListItemResultDto> rDto = null;
		rDto = surveyListItemResultService.selectAllSurveyListItemResultBySurveyListItemId(id);
		if (rDto == null)
			return new ResponseEntity("Not An Existed Survey:List:Item:Result", HttpStatus.NO_CONTENT);
		else
			return new ResponseEntity(rDto, HttpStatus.OK);
	}

	@PostMapping("/surveylistitemresult")
	public ResponseEntity<SurveyListItemResultDto> insertSurveyListItemResult(@RequestBody SurveyListItemResultDto dto)
			throws Exception {
		surveyListItemResultService.insertSurveyListItemResult(dto);
		return new ResponseEntity("A Survey:List:Item:Result is Created", HttpStatus.OK);
	}

	@PutMapping("/surveylistitemresult")
	public ResponseEntity<SurveyListItemResultDto> updateSurveyListItemResult(@RequestBody SurveyListItemResultDto dto)
			throws Exception {
		surveyListItemResultService.updateSurveyListItemResult(dto);
		return new ResponseEntity("A Survey:List:Item:Result is Updated", HttpStatus.OK);
	}

	@DeleteMapping("/surveylistitemresult/{id}")
	public ResponseEntity<SurveyListItemResultDto> deleteSurveyListItemResult(@PathVariable int id) throws Exception {
		surveyListItemResultService.deleteSurveyListItemResult(id);
		return new ResponseEntity("A Survey:List:Item:Result is Updated", HttpStatus.OK);
	}

}

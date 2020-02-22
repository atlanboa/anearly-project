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

import com.anearly.rest.db.dto.SurveyListDto;
import com.anearly.rest.db.service.SurveyListService;

@CrossOrigin
@RestController
@RequestMapping("/surveylistapi")
public class SurveyListController {

	@Autowired
	SurveyListService surveyListService;

	@GetMapping("/surveylists")
	public ResponseEntity<List<SurveyListDto>> getAllSurveyList() throws Exception {
		List<SurveyListDto> list = null;
		list = surveyListService.selectAllSurveyList();
		if (list == null)
			return new ResponseEntity("Not An Existed Survey:List", HttpStatus.NO_CONTENT);
		else
			return new ResponseEntity(list, HttpStatus.OK);
	}

	@GetMapping("/surveylist/id/{id}")
	public ResponseEntity<SurveyListDto> getSurveyList(@PathVariable int id) throws Exception {
		SurveyListDto rDto = null;
		rDto = surveyListService.selectSurveyList(id);

		if (rDto == null)
			return new ResponseEntity("Not An Existed Survey:List", HttpStatus.NO_CONTENT);
		else
			return new ResponseEntity(rDto, HttpStatus.OK);
	}

	@GetMapping("/surveylist/surveyid/{id}")
	public ResponseEntity<List<SurveyListDto>> getSurveyListBySurveyId(@PathVariable int id) throws Exception {
		List<SurveyListDto> rDto = null;
		rDto = surveyListService.selectSurveyListBySurveyId(id);
		if (rDto == null)
			return new ResponseEntity("Not An Existed Survey:List", HttpStatus.NO_CONTENT);
		else
			return new ResponseEntity(rDto, HttpStatus.OK);
	}

	@PostMapping("/surveylist")
	public ResponseEntity<SurveyListDto> createSurveyList(@RequestBody SurveyListDto dto) throws Exception {
		surveyListService.insertSurveyList(dto);
//		SurveyListDto rDto = surveyListService.selectSurvey(dto)
		return new ResponseEntity("A Survey:List is Created", HttpStatus.OK);
	}

	@PutMapping("/surveylist")
	public ResponseEntity<SurveyListDto> updateSurveyList(@RequestBody SurveyListDto dto) throws Exception {
		surveyListService.updateSurveyList(dto);
//		SurveyListDto rDto = surveyListService.selectSurvey(dto)
		return new ResponseEntity("A Survey:List is Updated", HttpStatus.OK);
	}

	@DeleteMapping("/surveylist/{id}")
	public ResponseEntity<SurveyListDto> deleteSurveyList(@PathVariable int id) throws Exception {
		surveyListService.deleteSurveyList(id);
//		SurveyListDto rDto = surveyListService.selectSurvey(dto)
		return new ResponseEntity("A Survey:List is Updated", HttpStatus.OK);
	}

}

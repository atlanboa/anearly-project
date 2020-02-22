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

import com.anearly.rest.db.dto.SurveyReviewResultDto;
import com.anearly.rest.db.service.SurveyReviewResultService;

@CrossOrigin
@RestController
@RequestMapping("/surveyreviewresultapi")
public class SurveyReviewResultController {

	@Autowired
	SurveyReviewResultService surveyReviewResultService;

	@GetMapping("/surveyreviewresult")
	public ResponseEntity<List<SurveyReviewResultDto>> selectAllSurveyReviewResult() throws Exception {
		List<SurveyReviewResultDto> list = null;
		list = surveyReviewResultService.selectAllSurveyReviewResult();
		if (list == null)
			return new ResponseEntity("Not An Existed Survey:Review:Result", HttpStatus.NO_CONTENT);
		else
			return new ResponseEntity(list, HttpStatus.OK);
	}

	@GetMapping("/surveyreviewresult/surveyreviewid/{id}")
	public ResponseEntity<List<SurveyReviewResultDto>> selectAllSurveyReviewResult(@PathVariable int id)
			throws Exception {
		List<SurveyReviewResultDto> list = null;
		list = surveyReviewResultService.selectAllSurveyReviewResultBySurveyReviewId(id);
		if (list == null)
			return new ResponseEntity("Not An Existed Survey:Review:Result", HttpStatus.NO_CONTENT);
		else
			return new ResponseEntity(list, HttpStatus.OK);
	}

	@GetMapping("/surveyreviewresult/{id}")
	public ResponseEntity<SurveyReviewResultDto> selectSurveyReviewResult(@PathVariable int id) throws Exception {
		SurveyReviewResultDto rDto = null;
		rDto = surveyReviewResultService.selectSurveyReviewResult(id);
		if (rDto == null)
			return new ResponseEntity("Not An Existed Survey:Review:Result", HttpStatus.NO_CONTENT);
		else
			return new ResponseEntity(rDto, HttpStatus.OK);
	}

	@PostMapping("/surveyreviewresult")
	public ResponseEntity<SurveyReviewResultDto> insertSurveyReviewResult(@RequestBody SurveyReviewResultDto dto)
			throws Exception {

		surveyReviewResultService.insertSurveyReviewResult(dto);

//		SurveyReviewResultDto rDto = surveyReviewResultService.selectSurvey(dto)

		return new ResponseEntity("A Survey:Review:Result is Created", HttpStatus.OK);
	}

	@PutMapping("/surveyreviewresult")
	public ResponseEntity<SurveyReviewResultDto> updateSurveyReviewResult(@RequestBody SurveyReviewResultDto dto)
			throws Exception {

		surveyReviewResultService.updateSurveyReviewResult(dto);

//		SurveyReviewResultDto rDto = surveyReviewResultService.selectSurvey(dto)

		return new ResponseEntity("A Survey:Review:Result is Updated", HttpStatus.OK);
	}

	@DeleteMapping("/surveyreviewresult/{id}")
	public ResponseEntity<SurveyReviewResultDto> deleteSurveyReviewResult(@PathVariable int id) throws Exception {

		surveyReviewResultService.deleteSurveyReviewResult(id);
//		SurveyReviewResultDto rDto = surveyReviewResultService.selectSurvey(dto)

		return new ResponseEntity("A Survey:Review:Result is Updated", HttpStatus.OK);
	}

}

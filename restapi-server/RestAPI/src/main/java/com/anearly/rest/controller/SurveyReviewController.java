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

import com.anearly.rest.db.dto.SurveyReviewDto;
import com.anearly.rest.db.service.SurveyReviewService;

@CrossOrigin
@RestController
@RequestMapping("/surveyreviewapi")
public class SurveyReviewController {

	@Autowired
	SurveyReviewService surveyReviewService;

	@GetMapping("/surveyreivews")
	public ResponseEntity<List<SurveyReviewDto>> selectAllSurveyReview() throws Exception {
		List<SurveyReviewDto> list = null;
		list = surveyReviewService.selectAllSurveyReview();
		if (list == null)
			return new ResponseEntity("Not An Existed Survey:Review", HttpStatus.NO_CONTENT);
		else
			return new ResponseEntity(list, HttpStatus.OK);
	}

	@GetMapping("/surveyreivew/{id}")
	public ResponseEntity<SurveyReviewDto> selectSurveyReview(@PathVariable int id) throws Exception {
		SurveyReviewDto rDto = null;
		rDto = surveyReviewService.selectSurveyReview(id);
		if (rDto == null)
			return new ResponseEntity("Not An Existed Survey:Review", HttpStatus.NO_CONTENT);
		else
			return new ResponseEntity(rDto, HttpStatus.OK);
	}

	@PostMapping("/surveyreivew")
	public ResponseEntity<SurveyReviewDto> insertSurveyReview(@RequestBody SurveyReviewDto dto) throws Exception {
		surveyReviewService.insertSurveyReview(dto);
		return new ResponseEntity("A Survey:Review is Created", HttpStatus.OK);
	}

	@PutMapping("/surveyreivew")
	public ResponseEntity<SurveyReviewDto> updateSurveyReview(@RequestBody SurveyReviewDto dto) throws Exception {
		surveyReviewService.updateSurveyReview(dto);
		return new ResponseEntity("A Survey:Review is Updated", HttpStatus.OK);
	}

	@DeleteMapping("/surveyreivew/{id}")
	public ResponseEntity<SurveyReviewDto> deleteSurveyReview(@PathVariable int id) throws Exception {
		surveyReviewService.deleteSurveyReview(id);
		return new ResponseEntity("A Survey:Review is Updated", HttpStatus.OK);
	}

}

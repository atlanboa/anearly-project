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

import com.anearly.rest.db.dto.SurveyListItemDto;
import com.anearly.rest.db.service.SurveyListItemService;

@CrossOrigin
@RestController
@RequestMapping("/surveylistitemapi")
public class SurveyListItemController {

	@Autowired
	SurveyListItemService surveyListItemService;

	@GetMapping("/surveylistitems")
	public ResponseEntity<List<SurveyListItemDto>> selectAllSurveyListItem() throws Exception {
		List<SurveyListItemDto> list = null;
		list = surveyListItemService.selectAllSurveyListItem();
		if (list == null)
			return new ResponseEntity("Not An Existed Survey", HttpStatus.NO_CONTENT);
		else
			return new ResponseEntity(list, HttpStatus.OK);
	}

	@GetMapping("/surveylistitem/surveylistid/{id}")
	public ResponseEntity<List<SurveyListItemDto>> selectAllSurveyListItemBySurveyListId(@PathVariable int id)
			throws Exception {
		List<SurveyListItemDto> list = null;
		list = surveyListItemService.selectAllSurveyListItemBySurveyListId(id);
		if (list == null)
			return new ResponseEntity("Not An Existed Survey", HttpStatus.NO_CONTENT);
		else
			return new ResponseEntity(list, HttpStatus.OK);
	}

	@GetMapping("/surveylistitem/{id}")
	public ResponseEntity<SurveyListItemDto> selectSurveyListItem(@PathVariable int id) throws Exception {

		SurveyListItemDto rDto = null;
		rDto = surveyListItemService.selectSurveyListItem(id);

		if (rDto == null)
			return new ResponseEntity("Not An Existed Survey", HttpStatus.NO_CONTENT);
		else
			return new ResponseEntity(rDto, HttpStatus.OK);
	}

	@PostMapping("/surveylistitem")
	public ResponseEntity<SurveyListItemDto> createSurvey(@RequestBody SurveyListItemDto dto) throws Exception {
		surveyListItemService.insertSurveyListItem(dto);
		return new ResponseEntity("A Survey is Created", HttpStatus.OK);
	}

	@PutMapping("/surveylistitem")
	public ResponseEntity<SurveyListItemDto> updateSurvey(@RequestBody SurveyListItemDto dto) throws Exception {
		surveyListItemService.updateSurveyListItem(dto);
		return new ResponseEntity("A Survey is Updated", HttpStatus.OK);
	}

	@DeleteMapping("/surveylistitem/{id}")
	public ResponseEntity<SurveyListItemDto> deleteSurvey(@PathVariable int id) throws Exception {
		surveyListItemService.deleteSurveyListItem(id);
		return new ResponseEntity("A Survey is Updated", HttpStatus.OK);
	}

}

package com.anearly.rest.db.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anearly.rest.db.dto.SurveyListAndReviewDto;
import com.anearly.rest.db.mapper.SurveyListAndReviewMapper;

@Service
public class SurveyListAndReviewService {
	
	@Autowired
	SurveyListAndReviewMapper mapper;
	
	
	public List<SurveyListAndReviewDto> getAllSurveyListAndReviewBySurveyId(int id) throws Exception{
		return mapper.getAllSurveyListAndReviewBySurveyId(id);
	};
}

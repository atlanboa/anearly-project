package com.anearly.rest.db.mapper;

import java.util.List;

import com.anearly.rest.db.dto.SurveyListAndReviewDto;

public interface SurveyListAndReviewMapper {
	List<SurveyListAndReviewDto> getAllSurveyListAndReviewBySurveyId(int id) throws Exception;
}

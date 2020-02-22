package com.anearly.rest.db.mapper;

import java.util.List;

import com.anearly.rest.db.dto.SurveyAnalysisDto;
import com.anearly.rest.db.dto.SurveyReviewDto;

public interface SurveyReviewMapper {
	List<SurveyReviewDto> selectAllSurveyReview() throws Exception;

	List<SurveyAnalysisDto> selectAllSurveyReviewBySurveyId(int id) throws Exception;

	SurveyReviewDto selectSurveyReview(int id) throws Exception;

	void insertSurveyReview(SurveyReviewDto dto) throws Exception;

	void deleteSurveyReview(int id) throws Exception;

	void updateSurveyReview(SurveyReviewDto dto) throws Exception;
}

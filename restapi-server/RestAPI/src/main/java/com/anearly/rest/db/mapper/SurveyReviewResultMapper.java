package com.anearly.rest.db.mapper;

import java.util.List;

import com.anearly.rest.db.dto.SurveyAnalysisListDto;
import com.anearly.rest.db.dto.SurveyReviewResultDto;

public interface SurveyReviewResultMapper {
	SurveyReviewResultDto selectSurveyReviewResult(int id) throws Exception;

	List<SurveyReviewResultDto> selectAllSurveyReviewResult() throws Exception;

	List<SurveyReviewResultDto> selectAllSurveyReviewResultBySurveyReviewId(int id) throws Exception;
	
	List<SurveyAnalysisListDto> selectAllSurveyReviewResultBySurveyReviewId2(int id) throws Exception;

	void insertSurveyReviewResult(SurveyReviewResultDto dto) throws Exception;

	void deleteSurveyReviewResult(int id) throws Exception;

	void updateSurveyReviewResult(SurveyReviewResultDto dto) throws Exception;
}

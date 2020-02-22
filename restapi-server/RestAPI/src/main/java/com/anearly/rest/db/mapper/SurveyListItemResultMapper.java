package com.anearly.rest.db.mapper;

import java.util.List;

import com.anearly.rest.db.dto.SurveyListItemResultDto;

public interface SurveyListItemResultMapper {
	List<SurveyListItemResultDto> selectAllSurveyListItemResult() throws Exception;

	List<SurveyListItemResultDto> selectAllSurveyListItemResultBySurveyListItemId(int id) throws Exception;

	SurveyListItemResultDto selectSurveyListItemResult(int id) throws Exception;

	void insertSurveyListItemResult(SurveyListItemResultDto dto) throws Exception;

	void deleteSurveyListItemResult(int id) throws Exception;

	void updateSurveyListItemResult(SurveyListItemResultDto dto) throws Exception;
}

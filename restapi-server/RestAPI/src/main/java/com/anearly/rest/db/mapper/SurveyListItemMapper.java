package com.anearly.rest.db.mapper;

import java.util.List;

import com.anearly.rest.db.dto.SurveyAnalysisListDto;
import com.anearly.rest.db.dto.SurveyListItemDto;

public interface SurveyListItemMapper {
	List<SurveyListItemDto> selectAllSurveyListItem() throws Exception;

	List<SurveyListItemDto> selectAllSurveyListItemBySurveyListId(int id) throws Exception;

	SurveyListItemDto selectSurveyListItem(int id) throws Exception;

	void insertSurveyListItem(SurveyListItemDto dto) throws Exception;

	void deleteSurveyListItem(int id) throws Exception;

	void updateSurveyListItem(SurveyListItemDto dto) throws Exception;
	
	List<SurveyAnalysisListDto> getAnalysisByListId(int id) throws Exception;
}

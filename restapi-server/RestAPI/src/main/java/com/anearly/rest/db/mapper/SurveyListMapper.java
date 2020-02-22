package com.anearly.rest.db.mapper;

import java.util.List;

import com.anearly.rest.db.dto.SurveyAnalysisDto;
import com.anearly.rest.db.dto.SurveyListDto;

public interface SurveyListMapper {

	List<SurveyListDto> selectAllSurveyList() throws Exception;

	SurveyListDto selectSurveyList(int ido) throws Exception;

	List<SurveyListDto> selectSurveyListBySurveyId(int id) throws Exception;

	void insertSurveyList(SurveyListDto dto) throws Exception;

	void deleteSurveyList(int id) throws Exception;

	void updateSurveyList(SurveyListDto dto) throws Exception;
	
	List<SurveyAnalysisDto> selectSurveyListIdBySurveyId(int id) throws Exception;
	
	

}

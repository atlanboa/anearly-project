package com.anearly.rest.db.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.anearly.rest.db.dto.SurveyDto;

public interface SurveyMapper {

	SurveyDto selectSurvey(int id) throws Exception;

	List<SurveyDto> selectAllSurvey() throws Exception;

	List<SurveyDto> selectAllSurveyByUserId(int id) throws Exception;
	
	List<SurveyDto> selectAllSurveyByApproval(int approval) throws Exception;
	
	List<SurveyDto> selectAllDeadlineNearSurvey(@Param("approved")int approved, @Param("open") int open) throws Exception;
	
	List<SurveyDto> selectAllSurveyByTarget(int device) throws Exception;
	
	void insertSurvey(SurveyDto dto) throws Exception;

	void updateSurvey(SurveyDto dto) throws Exception;

	void deleteSurvey(int id) throws Exception;
	
	void updateSurveyParticipant(int id) throws Exception;
	
	void updateSurveyApproval(@Param("approval") int approval, @Param("survey_id") int survey_id) throws Exception;
	
	void updateSurveyOpenStatus(@Param("status") int status, @Param("survey_id") int survey_id) throws Exception;
	
	void updateSurveyOpenStatusByEndDate(@Param("close") int close, @Param("open") int open) throws Exception;

}

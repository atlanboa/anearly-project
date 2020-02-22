package com.anearly.rest.db.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.anearly.rest.db.dto.SurveyAttendHistoryDto;
import com.anearly.rest.db.dto.SurveyAttendUserDto;

public interface SurveyAttendUserMapper {

	List<SurveyAttendUserDto> selectAllSurveyAttendUser() throws Exception;

	List<SurveyAttendUserDto> selectAllSurveyAttendUserBySurveyId(int id) throws Exception;

	SurveyAttendUserDto selectSurveyAttendUser(int id) throws Exception;
	
	SurveyAttendUserDto selectSurveyAttendUser2(@Param("user_id") int user_id, @Param("survey_id") int survey_id) throws Exception;

	void insertSurveyAttendUser(SurveyAttendUserDto dto) throws Exception;

	void deleteSurveyAttendUser(int id) throws Exception;

	void updateSurveyAttendUser(SurveyAttendUserDto dto) throws Exception;
	
	List<SurveyAttendHistoryDto> selectSurveyAttendHistoryByUserId(int id) throws Exception;
}

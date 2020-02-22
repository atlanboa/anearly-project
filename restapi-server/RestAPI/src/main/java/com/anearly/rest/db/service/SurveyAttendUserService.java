package com.anearly.rest.db.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anearly.rest.db.dto.SurveyAttendHistoryDto;
import com.anearly.rest.db.dto.SurveyAttendUserDto;
import com.anearly.rest.db.mapper.SurveyAttendUserMapper;

@Service
public class SurveyAttendUserService {

	@Autowired
	SurveyAttendUserMapper mapper;

	public List<SurveyAttendUserDto> selectAllSurveyAttendUser() throws Exception {
		return mapper.selectAllSurveyAttendUser();
	};

	public List<SurveyAttendUserDto> selectAllSurveyAttendUserBySurveyId(int id) throws Exception {
		return mapper.selectAllSurveyAttendUserBySurveyId(id);
	};

	public SurveyAttendUserDto selectSurveyAttendUser(int id) throws Exception {
		return mapper.selectSurveyAttendUser(id);
	};
	
	public 	SurveyAttendUserDto selectSurveyAttendUser2(int user_id, int survey_id) throws Exception{
		return mapper.selectSurveyAttendUser2(user_id, survey_id);
	};

	public void insertSurveyAttendUser(SurveyAttendUserDto dto) throws Exception {
		mapper.insertSurveyAttendUser(dto);
	};

	public void deleteSurveyAttendUser(int id) throws Exception {
		mapper.deleteSurveyAttendUser(id);
	};

	public void updateSurveyAttendUser(SurveyAttendUserDto dto) throws Exception {
		mapper.updateSurveyAttendUser(dto);
	};
	
	public List<SurveyAttendHistoryDto> selectSurveyAttendHistoryByUserId(int id) throws Exception{
		return mapper.selectSurveyAttendHistoryByUserId(id);
	};
}

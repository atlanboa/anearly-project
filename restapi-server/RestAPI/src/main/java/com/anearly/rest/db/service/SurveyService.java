package com.anearly.rest.db.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anearly.rest.db.dto.SurveyDto;
import com.anearly.rest.db.mapper.SurveyMapper;

@Service
public class SurveyService {

	@Autowired
	SurveyMapper mapper;

	public SurveyDto selectSurvey(int id) throws Exception {
		return mapper.selectSurvey(id);
	};

	public List<SurveyDto> selectAllSurvey() throws Exception {
		return mapper.selectAllSurvey();
	};

	public List<SurveyDto> selectAllSurveyByUserId(int id) throws Exception {
		return mapper.selectAllSurveyByUserId(id);
	};
	
	public List<SurveyDto> selectAllSurveyByApproval(int approval) throws Exception{
		return mapper.selectAllSurveyByApproval(approval);
	};
	
	public List<SurveyDto> selectAllDeadlineNearSurvey(int approved, int open) throws Exception{
		return mapper.selectAllDeadlineNearSurvey(approved, open);
	};
	
	public List<SurveyDto> selectAllSurveyByTarget(int device) throws Exception{
		return mapper.selectAllSurveyByTarget(device);
	};

	public void insertSurvey(SurveyDto dto) throws Exception {
		mapper.insertSurvey(dto);
	};

	public void updateSurvey(SurveyDto dto) throws Exception {
		mapper.updateSurvey(dto);
	};

	public void deleteSurvey(int id) throws Exception {
		mapper.deleteSurvey(id);
	};
	
	public void updateSurveyParticipant(int id) throws Exception {
		mapper.updateSurveyParticipant(id);
	};
	
	public void updateSurveyApproval(int approval, int survey_id) throws Exception{
		mapper.updateSurveyApproval(approval, survey_id);
	};
	
	public void updateSurveyOpenStatus(int status, int survey_id) throws Exception{
		mapper.updateSurveyOpenStatus(status, survey_id);
	};
	
	public void updateSurveyOpenStatusByEndDate(int close, int open) throws Exception{
		mapper.updateSurveyOpenStatusByEndDate(close, open);
	};

}

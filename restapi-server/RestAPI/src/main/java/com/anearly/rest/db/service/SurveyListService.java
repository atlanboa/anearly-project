package com.anearly.rest.db.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anearly.rest.db.dto.SurveyAnalysisDto;
import com.anearly.rest.db.dto.SurveyListDto;
import com.anearly.rest.db.mapper.SurveyListMapper;

@Service
public class SurveyListService {

	@Autowired
	SurveyListMapper mapper;

	public List<SurveyListDto> selectAllSurveyList() throws Exception {
		return mapper.selectAllSurveyList();
	};

	public List<SurveyListDto> selectSurveyListBySurveyId(int id) throws Exception {
		return mapper.selectSurveyListBySurveyId(id);
	};

	public SurveyListDto selectSurveyList(int id) throws Exception {
		return mapper.selectSurveyList(id);
	};

	public void insertSurveyList(SurveyListDto dto) throws Exception {
		mapper.insertSurveyList(dto);
	};

	public void deleteSurveyList(int id) throws Exception {
		mapper.deleteSurveyList(id);
	};

	public void updateSurveyList(SurveyListDto dto) throws Exception {
		mapper.updateSurveyList(dto);
	};

	public List<SurveyAnalysisDto> selectSurveyListIdBySurveyId(int id) throws Exception{
		return mapper.selectSurveyListIdBySurveyId(id);
	};
}

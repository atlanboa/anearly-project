package com.anearly.rest.db.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anearly.rest.db.dto.SurveyListItemResultDto;
import com.anearly.rest.db.mapper.SurveyListItemResultMapper;

@Service
public class SurveyListItemResultService {

	@Autowired
	SurveyListItemResultMapper mapper;

	public SurveyListItemResultDto selectSurveyListItemResult(int id) throws Exception {
		return mapper.selectSurveyListItemResult(id);
	};

	public List<SurveyListItemResultDto> selectAllSurveyListItemResultBySurveyListItemId(int id) throws Exception {
		return mapper.selectAllSurveyListItemResultBySurveyListItemId(id);
	};

	public List<SurveyListItemResultDto> selectAllSurveyListItemResult() throws Exception {
		return mapper.selectAllSurveyListItemResult();
	};

	public void insertSurveyListItemResult(SurveyListItemResultDto dto) throws Exception {
		mapper.insertSurveyListItemResult(dto);
	};

	public void updateSurveyListItemResult(SurveyListItemResultDto dto) throws Exception {
		mapper.updateSurveyListItemResult(dto);
	};

	public void deleteSurveyListItemResult(int id) throws Exception {
		mapper.deleteSurveyListItemResult(id);
	};
}

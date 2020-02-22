package com.anearly.rest.db.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anearly.rest.db.dto.SurveyAnalysisListDto;
import com.anearly.rest.db.dto.SurveyListItemDto;
import com.anearly.rest.db.mapper.SurveyListItemMapper;

@Service
public class SurveyListItemService {

	@Autowired
	SurveyListItemMapper mapper;

	public SurveyListItemDto selectSurveyListItem(int id) throws Exception {
		return mapper.selectSurveyListItem(id);
	};

	public List<SurveyListItemDto> selectAllSurveyListItem() throws Exception {
		return mapper.selectAllSurveyListItem();
	};

	public List<SurveyListItemDto> selectAllSurveyListItemBySurveyListId(int id) throws Exception {
		return mapper.selectAllSurveyListItemBySurveyListId(id);
	};

	public void insertSurveyListItem(SurveyListItemDto dto) throws Exception {
		mapper.insertSurveyListItem(dto);
	};

	public void deleteSurveyListItem(int id) throws Exception {
		mapper.deleteSurveyListItem(id);
	};

	public void updateSurveyListItem(SurveyListItemDto dto) throws Exception {
		mapper.updateSurveyListItem(dto);
	};

	public List<SurveyAnalysisListDto> getAnalysisByListId(int id) throws Exception{
		return mapper.getAnalysisByListId(id);
	};
}

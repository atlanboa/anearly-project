package com.anearly.rest.db.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anearly.rest.db.dto.SurveyAnalysisListDto;
import com.anearly.rest.db.dto.SurveyReviewResultDto;
import com.anearly.rest.db.mapper.SurveyReviewResultMapper;

@Service
public class SurveyReviewResultService {

	@Autowired
	SurveyReviewResultMapper mapper;

	public List<SurveyReviewResultDto> selectAllSurveyReviewResult() throws Exception {
		return mapper.selectAllSurveyReviewResult();
	};

	public List<SurveyReviewResultDto> selectAllSurveyReviewResultBySurveyReviewId(int id) throws Exception {
		return mapper.selectAllSurveyReviewResultBySurveyReviewId(id);
	};

	public List<SurveyAnalysisListDto> selectAllSurveyReviewResultBySurveyReviewId2(int id) throws Exception{
		return mapper.selectAllSurveyReviewResultBySurveyReviewId2(id);
	};
	
	public SurveyReviewResultDto selectSurveyReviewResult(int id) throws Exception {
		return mapper.selectSurveyReviewResult(id);
	};

	public void insertSurveyReviewResult(SurveyReviewResultDto dto) throws Exception {
		mapper.insertSurveyReviewResult(dto);
	};

	public void deleteSurveyReviewResult(int id) throws Exception {
		mapper.deleteSurveyReviewResult(id);
	};

	public void updateSurveyReviewResult(SurveyReviewResultDto dto) throws Exception {
		mapper.updateSurveyReviewResult(dto);
	};

}

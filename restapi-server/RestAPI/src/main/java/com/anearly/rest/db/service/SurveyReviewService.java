package com.anearly.rest.db.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anearly.rest.db.dto.SurveyAnalysisDto;
import com.anearly.rest.db.dto.SurveyReviewDto;
import com.anearly.rest.db.mapper.SurveyReviewMapper;

@Service
public class SurveyReviewService {

	@Autowired
	SurveyReviewMapper mapper;

	public SurveyReviewDto selectSurveyReview(int id) throws Exception {
		return mapper.selectSurveyReview(id);
	};

	public List<SurveyAnalysisDto> selectAllSurveyReviewBySurveyId(int id) throws Exception {
		return mapper.selectAllSurveyReviewBySurveyId(id);
	};

	public List<SurveyReviewDto> selectAllSurveyReview() throws Exception {
		return mapper.selectAllSurveyReview();
	};

	public void insertSurveyReview(SurveyReviewDto dto) throws Exception {
		mapper.insertSurveyReview(dto);
	};

	public void deleteSurveyReview(int id) throws Exception {
		mapper.deleteSurveyReview(id);
	};

	public void updateSurveyReview(SurveyReviewDto dto) throws Exception {
		mapper.updateSurveyReview(dto);
	};

}

package com.anearly.rest.scheduler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.anearly.rest.db.service.SurveyService;
import com.anearly.rest.util.SurveyStatus;

@Component
public class Scheduler {
	
	@Autowired
	private SurveyService surveyService;
	
	@Scheduled(cron = "0 0 0 * * ?")
	public void closeSurvey() throws Exception {
		System.out.println("기한 날짜가 지난 설문을 종료합니다.........");
		surveyService.updateSurveyOpenStatusByEndDate(SurveyStatus.CLOSE, SurveyStatus.OPEN);
	}
	
}

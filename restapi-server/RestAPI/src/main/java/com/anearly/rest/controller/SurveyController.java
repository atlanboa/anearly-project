package com.anearly.rest.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anearly.rest.db.dto.SurveyDto;
import com.anearly.rest.db.dto.UserDto;
import com.anearly.rest.db.service.SurveyService;
import com.anearly.rest.db.service.UserService;
import com.anearly.rest.security.JwtService;
import com.anearly.rest.util.SurveyStatus;

import io.swagger.annotations.ApiOperation;

@CrossOrigin
@RestController
@RequestMapping("/surveyapi")
public class SurveyController {

	@Autowired
	private SurveyService surveyService;
	@Autowired
	private UserService userService;
	@Autowired
	private JwtService jwtService;

	@GetMapping("/surveys")
	public ResponseEntity<List<SurveyDto>> selectAllSurvey() throws Exception {
		List<SurveyDto> list = null;
		list = surveyService.selectAllSurvey();
		if (list == null)
			return new ResponseEntity("Not An Existed Survey", HttpStatus.NO_CONTENT);
		else
			return new ResponseEntity(list, HttpStatus.OK);
	}

	@GetMapping("/survey/userid/{id}")
	public ResponseEntity<List<SurveyDto>> selectAllSurveyByUserId(@PathVariable int id) throws Exception {
		List<SurveyDto> list = null;
		list = surveyService.selectAllSurveyByUserId(id);
		if (list == null)
			return new ResponseEntity("Not An Existed Survey", HttpStatus.NO_CONTENT);
		else
			return new ResponseEntity(list, HttpStatus.OK);
	}

	@GetMapping("/survey/id/{id}")
	public ResponseEntity<SurveyDto> selectSurvey(@PathVariable int id) throws Exception {
		SurveyDto rDto = null;
		rDto = surveyService.selectSurvey(id);
		if (rDto == null)
			return new ResponseEntity("Not An Existed Survey", HttpStatus.NO_CONTENT);
		else
			return new ResponseEntity(rDto, HttpStatus.OK);
	}

	@ApiOperation(value = "approval :: 0, 1 " + " 0이면 미승인, 1이면 승인", notes = "설문의 승인 상태에 따라 설문을 받아오는 api")
	@GetMapping("/survey/approval/{approval}")
	public ResponseEntity<List<SurveyDto>> selectAllSurveyByApproval(@PathVariable int approval)
			throws Exception {
		List<SurveyDto> list = null;
		list = surveyService.selectAllSurveyByApproval(approval);
		if (list == null)
			return new ResponseEntity("There is no approval survey", HttpStatus.NO_CONTENT);
		else
			return new ResponseEntity(list, HttpStatus.OK);
	}
	
	@ApiOperation(value = "마감에 임박한 설문 8개", notes = "승인된 설문중 열려있는 설문 마감순으로 8개 받아오는 api")
	@GetMapping("/survey/deadline")
	public ResponseEntity<List<SurveyDto>> selectAllDeadlineNearSurvey()
			throws Exception {
		List<SurveyDto> list = null;
		list = surveyService.selectAllDeadlineNearSurvey(SurveyStatus.APPROVED, SurveyStatus.OPEN);
		if (list == null)
			return new ResponseEntity("No Survey", HttpStatus.NO_CONTENT);
		else
			return new ResponseEntity(list, HttpStatus.OK);
	}

	@ApiOperation(value="설문 업데이트, 설문 dto가 value",
			notes="설문을 업데이트하는 api입니다")
	@PutMapping("/survey")
	public ResponseEntity updateSurvey(@RequestBody SurveyDto dto) throws Exception {
		surveyService.updateSurvey(dto);
		return new ResponseEntity("A Survey is Updated", HttpStatus.OK);
	}

	@ApiOperation(value = "id :: 설문 id, approval :: 미승인0 , 승인1", notes = "특정 설문을 승인하고, 설문 상태를 open해주는 api")
	@PutMapping("/survey/approval")
	public ResponseEntity<String> updateSurveyApproval(@RequestBody Map<String, Integer> data) throws Exception {
		int approval, survey_id, status;
		approval = data.get("approval");
		survey_id = data.get("id");
		status = approval;
		surveyService.updateSurveyApproval(approval, survey_id);
		surveyService.updateSurveyOpenStatus(status, survey_id);
		return new ResponseEntity<String>("A Survey is Approved and opened", HttpStatus.OK);
	}

	@ApiOperation(value = "id :: 설문 id, status :: 종료 0 , 오픈 1", notes = "설문 open, close를 설정하는 api")
	@PutMapping("/survey/close")
	public ResponseEntity<String> updateSurveyClose(@RequestBody Map<String, Integer> data) throws Exception {
		int  survey_id, status;
		survey_id = data.get("id");
		status = data.get("status");
		surveyService.updateSurveyOpenStatus(status, survey_id);
		return new ResponseEntity<String>("A Survey is closed", HttpStatus.OK);
	}

	@ApiOperation(value="설문 삭제 API, id = 설문 id",
			notes="특정 설문을 삭제하는 api입니다.")
	@DeleteMapping("/survey/{id}")
	public ResponseEntity deleteSurvey(@PathVariable int id) throws Exception {
		surveyService.deleteSurvey(id);
		return new ResponseEntity("A Survey is Updated", HttpStatus.OK);
	}

}

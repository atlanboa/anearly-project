package com.anearly.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anearly.rest.db.dto.CustomSurveyDto;
import com.anearly.rest.db.dto.CustomSurveyListDto;
import com.anearly.rest.db.dto.PersonDto;
import com.anearly.rest.db.dto.SelectionDto;
import com.anearly.rest.db.dto.SurveyAnalysisDto;
import com.anearly.rest.db.dto.SurveyAnalysisListDto;
import com.anearly.rest.db.dto.SurveyAttendHistoryDto;
import com.anearly.rest.db.dto.SurveyAttendUserDto;
import com.anearly.rest.db.dto.SurveyDto;
import com.anearly.rest.db.dto.SurveyListAndReviewDto;
import com.anearly.rest.db.dto.SurveyListDto;
import com.anearly.rest.db.dto.SurveyListItemDto;
import com.anearly.rest.db.dto.SurveyListItemResultDto;
import com.anearly.rest.db.dto.SurveyReviewDto;
import com.anearly.rest.db.dto.SurveyReviewResultDto;
import com.anearly.rest.db.dto.SurveySubmitDto;
import com.anearly.rest.db.dto.UserDto;
import com.anearly.rest.db.service.PersonService;
import com.anearly.rest.db.service.SurveyAttendUserService;
import com.anearly.rest.db.service.SurveyListAndReviewService;
import com.anearly.rest.db.service.SurveyListItemResultService;
import com.anearly.rest.db.service.SurveyListItemService;
import com.anearly.rest.db.service.SurveyListService;
import com.anearly.rest.db.service.SurveyReviewResultService;
import com.anearly.rest.db.service.SurveyReviewService;
import com.anearly.rest.db.service.SurveyService;
import com.anearly.rest.db.service.UserService;
import com.anearly.rest.security.JwtService;
import com.anearly.rest.util.SurveyStatus;

import io.swagger.annotations.ApiOperation;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class AnEarlyRestApiController {

	@Autowired
	UserService userService;
	@Autowired
	SurveyService surveyService;
	@Autowired
	SurveyListService surveyListService;
	@Autowired
	SurveyListItemService surveyListItemService;
	@Autowired
	SurveyListItemResultService surveyListItemResultService;
	@Autowired
	SurveyListAndReviewService surveyListAndReviewService;
	@Autowired
	SurveyReviewService surveyReviewService;
	@Autowired
	SurveyReviewResultService surveyReviewResultService;
	@Autowired
	SurveyAttendUserService surveyAttendUserService;
	@Autowired
	JwtService jwtService;
	@Autowired
	PersonService personService;

	@ApiOperation(value = "모든 설문 가져오기", notes = "성공시 모든 설문을 json으로 반환해줍니다.")
	@GetMapping("/surveys")
	public ResponseEntity<List<SurveyDto>> selectAllSurvey() throws Exception {
		List<SurveyDto> list = null;
		list = surveyService.selectAllSurvey();
		if (list == null)
			return new ResponseEntity("Not An Existed Survey", HttpStatus.NO_CONTENT);
		else
			return new ResponseEntity(list, HttpStatus.OK);
	}

	@ApiOperation(value = "특정 설문 분석 결과 가져오기, id = 설문 id", notes = "성공시 모든 설문 분석 결과를 json으로 반환해줍니다.")
	@GetMapping("/survey/analysis/{id}")
	public ResponseEntity<List<SurveyAnalysisDto>> getSurveyAnalysis(@PathVariable int id) throws Exception {
		List<SurveyAnalysisDto> list = null;
		list = surveyListService.selectSurveyListIdBySurveyId(id);
		for (SurveyAnalysisDto sa : list) {
			List<SurveyAnalysisListDto> listByListId = surveyListItemService.getAnalysisByListId(sa.getId());
			sa.setList(listByListId);
		}
		if (list == null)
			return new ResponseEntity("결과 분석 실패", HttpStatus.INTERNAL_SERVER_ERROR);
		else
			return new ResponseEntity(list, HttpStatus.OK);
	}

	@ApiOperation(value = "특정 설문 주관식, id = 설문 id", notes = "성공시 모든 설문 주관식 답변를 json으로 반환해줍니다.")
	@GetMapping("/survey/analysis/review/{id}")
	public ResponseEntity<List<SurveyAnalysisDto>> getSurveyAnalysisReview(@PathVariable int id) throws Exception {
		List<SurveyAnalysisDto> list = null;
		list = surveyReviewService.selectAllSurveyReviewBySurveyId(id);

		for (SurveyAnalysisDto sa : list) {
			List<SurveyAnalysisListDto> listByListId = surveyReviewResultService
					.selectAllSurveyReviewResultBySurveyReviewId2(sa.getId());
			sa.setList(listByListId);
		}
		if (list == null)
			return new ResponseEntity("결과 분석 실패", HttpStatus.INTERNAL_SERVER_ERROR);
		else
			return new ResponseEntity(list, HttpStatus.OK);
	}

	@ApiOperation(value = "설문 id로 객관식 및 주관식 설문 항목 모두 가져오기", notes = "display_order로 모든 데이터들을 정렬해서 json으로 반환해줍니다. survey_type이 1이면 객관식이며 list 값이 존재하고 2이면 주관식으로 list 값이 null이 됩니다.")
	@GetMapping("/surveydetailandreview/{id}")
	public ResponseEntity<List<SurveyListAndReviewDto>> getAllSurveyListAndReviewBySurveyId(@PathVariable int id)
			throws Exception {
		int user_id = Integer.parseInt(jwtService.get("id"));
		SurveyAttendUserDto checkAttend = surveyAttendUserService.selectSurveyAttendUser2(user_id, id);
		if (checkAttend != null)
			return new ResponseEntity("already-attend-user", HttpStatus.INTERNAL_SERVER_ERROR);

		List<SurveyListAndReviewDto> list = null;
		list = surveyListAndReviewService.getAllSurveyListAndReviewBySurveyId(id);
		for (SurveyListAndReviewDto dto : list) {
			if (dto.getSurvey_type() == SurveyStatus.MULTIPLE) {
				dto.setList(surveyListItemService.selectAllSurveyListItemBySurveyListId(dto.getId()));
			}
		}
		if (list == null)
			return new ResponseEntity("Not An Existed Survey", HttpStatus.NO_CONTENT);
		else
			return new ResponseEntity(list, HttpStatus.OK);

	}

	@GetMapping("/survey/history/{id}")
	public ResponseEntity<List<SurveyAttendHistoryDto>> selectSurveyAttendHistoryByUserId(@PathVariable int id)
			throws Exception {
		List<SurveyAttendHistoryDto> list = null;
		list = surveyAttendUserService.selectSurveyAttendHistoryByUserId(id);
		if (list == null) {
			return new ResponseEntity("설문 참여 내역 없음", HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<SurveyAttendHistoryDto>>(list, HttpStatus.OK);
		}
	}

	/*
	 * 설문 제출시 처리해야 할 부분 :: 1. 설문 참여자 증가 2. 설문 참가자 Point 증가 설문 조사 참여
	 */
	@ApiOperation(value = "설문 결과 제출 id = 설문 조사 id, point = 설문 조사 point, 설문 조사 내용은 list로", notes = "설문 제출시 설문 결과 제출 및 참여한 유저 포인트 증가 및 설문 참여 데이터 생성"
			+ "설문 제출시 설문 작성 도중에 마감된 설문인지 아닌지 체크합니다. 마감된 설문인 경우 500 에러코드를 반환합니다."
			+ "마감된 설문이 아닌 경우 설문 참여자 +1 해주고, 마지막 설문 참여자가 되는 경우 설문을 CLOSE 해줍니다.")
	@PostMapping("/survey/{id}")
	public ResponseEntity SubmitSurvey(@RequestBody List<SurveySubmitDto> list, @PathVariable int id) throws Exception {
		// 설문 가능 체크
		SurveyDto survey = surveyService.selectSurvey(id);
		if (survey.getMax_participant_number() == survey.getCur_participant_number()) {
			return new ResponseEntity<String>("This Survey is Closed", HttpStatus.INTERNAL_SERVER_ERROR);
		} else if (survey.getMax_participant_number() == survey.getCur_participant_number() + 1) {
			survey.setOpen_status(SurveyStatus.CLOSE);
		}
		survey.setCur_participant_number(survey.getCur_participant_number() + 1);
		surveyService.updateSurvey(survey);
		// 요청한 user의 pk 가져오기
		int userPk = Integer.parseInt(jwtService.get("id"));
		// 유저 설문 참여 데이터 생성
		SurveyAttendUserDto stu = new SurveyAttendUserDto();
		stu.setSurvey_id(id);
		stu.setUser_id(userPk);
		surveyAttendUserService.insertSurveyAttendUser(stu);
		// user 포인트 증가 설문에서 인당 부여 포인트를 읽어와서 설문한 유저의 포인트를 그만큼 올려줍니다.
		userService.updateUserPoint(userPk, id);
		for (SurveySubmitDto dto : list) {
			if (dto.getSurvey_type() == SurveyStatus.MULTIPLE) {
				surveyListItemResultService.insertSurveyListItemResult(
						new SurveyListItemResultDto(dto.getId(), Integer.parseInt(jwtService.get("id"))));
			} else {
				surveyReviewResultService.insertSurveyReviewResult(new SurveyReviewResultDto(dto.getId(),
						Integer.parseInt(jwtService.get("id")), dto.getContent()));
			}
		}
		return new ResponseEntity<String>("Insert OK", HttpStatus.OK);

	}

	@ApiOperation(value = "설문 생성 데이터", notes = "설문 조사 생성")
	@PostMapping("/survey")
	public ResponseEntity<String> newSurvey(@RequestBody CustomSurveyDto data) throws Exception {
		SurveyDto survey = new SurveyDto();
		survey.setUser_id(Integer.parseInt(jwtService.get("id")));
		survey.setTitle(data.getTitle());
		survey.setStart_date(data.getStart_date());
		survey.setEnd_date(data.getEnd_date());
		survey.setBudget(data.getMax_participant_number() * data.getPoint_per_participant());
		survey.setCategory(data.getCategory());
		survey.setProduct_name(data.getProduct_name());
		survey.setProduct_price(data.getProduct_price());
		survey.setProduct_release_date(data.getProduct_release_date());
		survey.setProduct_image(data.getImage());
		survey.setMax_participant_number(data.getMax_participant_number());
		survey.setPoint_per_participant(data.getPoint_per_participant());
		survey.setTarget_age(data.getAge());
		survey.setTarget_gender(data.getGender());
		survey.setContent(data.getContent());

		UserDto user = userService.selectUserById(Integer.parseInt(jwtService.get("id")));
		if (user.getReward_point() < survey.getBudget()) {
			return new ResponseEntity<String>("포인트 부족", HttpStatus.INTERNAL_SERVER_ERROR);
		}
		surveyService.insertSurvey(survey);
		userService.updateUserPoint2(survey.getUser_id(), survey.getBudget());
		/*
		 * customsurveyDto - CustomSurveyListDto - SelectionDto
		 */
		for (CustomSurveyListDto customSurveyList : data.getSurvey()) {
			if (customSurveyList.getType() == SurveyStatus.MULTIPLE) {
				// 객관식
				SurveyListDto surveylist = new SurveyListDto(survey.getId(), customSurveyList.getType(),
						customSurveyList.getTitle(), customSurveyList.getDisplay_order());
				surveyListService.insertSurveyList(surveylist);
				System.out.println(surveylist);
				// 객관식 항목
				for (SelectionDto selection : customSurveyList.getSelects()) {
					SurveyListItemDto surveylistitem = new SurveyListItemDto(surveylist.getId(), selection.getContent(),
							selection.getDisplay_order());
					surveyListItemService.insertSurveyListItem(surveylistitem);
				}
			} else if (customSurveyList.getType() == SurveyStatus.SHORT_ANSWER) {
				// 주관식
				SurveyReviewDto surveyReview = new SurveyReviewDto(survey.getId(), customSurveyList.getType(),
						customSurveyList.getTitle(), customSurveyList.getDisplay_order());
				surveyReviewService.insertSurveyReview(surveyReview);
			}
		}
		return new ResponseEntity("Survey Create Success", HttpStatus.OK);
	}

	@ApiOperation(value = "디바이스 데이터 전송", notes = "라즈베리 디바이스 데이터 전송")
	@PostMapping("/person")
	public ResponseEntity<String> insertPersonData(@RequestBody PersonDto dto) throws Exception {
		PersonDto person = null;
		person = personService.selectPersonData(dto.getDevice());
		// 없는 디바이스 데이터면
		System.out.println(dto.toString());
		if (person == null) {
			personService.insertPersonData(dto);
		} else {
			personService.updatePersonData(dto);
		}
		return new ResponseEntity<String>("요청", HttpStatus.OK);
	}

	@ApiOperation(value = "디바이스 데이터 요청", notes = "적합한 설문 데이터 전송")
	@GetMapping("/person/{device}")
	public ResponseEntity insertPersonData(@PathVariable int device) throws Exception {
		List<SurveyDto> list = null;
		list = surveyService.selectAllSurveyByTarget(device);
		if (list == null) {
			return new ResponseEntity("요청", HttpStatus.INTERNAL_SERVER_ERROR);
		} else {
			return new ResponseEntity(list, HttpStatus.OK);
		}
	}
}

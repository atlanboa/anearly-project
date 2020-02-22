create database anearly;
use anearly;

create table user (
id int primary key auto_increment,
nickname varchar(30) not null,
email varchar(50) not null,
pw varchar(50) not null,
gender int not null,
age int not null,
phone varchar(11) not null,
reward_point int not  null default 0,
CONSTRAINT email_nickname_unique UNIQUE (email, nickname)
);

insert into user (nickname, email, pw, gender, age, phone)
values ('nickname is ssafy1', 'ssafy1@ssafy.com', '1234', 1, 20, '01028501326');
insert into user (nickname, email, pw, gender, age, phone)
values ('nickname is ssafy2', 'ssafy2@ssafy.com', '1234', 1, 20, '01028501326');
insert into user (nickname, email, pw, gender, age, phone)
values ('nickname is ssafy3', 'ssafy3@ssafy.com', '1234', 1, 20, '01028501326');
insert into user (nickname, email, pw, gender, age, phone)
values ('nickname is ssafy4', 'ssafy4@ssafy.com', '1234', 1, 20, '01028501326');
insert into user (nickname, email, pw, gender, age, phone)
values ('nickname is ssafy5', 'ssafy5@ssafy.com', '1234', 1, 20, '01028501326');
insert into user (nickname, email, pw, gender, age, phone)
values ('김상헌 회원가입 테스트', 'atlanboa@gmail.com', '1234', 1, 20, '01028501326');

create table survey
(
	id int primary key auto_increment,
    user_id int not null,
    title varchar(200) not null,
    hit int not null default 0,
    start_date date default (current_date),
    end_date date not null,
    budget int not null default 0,
    category varchar(20) not null default 'none',
    product_name varchar(50) not null,
    product_price int not null default 0,
    product_release_date date not null,
    product_image varchar(255) not null,
    max_participant_number int not null default 0,
    cur_participant_number int not null default 0,
    point_per_participant int not null default 100,
    CONSTRAINT fk_user_survey_id
    FOREIGN KEY (user_id)
    REFERENCES user (id)
);

insert into survey (user_id, title, hit, start_date , end_date , budget , category , product_name , product_price , product_release_date , product_image , max_participant_number , cur_participant_number )
values (1, 'survey 1���Դϴ�.', 0, '2020-02-03', '2020-02-25', 1000000, 'IT', '��ǰ 1��', 50000, '2020-03-25', '���1���Դϴ�', 100, 0);
insert into survey (user_id, title, hit, start_date , end_date , budget , category , product_name , product_price , product_release_date , product_image , max_participant_number , cur_participant_number )
values (2, 'survey 2���Դϴ�.', 0, '2020-02-03', '2020-02-25', 1000000, 'IT', '��ǰ 2��', 50000, '2020-03-25', '���2���Դϴ�', 100, 0);
insert into survey (user_id, title, hit, start_date , end_date , budget , category , product_name , product_price , product_release_date , product_image , max_participant_number , cur_participant_number )
values (3, 'survey 3���Դϴ�.', 0, '2020-02-03', '2020-02-25', 1000000, 'IT', '��ǰ 3��', 50000, '2020-03-25', '���3���Դϴ�', 100, 0);
insert into survey (user_id, title, hit, start_date , end_date , budget , category , product_name , product_price , product_release_date , product_image , max_participant_number , cur_participant_number )
values (4, 'survey 4���Դϴ�.', 0, '2020-02-03', '2020-02-25', 1000000, 'IT', '��ǰ 4��', 50000, '2020-03-25', '���4���Դϴ�', 100, 0);
insert into survey (user_id, title, hit, start_date , end_date , budget , category , product_name , product_price , product_release_date , product_image , max_participant_number , cur_participant_number )
values (5, 'survey 5���Դϴ�.', 0, '2020-02-03', '2020-02-25', 1000000, 'IT', '��ǰ 5��', 50000, '2020-03-25', '���5���Դϴ�', 100, 0);

create table survey_list (
id int primary key auto_increment,
survey_id int not null,
survey_type int not null,
title text not null,
display_order int not null,
CONSTRAINT fk_survey_survey_list_id 
FOREIGN KEY (survey_id) 
REFERENCES survey (id)
);

insert into survey_list (survey_id , survey_type , title , display_order )
values (1, 1, '1�� ���� ������ 1�� �����Դϴ�.', 0);
insert into survey_list (survey_id , survey_type , title , display_order )
values (2, 1, '2�� ���� ������ 1�� �����Դϴ�.', 0);
insert into survey_list (survey_id , survey_type , title , display_order )
values (3, 1, '3�� ���� ������ 1�� �����Դϴ�.', 0);
insert into survey_list (survey_id , survey_type , title , display_order )
values (4, 1, '4�� ���� ������ 1�� �����Դϴ�.', 0);
insert into survey_list (survey_id , survey_type , title , display_order )
values (5, 1, '5�� ���� ������ 1�� �����Դϴ�.', 0);


create table survey_list_item(
id int primary key auto_increment,
survey_list_id int not null,
content text not null,
display_order int not null,
CONSTRAINT fk_survey_list_survey_list_item_id
FOREIGN KEY (survey_list_id)
REFERENCES survey_list (id)
)

insert into survey_list_item (survey_list_id , content , display_order )
values (1, '1�� ���� 1�� ���� ������ 1�� �����Դϴ�.', 0);
insert into survey_list_item (survey_list_id , content , display_order )
values (2, '2�� ���� 1�� ���� ������ 1�� �����Դϴ�.', 0);
insert into survey_list_item (survey_list_id , content , display_order )
values (3, '3�� ���� 1�� ���� ������ 1�� �����Դϴ�.', 0);
insert into survey_list_item (survey_list_id , content , display_order )
values (4, '4�� ���� 1�� ���� ������ 1�� �����Դϴ�.', 0);
insert into survey_list_item (survey_list_id , content , display_order )
values (5, '5�� ���� 1�� ���� ������ 1�� �����Դϴ�.', 0);

create table survey_list_item_result (
id int primary key auto_increment,
survey_list_item_id int not null,
user_id int not null,
CONSTRAINT fk_survey_list_item_survey_list_item_result_id
FOREIGN KEY (survey_list_item_id)
REFERENCES survey_list_item (id),
CONSTRAINT fk_user_survey_list_item_result_id
FOREIGN KEY (user_id)
REFERENCES user (id));

create table survey_review(
id int primary key auto_increment,
survey_id int not null,
survey_type int not null,
title text not null,
user_id int not null,
display_order int not null,
CONSTRAINT fk_survey_survey_review_id 
FOREIGN KEY (survey_id) 
REFERENCES survey (id), 
CONSTRAINT fk_user_survey_review_id
FOREIGN KEY (user_id) 
REFERENCES user (id) 
);

insert into survey_review (survey_id , survey_type , title , user_id , display_order )
values (1, 2, '1�� ���� 1�� ���� 2�� ���� �ְ����Դϴ�.', 1, 1);
insert into survey_review (survey_id , survey_type , title , user_id , display_order )
values (2, 2, '2�� ���� 2�� ���� 2�� ���� �ְ����Դϴ�.', 2, 1);
insert into survey_review (survey_id , survey_type , title , user_id , display_order )
values (3, 2, '3�� ���� 3�� ���� 2�� ���� �ְ����Դϴ�.', 3, 1);
insert into survey_review (survey_id , survey_type , title , user_id , display_order )
values (4, 2, '4�� ���� 4�� ���� 2�� ���� �ְ����Դϴ�.', 4, 1);
insert into survey_review (survey_id , survey_type , title , user_id , display_order )
values (5, 2, '5�� ���� 5�� ���� 2�� ���� �ְ����Դϴ�.', 5, 1);

create table survey_review_result(
id int primary key auto_increment,
survey_review_id int not null,
content text not null,
user_id int not null,
CONSTRAINT fk_survey_review_survey_review_result_id
FOREIGN KEY (survey_review_id)
REFERENCES survey_review (id),
CONSTRAINT fk_user_survey_review_result_id
FOREIGN KEY (user_id)
REFERENCES user (id)
);

create table survey_attend_user(
id int primary key auto_increment,
survey_id int not null,
user_id int not null,
CONSTRAINT fk_survey_survey_attend_user_id
FOREIGN KEY (survey_id)
REFERENCES survey (id),
CONSTRAINT fk_user_survey_attend_user_id
FOREIGN KEY (user_id)
REFERENCES user (id)
);

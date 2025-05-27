create schema dev;

set search_path to dev;

create table users(

	email varchar(255) not null,
	name varchar(255) not null,
--	default value of the age must be 15
	age int default 15,
	password varchar(1024) not null,
	constraint user_pk primary key(email)
);

--additional place for query testing 


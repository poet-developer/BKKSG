-- Main DB is Content Table. 

CREATE DATABASE bkksg default CHARACTER SET UTF8;

ALTER SCHEMA bkksg DEFAULT CHARACTER SET utf8 ;

USE bkksg;

CREATE TABLE author (
  id int(11) NOT NULL AUTO_INCREMENT,
  userId varchar(20) NOT NULL,
  created_at DATETIME NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO author VALUES (1,'poetDeveloper',now());
INSERT INTO author VALUES (2,'IROLIM',now());

CREATE TABLE image (
  id int(11) NOT NULL AUTO_INCREMENT,
  file_name varchar(20) NOT NULL,
  drive_id varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO image VALUES (1,'test','https://picsum.photos/200/300');
INSERT INTO image VALUES (2,'world','https://picsum.photos/300/200');
INSERT INTO image VALUES (3,'image','https://picsum.photos/250/200');

CREATE TABLE content (
  id int(11) NOT NULL AUTO_INCREMENT,
  title varchar(50) NOT NULL,
  description TEXT,
  cover_src varchar(70) NOT NULL,
  type_id INT(11) DEFAULT NULL,
  profile_id INT(11) DEFAULT NULL,
  created_at DATE DEFAULT (current_date),
  PRIMARY KEY (`id`)
);

INSERT INTO content VALUES (1,'test','bla bla bla','50',1,1,(current_date));
INSERT INTO content VALUES (2,'helloWorld','Hello, World!','20',2,2,(current_date));
INSERT INTO content VALUES (3,'merry','christmas!','200',1,2,(current_date));

CREATE TABLE profile (
  id int(11) NOT NULL AUTO_INCREMENT,
  nickname varchar(20) NOT NULL,
  avatar varchar(255) NOT NULL,
  bio varchar(150) NOT NULL,
  author_id INT(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO profile VALUES (1,'poetDeveloper','https://picsum.photos/200/300','FullStack Developer',1);
INSERT INTO profile VALUES (2,'이로','https://picsum.photos/200/300','Artist',2);

CREATE TABLE type (
  id int(11) NOT NULL AUTO_INCREMENT,
  topic varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO type VALUES (1,'poem');
INSERT INTO type VALUES (2,'essay');
INSERT INTO type VALUES (3,'visual');
INSERT INTO type VALUES (4,'project');


-- CREATE DATABASE keyfinderdb

CREATE TABLE KeyFinder(
	id int,
	keyword varchar(255),
	country varchar(10),
	difficulty int,
	volume int,
	cpc numeric(10,2),
	clicks int,
	cps numeric(10,2)
);

CREATE TABLE COMPLETE(
	id int,
	keyword varchar(255),
	country varchar(10),
	difficulty int,
	volume int,
	cpc numeric(10,2),
	clicks int,
	cps numeric(10,2)
);

CREATE TABLE PARTIALS(
	id int,
	keyword varchar(255),
	country varchar(10),
	difficulty int,
	volume int,
	cpc numeric(10,2),
	clicks int,
	cps numeric(10,2)
);

-- copy given csv file to KeyFinder Table
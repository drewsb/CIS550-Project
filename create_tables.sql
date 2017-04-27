create table Obesity (  
  state char(2) primary key,  
  obesity_rate int
);

create table Universities (  
	FID int primary key,  
	name varchar(150),
	city varchar(30),
	state char(2),
	zip varchar(11)
);

create table Population (  
  state char(2) primary key,  
  pop_2013 int,
  pop_2014 int,
  pop_2015 int,
  pop_2016 int
);

create table sport_venues (  
  FID int primary key,  
  name varchar(150),
  address varchar(100),
  city varchar(30),
  state char(2),
  zip varchar(7)
);

create table cities_towns (
	FID int primary key,
	name varchar(150),
	pop int,
	state char(2)
);

create table Hospitals (
	ID int primary key,
	name varchar(150),
	city varchar(30),
	state char(2),
	zip varchar(7)
);

Create View VenueCount as (
	SELECT C.state, C.name, count(*) as num
	FROM cities_towns C 
	JOIN  sport_venues S
	ON C.name = S.city
	WHERE C.state = S.state
	GROUP BY C.name
);


# Create indices 
alter table Hospitals add index (city);
alter table cities_towns add index (name);
alter table sport_venues add index (city);
alter table Universities add index (city);



















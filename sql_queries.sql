
# For each cities/towns in state ‘x’, return the number of sports venues in the city (count) (join by city name or by zipcode)
Select c.name, c.pop, count(*) as numberOfSportsVenues
From sport_venues s, cities_towns c
Where s.city = c.name and s.state=’x’ and c.state=’x’ and c.pop > 0
Group by c.name, c.pop;

# Number of sports venues in state ‘x’
Select state, count(*) as numberOfSportsVenues
From sport_venues
Where state=’x’;

# For all cities in state ‘x’, find the population of that city and the number of hospitals in that city
Select c.state, c.name, c. pop, count(*) as numberOfHospitals
From Hospitals s, cities_towns c
Where s.city = c.name and c.state = ‘x’ and s.state=’x’ and c.pop > 0
Group by c.name
Order by c.name;

# Number of hospitals in state ‘x’
Select state, count(*) as numberOfHospitals
From Hospitals h
Where h.state = ‘x’;

# Number of cities in state ‘x’
Select c.state ,count(*) as numberOfCities 
From cities_towns c 
Where c.state = ‘x’;

# Population for state ‘x’ in year 2016
Select p.state, pop_2016 as pop2016
From Population p
Where p.state = ‘x’;

# Change in population for state ‘x’ from year 2013 until year 2016
Select p.state, Sum(p.pop_2016) - Sum(p.pop_2013) as popChangeFrom2013To2016
From Population p
Where p.state = ‘x’;

# For each University in state ‘x’ which has a Hospital on or near campus (based on matching zip code), return the University Name, the number of Hospitals on campus, and the mutual zip code between them all.
Select u.state, u.name as University, count(*) as numberOfHospitalsOnCampus, u.zip
From Universities u inner join Hospitals h on u.zip = h.zip
Where u.state=’x’ and h.state=’x’
Group by u.name;

#For state ‘x’, for each univeristy that is in a city that contains the maximum number of sport venues for state ‘x’, return the city name, the university name, and the number of sport venues in that city
Select DISTINCT U.city, U.name, VC.num as NumVenues
FROM Universities U
JOIN VenueCount VC
ON U.city = VC.name
WHERE U.state = "PA" AND VC.num = (
		Select max(V.num)
		From ( Select * From VenueCount Where state = "PA") as V
);

# Select obesity from state = x
Select o.state, o.obesity_rate as obesityRatePercentage
From Obesity o
Where o.state = ‘x’;

# Display the names of the states with same obesity rate
Select o.state, o.obesity_rate as obesityRatePercentage
From Obesity o
Where o.obesity_rate = (select obesity_rate from Obesity where state = ‘x’);

# For each city in state ‘x’, find the population of that city and the number of universities in that city
Select c.state, c.name, c. pop, count(*) as numberOfUniversities
From Universities s, cities_towns c
Where s.city = c.name and c.state = ‘x’ and s.state = ‘x’ and c.pop > 0
Group by c.name
Order by c.name;

# Number of universities in state ‘x’
Select c.state, count(*) as numberOfColleges
From Universities c
Where c.state = ‘x’
Group by c.state;

# For state ‘x’, return the five largest cities by population size, the number of universities in each city, the number of hospitals in each city
Select cityAndHospital.name, cityAndHospital.pop, cityAndHospital.numHospitals, count(*) as numUniversities
From (	Select largeCities.name, largeCities.pop, count(*) as numHospitals
		From (	Select c.name as name, c.pop as pop
				From cities_towns c, Hospitals h, Universities u 
				Where c.state=’x’ and h.state=’x’ and u.state=’x’ and c.name = h.city and h.city = u.city
				Group by c.name
				Order by c.pop desc
				Limit 5) largeCities, Hospitals h
		Where largeCities.name = h.city and h.state=’x’
		Group by largeCities.name
		Order by largeCities.pop desc) cityAndHospital, Universities u
Where u.state=’x’ and cityAndHospital.name = u.city
Group by cityAndHospital.name
Order by cityAndHospital.pop desc;


















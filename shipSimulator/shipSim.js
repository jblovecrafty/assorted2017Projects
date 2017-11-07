//space ship class
function Spaceship(passedStartingBuildPoints, passedShipName, passedCaptainName){
	
	//build points are how many, total of each attribute the ship can hold	
	this.startingBuildPoints =  passedStartingBuildPoints;
	
	this.remainingBuildPoints = passedStartingBuildPoints;
	
	this.shipName = passedShipName;
	
	this.captainName = passedCaptainName;
	
	//food for the ship
	this.food = 0;
	
	//energy that powers the ship
	this.energy = 0;
	
	//tech which reflects the ability to repair and or upgrade the ship
	this.tech = 0;
	
	//people on the ship
	this.people = 0;
	
	//moral of the people on the ship
	this.morale = 0;
	
};

Spaceship.prototype.addBuildPoints = function(passedBuildPointName, passedBuildPoints) {
	
	var that = this;
		
	if(((that.remainingBuildPoints - passedBuildPoints) >= 0) && (that[passedBuildPointName] + passedBuildPoints > 0) )
	{
		console.log('Inside add build points' + parseInt(that[passedBuildPointName] + passedBuildPoints))
		that[passedBuildPointName] 	=  that[passedBuildPointName] + passedBuildPoints;
		that.remainingBuildPoints 	=  that.remainingBuildPoints - passedBuildPoints;
	}	
};

/*method to adjust ship stats
	bring up food you bring down people
	bring up energy you bring down morale
	bring up tech you bring down energy
	bring up people you bring down food
	bring up morale you bring down tech
*/
Spaceship.prototype.adjustBuildPoints = function(passedBuildPointName, passedBuildPoints) {
	
	var that = this;
	var arePointsAllocated = false;
	
	function allocateBuildPoints(passedBuildPointName, passedRelatedBuildPoint, passedBuildPoints)
	{
		var canAllocate = false;
		
		if(((that[passedRelatedBuildPoint] - passedBuildPoints) > 0) &&
			((that[passedBuildPointName] + passedBuildPoints) > 0))
		{
			//do our work to change things here
			that[passedBuildPointName] = that[passedBuildPointName] + passedBuildPoints;
			that[passedRelatedBuildPoint] = that[passedRelatedBuildPoint] - passedBuildPoints;
			
			console.log(passedBuildPointName);
			console.log(that[passedBuildPointName]);
			
			console.log(passedRelatedBuildPoint);
			console.log(that[passedRelatedBuildPoint]);
						
			return true;
		}
		
		return canAllocate;
	}
	
	switch(passedBuildPointName) {
	    case 'food':
			arePointsAllocated = allocateBuildPoints('food', 'people', passedBuildPoints);
	        break;
		case 'energy':
			arePointsAllocated = allocateBuildPoints('energy', 'morale', passedBuildPoints);
		    break;
		case 'tech':
			arePointsAllocated = allocateBuildPoints('tech', 'energy', passedBuildPoints);
			break;
		case 'people':
			arePointsAllocated = allocateBuildPoints('people', 'food', passedBuildPoints);
			break;
		case 'morale':
			arePointsAllocated = allocateBuildPoints('morale', 'tech', passedBuildPoints);
			break;
	}
	
	return arePointsAllocated;	
		
};

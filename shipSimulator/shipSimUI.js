$(document).ready(function(){
	
	//set up the game world
	var numberOfTurnsToReachPlanet = 0;
	var currentYear = 0;
	var shipName = '';
	var shipPoints = 0;
	var shipLeaderName = '';
	var chanceOfEvent = .5;
	var currentChance = 0;
	var missionSuccess = true;
	var idOfShipLog = '#shipLog';
	var missionLog;
	var ship;

	//hide elements at start
	$( "#shipStartScreenSecondStage" ).hide();
	$( "#shipVoyage" ).hide();
	
	function updateShipStatUI(passedDivToUpdate, passedNumberToUpdate)
	{
		//first clear div
		$('#' + passedDivToUpdate).empty()
		
		//then add new divs

		//if greater than 3 color all divs green 
		
		//if greater than 1 color all divs yellow
		
		//if one then color div red
	}
	
	//set up function to handle first stage
	//	parse values from form and create new ship
	//	hide first form and show second stage
	$( "#moveToStageTwo" ).click(function() {
		numberOfTurnsToReachPlanet = $('#yearsToDestination').val();
		shipName = $('#shipName').val();
		shipPoints = $('#shipPoints').val();
		shipLeaderName = $('#leaderName').val();
		
		console.log('numberOfTurnsToReachPlanet ' + numberOfTurnsToReachPlanet);
		console.log('shipName ' + shipName);
		console.log('shipPoints ' + shipPoints);
		console.log('shipLeaderName ' + shipLeaderName);
		
		//have player name ship
		ship = new Spaceship(shipPoints, shipName, shipLeaderName);
		
		//set initial ship here
		ship.food = 1;
		ship.energy = 1;
		ship.tech = 1;
		ship.people = 1;
		ship.morale = 1;
		
		$( "#shipStartScreenSecondStageNumPoints" ).text(shipPoints);
		$( "#foodStatStart" ).text(ship.food);
		$( "#energyStatStart" ).text(ship.energy);
		$( "#techStatStart" ).text(ship.tech);
		$( "#peopleStatStart" ).text(ship.people);
		$( "#moraleStatStart" ).text(ship.morale);
		
		$( "#shipStartScreenSecondStage" ).show();
		$( "#shipStartScreenFirstStage" ).hide();
	});
	
	//second stage handle the adjusting of the ship values (never drop below 1 and start out at one)
	// handle launch submission with building a new ship
	
	//set up ship stats here
	function addToShipStats(passedStat, passedValue)
	{
		console.log('shipPoints' + parseInt(ship[passedStat]) + parseInt(passedValue))
		ship.addBuildPoints(passedStat, passedValue);		
		$( "#" + passedStat + "StatStart" ).text(ship[passedStat]);
		$( "#shipStartScreenSecondStageNumPoints" ).text(ship.remainingBuildPoints);
	}
	
	//set up method handling
	$( "#foodUpStart" ).click(function() {
		addToShipStats('food', 1);
	});
	
	$( "#foodDownStart" ).click(function() {
		addToShipStats('food', -1);
	});
	
	$( "#energyUpStart" ).click(function() {
		addToShipStats('energy', 1);
	});
	
	$( "#energyDownStart" ).click(function() {
		addToShipStats('energy',  -1);
	});
	
	$( "#techUpStart" ).click(function() {
		addToShipStats('tech', 1);
	});
	
	$( "#techDownStart" ).click(function() {
		addToShipStats('tech', -1);
	});
	
	$( "#peopleUpStart" ).click(function() {
		addToShipStats('people', 1);
	});
	
	$( "#peopleDownStart" ).click(function() {
		addToShipStats('people', -1);
	});
	
	$( "#moraleUpStart" ).click(function() {
		addToShipStats('morale', 1);
	});
	
	$( "#moraleDownStart" ).click(function() {
		addToShipStats('morale', -1);
	});
	
	$( "#launchShip" ).click(function() {
		$( "#shipStartScreenSecondStage" ).hide();
		$( "#shipVoyage" ).show();
		shipLaunch();
	});
	
	//start the game steps

	function shipStatusToConsole()
	{
		console.log('Ship Status:');
		console.log('Food: ' + ship.food );
		console.log('Energy: ' + ship.energy );
		console.log('Tech: ' + ship.tech );
		console.log('People: ' + ship.people );
		console.log('Morale: ' + ship.morale );
	}

	function shipStatusToDisplay()
	{
		return '<p>' +'Ship Status:' + '<br/>' +'Food: ' + ship.food + '<br/>' + 'Energy: ' + ship.energy  + '<br/>' + 'Tech: ' + ship.tech + '<br/>' + 'People: ' + ship.people + '<br/>' + 'Morale: ' + ship.morale + '</p>'
	}


	function shipTurn()
	{
		currentYear++;
		var shipStatusText = '';
		var missionEndText = '';
		var mainEventTypeText = '';
		var subEventTitleText = '';
		var subEventStatus = '';
		var uneventfulMission = '';
		
		//check if we have end conditions first
		if((ship.food == 0) || (ship.energy == 0) || (ship.tech == 0) || (ship.people == 0) || (ship.morale == 0))
		{
			console.log('Your ship has failed');
			missionEndText = '<h2>Your ship has failed<h2/>';
			missionSuccess = false;
		}
		else
		{
			currentChance = Math.random();

			if(currentChance >= chanceOfEvent)
			{
				//now we have an event
				currentChance = Math.random();

				var mainEventTypeObject;		
				for(var i = 0; i < shipSimEventObject.topLevelEvents.length; i++)
				{
					if(shipSimEventObject.topLevelEvents[i].chanceOfHappening >= currentChance)
					{
						mainEventTypeObject = shipSimEventObject.topLevelEvents[i];
						break;
					}
				};

				console.log(mainEventTypeObject.eventName);
				mainEventTypeText = '<h2>' + mainEventTypeObject.eventName + '</h2>' ;

				currentChance = Math.random();

				var subEventTypeObject;
				for(var i = 0; i < mainEventTypeObject.subEvents.length; i++)
				{
					if(mainEventTypeObject.subEvents[i].chanceOfHappening >= currentChance)
					{
						subEventTypeObject = mainEventTypeObject.subEvents[i];
						break;
					}
				};

				//now that we have the event lets play the event name and then check for success based on the attribute for the ship
				console.log(subEventTypeObject.eventName);
				subEventTitleText = '<h2><i>'+ subEventTypeObject.eventName +'</i><h2/>';

				currentChance = Math.random() + (ship[subEventTypeObject.attributeToTest] * .1);

				if(subEventTypeObject.eventSucessChance >= currentChance)
				{
					console.log('Success');
					console.log(subEventTypeObject.success.text);
					ship[subEventTypeObject.success.statusChange.attribute] = ship[subEventTypeObject.success.statusChange.attribute] + subEventTypeObject.success.statusChange.change;

					shipStatusToConsole();
					subEventStatus = '<h3>Success<h3/>' +  '<p class="bg-success">' + subEventTypeObject.success.text + '</p>';	
				}
				else
				{
					console.log('Failure');
					console.log(subEventTypeObject.failure.text);
					ship[subEventTypeObject.failure.statusChange.attribute] = ship[subEventTypeObject.failure.statusChange.attribute] + subEventTypeObject.failure.statusChange.change;

					shipStatusToConsole();	
					subEventStatus =  '<h3>Failure<h3/>' +  '<p class="bg-danger">' + subEventTypeObject.failure.text + '</p>';	
				}

			}
			else
			{
				console.log('Another year passes uneventfully');
				uneventfulMission = '<h2>Another year passes uneventfully<h2/>';	
			}

			if(currentYear == numberOfTurnsToReachPlanet)
			{
				console.log('You have made it to your new home');
				shipStatusToConsole();

				missionEndText = '<h2>You have made it to your new home<h2/>';
			}
		}


		//build out ui here
		$(idOfShipLog).prepend( '<hr>');
		$(idOfShipLog).prepend( missionEndText + shipStatusToDisplay() );
		$(idOfShipLog).prepend( uneventfulMission);
		$(idOfShipLog).prepend(subEventStatus);
		$(idOfShipLog).prepend(subEventTitleText);
		$(idOfShipLog).prepend(mainEventTypeText);
		$(idOfShipLog).prepend( '<h1>' + 'Year: ' + currentYear + '</h1>' );
	}

	function updateShipStats(passedStat, passedRelatedStat, passedValue)
	{
		ship.adjustBuildPoints(passedStat, passedValue);
		$( "#" + passedStat + "Stat" ).text(ship[passedStat]);
		$( "#" + passedRelatedStat + "Stat" ).text(ship[passedRelatedStat]);
		
		console.log(passedRelatedStat);
		console.log(ship[passedRelatedStat]);
	}

	function shipLaunch()
	{
		//print preamble
		console.log('Your people board ' + ship.shipName + ' and settle in for the ' + numberOfTurnsToReachPlanet + ' year journey to reach their new homeworld.');

		$(idOfShipLog).append( '<h2>Your Journey Starts<h2/>');
		$('#shipLog').append( '<p>' + 'Your people board ' + ship.shipName + ' and settle in for the ' + numberOfTurnsToReachPlanet + ' year journey to reach their new homeworld.' + '</p>' );

		console.log('Good luck ' + ship.captainName + ' may your journey be a success.');
		$(idOfShipLog).append( '<p>' + 'Good luck ' + ship.captainName + ' may your journey be a success.' + '</p>' );

		$(idOfShipLog).append( '<hr>');
		
		//set up ship stats
		$( "#foodStat" ).text(ship.food);
		$( "#energyStat" ).text(ship.energy);
		$( "#techStat" ).text(ship.tech);
		$( "#peopleStat" ).text(ship.people);
		$( "#moraleStat" ).text(ship.morale);
	}

	//set up method handling
	$( "#foodUp" ).click(function() {
		updateShipStats('food', 'people', 1);
	});
	
	$( "#foodDown" ).click(function() {
		updateShipStats('food', 'people', -1);
	});
	
	$( "#energyUp" ).click(function() {
		updateShipStats('energy', 'morale', 1);
	});
	
	$( "#energyDown" ).click(function() {
		updateShipStats('energy', 'morale', -1);
	});
	
	$( "#techUp" ).click(function() {
		updateShipStats('tech', 'energy', 1);
	});
	
	$( "#techDown" ).click(function() {
		updateShipStats('tech', 'energy', -1);
	});
	
	$( "#peopleUp" ).click(function() {
		updateShipStats('people', 'food', 1);
	});
	
	$( "#peopleDown" ).click(function() {
		updateShipStats('people', 'food', -1);
	});
	
	$( "#moraleUp" ).click(function() {
		updateShipStats('morale', 'tech', 1);
	});
	
	$( "#moraleDown" ).click(function() {
		updateShipStats('morale', 'tech', -1);
	});
	
	//set up initial year
	$("#yearCounter").text(numberOfTurnsToReachPlanet);

	$( "#travelAnotherYear" ).click(function() {
		
		if((numberOfTurnsToReachPlanet > currentYear) && (missionSuccess))
		{
			console.log('numberOfTurnsToReachPlanet');
			console.log(numberOfTurnsToReachPlanet);
			console.log('currentYear');
			console.log(currentYear);
			
			shipTurn();
			$("#yearCounter").text(numberOfTurnsToReachPlanet - currentYear);
		}
		else
		{
			return;
		}
		
		$( "#foodStat" ).text(ship.food);
		$( "#energyStat" ).text(ship.energy);
		$( "#techStat" ).text(ship.tech);
		$( "#peopleStat" ).text(ship.people);
		$( "#moraleStat" ).text(ship.morale);
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});
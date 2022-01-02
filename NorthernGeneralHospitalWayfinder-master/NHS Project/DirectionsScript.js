window.onload = function() { 							//load function as soon as the page loads
// var drawing = document.getElementById("drawing");		//select canvas id
// var context = drawing.getContext('2d');					//set context

// var imageObj = new Image();								//new image

// imageObj.onload=function()								//function to load image first
// {
// context.drawImage(imageObj,100, 20, 500,500);			//draw image with coords to start and size
// };

// imageObj.src = 'HospitalFloorPlanBasic.png';			//image selection

// context.globalCompositeOperation = 'destination-over';	//composition selection to put arrow on top of image
//       context.beginPath();									//start arrow
//       context.moveTo(270, 270);								//start point
//       context.lineTo(430, 265);								//end point
// context.moveTo(430, 265);
// context.lineTo(578, 100);
//       context.lineWidth = 3;									//line width
// // line color - self explanatory
//       context.strokeStyle = "black";
// 	  context.stroke();
	  

for (j=0; j<reverseconnectionsArray.length;j++)
	for(i=0;i<nodes.length;i++)
		if (nodes[i].name == reverseconnectionsArray[j].start)
			nodes[i].connections.push(reverseconnectionsArray[j]);

	  //START OF ALGORITHM
      findPath(getParameterByName("start"),getParameterByName("end"));
      makePathway(fastestPath);
}

var E = "Entrance/Exit";
var R = "Room";
var Q = "QR Code";
var I = "Intersection";
var S = "Stairs";
var L = "Lift";
var C = "Cafe";
var T = "Toilet";

/*var nodeClass = function(id, name, disabled, type, facing)
{
	this.id = id;
	this.name = name;
	this.connections = new Array();
	this.disabled = disabled;
	this.type = type;
	this.facing = facing;
}

var connect = function(idNumber, direction)
{
	this.id=idNumber;
	this.direction = direction;
	if (direction != "North" && direction != "East" && direction != "South" && direction != "West")
		direction = null;
}

i=0;

//var nodes = new Array;

var entrance = new nodeClass(i++,"West Entrance",true, E, "Null");
var outpatients = new nodeClass(i++,"Outpatients",true, M, "Null");
var wardA = new nodeClass(i++, "Ward A", true, M, "Null");
var qrWest = new nodeClass(i++, "QR Code West Corridor", true, Q, "North");
var cardiology = new nodeClass(i++, "Cardiology", true, M, "Null");
var intersection = new nodeClass(i++, "Intersection", true, H, "Null");
var qrNorth = new nodeClass(i++, "QR Code North Stairs", true, Q, "East");
var stairsNorth = new nodeClass(i++, "Stairs North", false, S, "Null" );
var qrEast = new nodeClass(i++, "QR Code East Corridor", true, Q, "South");
var liftEast = new nodeClass(i++, "Lift East Corridor", true, L, "Null");
var cafeEast = new nodeClass(i++, "The Sun Rise Cafe", true, C, "Null");


entrance.connections.push(new connect(outpatients.id, "East"));
outpatients.connections.push(new connect(entrance.id, "West"), new connect(wardA.id, "East"));
wardA.connections.push(new connect(outpatients.id, "West"), new connect(cardiology.id, "East"));
qrWest.connections.push(new connect(cardiology.id, "East"), new connect(wardA.id, "West"));
cardiology.connections.push(new connect(wardA.id, "West"), new connect(intersection.id, "East"));
intersection.connections.push(new connect(cardiology.id, "West"), new connect(stairsNorth.id, "North"), new connect(liftEast.id, "East"));
qrNorth.connections.push(new connect(intersection.id, "South"), new connect(stairsNorth.id, "North"));
stairsNorth.connections.push(new connect(intersection.id, "South"));
qrEast.connections.push(new connect(intersection.id, "West"), new connect (liftEast.id, "East"));
liftEast.connections.push(new connect(intersection.id, "East"), new connect (cafeEast.id, "East"));
cafeEast.connections.push(new connect(liftEast.id, "West"));


nodes.push(entrance);
nodes.push(outpatients);
nodes.push(wardA);
nodes.push(qrWest);
nodes.push(cardiology);
nodes.push(intersection);
nodes.push(qrNorth);
nodes.push(stairsNorth);
nodes.push(qrEast);
nodes.push(liftEast);
nodes.push(cafeEast);

*/

function startAtId(idNumber)
{
	i = 0;
	var found = false;
	while (found == false && i != nodes.length)
	{
		if (nodes[i].id == idNumber)
			found = true;
		else
			i++;
	}
	return nodes[i].name;
}

function getName()
{
	var nameEntry = document.getElementById("inputbox").value;
	startAtName(nameEntry);
}

function startAtName(enterName)
{   
	i = 0;
	var found = false;
	while (found == false && i != nodes.length)
	{
		if (nodes[i].name.toUpperCase() == enterName.toUpperCase())
			found = true;
		else
			i++;
	}
	//if (found == true)
		//console.log(nodes[i].name + " at id " + nodes[i].id);
	//else
		//console.log("Node not found");
	return i;
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function selectDefaultStart()
{
	var list = document.getElementById('dropdownboxstart');
	var nodeID = getParameterByName("nodeID");
	list.selectedIndex = nodeID;
}

function populateDropDownStart()
{
	for (var i = 0; i < nodes.length; i++) {
		if (nodes[i].type == Q)
			addToList(dropdownboxstart, i);
	}

	for (var i = 0; i < nodes.length; i++) {
		if (nodes[i].type == E || nodes[i].type == R || nodes[i].type == C)
			addToList(dropdownboxstart, i);
	}
}

function populateDropDownEnd()
{
	for (var i = 0; i < nodes.length; i++) {
		if (nodes[i].type == E || nodes[i].type == R || nodes[i].type == C)
			addToList(dropdownboxend, i);
	}
}

function addToList(dropDown,i)
{
	var newDropDownOption = document.createElement("OPTION");
	newDropDownOption.text = nodes[i].name;
	newDropDownOption.value = nodes[i].name;
	dropDown.options.add(newDropDownOption);
}

var fastestPath = new Array();

function findPath(start, end)
{
 	var path = new Array();
	fastestPath = new Array();
	var loc = nodes[start].name;
	var previous = start;
  	var end = nodes[end].name;

	var isDisabled = getParameterByName("disabled");

	if(isDisabled == null)
		isDisabled = false; 

	var pathTraversable = true;

	path.push(nodes[startAtName(loc)].name);
	followPath();
	displayDirections();
	//makePathway(fastestPath);





	function followPath()
	{
		//console.log(nodes[startAtName(loc)]);
		for (var i = 0; i < nodes[startAtName(loc)].connections.length; i++) {	 //Loops through each edge
			
			if (isDisabled==true && nodes[startAtName(loc)].disabled == false)
				pathTraversable = false;
			else
				pathTraversable = true;
			if(!path.includes(nodes[startAtName(loc)].connections[i].id) && pathTraversable == true) {		//Check if next node is in the path array (double back)
				path.push(nodes[startAtName(loc)].connections[i].id);						//Adds node to path array
				//console.log(path);
				if (nodes[startAtName(loc)].connections[i].id == end) {					//Checks if next node is the end
					if (fastestPath.length == 0)	{										//Checks if this is the first found path to the end
						fastestPath = path.slice();											//Copies current path into the global variable fastest path
						path.splice(-1,1);
					}
					else if (path.length <= fastestPath.length) {				//Checks if a new path to the end is faster than the current one
							fastestPath = path.slice();										//Copies current path into the global variable fastest path
							path.splice(-1,1);
							//console.log(path);
					}
				}
				else {																								//If next node isn't the destination then...
					loc = nodes[startAtName(loc)].connections[i].id;								//Set new location to the next node
					followPath(); 																	  //**Recursion** Go through for loop of edges connected to nodes
							path.splice(-1,1);													  //Backtrack the algorithm by one to previous node in path
							//console.log(path);
							loc = path[path.length-1]; 										  //New location is the previous node
						}
					}
				}
			}

		function displayDirections()
		{

			for (var i = 0; i < fastestPath.length; i++) { //List all items in array
					console.log( i + ". " + fastestPath[i]);
				}

			if(nodes[startAtName(fastestPath[0])].facing == "") {
				document.getElementById("directionBox").innerHTML += "Written directions currently unavialable"
			}
				else
				{
			var newFacing = nodes[startAtName(fastestPath[0])].facing;
			var i = 0;



			if (nodes[startAtName(fastestPath[i])].type == R)
				if (findInstruction(newFacing, findNextNodeDirection(i)) == "straight" || (findInstruction(newFacing, findNextNodeDirection(i)) == "Turn around and walk forward"))
					document.getElementById("directionBox").innerHTML +=("With your back to the door walk forward")
						else
							document.getElementById("directionBox").innerHTML +=("With your back to the door go " + findInstruction(newFacing, findNextNodeDirection(i)));
			


			newFacing = findNextNodeDirection(i);
					for (i=1; i < fastestPath.length-1; i++) {
							var nextDirection = findInstruction(newFacing, findNextNodeDirection(i));
							var locationName = nodes[startAtName(fastestPath[i])].name;
							var cafeMessage

							if (nodes[startAtName(fastestPath[i])].type == L)
								locationName = "the lifts";
							if (nodes[startAtName(fastestPath[i])].type == I)
								locationName = "the intersection";
							if (nodes[startAtName(fastestPath[i])].type == T)
								locationName = "the toilets";



							if (nextDirection == "left" || nextDirection == "right")
								document.getElementById("directionBox").innerHTML += ("</br>" + "Take a " + nextDirection );
								//else if (nextDirection == "straight")
									//document.getElementById("directionBox").innerHTML+=( "</br>" +"Continue walking");
									else if(nextDirection == "Turn around and walk forward")
									 	document.getElementById("directionBox").innerHTML+=( "</br>" + nextDirection + " past " + locationName);



							newFacing = findNextNodeDirection(i);
					}
					document.getElementById("directionBox").innerHTML+=("</br>" +" You have now reached " + nodes[startAtName(fastestPath[fastestPath.length-1])].name);

					//if (nodes[startAtName(fastestPath[i])].type == C)
					//	console.log("Enjoy your meal!");
					//	console.log("-------------------");
				}
			}
		}

		function findNextNodeDirection(fastestPathPosition)
		{
			var nextFastestPathPosition = fastestPathPosition + 1;

			for (var i = 0; i < nodes[startAtName(fastestPath[fastestPathPosition])].connections.length; i++) {
				if (nodes[startAtName(fastestPath[fastestPathPosition])].connections[i].id == fastestPath[nextFastestPathPosition])
					return nodes[startAtName(fastestPath[fastestPathPosition])].connections[i].direction;
			}
		}

		function findInstruction(currentFacing, end)
		{
			var compassDirection;
			switch (currentFacing) {
				case "North":
						switch (end) {
							case "North":
								compassDirection = "straight";
								newFacing = "North";
								break;
							case "East":
								compassDirection = "right";
								newFacing = "East";
								break;
							case "South":
								compassDirection = "Turn around and walk forward";
								newFacing = "South";
							case "West":
								compassDirection = "left";
								newFacing = "West";
								break;
						}
					break;
				case "East":
					switch(end){
						case "North":
							compassDirection = "left";
							newFacing = "North";
							break;
						case "East":
							compassDirection = "straight";
							newFacing = "East";
							break;
						case "South":
							compassDirection = "right";
							newFacing = "South";
							break;
						case "West":
							compassDirection = "Turn around and walk forward";
							newFacing = "West"
							break;
					}
					break;
				case "South":
					switch(end){
						case "North":
							compassDirection = "Turn around and walk forward";
							newFacing = "North"
							break;
						case "East":
							compassDirection = "left";
							newFacing = "East";
							break;
						case "South":
							compassDirection = "straight";
							newFacing = "South";
							break;
						case "West":
							compassDirection = "right";
							newFacing = "West";
							break;
					}
					break;
				case "West":
					switch(end){
						case "North":
							compassDirection = "right";
							newFacing = "North";
							break;
						case "East":
							compassDirection = "Turn around";
							newFacing = "East";
							break;
						case "South":
							compassDirection = "left";
							newFacing = "South";
							break;
						case "West":
							compassDirection = "straight"
							newFacing = "West";
							break;
					}

			}

			return compassDirection;
}

function dropDownBoxStartValue()
{
	var URL = encodeURIComponent(startAtName(dropdownboxstart.value));
	return URL;
}

function dropDownBoxEndValue()
{
	return encodeURIComponent(startAtName(dropdownboxend.value));
}

function setValuesForBoxes()
{
	document.getElementById("start").value = dropDownBoxStartValue();
	document.getElementById("end").value = dropDownBoxEndValue();
}


	function makePathway(node)
{
		//var node will need to be updated once the database if feeding information into the webpage
	//var node = ["Door_3-4", "Intersection_3-9324", "Intersection_3-9322", "Intersection_3-9321", "Intersection_3-9320", "Intersection_3-9319", "Intersection_3-1", "Intersection_3-9316", "Intersection_3-9315", "9315"];
	var line = [];
	var linerev = [];

	for (i = 0; i < node.length - 1; i++)
	{
	  line.push(node[i] + "_TO_" + node[i+1]);
	  linerev.push(node[i+1] + "_TO_" + node[i]);

	}

	var map = document.getElementById("map");
	var mapDocument = map.contentDocument;


	for (i = 0; i < line.length; i++)
	{
		//console.log(line[i]);
		if( mapDocument.getElementById(line[i]) != null)
		{

		  mapDocument.getElementById(line[i]).classList.add('linevisable');
		  mapDocument.getElementById(line[i]).classList.remove('linedefault');
		}
		else
		{
		  mapDocument.getElementById(linerev[i]).classList.add('linevisable');
		  mapDocument.getElementById(linerev[i]).classList.remove('linedefault');
		}
	}

}
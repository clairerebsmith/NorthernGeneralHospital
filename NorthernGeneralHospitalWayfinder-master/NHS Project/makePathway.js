//var node will need to be updated once the database if feeding information into the webpage
var node = ["Door_3-4", "Intersection_3-9324", "Intersection_3-9322", "Intersection_3-9321", "Intersection_3-9320", "Intersection_3-9319", "Intersection_3-1", "Intersection_3-9316", "Intersection_3-9315", "9315"];
var line = [];

for (i = 0; i < node.length - 1; i++)
{
  line.push(node[i] + "_TO_" + node[i+1]);
}

for (i = 0; i < line.length; i++)
{
  document.getElementById(line[i]).classList.add('linevisable');
  document.getElementById(line[i]).classList.remove('linedefault');
}

//WARNING the code you are about to see may cause cardiac arrest.
//This is my first time using SVG
function Grid(data) {
	//Initialization
	this.domain = 5;
	this.padding = 10;
	this.maxWidth = 500;
	this.maxHeight = 500;
	this.midX = 250 + this.padding;
	this.midY = 250 + this.padding;
	this.data = data;

	//Calculates the max y range out of the data plot
	this.calculateRange = function() 
	{
		if (this.data.length < 2)
		{
			return 5;
		}
		else 
		{
			var largeY = data[1];
			for ( var i = 1; i < data.length; i=i+2) {
				if ( Math.abs(data[i]) > Math.abs(largeY))
					largeY = data[i];
			}
			return Math.abs(largeY)+1;
		}
	}
	this.range = this.calculateRange();
	
 	//Will add in a point to the svg
 	this.addData = function(data) {
 		this.data = data;

 		var group = document.createElementNS("http://www.w3.org/2000/svg", "g");
		group.setAttribute("id", "data");
		$('#graph').append(group);
		
		for (var i = 0; i < data.length; i=i+2 ) 
		{
			var xPos = data[i]*(this.maxWidth/(this.domain*2))+this.midX;
			var yPos = (-1*data[i+1]*(this.maxHeight/(this.range*2)))+this.midY;

			var point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
			point.setAttribute("r", 3);
			point.setAttribute("cx", xPos);
			point.setAttribute("cy", yPos);
			point.setAttribute("style", "stroke:rgb(50,50,150);stroke-width:1;");
			group.appendChild(point);

			var lbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
			lbl.setAttribute("x", xPos-23);
			lbl.setAttribute("y", yPos-5);
			lbl.setAttribute('fill', '#000');
			lbl.textContent = "("+data[i]+","+data[i+1]+")";
			alert(lbl.textContent);
			group.appendChild(lbl);
		}
 	};
	this.buildAxisY = function() {
		//BUILD Y AXIS
		var startY = this.padding;
		var endY = this.maxHeight + this.padding;

		var svgGraphNode = $('#graph');
		group = document.createElementNS("http://www.w3.org/2000/svg", "g");
		group.setAttribute("id", "yAxis");
		svgGraphNode.append(group);

		//Add Main Y line
		var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		line.setAttribute("x1", this.midX);
		line.setAttribute("y1", startY);
		line.setAttribute("x2", this.midX);
		line.setAttribute("y2", endY);
		line.setAttribute("style", "stroke:rgb(0,0,0);stroke-width:1;");
		group.appendChild(line);

		var y = startY;
		while ( y <= endY ) 
		{
			var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
			line.setAttribute("x1", this.midX-10);
			line.setAttribute("y1", y);
			line.setAttribute("x2", this.midX+10);
			line.setAttribute("y2", y);
			line.setAttribute("style", "stroke:rgb(0,0,0);stroke-width:1;");
			group.appendChild(line);

			y += this.maxHeight/(this.range*2); 
		}

		//Add labels
		var lbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
		lbl.setAttribute("x", this.midX-25);
		lbl.setAttribute("y", startY+10);
		lbl.setAttribute('fill', '#000');
		lbl.textContent = this.range;
		group.appendChild(lbl);

		lbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
		lbl.setAttribute("x", this.midX-25);
		lbl.setAttribute("y", endY+10);
		lbl.setAttribute('fill', '#000');
		lbl.textContent = this.range*-1;
		group.appendChild(lbl);
	};
	this.buildAxisX = function() {
		//BUILD X AXIS
		var startX = this.padding;
		var endX = this.maxWidth + this.padding;
		
		var svgGraphNode = $('#graph');
		var group = document.createElementNS("http://www.w3.org/2000/svg", "g");
		group.setAttribute("id", "xAxis");
		svgGraphNode.append(group);

		//Add Main X line
		var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		line.setAttribute("x1", startX);
		line.setAttribute("y1", this.midY);
		line.setAttribute("x2", endX);
		line.setAttribute("y2", this.midY);
		line.setAttribute("style", "stroke:rgb(0,0,0);stroke-width:1;");
		group.appendChild(line);

		//Add cross lines of x
		var x = startX;
		while ( x <= endX ) 
		{
			var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
			line.setAttribute("x1", x);
			line.setAttribute("y1", this.midY-10);
			line.setAttribute("x2", x);
			line.setAttribute("y2", this.midY+10);
			line.setAttribute("style", "stroke:rgb(0,0,0);stroke-width:1;");
			group.appendChild(line);

			x += this.maxWidth/(this.domain*2); 
		}

		//Add labels
		var lbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
		lbl.setAttribute("x", startX-10);
		lbl.setAttribute("y", this.midY+25);
		lbl.setAttribute('fill', '#000');
		lbl.textContent = this.domain*-1;
		group.appendChild(lbl);

		lbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
		lbl.setAttribute("x", endX-10);
		lbl.setAttribute("y", this.midY+25);
		lbl.setAttribute('fill', '#000');
		lbl.textContent = this.domain;
		group.appendChild(lbl);
	};
	this.clearGrid = function() {
		$('#xAxis').remove();
		$('#yAxis').remove();
		$('#data').remove();
	};
	/*Setup the lines for a basic graph*/
	this.setupGrid = function() {
		this.clearGrid();
		this.buildAxisX();
		this.buildAxisY();
	};
	this.setupGrid();
	
}
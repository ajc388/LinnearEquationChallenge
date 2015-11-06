//WARNING the code you are about to see may cause cardiac arrest.
//This is my first time using SVG
function grid(domain, range, padding, maxWidth, maxHeight) {
	//Initialization
	this.range = range;
	this.domain = domain;
	this.padding = padding;
	this.maxWidth = maxWidth;
	this.maxHeight = maxHeight;
	setupGrid();

	/*Setup the lines for a basic graph*/
	function setupGrid () {
		buildAxisX();
		buildAxisY();
	}
 
	function buildAxisY() {
		//BUILD Y AXIS
		var startY = padding;
		var midX = maxHeight/2 + padding;
		var endY = maxHeight + padding;

		var svgGraphNode = $('#graph');
		group = document.createElementNS("http://www.w3.org/2000/svg", "g");
		group.setAttribute("id", "yAxis");
		svgGraphNode.append(group);

		//Add Main Y line
		var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		line.setAttribute("x1", midX);
		line.setAttribute("y1", startY);
		line.setAttribute("x2", midX);
		line.setAttribute("y2", endY);
		line.setAttribute("style", "stroke:rgb(0,0,0);stroke-width:1;");
		group.appendChild(line);

		var y = startY;
		while ( y <= endY ) 
		{
			var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
			line.setAttribute("x1", midX-10);
			line.setAttribute("y1", y);
			line.setAttribute("x2", midX+10);
			line.setAttribute("y2", y);
			line.setAttribute("style", "stroke:rgb(0,0,0);stroke-width:1;");
			group.appendChild(line);

			y += maxHeight/(range*2); 
		}

		//Add labels
		var lbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
		lbl.setAttribute("x", midX-25);
		lbl.setAttribute("y", startY+10);
		lbl.setAttribute('fill', '#000');
		lbl.textContent = range;
		group.appendChild(lbl);

		lbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
		lbl.setAttribute("x", midX-25);
		lbl.setAttribute("y", endY+10);
		lbl.setAttribute('fill', '#000');
		lbl.textContent = range*-1;
		group.appendChild(lbl);
	}

	function buildAxisX() {
		//BUILD X AXIS
		var startX = padding;
		var midY = maxWidth/2 + padding;
		var endX = maxWidth + padding;
		
		var svgGraphNode = $('#graph');
		var group = document.createElementNS("http://www.w3.org/2000/svg", "g");
		group.setAttribute("id", "xAxis");
		svgGraphNode.append(group);

		//Add Main X line
		var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		line.setAttribute("x1", startX);
		line.setAttribute("y1", midY);
		line.setAttribute("x2", endX);
		line.setAttribute("y2", midY);
		line.setAttribute("style", "stroke:rgb(0,0,0);stroke-width:1;");
		group.appendChild(line);

		//Add cross lines of x
		var x = startX;
		while ( x <= endX ) 
		{
			var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
			line.setAttribute("x1", x);
			line.setAttribute("y1", midY-10);
			line.setAttribute("x2", x);
			line.setAttribute("y2", midY+10);
			line.setAttribute("style", "stroke:rgb(0,0,0);stroke-width:1;");
			group.appendChild(line);

			x += maxWidth/(domain*2); 
		}

		//Add labels
		var lbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
		lbl.setAttribute("x", startX-10);
		lbl.setAttribute("y", midY+25);
		lbl.setAttribute('fill', '#000');
		lbl.textContent = domain*-1;
		group.appendChild(lbl);

		lbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
		lbl.setAttribute("x", endX-10);
		lbl.setAttribute("y", midY+25);
		lbl.setAttribute('fill', '#000');
		lbl.textContent = domain;
		group.appendChild(lbl);
	}
}
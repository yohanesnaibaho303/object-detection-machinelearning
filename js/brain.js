// an array of colors that look reasonably different
var COLORS = [, '#D35400', '#2471A3', '#F39C12',
				'#B2BABB', '#138D75', '#52BE80',
				'#BB8FCE', '#555555', '#bcf60c',
				'#fabebe', '#9a6324', '#54A1D3',
				'#aaffc3', '#808000', '#333333'];

function getPointForCanvas(point, unit) {
    var margin = unit;
    var size   = unit * 8;
    var canvasPoint = {
        x: point[1],
        y: point[2]
    };
    canvasPoint.x = margin + size * canvasPoint.x;

    if (FEATURE_COUNT >= 2) {
        canvasPoint.y = margin + size - size * canvasPoint.y;
    } else {
        canvasPoint.y = margin + size - size / 2 - size * 0.05;
    }

    return canvasPoint;
}// rescale point from (0, 1) interval to the canvas size

function drawAxes(unit, context) {
    var margin = unit;
    var size = unit * 8;
    var fontSize = CONTEXT_SIZE / 14;

    var origin = {
        x: margin,
        y: size + margin
    };
    var verticalArrowTip = {
        x: margin,
        y: margin
    }
    var horizontalArrowTip = {
        x: size + margin,
        y: size + margin
    }

    var horizontalLabelLocation = {
        x: (margin + size + margin) / 2,
        y: size + margin + margin * 0.7
    }
    var verticalLabelLocation = {
        x: margin - margin * 0.2,
        y: (margin + size + margin) / 2
    }

    if (FEATURE_COUNT >= 2) {
        drawText(FEATURE_2, fontSize, context, verticalLabelLocation, "center", -Math.PI / 2);
        drawArrow(origin, verticalArrowTip, context, );
    } else {
        // if only one feature, centering the horizontal axis vertically
        origin.y -= size / 2;
        horizontalArrowTip.y -= size / 2;
        horizontalLabelLocation.y -= size / 2;
    }

    drawText(FEATURE_1, fontSize, context, horizontalLabelLocation);
    drawArrow(origin, horizontalArrowTip, context);
}// draw axes and labels for a maximum of two features

function drawPoints(sample, context) {
    var unit = CONTEXT_SIZE * 0.1;

    // removing everything 
    context.clearRect(0, 0, CONTEXT_SIZE, CONTEXT_SIZE);

    // drawing observations as filled circles
    for (var i = 1; i <= OBSERVATION_COUNT; i++) {
        var point = getPointForCanvas(OBSERVATIONS[i].point, unit);
        drawDot(point, context, COLORS[CLASSES.indexOf(OBSERVATIONS[i].name)]);
    }

    // drawing current sample with different style
    var point = getPointForCanvas(sample, unit);
    var transparentFill = "rgba(0,0,0,0)"; // alpha is zero
    drawDot(point, context, transparentFill, "black");

    drawAxes(unit, context);
}// drawing points 

function drawDot(center, context, color, lineColor = "rgba(0,0,0,0)") {
    var radius = CONTEXT_SIZE / 50;
    context.beginPath();
    context.strokeStyle = lineColor;
    context.lineWidth   = CONTEXT_SIZE / 100;
    context.fillStyle   = color;
    // complete circle = from 0 to 2PI radians
    context.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
}// drawing a circle 

function drawArrow(fromPoint, toPoint, context) {
    //variables to be used when creating the arrow
    var tipSize   = CONTEXT_SIZE / 30;
    var lineWidth = CONTEXT_SIZE / 100;
    var color     = "black";
	var sharpness = 8;

    // drawing arrow line
    context.beginPath();
    context.moveTo(fromPoint.x, fromPoint.y);
    context.lineTo(toPoint.x, toPoint.y);
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.stroke();

    // drawing arrow tip
    var angle = Math.atan2(toPoint.y - fromPoint.y, toPoint.x - fromPoint.x);
    context.beginPath();
    context.moveTo(toPoint.x, toPoint.y);
    context.lineTo(toPoint.x - tipSize * Math.cos(angle - Math.PI / sharpness),
				   toPoint.y - tipSize * Math.sin(angle - Math.PI / sharpness));
    context.lineTo(toPoint.x - tipSize * Math.cos(angle + Math.PI / sharpness),
				   toPoint.y - tipSize * Math.sin(angle + Math.PI / sharpness));
    context.lineTo(toPoint.x, toPoint.y);
    context.lineTo(toPoint.x - tipSize * Math.cos(angle - Math.PI / sharpness),
				   toPoint.y - tipSize * Math.sin(angle - Math.PI / sharpness));
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.stroke();
    context.fillStyle = color;
    context.fill();
}// drawing an arrow
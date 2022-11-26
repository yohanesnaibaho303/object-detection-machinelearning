// a stored model so no need to retrain all the time
var MODEL = '[null,{"name":"biban","point":[null,0.4589041095890411,0.4991821713351053]},{"name":"somon","point":[null,0.35555555555555557,0.4633888888888889]},{"name":"girafă","point":[null,0.696078431372549,0.25780171223418946]},{"name":"elefant","point":[null,0.8125,0.6251589319771138]},{"name":"molid","point":[null,0.6078431372549019,0.49082858950031627]},{"name":"stejar","point":[null,0.9647887323943662,0.5752030430759741]},{"name":"creion","point":[null,0.05194805194805195,0.8571428571428571]},{"name":"cameră","point":[null,0.9709302325581395,0.7443949310680964]},{"name":"biban","point":[null,0.5214285714285715,0.5234833659491194]},{"name":"somon","point":[null,0.30493273542600896,0.45733315747823794]},{"name":"girafă","point":[null,0.7788461538461539,0.2303537511870845]},{"name":"elefant","point":[null,0.7180851063829787,0.6035460992907802]},{"name":"molid","point":[null,0.5059523809523809,0.46260504201680674]},{"name":"stejar","point":[null,0.965034965034965,0.6378838552751597]},{"name":"creion","point":[null,0.049689440993788817,0.8198757763975155]},{"name":"cameră","point":[null,0.7195767195767195,0.7813958916900093]},{"name":"biban","point":[null,0.4892086330935252,0.4691070672873466]},{"name":"somon","point":[null,0.3148936170212766,0.5230592294422082]},{"name":"girafă","point":[null,0.5971563981042654,0.24610697359512526]},{"name":"elefant","point":[null,0.7807486631016043,0.6350450516445681]},{"name":"molid","point":[null,0.554140127388535,0.4496668863020719]},{"name":"stejar","point":[null,0.9629629629629629,0.5472855333966445]},{"name":"creion","point":[null,0.05673758865248227,0.7624113475177305]},{"name":"cameră","point":[null,0.8936170212765957,0.7155205167173252]}]';

function loadModel() {
    OBSERVATIONS 		= JSON.parse(MODEL);
    OBSERVATION_COUNT 	= OBSERVATIONS.length - 1;
	
    for (var i = 1; i <= OBSERVATION_COUNT; i++) {
        if (CLASSES.indexOf(OBSERVATIONS[i].name) == -1) {
            CLASS_COUNT++;
            CLASSES[CLASS_COUNT] = OBSERVATIONS[i].name;
        }
    }
}// loads the model into the application
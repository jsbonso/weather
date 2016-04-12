;(function ($) {

	var currentlyFields = [
		'Rain',
    	'Chances',
    	'Temp',
    	'Dew',
    	'Humidity',
	    'Pressure',
	    'Wind Spd',
	    'Wind Dir'
	];
	var weeklyFields = [
		{ 'summary': 'Summary' },
		{ 'precipIntensity': 'Rain' },
    	{ 'precipProbability': 'Chances' },
    	{ 'temperatureMin': 'Min Temp' },
    	{ 'temperatureMax': 'Max Temp' },
    	{ 'dewPoint': 'Dew' },
    	{ 'humidity': 'Humidity' },
	    { 'pressure': 'Pressure' },
	    { 'windSpeed': 'Wind Spd' },
	    { 'windBearing': 'Wind Dir' }
	];
    var $buttonSpinner = $('#_submit i.fa-spinner');
    var address = '';

    google.maps.event.addDomListener(window, 'load', function () {
	    var places = new google.maps.places.Autocomplete(document.getElementById('locationInput'));
	    google.maps.event.addListener(places, 'place_changed', function () {
	        var place = places.getPlace();
	        address = place.formatted_address;
	    });
	});

    $(document).ready(function () {
        $('form#fetchWeatherData').submit(function (e) {
            e.preventDefault();

            var $form     = $(this);
            // var action  = $form.attr('action');
            var action    = 'api/v1/weather/';
            var dayOfWeek = $('#dayofweekSelect').val();
            action = action + address;
            action = action + '/' + dayOfWeek;

            postForm(action, function (err, response) {
                if (err) {
                    displayErrorMessage();
                }
                else {
                	populateView(response);
                }
            });

        });
    });


    var postForm = function (action, callback) {

        // Send it the authentication api
        $.ajax({
            type       : 'GET',
            url        : action,
            dataType   : 'json',
            beforeSend : function () {
                $buttonSpinner.show();
            },
            success    : function (data, textStatus, xhr) {
                if (xhr.status === 200) {
                    callback(null, data);
                }
            },
            error      : function (xhr, textStatus, error) {
                $buttonSpinner.hide();
                callback(error, xhr.responseText);
            }
        });
    };

    function displayErrorMessage(message) {
        message = message || 'Oops! Please try again.';
        $('#login-errors').empty().append(message);
    }

    function populateView(weatherData) {
    	populateCurrentlyView(weatherData.currently);
    	populateWeeklyView(weatherData.daily);
    }

    function populateCurrentlyView(data) {
    	$( "#weatherData h2" ).append( "<p>" + data.time + "</p>");
    	var table = $("#weatherCurrentlyTable table");
    	table.attr("summary", data.summary);
        drawHeader(currentlyFields, table);
        drawRow(data, table);
    }

    function populateWeeklyView(daily) {
    	var table = $("#weatherWeeklyTable table");
    	table.attr("summary", daily.summary);
    	var data = daily.data;
    	var colArray = ['DayOfWeek'];
    	for (var i = 0; i < data.length; i++) {
    		colArray.push(data[i].time);
	    }
	    drawHeader(colArray,table);
	    for (var i = 0; i < weeklyFields.length; i++) {
	    	var rowData	 = $("<tr />"),
	    		fieldObj = weeklyFields[i],
	    		field 	 = Object.keys(fieldObj)[0];

	    	$(table).append(rowData);
	    	rowData.append("<td>" + fieldObj[field] + "</td>");
    		for (var index in data) {
    			var weekDay = data[index];
				if (weekDay.hasOwnProperty(field)) {
    				rowData.append("<td>" + weekDay[field] + "</td>");
    			}
	    	}
	    }	
    }

	function drawHeader(headerData, table) {
		var header = "<thead><tr>";
		for (var i = 0; i < headerData.length; i++) {
		    header = header + "<th>" + headerData[i] + "</th>";
		}
		header = header + "</tr></thead>";
		$(table).append(header);
	}

	function drawRow(rowData, table) {
	    var row = $("<tr />");
	    $(table).append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
	    row.append($("<td>" + rowData.precipIntensity + "</td>"));
	    row.append($("<td>" + rowData.precipProbability + "</td>"));
	    row.append($("<td>" + rowData.temperature + "</td>"));
	   	row.append($("<td>" + rowData.dewPoint + "</td>"));
	    row.append($("<td>" + rowData.humidity + "</td>"));
	    row.append($("<td>" + rowData.pressure + "</td>"));
	    row.append($("<td>" + rowData.windSpeed + "</td>"));
	   	row.append($("<td>" + rowData.windBearing + "</td>"));
	}


})(jQuery);


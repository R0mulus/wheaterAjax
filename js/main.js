$(document).ready(function(){

    var selectCountry;
    var selectCityText;
    var citylist = $('#citylist');
    var appid = '13fb217fb6762e2f72225bc15b0e0947';
    var currTemp = $('#currTemp');
    var currPressure = $('#currPressure');
    var currHumidity = $('#currHumidity');
    var currMin = $('#currMin');
    var currMax = $('#currMax');
    var currRain = $('#currRain');
    var currWind = $('#currWind');

    $('#countrylist').on('click', function(){
        selectCountry = $('#countrylist option:selected').val();
        currTemp.text("");
        currPressure.text("");
        currHumidity.text("");
        currMin.text("");
        currMax.text("");
        currRain.text("");
        currWind.text("");

        var clicks = $(this).data('clicks');
        if (clicks) {
            if(selectCountry == 'sk'){
                callSlovakCities();
            }else if(selectCountry == 'cz'){
                callCzechCities();
            }else if(selectCountry == 'pl'){
                callPolishCities();
            }else{
                callHungarianCities();
            }
        }
        $(this).data("clicks", !clicks);


    });


    var callHungarianCities = function(){
        citylist.empty();
        citylist.append($("<option />").val(1).text('Budapest'));
        citylist.append($("<option />").val(2).text('Debrecen'));
        citylist.append($("<option />").val(3).text('Miskolc'));
        citylist.append($("<option />").val(4).text('Szeged'));
    };

    var callPolishCities = function(){
        citylist.empty();
        citylist.append($("<option />").val(1).text('Warsaw'));
        citylist.append($("<option />").val(2).text('Krakow'));
        citylist.append($("<option />").val(3).text('Lodz'));
        citylist.append($("<option />").val(4).text('Wroclaw'));
    };

    var callCzechCities = function (){
        citylist.empty();
        citylist.append($("<option />").val(1).text('Prague'));
        citylist.append($("<option />").val(2).text('Brno'));
        citylist.append($("<option />").val(3).text('Ostrava'));
        citylist.append($("<option />").val(4).text('Plzen'));
    };

    var callSlovakCities = function (){
        citylist.empty();
        citylist.append($("<option />").val(1).text('Bratislava'));
        citylist.append($("<option />").val(2).text('Kosice'));
        citylist.append($("<option />").val(3).text('Presov'));
        citylist.append($("<option />").val(4).text('Zilina'));
    };


    $('#citylist').on('click', function(){
        var clicks = $(this).data('clicks');
        if (clicks) {
            selectCityText = $('#citylist option:selected').text();
            callWeather(selectCityText,selectCountry);
        }
        $(this).data("clicks", !clicks);
    });

    var callWeather = function(city, country){
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "," + country + "&appid=" + appid,
            dataType: 'json',
            success: function (weatherInfo) {
                printCurrWeather(weatherInfo.list[0].main.temp);
                printCurrPressure(weatherInfo.list[0].main.pressure);
                printCurrHumidity(weatherInfo.list[0].main.humidity);
                printMinTemp(weatherInfo.list[0].main.temp_min);
                printMaxTemp(weatherInfo.list[0].main.temp_max);

                printRain(weatherInfo.list[0].weather[0].description);

                printWindSpeed(weatherInfo.list[0].wind.speed);
                //console.log(weatherInfo.list[0].main.temp);
                //return weatherInfo;
            },
            error: function () {
                console.log("Error pulling information!");
            }
        });
    };

    var printCurrWeather = function (temp){
        var trimmed = (Math.round(temp * 100)/100) - 273.15;
        currTemp.text(trimmed.toFixed(2) + "°C");
    };

    var printCurrHumidity = function (hum){
        currHumidity.text(hum + " %");
    };

    var printCurrPressure = function (pressure){
        currPressure.text(pressure + " hpa");
    };

    var printMinTemp = function (mintemp){
        var trimmed = (Math.round(mintemp * 100)/100) - 273.15;
        currMin.text(trimmed.toFixed(2) + "°C");
    };

    var printMaxTemp = function (maxtemp){
        var trimmed = (Math.round(maxtemp * 100)/100) - 273.15;
        currMax.text(trimmed.toFixed(2) + "°C");
    };

    var printRain = function (rain){
        currRain.text("" + rain);
    };

    var printWindSpeed = function (wind){
        currWind.text(wind + " km/h");
    };


});

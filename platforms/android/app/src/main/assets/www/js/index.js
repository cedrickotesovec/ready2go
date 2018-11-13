// globale Variablen
 var myHours;
 var myMinutes;
 var myBatteryGoal;
 var myBatteryLevel

var app = {

    initialize: function () {

        $(function(){

            loadAppContent();

            function loadAppContent(){
                $('#mainContent').load('./sites/home.html', function () {
                    $('#btnNew').click(function () {
                        $('#mainContent').load('./sites/form.html', function () {
                            $('#btnStart').click(function () {
                                saveForm();
                            });
                            $('#btnCancel1').click(function () {
                                loadAppContent();
                            });

                            function saveForm() {
                                myHours = $('#myHours').val();
                                myMinutes = $('#myMinutes').val();
                                myBatteryGoal = $('#myBatteryGoal').val();
                                console.log(myHours);
                                console.log(myMinutes);
                                console.log(myBatteryGoal);
                                showOverview();
                            }

                            function showOverview() {
                                $('#mainContent').load('sites/overview.html', function () {
                                    $('#btnFinish').click(function () {
                                        $('#mainContent').load('./sites/finish.html', function () {
                                            $('#btnOk').click(function () {
                                                loadAppContent();
                                            });
                                        });
                                    });
                
                                    $('#btnCancel2').click(function () {
                                        loadAppContent();
                                    });

                                    //Timer
                                    var timer = new Timer();
                                    var timerInSeconds = (myHours * 3600) + (myMinutes * 60);
                                    timer.start({countdown: true, startValues: {seconds: timerInSeconds}});
                                    $('#countdownExample .values').html(timer.getTimeValues().toString());
                                    timer.addEventListener('secondsUpdated', function (e) {
                                    $('#countdownExample .values').html(timer.getTimeValues().toString());
                                    });
                                    timer.addEventListener('targetAchieved', function (e) {
                                    $('#countdownExample .values').html('You need to go');
                                    });
                
                                    //Battery
                                    $('#batteryLevel').html("<i class='material-icons prefix'>battery_charging_full</i>" + " 50%");
                
                                    //Geolocation
                                    navigator.geolocation.getCurrentPosition(onWeatherSuccess, onWeatherError);
                
                                    function onWeatherSuccess(position) {
                
                                        Latitude = position.coords.latitude;
                                        Longitude = position.coords.longitude;
                                    
                                        getWeather(Latitude, Longitude);
                                    }

                                    function getWeather(latitude, longitude) {

                                        var OpenWeatherAppKey = "8b56739822f928d762401e926e546959";
                                    
                                        var queryString =
                                          'http://api.openweathermap.org/data/2.5/weather?lat='
                                          + latitude + '&lon=' + longitude + '&appid=' + OpenWeatherAppKey + '&units=metric';
                                    
                                        $.getJSON(queryString, function (results) {
                                    
                                            if (results.weather.length) {
                                    
                                                $.getJSON(queryString, function (results) {
                                    
                                                    if (results.weather.length) {
                                    
                                                        $('#description').text(results.name);
                                                        $('#temp').text(results.main.temp + "°C");
                                                        var iconcode = results.weather[0].icon;
                                                        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                                                        $('#wicon').attr('src', iconurl);
                                                    }
                                    
                                                });
                                            }
                                        }).fail(function () {
                                            console.log("error getting location");
                                        });
                                    }
                        
                                    function onWeatherError(error) {
                                        console.log('code: ' + error.code + '\n' +
                                            'message: ' + error.message + '\n');
                                    }
                                });
                            }
                
                        });
                    });
                });
            }

            function onBatteryStatus(status) {
                myBatteryLevel = status.level;
            }
        });    
    },
};

app.initialize();
// globale Variablen
var myHours;
var myMinutes;
var myBatteryGoal;
var myBatteryLevel

// Initialisierung der App
var app = {

    // Konstruktor
    initialize: function () {

        // documentReady Funktion von JQuery
        $(function () {

            // Aufruf Funktion: Lade Inhalt
            loadAppContent();

            // Funktion: Lade Inhalt
            function loadAppContent() {
                $('#mainContent').load('./sites/home.html', function () {
                    $('#btnNew').click(function () {
                        $('#mainContent').load('./sites/form.html', function () {

                            // Button Start -> ruft saveForm() auf
                            $('#btnStart').click(function () {
                                saveForm();
                            });

                            // Button Cancel -> ruft loadAppContent() auf
                            $('#btnCancel1').click(function () {
                                loadAppContent();
                            });

                            // Funktion: Speichert Werte aus dem Form in Variablen
                            function saveForm() {
                                myHours = $('#myHours').val();
                                myMinutes = $('#myMinutes').val();
                                myBatteryGoal = $('#myBatteryGoal').val();
                                console.log(myHours);
                                console.log(myMinutes);
                                console.log(myBatteryGoal);
                                showOverview();
                            }

                            // Funktion: Zeigt Übersichts-Seite an
                            function showOverview() {
                                $('#mainContent').load('sites/overview.html', function () {

                                    // Button Finish -> ruft Finish-Seite auf
                                    $('#btnFinish').click(function () {
                                        $('#mainContent').load('./sites/finish.html', function () {

                                            // Button Ok -> ruft loadAppContent() auf
                                            $('#btnOk').click(function () {
                                                loadAppContent();
                                            });
                                        });
                                    });

                                    // Button Cancel -> ruft loadAppContent() auf
                                    $('#btnCancel2').click(function () {
                                        loadAppContent();
                                    });

                                    // Timer wird initialisiert und berechnent
                                    var timer = new Timer();
                                    var timerInSeconds = (myHours * 3600) + (myMinutes * 60);
                                    timer.start({ countdown: true, startValues: { seconds: timerInSeconds } });
                                    $('#countdownExample .values').html(timer.getTimeValues().toString());
                                    timer.addEventListener('secondsUpdated', function (e) {
                                        $('#countdownExample .values').html(timer.getTimeValues().toString());
                                    });
                                    timer.addEventListener('targetAchieved', function (e) {
                                        $('#countdownExample .values').html('You need to go');
                                    });

                                    // Battery-Level wird ausgegeben
                                    $('#batteryLevel').html("<i class='material-icons prefix'>battery_charging_full</i>" + " 50%");

                                    // Geolocation: aktueller Standort wird ermittelt
                                    navigator.geolocation.getCurrentPosition(onWeatherSuccess, onWeatherError);

                                    // Funktion: Falls erfolgreich war -> aktuelles Wetter wird ermittelt
                                    function onWeatherSuccess(position) {

                                        Latitude = position.coords.latitude;
                                        Longitude = position.coords.longitude;

                                        getWeather(Latitude, Longitude);
                                    }

                                    // Funktion: aktuelles Wetter wird ermittelt und ausgegeben
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

                                    // Funktion: Falls nicht erfolgreich war -> Fehler wird auf Konsole ausgegeben mit Fehlercode
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

            // Funktion: Batterie Status wird ermittelt
            function onBatteryStatus(status) {
                myBatteryLevel = status.level;
            }
        });
    },
};

// Applikation wird initialisiert
app.initialize();
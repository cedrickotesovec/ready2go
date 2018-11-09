/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

 var myHours;
 var myMinutes;
 var myBatteryGoal;
 var myBatteryLevel

var app = {

    // Application Constructor
    initialize: function () {

        $(function(){

            loadAppContent();

            function loadAppContent(){
                $('#mainContent').load('./sites/home.html', function () {
                    $('#btnNew').click(function () {
                        $('#mainContent').load('./sites/form.html', function () {
                            $('#btnStart').click(function () {
                                save_form();
                                $('#mainContent').load('./sites/overview.html', function () {
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
                                    document.getElementById("b1").addEventListener("click", onBatteryStatus, false);
                                
                                    showBatteryLevel();

                                    $('#batteryLevel').html("battery level: " + myBatteryLevel);

                                    //Geolocation
                                    navigator.geolocation.getCurrentPosition(onWeatherSuccess, onWeatherError);

                                    function onWeatherSuccess(position) {

                                        Latitude = position.coords.latitude;
                                        Longitude = position.coords.longitude;
                                    
                                        getWeather(Latitude, Longitude);
                                    }

                        
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
                                });

                            });
                            $('#btnCancel1').click(function () {
                                loadAppContent();
                            });
                        });
                    });
                });
            }

            function save_form() {
                myHours = $('#myHours').val();
                myMinutes = $('#myMinutes').val();
                myBatteryGoal = $('#myBatteryGoal').val();
                console.log(myHours);
                console.log(myMinutes);
                console.log(myBatteryGoal);
            }

            function onBatteryStatus(status) {
                myBatteryLevel = status.level;
                //alert("Battery Status: Level: " + status.level + " isPlugged: " + status.isPlugged);
                //console.log("Battery Status: Level: " + status.level + " isPlugged: " + status.isPlugged);
            }

            function showBatteryLevel() {
                console.log("goal is: " + myBatteryGoal)
                if(myBatteryGoal == "5")
                    $('#batteryLevel').html("you still need some");
            }

            function getWeather(latitude, longitude) {

                // Get a free key at http://openweathermap.org/. Replace the "Your_Key_Here" string with that key.
                var OpenWeatherAppKey = "8b56739822f928d762401e926e546959";
            
                var queryString =
                  'http://api.openweathermap.org/data/2.5/weather?lat='
                  + latitude + '&lon=' + longitude + '&appid=' + OpenWeatherAppKey + '&units=metric';
            
                $.getJSON(queryString, function (results) {
            
                    if (results.weather.length) {
            
                        $.getJSON(queryString, function (results) {
            
                            if (results.weather.length) {
            
                                $('#description').text(results.name);
                                $('#temp').text(results.main.temp);
                                $('#wind').text(results.wind.speed);
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
    },

};

app.initialize();
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
 var myBattery;
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
                                
                                    $('#batteryLevel').html("battery level: " + myBatteryLevel);



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
                myBattery = $('#myBattery').val();
                console.log(myHours);
                console.log(myMinutes);
                console.log(myBattery);
            }

            function onBatteryStatus(status) {
                myBatteryLevel = status.level;
                //alert("Battery Status: Level: " + status.level + " isPlugged: " + status.isPlugged);
                //console.log("Battery Status: Level: " + status.level + " isPlugged: " + status.isPlugged);
            }

            /*function showBatteryStatus() {
                document.get
            }*/
            
        });    
    },

};

app.initialize();
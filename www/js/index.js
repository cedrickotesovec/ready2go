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
var app = {
    // Application Constructor
    initialize: function () {

        $(function(){

            loadAppContent();

            function loadAppContent(){
                $('#mainContent').load('../sites/home.html', function () {
                    $('#btnNew').click(function () {
                        $('#mainContent').load('../sites/form.html', function () {
                            $('#btnStart').click(function () {
                                function save_form() {
                                    var myTime = $('#myTime').val();
                                    var myBattery = $('#myBattery').val();
                                    console.log(myTime);
                                    console.log(myBattery);
                                }
                                $('#mainContent').load('../sites/overview.html', function () {
                                    
                                });
                            });
                            $('#btnCancel').click(function () {
                                loadAppContent();
                            });
                        });
                    });
                });
            }
            
        });    
    },

};

app.initialize();
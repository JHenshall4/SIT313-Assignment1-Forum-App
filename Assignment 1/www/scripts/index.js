// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        //Removed default event listeners 01/08/17
        // Note - For assignment one and testing purposes, this app uses a local DB. A lot of these functions will become
        // obsolete when integrated with proper database tables

        //Hide unused Div elements by default 01/08/17
        $("#account").hide();
        $("#search").hide();
        $("#trending").hide();
        $("#topic").hide();
        $("#threads").hide();
        $("#legal").hide();
        // Set selected element as bold, set others as normal
        $("#main_btn").css("font-weight", "bold");

        $("#trending_btn").css("font-weight", "normal");
        $("#account_btn").css("font-weight", "normal");
        $("#search_btn").css("font-weight", "normal");


        // Below are the functions for the lower menu buttons.
        //Run this when ACCOUNT button is clicked.
        $("#account_btn").click(function accountPage() {
            // Show the account page
            $("#account").show()
            //Hide other elements
            $("#boardindex").hide();
            $("#legal").hide();
            $("#search").hide();
            $("#trending").hide()
            $("#topic").hide();
            $("#threads").hide();
            $("#account_btn").css("font-weight", "bold");
            $("#trending_btn").css("font-weight", "normal");
            $("#main_btn").css("font-weight", "normal");
            $("#search_btn").css("font-weight", "normal");
        });

        //Run this when MAIN button is clicked
        $("#main_btn").click(function mainPage() {
            // Show the board index page
            $("#boardIndex").show()
            //Hide other elements
            $("#account").hide();
            $("#legal").hide();
            $("#search").hide();
            $("#trending").hide()
            $("#topic").hide();
            $("#threads").hide();
            $("#main_btn").css("font-weight", "bold");
            $("#trending_btn").css("font-weight", "normal");
            $("#account_btn").css("font-weight", "normal");
            $("#search_btn").css("font-weight", "normal");
        });

        // Below are the functions for board index navigation


        // Functions for topics -- Here are the functions to import the CSV file, filter the correct items and display them where needed
        // Solution developed 03/08/17 -- Updates content based on clicking the category.
        $("#Outdoors, #Technology, #Household, #Kids, #Hobbies, #FoodandDrink, #FixIt, #Gifts, #Science, #Miscellaneous" ).click(function Forum() {

            // Hide necessary elements and show topic page
            $("#boardIndex").hide();
            $("#legal").hide();
            $("#account").hide();
            $("#search").hide();
            $("#trending").hide();
            $("#topic").show();
            $("#threads").hide();
            $("#main_btn").css("font-weight", "bold");
            $("#trending_btn").css("font-weight", "normal");
            $("#account_btn").css("font-weight", "normal");
            $("#search_btn").css("font-weight", "normal");

            // Identify which category fired the event
            var category = event.target.id;
            var counter = 0;

            // Modify header
            $("#topicHeader").text(category);
            
            $.get('Data/TopicDB.csv').then(function (response) {

                var html = "";
                var data = response;
                var AllLines = data.split(/\r\n|\n/);
                var headers = AllLines[0].split(',');

                // We know there are only four headers / columns that we need.
                // Create the table and put the data in.
           //     html += '<table class="topicResults" id="topicTable">';
           //     html += '<tr><th>' + headers[0] + '</th><th>' + headers[1] + '</th><th>' + headers[2] + '</th><th>' + headers[3] + '</th></tr>';

                // Above depricated due to new solution which creates a nicer and more manageable format than tables.
                html += '<ul id="example">'
                html += '<div class="theLine2"></div>'


                // Create for loop for all rows (posts)
                for (var i = 1; i < AllLines.length; i++) {
                    var row = AllLines[i].split(',');
                    if (row[4] == category && counter < 7) { //Limit posts per page 7. -- Currently only one page, can expand easily to include multiple pages in the future.
                        // Create a list object with the appropriate elements and append appropriate data.
                        html += '<li> <div class="forumDivContainer" id="' + row[0] +'"><div class="threadCategory">' + row[4] + '</div>'; // Using multiple lines to keep code neat / readable -- Thread category
                        html += '<div class="threadTitle">' + row[0] + '</div>'; // Thread title
                        html += '<div class="threadAuthor-Date">' + row[1] + ' - ' + row[2] + '</div><div class="theLine"></div></div></li>' // Author and date
                        counter++;
                    }

                }

                html += '</ul>';
                $("#TopicList").html(html);
                $("#topicTable").show();
                topicSelection();

            });
            

        });

        //Run this when the TRENDING button is clicked
        $("#trending_btn").click(function trendingPage() {
            // Show the trending page
            $("#trending").show()
            //Hide other elements
            $("#boardindex").hide();
            $("#account").hide();
            $("#legal").hide();
            $("#search").hide();
            $("#topic").hide();
            $("#threads").hide();
            $("#trending_btn").css("font-weight", "bold");
            $("#main_btn").css("font-weight", "normal");
            $("#account_btn").css("font-weight", "normal");
            $("#search_btn").css("font-weight", "normal");

           //  Trending posts algorithm *note: Currently based off number of posts*
                $.get('Data/TopicDB.csv').then(function (response) {

                    var html = "";
                    var data = response;
                    var AllLines = data.split(/\r\n|\n/);
                    var headers = AllLines[0].split(',');
                    var top = [];

                    // We know there are only four headers / columns that we need.
                    // Create the table and put the data in.
                    html += '<ul id="example">'
                    html += '<div class="theLine2"></div>'
                    // Create for loop for all rows (posts)

                    AllLines.shift();
                    var array = [];

                    for (var i = 0; i < AllLines.length; i++) {
                        var test = AllLines[i].split(',');
                        array.push(test);
                    }

                     array.sort(function (a, b) {
                         return b[3] - a[3];
                    });



                    for (var i = 1; i < 6; i++) {

                        var row = array[i];
                        html += '<li> <div class="forumDivContainer" id="' + row[0] + '"><div class="threadCategory">' + row[4] + '</div>'; // Using multiple lines to keep code neat / readable -- Thread category
                        html += '<div class="threadTitle">' + row[0] + '</div>'; // Thread title
                        html += '<div class="threadAuthor-Date">' + row[1] + ' - ' + row[2] + '</div><div class="theLine"></div></div></li>' // Author and date

                    }
                    html += '</ul>';
                    $("#trendingResults").html(html);
                    $("#trendingTable").show();
                    topicSelection();

                });

        });

        // Search function

        // First we must create a table with all posts (hide those which overflow)

        //Run this when SEARCH button is clicked
        $("#search_btn").click(function searchPage() {
            // Show the search page
            $("#search").show()
            //Hide other elements
            $("#boardindex").hide();
            $("#account").hide();
            $("#trending").hide();
            $("#legal").hide();
            $("#topic").hide();
            $("#threads").hide();
            $("#search_btn").css("font-weight", "bold");
            $("#trending_btn").css("font-weight", "normal");
            $("#account_btn").css("font-weight", "normal");
            $("#main_btn").css("font-weight", "normal");

            $.get('Data/TopicDB.csv').then(function (response) {

                var html = "";
                var data = response;
                var AllLines = data.split(/\r\n|\n/);
                var headers = AllLines[0].split(',');

                // We know there are only four headers / columns that we need.
                // Create the table and put the data in.
                html += '<ul id="example">'
                html += '<div class="theLine2"></div>'
                // Create for loop for all rows (posts)

                for (var i = 1; i < AllLines.length; i++) {

                    var row = AllLines[i].split(',');
                    html += '<li> <div class="forumDivContainer" id="' + row[0] + '"><div class="threadCategory">' + row[4] + '</div>'; // Using multiple lines to keep code neat / readable -- Thread category
                    html += '<div class="threadTitle">' + row[0] + '</div>'; // Thread title
                    html += '<div class="threadAuthor-Date">' + row[1] + ' - ' + row[2] + '</div><div class="theLine"></div></div></li>' // Author and date

                }
                html += '</ul>';
                $("#SearchResults").html(html);
                topicSelection();
                

            });
        });

        // Hide /show search results based on searchbox input.
        $("#searchbar").keyup( function searchFunction()
        {
            var input;
            var filter;
            input = $("#searchbar");
            filter = input.val().toUpperCase();
            // Put all divs in an array
            var divs = $('.forumDivContainer');


            // if searchbox value matches content show, otherwise hide.
            for (var i = 0; i < divs.length; i++)
            {
                // convert content to uppercase temporarily
                var temp = divs[i];
                temp = temp.textContent.toUpperCase();
                // Check search contents against content of all divs
                if (temp.match(filter))
                {
                    divs[i].style.display = "";
                } else
                {
                    divs[i].style.display = "none";
                }
            }

        });


        // View threads functions 
        // Create event listener for click on topic -- We will use this to fill the topic variable
        //Solution modified from my SIT321 table database javascript.

        var topic = "";
        function topicSelection(){
            var cells = document.getElementsByClassName("forumDivContainer");
            try {

                for (var i = 0; i <= cells.length; i++) {
                    cells[i].addEventListener("click", clickHandler);
                }
            }
            catch (err)
            {
                //Nothing to do here, it works but throws an error.
            }

            function clickHandler() {
                var urlText = (this.id);
                topic = urlText;

                if (topic != null || topic != "") {
                    $("#boardindex").hide();
                    $("#account").hide();
                    $("#trending").hide();
                    $("#topic").hide();
                    $("#search").hide();
                    $("#legal").hide();
                    $("#threads").show();
                    $("#topic_title").html('<b> ' +topic + '</b>');

                    // Import the thread database

                    $.get('Data/Threads.csv').then(function (response) {

                        var html = "";
                        var originalPost = "";
                        var data = response;
                        var AllLines = data.split(/\r\n|\n/);
                        var originalPost = "";
                        var commentLine;
                        var postNum = 0;

                        for (i = 1; i < AllLines.length; i++) {
                            if (AllLines[i].match(urlText))
                            {
                                originalPost = AllLines[i].split(',');
                                postNum = i;
                                break;
                            }
                        }

                        // Create for loop for all rows (posts)
                        $("#topic_title").append('<br /><p style="font-size: 10px">' + originalPost[1] + ' - ' + originalPost[2] + '</p>');
                        $("#ThreadOP").html(originalPost[3] + '<div class="theLine3"></div>');
                        
                        // I want to create a list of div objects to insert the comments.
                        // Trim the first 4 entries of original Post, the rest will be comments.
                        // Constantly splice the same position as positions move up in array
                        originalPost.splice(0, 1);
                        originalPost.splice(0, 1);
                        originalPost.splice(0, 1);
                        originalPost.splice(0, 1);

                        // Create a list for comments
                        html += '<ul class="comment_list">';

                        //Loop through comments
                        for (var j = 0; j < originalPost.length; j++)
                        {
                            //Add post to list inside a div
                            html += '<li><div class="comment_post" id="comment_post">' + originalPost[j] + '</div></li>'
                        }

                        //finish the list and append
                        html += '</ul>'
                        $("#comments").html(html);

                        // Implement similar feature to seach function - if div is empty, don't show it
                        // Put all comment divs in an array
                        var divs = $('.comment_post');
                        var filter = "";
                        for (i = 0; i < divs.length; i++) {
                            var temp = divs[i].textContent;
                            // Check div contents against content of all divs
                            if (temp == "" || temp == null) {
                                divs[i].style.display = "none";
                            } else {
                                divs[i].style.display = "";
                            }
                        }

                    });

                }
            }
        
        };

        //Legal page
        $("#logo").click(function Legal() {

            // Hide necessary elements and show legal page
            $("#boardIndex").hide();
            $("#account").hide();
            $("#search").hide();
            $("#trending").hide();
            $("#legal").show();
            $("#threads").hide();
            $("#main_btn").css("font-weight", "normal");
            $("#trending_btn").css("font-weight", "normal");
            $("#account_btn").css("font-weight", "normal");
            $("#search_btn").css("font-weight", "normal");


        });

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();
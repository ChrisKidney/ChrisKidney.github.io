$(document).ready(function(){
    let fetchData = function(){
        // Parse ID from URL
        let id = parseID($('#inputBox').val());

        // Get API data from tracker.gg (NOTE: had to create and deploy a cors-anywhere server on heroku in order to proxy my request)
        const url = `https://sheltered-bastion-72652.herokuapp.com/https://public-api.tracker.gg/v2/csgo/standard/profile/steam/${id}`; 
        
        // Fetch data from API using my auth key, send the data to the generateStatsPage function
        fetch(url,{
            headers: {
                'TRN-Api-Key':'a3b9ea79-f1a7-474a-bec2-cea41ba6a3af',
                'Accept' : 'application/json'
            }
        })
        .then(handleErrors)
        .then(response => response.json())
        .then(json => generateStatsPage(json, id))
        .catch((error) => displayErrorText(error));
    }

    // Main function, takes fetched data and fills out pages with info from it
    let generateStatsPage = function(json, id){
        // Fade main page out when data is retrieved
        $('#main-page').fadeOut();
        // Show loading page for a short time as a buffer for loading API data, then show filled out stats page
        $('#loading-page').show()
        setTimeout(() => {$('#loading-page').hide();$('#stats-page').fadeIn()},1100);
        
        // Grab the statistics from the json data
        let filteredStats = json.data.segments[0].stats; // object with each stat object

        // Log json to console
        console.log(filteredStats);
        console.log(json);

        // General Info and Stats
        $('#avatar-img').attr('src', json.data.platformInfo.avatarUrl);
        $('#profile-link').attr('href', `https://steamcommunity.com/id/${id}`);
        $('#player-name').html(json.data.platformInfo.platformUserHandle);
        $('#time-played').html(filteredStats.timePlayed.displayValue);
        $('#total-score').html(filteredStats.score.displayValue);
        $('#total-money-earned').html('$'+ filteredStats.moneyEarned.displayValue);
        $('#total-mvps').html(filteredStats.mvp.displayValue);

        // Combat Stats
        $('#total-kills').html(filteredStats.kills.displayValue);
        $('#total-deaths').html(filteredStats.deaths.displayValue);
        $('#kd-ratio').html(filteredStats.kd.displayValue);
        $('#dominations').html(filteredStats.dominations.displayValue);
        $('#total-dmg-done').html(filteredStats.damage.displayValue);
        $('#headshots').html(filteredStats.headshots.displayValue);
        $('#headshot-percentage').html(filteredStats.headshotPct.displayValue);
        $('#shots-fired').html(filteredStats.shotsFired.displayValue);
        $('#shots-hit').html(filteredStats.shotsHit.displayValue);
        $('#accuracy').html(filteredStats.shotsAccuracy.displayValue);

        // Match Stats
        $('#matches-played').html(filteredStats.matchesPlayed.displayValue);
        $('#total-wins').html(filteredStats.wins.displayValue);
        $('#total-losses').html(filteredStats.losses.displayValue);
        $('#total-ties').html(filteredStats.ties.displayValue);
        $('#wl-percentage').html(filteredStats.wlPercentage.displayValue);
        $('#total-rounds').html(filteredStats.roundsPlayed.displayValue);
        $('#rounds-won').html(filteredStats.roundsWon.displayValue);
        $('#rounds-lost').html(
                ((filteredStats.roundsPlayed.value) - (filteredStats.roundsWon.value))
                .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        );
        $('#bombs-planted').html(filteredStats.bombsPlanted.displayValue);
        $('#bombs-defused').html(filteredStats.bombsDefused.displayValue);
    }

    // Function that parses the ID value from a URL if one is input into the text box. This allows user to copy and paste their profile URL entirely instead of just the ID
    let parseID = function(input) {
        if(input.includes('/')) {
            if(input.split('/').pop().length > 0){
                return input.split('/').pop();
            }
            else {
                return input.split('/').slice(-2)[0];
            }
        }
        else {
            return input;
        }
    }

    // Function that displays the error text when called
    let displayErrorText = function(error){
        console.log(error);
        $("#error-txt").show();
    }

    // Function to handle fetch errors (if user enter incorrect Steam Account info)
    let handleErrors = function(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    // Popover for error text, when moused over explains how to set profile to public, also acts as a link to go to the Steam documentation for setting profile to public
    $("#help-popover").popover({
        trigger: 'hover',
        html: true,
        container: '#help-popover',
        title: 'How to Make Your Profile Public',
        content: "1. From your Steam Profile, click the Edit Profile link under your displayed badge.<br>\
        2. Click the My Privacy Settings tab<br>\
        3. Select your privacy state<br>\
        4. Click the Save button<br><br>\
        Click the icon to go to Steam support for more details."
    });

    // Show a tool tip on the header informing user they can click to go back to main page
    $("#stats-header-container").tooltip({
        trigger: 'hover',
        placement: 'auto',
        title: 'Go Back'
    });

    // On clicking header on stats page, go back to main page
    $('#stats-header-container').on('click', function(){
        $('#stats-page').hide();
        $('#main-page').show();
        $('#error-txt').hide();
    })

    // Create popover for hovering image, tell user it links to their steam profile, or just let them assume but make a steam profile link option
    $("#help-popover").hover(() => {
        $("#help-popover").removeClass('text-danger');
        $("#help-popover").addClass('text-light');
    },
    () => {
        $("#help-popover").removeClass('text-light');
        $("#help-popover").addClass('text-danger');   
    })

    // Attempt to fetch data and display stats when 'Get Stats' button is clicked
    $('#getStats').on('click', function(){
        fetchData();
    })

    // Clear error text if input box is typed in
    $('#inputBox').on('input', () => {
        $('#error-txt').hide();
    })

    // If enter is pressed, press the 'Get Stats' button
    $('#inputBox').keypress((e) => {
        let key = e.which;
        if(key === 13) {
            $('#getStats').click();
            return false;
        }
    });

    // Activate navigation tabs on stats display page
    $('#nav-tab a').on('click', function (e) {
        e.preventDefault()
        $(this).tab('show')
    });

    // Set up initial page states
    $("#loading-page").hide();
    $("#stats-page").hide();
    $("#error-txt").hide();
})

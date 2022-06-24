/**
 * AJAX long-polling
 *
 * 1. sends a request to the server (without a timestamp parameter)
 * 2. waits for an answer from server.php (which can take forever)
 * 3. if server.php responds (whenever), put data_from_file into #response
 * 4. and call the function again
 *
 * @param timestamp
 */
 function getContent(timestamp){
    var queryString = {'timestamp' : timestamp};

    $.ajax(
        {
            type: 'GET',
            url: '/resources/php/DiceServer.php',
            data: queryString,
            success: function(data){
                var obj = jQuery.parseJSON(data); // put result data into "obj"
                // $('#wheelOfSalt').html(data); // put the data_from_file into #response
                generate_table(JSON.parse(obj.data_from_file));
                // call the function again, this time with the timestamp we just got from server.php
                getContent(obj.timestamp);
            }
        }
    )
        $.ajax(
            {
                type: 'GET',
                url: '/resources/php/DiceServer_mbs.php',
                data: queryString,
                success: function(data){
                    
                    var obj = jQuery.parseJSON(data); // put result data into "obj"
                    $('#wheelOfSalt').html(obj.data_from_file); // put the data_from_file into #response
                    
                    // call the function again, this time with the timestamp we just got from server.php
                    getContent(obj.timestamp);
                }
            }
        )

}
// initialize jQuery
$(function() {
    getContent();
});

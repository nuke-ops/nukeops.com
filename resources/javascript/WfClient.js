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
function getContent(timestamp)
{
    var queryString = {'timestamp' : timestamp};

    $.ajax(
        {
            type: 'GET',
            url: '/resources/javascript/WfServer.php',
            data: queryString,
            success: function(data){

                // put result data into "obj"
                var obj1 = jQuery.parseJSON(data);
                var obj = jQuery.parseJSON(obj1.data_from_file);

                // put the data_from_file into #response
                var shortString = obj.shortString;
                $('#response').html(shortString);
                // call the function again, this time with the timestamp we just got from server.php
                getContent(obj.timestamp);
            }
        }
    );
}

// initialize jQuery
$(function() {
    getContent();
});

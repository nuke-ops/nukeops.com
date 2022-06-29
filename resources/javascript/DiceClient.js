// https://github.com/panique/php-long-polling
 function getContent(timestamp){
    var queryString = {'timestamp' : timestamp};

    $.ajax(
        {
            type: 'GET',
            url: '/resources/php/DiceServer.php',
            data: queryString,
            success: function(data){
                console.log(data);
                var obj = jQuery.parseJSON(data);
                generate_table(JSON.parse(JSON.stringify(obj.data_from_file)));
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
                console.log(data);
                var obj = jQuery.parseJSON(data);
                $('#wheelOfSalt').html(obj.data_from_file);
                getContent(obj.timestamp);
            }
        }
    )

}

$(function() {
    getContent();
});

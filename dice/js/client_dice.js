// https://github.com/panique/php-long-polling
 function getContent(timestamp){
    var queryString = {'timestamp' : timestamp};
    $.ajax({
            type: 'GET',
            url: './php/server_dice.php',
            data: queryString,
            cache: false,
            success: function(data){
                // console.log(data); // debug
                let obj = jQuery.parseJSON(data);
                generate_table(JSON.parse(JSON.stringify(obj.data_from_file)));
                getContent(obj.timestamp);
            }
        });
}

$(function() {
    getContent();
});

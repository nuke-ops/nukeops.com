// https://github.com/panique/php-long-polling
function getContent(timestamp){
    var queryString = {'timestamp' : timestamp};
    $.ajax({
            type: 'GET',
            cache: false,
            url: './php/server_mbs.php',
            data: queryString,
            success: function(data){
                // console.log(data); // debug
                let obj = jQuery.parseJSON(data);
                $('#wheelOfSalt').html(obj.data_from_file);
                getContent(obj.timestamp);
            }
        });
}

$(function() {
    getContent();
});

// https://github.com/panique/php-long-polling
function getContent(timestamp){
    var queryString = {'timestamp' : timestamp};
    $.ajax({
            type: 'GET',
            url: '/warframe/php/server.php',
            data: queryString,
            success: function(data){
                var obj1 = jQuery.parseJSON(data);
                var obj = jQuery.parseJSON(obj1.data_from_file);
                var shortString = obj.shortString;
                $('#response').html(shortString);
                getContent(obj.timestamp);
            }
        });
}

$(function() {
    getContent();
});

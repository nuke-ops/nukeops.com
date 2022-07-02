// cookies
    $(function(){getCookies()}); // load cookies on page load
    function deleteAllCookies() {
        buttonLoading("#clearButton");
            Cookies.remove('name');
            Cookies.remove('cus');
            Cookies.remove('str');
            Cookies.remove('dex');
            Cookies.remove('con');
            Cookies.remove('int');
            Cookies.remove('wis');
            Cookies.remove('cha');
            Cookies.remove('dark');
        stopLoading("#clearButton");
    };
    function setCookies(){
        Cookies.set('name', $("#name").val());
        Cookies.set('cus', $("#cus_input").val());
        Cookies.set('str', $("#str_input").val());
        Cookies.set('dex', $("#dex_input").val());
        Cookies.set('con', $("#con_input").val());
        Cookies.set('int', $("#int_input").val());
        Cookies.set('wis', $("#wis_input").val());
        Cookies.set('cha', $("#cha_input").val());
        if ($('#dark-mode_button').is(":checked")){Cookies.set('dark', true);
        } else {Cookies.set('dark', false);}
    };
    function getCookies(){
        $("#name").attr("value",Cookies.get("name"));
        $("#cus_input").attr("value",Cookies.get("cus"));
        $("#str_input").attr("value",Cookies.get("str"));
        $("#dex_input").attr("value",Cookies.get("dex"));
        $("#con_input").attr("value",Cookies.get("con"));
        $("#int_input").attr("value",Cookies.get("int"));
        $("#wis_input").attr("value",Cookies.get("wis"));
        $("#cha_input").attr("value",Cookies.get("cha"));
        $("#dark-mode_button")[0].checked = (Cookies.get("dark") === 'true');
    };

// loading
    function buttonLoading(buttonClass){
        $(buttonClass).addClass("is-loading");
        $(buttonClass).prop('disabled', true);
    };
    function stopLoading(buttonClass){
        $(buttonClass).removeClass("is-loading");
        $(buttonClass).prop('disabled', false);
    };

// other
    function copyToClipboard(inputId,popupId,popupDuration) {
        var copyText = document.getElementById(inputId).value;
        navigator.clipboard.writeText(copyText).then(() => {
            popup(popupId,popupDuration);
        });
    }
    function popup(elementId, duration){
            $(`#${elementId}`).fadeIn(); 
            setTimeout(function() {
               $(`#${elementId}`).fadeOut();
             }, duration);
         };
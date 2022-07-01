function SpinTheWheel(){
    buttonLoading("#wheelOfSalt");
    let name = Cookies.get("name");

    if(!name){
        $("#errors_wheelOfSalt").html("Error: No name specified");
        stopLoading("#wheelOfSalt");
        return;
    } else {$("#errors_wheelOfSalt").html("");}

    $.ajax({
        type : "POST",
        url  : "/dice/mbs/php/randomizer.php",
        data : { name : name }
    }
    );
    stopLoading("#wheelOfSalt");
}

function deleteAllCookies() {
    buttonLoading("clearButton");
    var cookies = document.cookie.split("; ");
    for (var c = 0; c < cookies.length; c++) {
        var d = window.location.hostname.split(".");
        while (d.length > 0) {
            var cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
            var p = location.pathname.split('/');
            document.cookie = cookieBase + '/';
            while (p.length > 0) {
                document.cookie = cookieBase + p.join('/');
                p.pop();
            };
            d.shift();
        }
    }
    stopLoading("clearButton");
    console.log("clicked");
};

$(function() { // Save cookies
        let cookie = document.cookie.split("=")
        
        if (cookie[1]){
            $("#name").val(cookie[1]);}
        if (cookie[2]){
            $("#str_input").val(cookie[2]);}
        if (cookie[3]){
            $("#dex_input").val(cookie[3]);}
        if (cookie[4]){
            $("#con_input").val(cookie[4]);}
        if (cookie[5]){
            $("#int_input").val(cookie[5]);}
        if (cookie[6]){
            $("#wis_input").val(cookie[6]);}
        if (cookie[7]){
            $("#cha_input").val(cookie[7]);}
});
console.log(document.cookie) // debug, remove later

function buttonLoading(buttonClass){
    let button = document.getElementById(buttonClass);
    button.classList.add("is-loading");
    button.disabled = true;
}
function stopLoading(buttonClass){
    let button = document.getElementById(buttonClass);
    button.classList.remove("is-loading");
    button.disabled = false;
}


async function generate_table(json){
    $("#json_table").html("");

    for(x of json){
        const name = x["name"];
        const dice = x["dice"];
        const sides = x["sides"];
        const date = x["date"];
        const threw = x["throw_results"];
        const mod = x["modifier"];
        const sum = x["sum"];

        let table_headers    =   "<tr>"
                                +"<th>Name</th>"
                                +"<th>Dice</th>"
                                +"<th>Time</th>"
                                +"<th>threw</th>"
                                +"<th>modifier</th>"
                                +"<th>Sum</th>"
                                +"</tr>"
        let rows  =  `<tr>`
                    +`<td> ${name} </td>`
                    +`<td> ${dice}d${sides} </td>`
                    +`<td> ${date} </td>`
                    +`<td> ${threw} </td>`
                    +`<td> ${mod} </td>`
                    +`<td> ${sum} </td>`
                    +`</tr>`;
        $("#json_table").append(table_headers + rows);
    }
    stopLoading("formSubmit"); // stop loading animation
}


function dice_form(){
    buttonLoading("formSubmit"); // start loading animation
    const form = document.getElementById("dice_form");
    let errors = document.getElementById("errors");

    // form values
    let name = form.elements["name"].value;
    let dice = form.elements["dice"].value;
    let sides = form.elements["sides"].value;

    // Cookies
    let cookie_name = document.cookie = "username="+name;

    // save current time
    let currentdate = new Date(); 
    let date = currentdate.getDate() + "/"
              + (currentdate.getMonth()+1)  + "/" 
              + currentdate.getFullYear() + " @ "  
              + currentdate.getHours() + ":"  
              + currentdate.getMinutes() + ":" 
              + currentdate.getSeconds();

    // Error handlers
        // no input
        if(!dice || !sides || !name){
            errors.innerHTML = "Error: No input specified";
            stopLoading("formSubmit");
            return;
        } else {errors.innerHTML = "";}
        // Illegal characters
        if(!alphanumeric(name)){
            errors.innerHTML = "Error: Illegal characters in name";
            stopLoading("formSubmit");
            return;
        }
        // Too big numbers
        if(dice > 50 || sides > 100){
            errors.innerHTML = "Error: Max amount of dice: 50"
                                +" | Max amount of sides: 100";
            stopLoading("formSubmit");
            return;
        }
        // Negative input
        if(dice < 1 || sides < 1){
            errors.innerHTML = "Error: There must be at leastn one dice with one side"
            stopLoading("formSubmit");
            return;
        }

    // check if there's modifier (kill me)
    let mod = 0;
    let modifier = "";
    if($("input[id='cus_radio']:checked").val()){mod = $("#cus_input").val();
                                                 modifier = "cus("; if(mod > 0){modifier += "+"};
                                                 modifier += mod + ")"};
                                                 
    if($("input[id='str_radio']:checked").val()){mod = $("#str_input").val();
                                                 modifier = "str("; if(mod > 0){modifier += "+"};
                                                 modifier += mod + ")";}
                                                 
    if($("input[id='dex_radio']:checked").val()){mod = $("#dex_input").val();
                                                 modifier = "dex("; if(mod > 0){modifier += "+"};
                                                 modifier += mod + ")";}
                                                 
    if($("input[id='con_radio']:checked").val()){mod = $("#con_input").val();
                                                 modifier = "con("; if(mod > 0){modifier += "+"};
                                                 modifier += mod + ")";}
                                                 
    if($("input[id='int_radio']:checked").val()){mod = $("#int_input").val();
                                                 modifier = "int("; if(mod > 0){modifier += "+"};
                                                 modifier += mod + ")";}
                                                 
    if($("input[id='wis_radio']:checked").val()){mod = $("#wis_input").val();
                                                 modifier = "wis("; if(mod > 0){modifier += "+"};
                                                 modifier += mod + ")";}
                                                 
    if($("input[id='cha_radio']:checked").val()){mod = $("#cha_input").val();
                                                 modifier = "cha("; if(mod > 0){modifier += "+"};
                                                 modifier += mod + ")";}

    // roll
    let throw_results = [];
    for(let i=1;i<=dice;i++){
        throw_results.push(Math.floor((Math.random() * sides) + 1));
    }

    // sum
    let sum = 0;
    for(const x of throw_results){
        sum += x;
    } sum += mod*1;

    // send to php
    $.ajax({
        type : "POST",
        url  : "/resources/php/dice.php",
        data : { name : name, dice : dice, sides : sides,
                throw_results : throw_results, sum : sum, 
                date : date, modifier : modifier}
         },
    );
};

function alphanumeric(inputtxt){
    var letterNumber = /^[0-9a-zA-Z]+$/;
    if(inputtxt.match(letterNumber)) {
      return true;
    } else { 
        return false; 
    }
}

function calc(){
    buttonLoading("calculator_button");
    let input = document.getElementById("calculator_input").value;
    if (input.indexOf(',') > -1){
        input = input.replace(",",".");
    }
    let output = math.evaluate(input)
    $('#calculator_input').attr('placeholder',output);
    document.getElementById("calculator_input").value = "";
    stopLoading("calculator_button");
}


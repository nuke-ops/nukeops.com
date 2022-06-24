$(function(){getCookies()});

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
};


function buttonLoading(buttonClass){
    $(buttonClass).addClass("is-loading");
    $(buttonClass).prop('disabled', true);
};
function stopLoading(buttonClass){
    $(buttonClass).removeClass("is-loading");
    $(buttonClass).prop('disabled', false);
};


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
    stopLoading("#formSubmit"); // stop loading animation
}


function dice_form(){
    buttonLoading("#formSubmit"); // start loading animation
    const form = document.getElementById("dice_form");
    let errors = document.getElementById("errors");

    // form values
    let name = form.elements["name"].value;
    let dice = form.elements["dice"].value;
    let sides = form.elements["sides"].value;

    // Cookies
    // let cookie_name = document.cookie = "username="+name;

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
            stopLoading("#formSubmit");
            return;
        } else {errors.innerHTML = "";}
        // Illegal characters
        if(!alphanumeric(name)){
            errors.innerHTML = "Error: Illegal characters in name";
            stopLoading("#formSubmit");
            return;
        }
        // Too big numbers
        if(dice > 50 || sides > 100){
            errors.innerHTML = "Error: Max amount of dice: 50"
                                +" | Max amount of sides: 100";
            stopLoading("#formSubmit");
            return;
        }
        // Negative input
        if(dice < 1 || sides < 1){
            errors.innerHTML = "Error: There must be at leastn one dice with one side"
            stopLoading("#formSubmit");
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
}

function alphanumeric(inputtxt){
    var letterNumber = /^[0-9a-zA-Z]+$/;
    if(inputtxt.match(letterNumber)) {
      return true;
    } else { 
        return false; 
    }
}

function calc(){
    buttonLoading("#calculator_button");
    let input = document.getElementById("calculator_input").value;
    if (input.indexOf(',') > -1){
        input = input.replace(",",".");
    }
    let output = math.evaluate(input)
    $('#calculator_input').attr('placeholder',output);
    document.getElementById("calculator_input").value = "";
    stopLoading("#calculator_button");
}

// Maybe will use it one day, got another idea how to implement magicbs
// function magicbsToggle(){
//     if ($("#magicbs_toggle").hasClass("toggle")){
//         // disable buttons and inputs
//         $("#dice, #sides,"
//          +"#str_radio, #dex_radio, #con_radio,"
//          +"#int_radio, #wis_radio, #cha_radio").prop('disabled', true);
//         // overwrite inputs and buttons states
//         $("#non_radio").prop("checked", true);
//         set_dice(1,100);
//         // toggle button class so if check can toggle functions on every click 
//         $("#magicbs_toggle").toggleClass("toggle");
//     }
//     else{
//         // enable buttons and inputs
//         $("#dice, #sides,"
//          +"#str_radio, #dex_radio, #con_radio,"
//          +"#int_radio, #wis_radio, #cha_radio").prop('disabled', false);
//         // toggle button class so if check can toggle functions on every click 
//         $("#magicbs_toggle").toggleClass("toggle");
//     }
// }

function SpinTheWheel(){
    $.ajax({
        type : "GET",
        url  : "/resources/php/roll.php",
    }
    );
}

function set_dice(dice,sides){
    $("#dice").val(dice);
    $("#sides").val(sides);
}

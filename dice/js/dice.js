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
    }
    function setCookies(){
        Cookies.set('name', $("#name").val());
        Cookies.set('cus', $("#cus_input").val());
        Cookies.set('str', $("#str_input").val());
        Cookies.set('dex', $("#dex_input").val());
        Cookies.set('con', $("#con_input").val());
        Cookies.set('int', $("#int_input").val());
        Cookies.set('wis', $("#wis_input").val());
        Cookies.set('cha', $("#cha_input").val());
        if ($('#dark-mode_button').is(":checked")){
            Cookies.set('dark', true);
        }
            else {Cookies.set('dark', false);
        }
    }
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
    }


async function generate_table(json){
    $("#json_table").html("");
    let mod;
    for(x of json){
        const name = x["name"];
        const dice = x["dice"];
        const sides = x["sides"];
        const date = x["date"];
        const threw = x["throws"];
        const mod = x["mod"];
        const sum = x["sum"];

        let table_headers    =   "<tr>"
                                +"<th>Name</th>"
                                +"<th>Dice</th>"
                                +"<th>Time</th>"
                                +"<th>threw</th>"
                                +"<th>mod</th>"
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
    stopLoading("#formSubmit");
}

function showProgressBar(){
    $("#formSubmitDiv").fadeOut();
    $("#progressBar").fadeIn();
    $("#progressBar").addClass("progress");
}
function hideProgressBar(){
    $("#progressBar").removeClass("progress");
    $("#progressBar").fadeOut();
    $("#formSubmitDiv").fadeIn();
    progressBar("#progressBar",0);
}

function dice_form(){
    startLoading("#formSubmit");
    const form = document.getElementById("dice_form");

    // form values
    let name = form.elements["name"].value;
    let dice = form.elements["dice"].value;
    let sides = form.elements["sides"].value;

    // save current time
    let currentdate = new Date(); 
    let date = currentdate.getDate() + "/"
              + (currentdate.getMonth()+1)  + "/" 
              + currentdate.getFullYear() + " @ "  
              + currentdate.getHours() + ":"  
              + currentdate.getMinutes() + ":" 
              + currentdate.getSeconds();

    // Error handlers
        const formErrors = new Array();
            // name
            if(!name){ // No name
                formErrors.push("You must enter a name");
            }
            else if(!alphanumeric(name)){ // Illegal characters
                formErrors.push("Illegal characters in name");
            }
            else if(name.length >= 35){ // name to long
                formErrors.push("Name length limit: 35");
            }
            //dice
            if(dice > 50){ // Too much dice
                formErrors.push("Max amount of dice: 50");
            }
            if(sides > 100){ // Too much sides
                formErrors.push("Max amount of sides: 100");
            }
            if(dice < 1 || !dice){ // Negative dice
                formErrors.push("There must be at leas one dice");
            }
            if(sides < 2 || !sides){ // Negative sides
                formErrors.push("Dice must have at least 2 sides");
            }
        if (formErrors.length > 0) {
            formError(formErrors);
            return;
        }

    // check if there's modifier (kill me)
    let raw_mod = 0;
    let mod = "";
    if(!$("input[id='non_radio']:checked").val()){ // if none button is checked - skip all if's
        if($("input[id='cus_radio']:checked").val()){  // if radio button is checked
            raw_mod = $("#cus_input").val();           // add it's value to roll
            mod = "cus("; if(raw_mod > 0){mod += "+"}; // assemble string eg. str(+5)
            mod += raw_mod + ")"}; 
        if($("input[id='str_radio']:checked").val()){
            raw_mod = $("#str_input").val();
            mod = "str("; if(raw_mod > 0){mod += "+"};
            mod += raw_mod + ")";} 
        if($("input[id='dex_radio']:checked").val()){
            raw_mod = $("#dex_input").val();
            mod = "dex("; if(raw_mod > 0){mod += "+"};
            mod += raw_mod + ")";}  
        if($("input[id='con_radio']:checked").val()){
            raw_mod = $("#con_input").val();
            mod = "con("; if(raw_mod > 0){mod += "+"};
            mod += raw_mod + ")";}  
        if($("input[id='int_radio']:checked").val()){
            raw_mod = $("#int_input").val();
            mod = "int("; if(raw_mod > 0){mod += "+"};
            mod += raw_mod + ")";}    
        if($("input[id='wis_radio']:checked").val()){
            raw_mod = $("#wis_input").val();
            mod = "wis("; if(raw_mod > 0){mod += "+"};
            mod += raw_mod + ")";}            
        if($("input[id='cha_radio']:checked").val()){
            raw_mod = $("#cha_input").val();
            mod = "cha("; if(raw_mod > 0){mod += "+"};
            mod += raw_mod + ")";}
    }

    // roll
    let throws = [];
    for(let i=1;i<=dice;i++){
        throws.push(Math.floor((Math.random() * sides) + 1));
    }

    // sum
    let sum = 0;
    for(const x of throws){
        sum += x;
    } sum += raw_mod*1;

    // send to php
    $.ajax({
        type : "POST",
        url  : "/dice/php/dice.php",
            cache: false,
        data : { name : name, dice : dice, sides : sides,
                throws : throws, sum : sum, 
                date : date, mod : mod}
         },
    );
}

function alphanumeric(inputtxt){
    var letterNumber = /^[0-9a-zA-Z -]+$/;
    if(inputtxt.match(letterNumber)) {
      return true;
    } else { 
        return false; 
    }
}

function formError(errors){
    let output = "";
    for (const x of errors){
        output += x+"<br/>";
    }

    $("#formErrorHead").addClass("message-header");
    $("#formErrorHead").css({"margin-top": "10px"});
    $("#formErrorHead").html("Error <button class='delete' onclick='closeError();'/>");
    $("#formErrorBody").addClass("message-body");
    $("#formErrorBody").html(output);
    stopLoading("#formSubmit");
}
function closeError(){
    $("#formErrorHead").removeClass("message-header");
    $("#formErrorHead").css({"margin-top": "10px"});
    $("#formErrorBody").removeClass("message-body");
    $("#formErrorHead, #formErrorBody").html("");
}

function calc(){
    startLoading("#calculator_button");
    try{
        let input = document.getElementById("calculator_input").value;
        if (input.indexOf(',') > -1){
            input = input.replace(",",".");
        }
        let output = math.evaluate(input)
        $("#calculator_input").val(output);
        stopLoading("#calculator_button");
    } catch(error){
        $("#calculator_input").val("");
        $("#calculator_input").attr("placeholder","Invalid input");
        stopLoading("#calculator_button");
    }
}

function set_dice(dice,sides){
    $("#dice").val(dice);
    $("#sides").val(sides);
}

function dark_mode(){
    if($("#dark-mode_button").is(':checked')){
        $("#dark-mode_label").removeClass("is-outlined");
        $("#dark-mode").html(`
        <style>
            input::placeholder{
                color: rgba(63, 61, 61, 0.651) !important;
            }
            .box, .input, .table{
                background-color: #121212 !important;
                color: white !important;
            }
            th:nth-child(n), td:nth-child(n){
                color: white;
                border-color: #6b6a6ad8;
            }
        </style>
        `);
    } else {
        $("#dark-mode_label").addClass("is-outlined");
        $("#dark-mode").html(``);
    }
}

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
            document.getElementById("name").value = cookie[1];}
        if (cookie[2]){
            document.getElementById("str").value = cookie[2];}
        if (cookie[3]){
            document.getElementById("dex").value = cookie[3];}
        if (cookie[4]){
            document.getElementById("con").value = cookie[4];}
        if (cookie[5]){
            document.getElementById("int").value = cookie[5];}
        if (cookie[6]){
            document.getElementById("wis").value = cookie[6];}
        if (cookie[7]){
            document.getElementById("cha").value = cookie[7];}
});
console.log(document.cookie) // debug, remove later

function buttonLoading(buttonClass){
    document.getElementById(buttonClass).classList.add("is-loading");
}
function stopLoading(buttonClass){
    document.getElementById(buttonClass).classList.remove("is-loading");
}


async function generate_table(json){
    $("#json_table").html("");

    for(x of json){
        const name = x["name"];
        const dice = x["dice"];
        const sides = x["sides"];
        const date = x["date"];
        const sum = x["sum"];
        const threw = x["throw_results"];

        const table_headers = "<tr>"
                                +"<th>Name</th>"
                                +"<th>Dice</th>"
                                +"<th>Time</th>"
                                +"<th>threw</th>"
                                +"<th>Sum</th>"
                                +"</tr>"
        const rows = `<tr>`
                    +`<td> ${name} </td>`
                    +`<td> ${dice}d${sides} </td>`
                    +`<td> ${date} </td>`
                    +`<td> ${threw} </td>`
                    +`<td> ${sum} </td>`
                    +`</tr>`;

        //json_table.innerHTML += "<table style='width:30%'>" + table_headers + rows + "</table>";
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
        let Error;
        // no input
        if(!dice || !sides || !name){
            errors.innerHTML = "Error: No input specified";
            Error = 1;
            return;
        } else {errors.innerHTML = "";}
        // Illegal characters
        if(!alphanumeric(name)){
            errors.innerHTML = "Error: Illegal characters in name";
            Error = 1;
            return;
        }
        // Too big numbers
        if(dice > 50 || sides > 100){
            errors.innerHTML = "Error: Max amount of dice: 50"
                                +" | Max amount of sides: 100";
            Error = 1;
            return;
        }
        // Negative input
        if(dice < 1 || sides < 1){
            errors.innerHTML = "Error: There must be at leastn one dice with one side"
            Error = 1;
            return;
        }
        if(Error){stopLoading("formSubmit")}

    // roll
    let throw_results = [];
    for(let i=1;i<=dice;i++){
        throw_results.push(Math.floor((Math.random() * sides) + 1));
    }

    // sum
    let sum = 0;
    for(const x of throw_results){
        sum += x;
    }

    // send to php
    $.ajax({
        type : "POST",
        url  : "/resources/php/dice.php",
        data : { name : name, dice : dice, sides : sides,
            throw_results : throw_results, sum : sum, date : date },
    });

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


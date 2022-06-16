function clear_chache(){
    if (document.cookie != ""){
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    } 
}
$(function() {
    if (document.cookie != ""){
        let name = document.cookie.split("=")
        document.getElementById("name").value = name[1];
    }
});


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
                                +"<th>Sum</th>"
                                +"<th>threw</th>"
                                +"</tr>"
        const rows = `<tr>`
                    +`<td> ${name} </td>` // name
                    +`<td> ${dice}d${sides} </td>` // dice d sides
                    +`<td> ${date} </td>` // date
                    +`<td> ${sum} </td>` // sum
                    +`<td> ${threw} </td>`
                    +`</tr>`;

        //json_table.innerHTML += "<table style='width:30%'>" + table_headers + rows + "</table>";
        $("#json_table").append(table_headers + rows);
    }
    document.getElementById("formSubmit").classList.remove("is-loading") // change icon of button to normal if there was loading
}


// form.addEventListener('submit', (event) => {
function dice_form(){

    document.getElementById("formSubmit").classList.add("is-loading") // change icon of button to loading

    const form = document.getElementById('dice_form');
    let errors = document.getElementById('errors');

    // form values
    let name = form.elements['name'].value;
    let dice = form.elements['dice'].value;
    let sides = form.elements['sides'].value;

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
            return;
        } else {errors.innerHTML = "";}
        // Illegal characters
        if(!alphanumeric(name)){
            errors.innerHTML = "Error: Illegal characters in name";
            return;
        }
        // Too big numbers
        if(dice > 50 || sides > 100){
            errors.innerHTML = "Error: Max amount of dice: 50"
                                +" | Max amount of sides: 100";
            return;
        }
        // Negative input
        if(dice < 1 || sides < 1){
            errors.innerHTML = "Error: There must be at leastn one dice with one side"
            return;
        }

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
    let input = document.getElementById("calculator_input").value;
    if (input.indexOf(',') > -1){
        input = input.replace(",",".");
    }
    let output = math.evaluate(input)
    $('input').attr('placeholder',output);
    document.getElementById("calculator_input").value = "";
}


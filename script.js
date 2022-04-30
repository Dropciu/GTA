var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 5000);
}




document.body.setAttribute("ondragstart", "return false");
document.body.setAttribute("ondrag", "return false");
document.body.setAttribute("oncontextmenu", "return false");











var sound_start_game_1 = new Audio("source/start_game_1.mp3");
var sound_start_game_2 = new Audio("source/start_game_2.mp3");
var sound_start_game_3 = new Audio("source/start_game_3.mp3");
var sound_start_game_4 = new Audio("source/start_game_4.mp3");


document.body.addEventListener("click", sound_start_game, { once: true });



function sound_start_game(){
    sound_start_game_1.play();
    
    sound_start_game_1.addEventListener("ended", function() {
        sound_start_game_2.play();

        sound_start_game_2.addEventListener("ended", function() {
            sound_start_game_3.play();

            sound_start_game_3.addEventListener("ended", function() {
                sound_start_game_4.play();
            }, true)
        }, true)
    }, true)
}







function loading(){
    var loading = document.createElement("div");
    document.getElementById("login_form").appendChild(loading);
    loading.setAttribute("id", "loading");

    loading.innerHTML = "<img src='source/loading.svg' height='90%'>";
}



document.getElementById("button_demo").addEventListener("click", function(){
    loading();

    window.sessionStorage.setItem('mode', "demo");
    window.location.href = "play/index.html";
})

document.getElementById("button_control").addEventListener('click', function () {
    var screen_control = document.createElement("div");
    document.body.appendChild(screen_control);
    screen_control.setAttribute("id", "screen_control");
    
    var div_control = document.createElement("div");
    screen_control.appendChild(div_control);
    div_control.setAttribute("id", "div_control");
    
    var div_control1 = document.createElement("div");
    div_control.appendChild(div_control1);
    div_control1.setAttribute("id", "div_control1");

    var div_control2 = document.createElement("div");
    div_control.appendChild(div_control2);
    div_control2.setAttribute("id", "div_control2");

    div_control1.innerHTML = "<table> <tr>  <td><img src='source/awsd.webp' width='70%'> <img src='source/strzalki.webp' width='70%'></td>  <td><h1>Movement</h1></td></tr>        <tr><td><img src='source/space.webp' width='80%'></td>  <td><h1>Jump</h1></td></tr>         <tr><td><img src='source/esc_key.webp' width='50%'></td>  <td><h1>Pause</h1></td></tr></table>";
    
    div_control2.innerHTML = "<table> <tr>  <td><img src='source/key_z.webp' width='40%'></td>  <td><h1>Hit</h1></td></tr>        <tr><td><img src='source/key_x.webp' width='40%'></td>  <td><h1>Shot</h1></td></tr></table>";


    var button_back = document.createElement("a");
    screen_control.appendChild(button_back);
    button_back.setAttribute("id", "button_back");
    button_back.setAttribute("class", "btn-slice");
    button_back.innerHTML = "<div class='top'><span>Return</span></div><div class='bottom'><span>Return</span></div>";

    button_back.addEventListener("click", function(){
        screen_control.remove();
    }, { once: true })
  },);










document.getElementById("button_main_play").addEventListener('click', function () {
    $("#main").fadeOut();

    document.getElementById("login_form").style.visibility = "visible";
    document.getElementById("login_form").style.display = "";
    

    if(sessionStorage.token !== undefined){
        loading();

        var url = 'https://gta-via-drobik.herokuapp.com/sing_in_token';
        
        var ip = sessionStorage.getItem('ip');
        var agent = navigator.userAgent;

        var token = JSON.parse(sessionStorage.token)[0];
        var password_to_token = JSON.parse(sessionStorage.password_to_token)[0];

        var content = {
            "ip": ip,
            "agent": agent,
            "token": token,
            "password_to_token": password_to_token
        };

      
        $.post(url, content, function(data, status){
            $("#loading").remove();

            data = JSON.parse(data);
            if(data['1'] == "Bad"){
                log(1);
                sessionStorage.clear();
                document.location.reload(true);
            }
            else if(data['1'] == "OK"){
                logged();
            }
            else {
                alert("Oops ... Server Error !!!");
            }

        })
    }

    else {
        $.getJSON("https://api.ipify.org?format=json", function(data) {
            var ip = data.ip;
            var agent = navigator.userAgent;

            window.sessionStorage.setItem('ip', ip);

            var content = {
                "ip": ip,
                "agent": agent
            };

            var url = 'https://gta-via-drobik.herokuapp.com/login_key';

            $.post(url, content, function(data, status){
                data = JSON.parse(data);

                console.log(data);
                if(data['1'] == "Bad"){
                    log(1);
                    sessionStorage.clear();
                    document.location.reload(true);
                }
                else if(data['1'] == "OK"){
                    window.sessionStorage.setItem('key', JSON.stringify([data['key']]));
                }
                else {
                    alert("Oops ... Server Error !!!");
                }

            })
        })
    }


    document.getElementById("sing_in").addEventListener("click", function(){

        function check_input(){
            var email = document.getElementById("input_1").value;
            var password = document.getElementById("input_2").value;

            if(email.includes("@") && email.includes(".") && password !== null){
                return true;
            }
        }

        if(check_input()){
            loading();

            var ip = sessionStorage.getItem('ip');
            var agent = navigator.userAgent;

            var url = 'https://gta-via-drobik.herokuapp.com/sing_in';
            
            var email = (document.getElementById("input_1").value).toLowerCase();
            var password = document.getElementById("input_2").value;

            var key = JSON.parse(sessionStorage.getItem('key'))[0]; 
            

            var content = {
                "ip": ip,
                "agent": agent,
                "email": CryptoJS.AES.encrypt(email, key).toString(),
                "password": CryptoJS.AES.encrypt(password, key).toString(),
            };



            $.post(url, content, function(data, status){
                $("#loading").remove();

                data = JSON.parse(data);

                console.log(data);

                if(data['1'] == "Bad"){
                    log(1);
                }
                else if(data['1'] == "OK"){
                    window.sessionStorage.setItem('token', JSON.stringify([data['token']]));
                    window.sessionStorage.setItem('password_to_token', JSON.stringify([data['password_to_token']]));
                    window.sessionStorage.setItem('name_user', JSON.stringify([data['name']]));
                    logged();
                }
                else {
                    alert("Oops ... Server Error !!!");
                }

            })
        }
        else {
            log(1);
        }
    })







    document.getElementById("sing_up").addEventListener("click", function(){
        var username = document.getElementById("input_3").value;
        var email = document.getElementById("input_4").value;
        var password = document.getElementById("input_5").value;

        if(email.includes("@") && email.includes(".") && password !== null && username.length >= 5){
            if(Number(window.sessionStorage.created_account) > 5){
                alert("On this device you have already created the maximum number of accounts - 5");
            }
            else{
                send_request();
            }
        }
        else if(!(username.length >= 5)){
            log(2);
        }
        else if(!(email.includes("@") && email.includes("."))){
            log(3);
        }
        else if(password == null){
            log(4);
        }
        

        function send_request(){
            loading();

            var url = 'https://gta-via-drobik.herokuapp.com/sing_up';
            
            var ip = sessionStorage.getItem('ip');
            var agent = navigator.userAgent;

            var username = document.getElementById("input_3").value;
            var email = (document.getElementById("input_4").value).toLowerCase();
            var password = document.getElementById("input_5").value;

            var key = JSON.parse(sessionStorage.getItem('key'))[0]; 

            var content = {
                "ip": ip,
                "agent": agent,
                "username" : CryptoJS.AES.encrypt(username, key).toString(),
                "email": CryptoJS.AES.encrypt(email, key).toString(),
                "password": CryptoJS.AES.encrypt(password, key).toString()
            };

            $.post(url, content, function(data, status){
                $("#loading").remove();

                if(data == "Bad_email"){
                    log(5);
                }
                else if(data == "Bad_name"){
                    log(6);
                }
                else if(data == "Bad"){
                    log(7);
                }
                else if(data == "OK"){
                    if(!(sessionStorage.getItem("created_account") === null)){
                        window.sessionStorage.created_account = Number(window.sessionStorage.created_account) + Number(1);
                    }
                    else {
                        window.sessionStorage.setItem("created_account", Number(1));
                    }

                    container.classList.remove("right-panel-active");

                    log(20);
                }
                else {
                    alert("Oops ... Server Error !!!");
                }

            })
        }
        
    })
    

});



function log(a){
    $("#announcement").remove();

    var announcement = document.createElement("div");
    document.body.appendChild(announcement);
    announcement.setAttribute("id", "announcement");

    if(a < 20){
        announcement.style.backgroundColor = "#ff2600";
    }
    else {
        announcement.style.backgroundColor = "green";
    }

    switch(a){
        case 1: announcement.innerHTML = "<h1>Incorrect login details</h1>"; break;
        case 2: announcement.innerHTML = "<h1>Username must be at least 5 characters long</h1>"; break;
        case 3: announcement.innerHTML = "<h1>Email must contain @ and .</h1>"; break;
        case 4: announcement.innerHTML = "<h1>Come up with a password</h1>"; break;
        case 5: announcement.innerHTML = "<h1>An account with this e-mail already exists</h1>"; break;
        case 6: announcement.innerHTML = "<h1>An account with this username already exists</h1>"; break;
        case 7: announcement.innerHTML = "<h1>Invalid account creation data</h1>"; break;
        case 20: announcement.innerHTML = "<h1>Account has been successfully created.<br> Sign In</h1>"; break;
        case 21: announcement.innerHTML = "<h1>Correctly logged in</h1>"; break;
    }


    setTimeout(() => {
        var fadeTarget = announcement;
        var fadeEffect = setInterval(function () {
            if (!fadeTarget.style.opacity) {
                fadeTarget.style.opacity = 1;
            }
            if (fadeTarget.style.opacity > 0) {
                fadeTarget.style.opacity -= 0.1;
            } else {
                clearInterval(fadeEffect);
            }
        }, 200);

        setTimeout(() => {
            announcement.remove();
        }, 1000);
    }, 5000);
}



function logged(){
    $("#announcement").remove();
    $("#loading").remove();
    $("#login_form").fadeOut();

    log(21);

    var menu = document.createElement("div");
    document.body.appendChild(menu);
    menu.setAttribute("id", "menu");
    menu.innerHTML = "<h1>Hi   " + JSON.parse(window.sessionStorage.getItem('name_user'))[0] + "</h1>" + "<div id='menu_child'> <div id='menu_child_1'><a class='btn-slice'> <div class='top'><span>Singleplayer</span></div><div class='bottom'><span>Singleplayer</span></div></a></div>       <div style='pointer-events:none;' id='menu_child_2'><a class='btn-slice'> <div class='top'><span>Multiplayer</span></div><div class='bottom'><span>Multiplayer</span></div></a></div>  </div>        <div id='log_out'> <a class='btn-slice'> <div class='top'><span>Log out</span></div><div class='bottom'><span>Log out</span></div></a></div>";

    document.getElementById("menu_child_1").addEventListener("click", function(){
        step_2();
        window.sessionStorage.setItem('mode', "single");
    }, { once: true });

    document.getElementById("menu_child_2").addEventListener("click", function(){
        step_2();
        window.sessionStorage.setItem('mode', "multi");
    }, { once: true });


    document.getElementById("log_out").addEventListener("click", function(){
        var url = 'https://gta-via-drobik.herokuapp.com/close_session';
        var content = {
            "ip": sessionStorage.getItem('ip'),
            "agent": navigator.userAgent,
        };
        $.post(url, content, function(data, status){})

        window.sessionStorage.clear();
        location.reload();
    }, { once: true });


    function step_2(){
        menu.innerHTML = "<h1>Hi   " + JSON.parse(window.sessionStorage.getItem('name_user'))[0] + "</h1>" + "<div id='menu_child'> <div id='menu_child_1'><a class='btn-slice'> <div class='top'><span>New game</span></div><div class='bottom'><span>New game</span></div></a></div>       <div id='menu_child_2'><a class='btn-slice'> <div class='top'><span>Load save</span></div><div class='bottom'><span>Load save</span></div></a></div>  </div>             <div id='log_out'> <a class='btn-slice'> <div class='top'><span>Log out</span></div><div class='bottom'><span>Log out</span></div></a></div>";

        document.getElementById("menu_child_1").addEventListener("click", function(){
            loading()
            window.sessionStorage.setItem('record', "new");
            window.location.href = "play/index.html";
        }, { once: true });
    
        document.getElementById("menu_child_2").addEventListener("click", function(){
            loading();
            window.sessionStorage.setItem('record', "saved");
            window.location.href = "play/index.html";
        }, { once: true });


        document.getElementById("log_out").addEventListener("click", function(){
            loading();

            var url = 'https://gta-via-drobik.herokuapp.com/close_session';
            var content = {
                "ip": sessionStorage.getItem('ip'),
                "agent": navigator.userAgent,
            };
            $.post(url, content, function(data, status){})
            
            window.sessionStorage.clear();
            location.reload();
        }, { once: true });
    }

}





var signUpButton = document.getElementById("signUp");
var signInButton = document.getElementById("signIn");
var container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
	container.classList.add("right-panel-active");
});
signInButton.addEventListener("click", () => {
	container.classList.remove("right-panel-active");
});






// if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
//     alert("Przepraszamy!!! Brak obługi urządzeń moblinych!");
//   }
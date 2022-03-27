
document.body.setAttribute("ondragstart", "return false");
document.body.setAttribute("ondrag", "return false");
document.body.setAttribute("oncontextmenu", "return false");



var screen_load =  document.createElement("div");
document.body.appendChild(screen_load);
screen_load.setAttribute("id", "screen_load");
screen_load.innerHTML = "<p>Game is loading...</p>";



if ((new URLSearchParams(window.location.search).get('i')) == 1){
  play();
}
else if(sessionStorage.token !== undefined && sessionStorage.mode != null && sessionStorage.record != null){

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
      data = JSON.parse(data);

      if(data['1'] == "Bad"){
        window.sessionStorage.removeItem('mode');
        window.sessionStorage.removeItem('record');
        window.location.href = "../index.html";
      }
      else if(data['1'] == "OK"){
          load_page();
      }
      else {
          alert("Oops ... Server Error !!!");
      }

  })
    



  function load_page(){
    if(sessionStorage.mode == "single"){
      if(sessionStorage.record == "new"){
        load();
      }
      else if(sessionStorage.record == "saved"){
        var url = 'https://gta-via-drobik.herokuapp.com/get_game';
          
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
            var file_load_game = JSON.parse(data);

            load2(file_load_game);
        })
      }
    }
  }
}
else {
  window.sessionStorage.removeItem('mode');
  window.sessionStorage.removeItem('record');
  window.location.href = "../index.html";
}




window.addEventListener('beforeunload', (event) => {
  pause();
  event.returnValue = `Are you sure you want to leave? Game maybe not be saved!`;
});








function load(){

  window.sessionStorage.removeItem('mode');
  window.sessionStorage.removeItem('record');


  $("#window").remove();

  var loading_element =  document.createElement("div");
  document.body.appendChild(loading_element);
  loading_element.setAttribute("id", "loading_element");
  loading_element.innerHTML = "<img src='img/atak.webp'> <img src='img/auto1.webp'> <img src='img/auto2.webp'> <img src='img/auto3.webp'> <img src='img/auto4.webp'> <img src='img/auto5.webp'> <img src='img/auto6.webp'> <img src='img/auto7.webp'> <img src='img/bohater_główny.webp'> <img src='img/osoba.webp'> <img src='img/osoba2.webp'> <img src='img/osoba3.webp'> <img src='img/pocisk.webp'> <img src='img/skok.webp'> <img src='img/ruch.webp'> <img src='img/strzał.webp'> <img src='img/trup_1.webp'> <img src='img/trup_1_2.webp'> <img src='img/trup_1_3.webp'> <img src='img/trup_2.webp'> <img src='img/trup_2_2.webp'> <img src='img/trup_2_3.webp'> <img src='img/trup_3.webp'> <img src='img/trup_3_2.webp'> <img src='img/trup_3_3.webp'> <img src='img/cios.webp'> <img src='img/tło.webp'> <img src='img/upadek.webp'>";



  var hp_element =  document.createElement("div");
  document.body.appendChild(hp_element);
  hp_element.setAttribute("id", "hp_element");

  var hp_element2 =  document.createElement("div");
  hp_element.appendChild(hp_element2);
  hp_element2.setAttribute("id", "hp_element2");


  var money_element = document.createElement("div");
  document.body.appendChild(money_element);
  money_element.setAttribute("id", "money_element");
  money_element.innerHTML = "<h1>" + b.money + " $</h1>";


  check_money();
  check_hp();

  
  setTimeout(() => {
    $(document).ready( function() {
      $("#loading_element").remove();

      play();

      setTimeout(() => {
        $("#screen_load").remove();
      }, 100);

    })
  }, 1000);
  
}



function check_money(){
  money_element.innerHTML = "<h1>" + b.money + " $</h1>";
}
function check_hp (){
  hp_element2.style.width = (b.hp / 2).toString() + "%";
}






function load2 (file_load_game){
  b = new Bohater(0, 0);
  b.x = file_load_game.Bohater.x;
  b.y = file_load_game.Bohater.y;
  b.pozycja_x = file_load_game.Bohater.pozycja_x;
  b.pozycja_y = file_load_game.Bohater.pozycja_y;
  b.width = file_load_game.Bohater.width;
  b.height = file_load_game.Bohater.height;
  b.hp = file_load_game.Bohater.hp;
  b.money = file_load_game.Bohater.money;
  

  t = new Tło(0, 0);
  t.x = file_load_game.Tlo.x;
  t.y = file_load_game.Tlo.y;


  z_p_1 = file_load_game.z_p_1;
  z_p_2 = 1;

  b_wyglad = file_load_game.b_wyglad;

  speed = file_load_game.speed;
  


  for(var i = 0; i < file_load_game.tab_osoby.length; i++){
    var o = new Osoba(file_load_game.tab_osoby[i].x, file_load_game.tab_osoby[i].y);
    o.wyglad = file_load_game.tab_osoby[i].wyglad;
    o.kierunek = file_load_game.tab_osoby[i].kierunek;
    o.hp = file_load_game.tab_osoby[i].hp;
    o.z_ucieczka = file_load_game.tab_osoby[i].z_ucieczka;

    o.display();
    tab_osoby.push(o);
  }

  for(var i = 0; i < file_load_game.tab_trupy.length; i++){
    var tr = new Trup(file_load_game.tab_trupy[i].x, file_load_game.tab_trupy[i].y);
    tr.wyglad = file_load_game.tab_trupy[i].wyglad;

    tr.display();
  }

  for(var i = 0; i < file_load_game.tab_auta.length; i++){
    var samochod = new Auto(file_load_game.tab_auta[i].x, file_load_game.tab_auta[i].y);
    samochod.wyglad = file_load_game.tab_auta[i].wyglad;
    samochod.kierunek = file_load_game.tab_auta[i].kierunek;
    samochod.hp = file_load_game.tab_auta[i].hp;
    samochod.z_ucieczka = file_load_game.tab_auta[i].z_ucieczka;

    samochod.display();
    tab_auta.push(samochod);
  }

  $("#screen_control").remove();

  load();
}




function play(){
  $("html, body").animate({ scrollTop: t.y, scrollLeft: t.x }, "slow");


  t.display();

  resp_postaci();
  resp_aut();

  b.display(); 



  var sound_trafic = new Audio("sound/trafic1.mp3");
  var sound_trafic2 = new Audio("sound/trafic2.mp3");

  "click tap keydown".split(" ").forEach(function(e){
    window.addEventListener(e, function(){
      sound_trafic.play();
      sound_trafic.volume = 0.2;
      sound_trafic2.play();
      sound_trafic2.volume = 0.2;
    },false);
  });
      
  
  window.addEventListener('keydown',
  function(event) {
      if(z_p_2 == 1){
          switch (event.keyCode) {
              case 38: case 87: t.bottom(); b_wyglad = 1; break;
              case 40: case 83: t.top() ; b_wyglad = 2; break;  
              case 37: case 65: t.right() ; b_wyglad = 3; break;
              case 39: case 68: t.left() ; b_wyglad = 4; break;  
              case 32: b.skok(); break; 
              case 90: b.uderzenie(); break;
              case 88:b.strzał(); break; 
              case 27: pause(); break;
          }
          z_p_1 = 0;
      }
      
  }, false);

};





function save_game(){
  var txt = '{"Data":' + JSON.stringify(new Date().toString())       + ',\n"Bohater":' + JSON.stringify(b)    + ',\n"Tlo":' + JSON.stringify(t)     +',\n"z_p_1":' + JSON.stringify(z_p_1)         +',\n"z_p_2":' + JSON.stringify(z_p_2)         +',\n"speed":' + JSON.stringify(speed)        +',\n"b_wyglad":' + JSON.stringify(b_wyglad)           + ',\n"tab_osoby":' + JSON.stringify(tab_osoby)   + ',\n"tab_trupy":' + JSON.stringify(tab_trupy)         + ',\n"tab_auta":' + JSON.stringify(tab_auta)       + '\n\n}';

  var ip = sessionStorage.getItem('ip');
  var agent = navigator.userAgent;

  var token = JSON.parse(sessionStorage.token)[0];
  var password_to_token = JSON.parse(sessionStorage.password_to_token)[0];

  var content = {
      "ip": ip,
      "agent": agent,
      "token": token,
      "password_to_token": password_to_token,
      "data" : txt
  };

  var url = 'https://gta-via-drobik.herokuapp.com/save_game';

  $.post(url, content, function(data, status){

    if(data == "Bad"){
      announcement(data);
    }
    else if(data == "OK"){
      announcement(data);
    }
    else {
        alert("Oops ... Server Error !!!");
    }

  })

  function announcement(arg){
    $("#announcement").remove();
    var ann = document.createElement("div");
    document.body.appendChild(ann);
    ann.setAttribute("id", "announcement");

    switch(arg){
      case "OK": ann.innerHTML = "Saved"; ann.style.backgroundColor = "green"; break;
      case "Bad": ann.innerHTML = "Error"; ann.style.backgroundColor = "red"; break;
    }
    
    setTimeout(() => {
      $("#announcement").fadeOut();
    }, 3000);
  }
}





var zmp_pause_screen = false;

function pause(){
  if(zmp_pause_screen == false){
    z_p_2 = 0;


    var pause_screen = document.createElement("div");
    document.body.appendChild(pause_screen);
    pause_screen.setAttribute("id", "pause_screen");
    pause_screen.innerHTML = "<div id='button_resume_game2'><div id='button_X'><div class='close-container'><div class='leftright'></div><div class='rightleft'></div><label class='close'>Close</label></div></div></div>";

    var pause_div = document.createElement("div");
    pause_screen.appendChild(pause_div);
    pause_div.setAttribute("id", "pause_div");

    pause_div.innerHTML = "<a class='btn-slice' id='button_resume_game'><div class='top'><span>Resume game</span></div><div class='bottom'><span>Resume game</span></div></a>      <a style='margin-top:35%' class='btn-slice' id='button_save_game'><div class='top'><span>Save game</span></div><div class='bottom'><span>Save game</span></div></a>      <a style='margin-top:70%' class='btn-slice' id='button_exit_game'><div class='top'><span>Exit</span></div><div class='bottom'><span>Exit</span></div></a>"
    
    document.getElementById("button_resume_game").addEventListener("click", function(){
      pause_screen.remove();
      zmp_pause_screen = false;
      z_p_2 = 1;
    }, { once: true });
    document.getElementById("button_resume_game2").addEventListener("click", function(){
      pause_screen.remove();
      zmp_pause_screen = false;
      z_p_2 = 1;
    }, { once: true });

    
    document.getElementById("button_save_game").addEventListener("click", function(){
      save_game();
    })

    document.getElementById("button_exit_game").addEventListener("click", function(){
      window.location.href = "../index.html";
    })

    zmp_pause_screen = true;
  }
}




var tab_osoby = [];
var tab_trupy = [];
var tab_auta = [];



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}




var Osoba = function(x_, y_){
    this.width = window.innerWidth / 10 / 2; 
    this.height = this.width * 0.868;

    if(y_ == undefined){
        var los_01 = (getRandomInt(t.height / 5.716, t.height / 4.557) - b.pozycja_y + window.innerHeight / 2); 
        var los_02 = (getRandomInt(t.height / 1.218, t.height / 1.141) - b.pozycja_y + window.innerHeight / 2); 
        var los_03 = getRandomInt(1, 3);
        switch(los_03){
            case 1: this.y = los_01; break;
            case 2: this.y = los_02; break;
        }
    }
    else {
        this.y = y_;
    }

    if(x_ == undefined){
        var los_1 = getRandomInt(b.pozycja_x - innerWidth + t.x, b.pozycja_x - window.innerWidth / 2 - this.width + t.x);
        var los_2 = getRandomInt(b.pozycja_x + innerWidth / 2 + t.x, b.pozycja_x + window.innerWidth + t.x);
        var los_3 = getRandomInt(1, 3);
        switch (los_3){
            case 1: this.x = los_1; break;
            case 2: this.x = los_2; break; 
        }
    }
    else {
        this.x = x_;
    }


    this.pozycja_x = this.x;
    this.pozycja_y = this.y;

    this.wyglad = getRandomInt(1, 4);

    this.kierunek = getRandomInt(1, 3);

    this.hp = 100;

    this.z_ucieczka = 0;
}





Osoba.prototype.display = function(){
    switch (this.wyglad){
        case 1: switch(this.kierunek){
                case 1: var rhtml = "<img id='bohater' width='5%' style='transform: rotate(90deg);' src='img/osoba.webp'>"; break;
                case 2: var rhtml = "<img id='bohater' width='5%' style='transform: rotate(-90deg);' src='img/osoba.webp'>"; break;
                case 3: var rhtml = "<img id='bohater' width='5%' style='transform: rotate(1deg);' src='img/osoba.webp'>"; break;
                case 4: var rhtml = "<img id='bohater' width='5%' style='transform: rotate(180deg);' src='img/osoba.webp'>"; break;
        }; break;
        case 2: switch(this.kierunek){
            case 1: var rhtml = "<img id='bohater' width='5%' style='transform: rotate(-1deg);' src='img/osoba2.webp'>"; break;
            case 2: var rhtml = "<img id='bohater' width='5%' style='transform: rotate(180deg);' src='img/osoba2.webp'>"; break;
            case 3: var rhtml = "<img id='bohater' width='5%' style='transform: rotate(-90deg);' src='img/osoba2.webp'>"; break;
            case 4: var rhtml = "<img id='bohater' width='5%' style='transform: rotate(90deg);' src='img/osoba2.webp'>"; break;
        }; break; 
        case 3: switch(this.kierunek){
            case 1: var rhtml = "<img id='bohater' width='5%' style='transform: rotate(180deg);' src='img/osoba3.webp'>"; break;
            case 2: var rhtml = "<img id='bohater' width='5%' style='transform: rotate(1deg);' src='img/osoba3.webp'>"; break;
            case 3: var rhtml = "<img id='bohater' width='5%' style='transform: rotate(90deg);' src='img/osoba3.webp'>"; break;
            case 4: var rhtml = "<img id='bohater' width='5%' style='transform: rotate(-90deg);' src='img/osoba3.webp'>"; break;
        }; break; 
    }


    this.element = $(rhtml); 


    this.element.css({
        position: 'absolute',
        left: this.x,
        top: this.y
    });


    $("body").append(this.element); 




    Osoba.prototype.check_osoba = function(){
        if(this.pozycja_x < b.pozycja_x - window.innerWidth + t.x || this.pozycja_x > b.pozycja_x + window.innerWidth - t.x){
            return true;
        }
    }



    switch(this.kierunek) {
        case 1: var a = speed / 30 * (Math.random() * (2.5 - 1.8) + 1.8); break;
        case 2: var a = -(speed / 30 * (Math.random() * (2.5 - 1.8) + 1.8)); break;
    }

    var interval = setInterval(() => {
        if(this.z_ucieczka == 0){
            this.x += a;
            this.pozycja_x += a;

            this.element.css({
                left: this.x,
                top: this.y
            });

            if(this.hp <= 0){
                tr = new Trup (this.x, this.y, this.wyglad);
                tr.display();

                $(this.element).remove();
                tab_osoby.splice(tab_osoby.indexOf(this), 1);
                clearInterval(interval);
            }

            if(this.check_osoba()){
                $(this.element).remove();
                clearInterval(interval);
                tab_osoby.splice(tab_osoby.indexOf(this), 1);
            }
        }



        else {

            switch(this.z_ucieczka){
                case 1: var speed_ucieczki = speed / 10; break;
                case 2: var speed_ucieczki = speed / 7.5; break; 
            }


            if(b.pozycja_x > this.pozycja_x){
                var ax = -(speed_ucieczki * (Math.random() * (1.2 - 0.8) + 0.8)); 
                var _x = b.pozycja_x - this.pozycja_x;
                var kierunek_a1 = 2;
            }
            else{
                var ax = speed_ucieczki * (Math.random() * (1.2 - 0.8) + 0.8); 
                var _x = this.pozycja_x - b.pozycja_x; 
                var kierunek_a1 = 1;
            }
        
            if(b.pozycja_y > this.pozycja_y){
                var ay = -(speed_ucieczki * (Math.random() * (1.2 - 0.8) + 0.8)); 
                var _y = b.pozycja_y - this.pozycja_y;
                var kierunek_a2 = 3;
                
            }
            else{
                var ay = speed_ucieczki * (Math.random() * (1.2 - 0.8) + 0.8); 
                var _y = this.pozycja_y - b.pozycja_y; 
                var kierunek_a2 = 4;
            }
    
    
            if(_x >= _y){
                this.x += ax;
                this.pozycja_x += ax;
                var kierunek_a = kierunek_a1;
            }
            else {
                this.y += ay;
                this.pozycja_y += ay; 
                var kierunek_a = kierunek_a2; 
            }
            

            

            if(this.kierunek != kierunek_a){
                this.kierunek = kierunek_a;
                $(this.element).remove();
                this.display();
                clearInterval(interval);
            }

            if(this.hp <= 0){
                tr = new Trup (this.x, this.y, this.wyglad);
                tr.display();

                $(this.element).remove();
                tab_osoby.splice(tab_osoby.indexOf(this), 1);
                clearInterval(interval);
            }

            if(this.check_osoba()){
                $(this.element).remove();
                clearInterval(interval);
                tab_osoby.splice(tab_osoby.indexOf(this), 1);
            }


            this.element.css({
                left: this.x,
                top: this.y
            });
        }
    }, 10);

}






function check_ucieczka(stopien){
    for(var i = 0; i < tab_osoby.length; i++){
        if(tab_osoby[i].pozycja_x > b.pozycja_x - window.innerWidth / 2 && tab_osoby[i].pozycja_x < b.pozycja_x + window.innerWidth / 2){   
            tab_osoby[i].z_ucieczka = stopien;
        }
        else if(tab_osoby[i].pozycja_y > b.pozycja_y - window.innerHeight / 2 && tab_osoby[i].pozycja_y < b.pozycja_y + window.innerHeight / 2){
            tab_osoby[i].z_ucieczka = stopien;
        }
    };
}








var Trup = function(x, y, w){
    this.x = x;
    this.y = y;

    this.wyglad = w; 
    
    this.width = window.innerWidth / 10 / 2; 
    this.height = this.width * 0.868;

}

Trup.prototype.display = function(){

    switch(this.wyglad){
        case 1: var rhtml = "<img id='trup' width='5%' src='img/trup_1.webp'>"; break;
        case 2: var rhtml = "<img id='trup' width='5%' src='img/trup_2.webp'>"; break;
        case 3: var rhtml = "<img id='trup' width='5%' src='img/trup_3.webp'>"; break;
    }
    this.element = $(rhtml); 

    this.element.css({
        position: 'absolute',
        left: this.x,
        top: this.y
    });

    $("body").append(this.element); 

    tab_trupy.push(this);


    setTimeout(() => {
        $(this.element).remove();
        switch(this.wyglad){
            case 1: var rhtml = "<img id='trup' width='5%' src='img/trup_1_2.webp'>"; break;
            case 2: var rhtml = "<img id='trup' width='5%' src='img/trup_2_2.webp'>"; break;
            case 3: var rhtml = "<img id='trup' width='5%' src='img/trup_3_2.webp'>"; break;
        }
        this.element = $(rhtml); 
    
        this.element.css({
            position: 'absolute',
            left: this.x,
            top: this.y
        });
    
        $("body").append(this.element);    
    }, 1000);


    setTimeout(() => {
        $(this.element).remove();
        switch(this.wyglad){
            case 1: var rhtml = "<img id='trup' width='5%' src='img/trup_1_3.webp'>"; break;
            case 2: var rhtml = "<img id='trup' width='5%' src='img/trup_2_3.webp'>"; break;
            case 3: var rhtml = "<img id='trup' width='5%' src='img/trup_3_3.webp'>"; break;
        }
        this.element = $(rhtml); 
    
        this.element.css({
            position: 'absolute',
            left: this.x,
            top: this.y
        });
    
        $("body").append(this.element);    
    }, 7000);


    setInterval(() => {
        this.element.css({
            left: this.x,
            top: this.y
        });
    }, 10);
}






function resp_postaci(){
    for(var i = 0; i < 4; i++){
        var losuj_x = getRandomInt(b.pozycja_x - window.innerWidth / 1.8, b.pozycja_x + window.innerWidth / 1.8);
        var losuj_y = getRandomInt(t.height / 5.716, t.height / 4.557) - b.pozycja_y + window.innerHeight / 2;
        var o = new Osoba(losuj_x, losuj_y);
        o.display(); 
        tab_osoby.push(o);
    };


    setInterval(() => {
        if(document.hasFocus() || tab_osoby.length < 6){
            var o = new Osoba();
            o.display(); 
            tab_osoby.push(o);
        }
    }, 1000); 

}












var Auto = function(){

    this.width = window.innerWidth / 10;
    this.height = this.width / 1.735;

    this.hp = 400;

    this.kierunek = getRandomInt(1,3);

    var los_pas = getRandomInt(1, 4);

    switch(this.kierunek){
        case 1: switch(los_pas){
            case 1: this.y = t.height / 3.7 - b.pozycja_y + window.innerHeight / 2; break;
            case 2: this.y = t.height / 2.986 - b.pozycja_y + window.innerHeight / 2; break;
            case 3: this.y = t.height / 2.46 - b.pozycja_y + window.innerHeight / 2; break;
        }; this.x = b.pozycja_x + window.innerWidth / 1.5 + t.x; break;
        case 2: switch(los_pas){
            case 1: this.y = t.height / 1.591 - b.pozycja_y + window.innerHeight / 2; break;
            case 2: this.y = t.height / 1.443 - b.pozycja_y + window.innerHeight / 2; break;
            case 3: this.y = t.height / 1.302 - b.pozycja_y + window.innerHeight / 2; break;
        }; this.x = b.pozycja_x - window.innerWidth / 1.5 + t.x; break;
    }


    this.pozycja_x = this.x;
    this.pozycja_y = this.y;



    var los_01 = getRandomInt(1, 8);

    switch (los_01){
        case 1: this.wyglad = 1; break;
        case 2: this.wyglad = 2; break;
        case 3: this.wyglad = 3; break;
        case 4: this.wyglad = 4; break;
        case 5: this.wyglad = 5; break;
        case 6: this.wyglad = 6; break;
        case 7: this.wyglad = 7; break;
    };
    
}


var audio_wybuch = new Audio("sound/bum.mp3");

Auto.prototype.display = function(){
    switch (this.wyglad){
        case 1: switch(this.kierunek){
                case 1: var rhtml = "<img id='auto' width='10%' src='img/auto1.webp'>"; break;
                case 2: var rhtml = "<img id='auto' width='10%' style='transform: rotate(180deg);' src='img/auto1.webp'>"; break;
        }; break;
        case 2: switch(this.kierunek){
            case 1: var rhtml = "<img id='auto' width='10%' src='img/auto2.webp'>"; break;
            case 2: var rhtml = "<img id='auto' width='10%' style='transform: rotate(180deg);' src='img/auto2.webp'>"; break;
        }; break;
        case 3: switch(this.kierunek){
            case 1: var rhtml = "<img id='auto' width='10%' src='img/auto3.webp'>"; break;
            case 2: var rhtml = "<img id='auto' width='10%' style='transform: rotate(180deg);' src='img/auto3.webp'>"; break;
        }; break;
        case 4: switch(this.kierunek){
            case 1: var rhtml = "<img id='auto' width='10%' src='img/auto4.webp'>"; break;
            case 2: var rhtml = "<img id='auto' width='10%' style='transform: rotate(180deg);' src='img/auto4.webp'>"; break;
        }; break;
        case 5: switch(this.kierunek){
                case 1: var rhtml = "<img id='auto' width='10%' src='img/auto5.webp'>"; break;
                case 2: var rhtml = "<img id='auto' width='10%' style='transform: rotate(180deg);' src='img/auto5.webp'>"; break;
        }; break;
        case 6: switch(this.kierunek){
            case 1: var rhtml = "<img id='auto' width='10%' src='img/auto6.webp'>"; break;
            case 2: var rhtml = "<img id='auto' width='10%' style='transform: rotate(180deg);' src='img/auto6.webp'>"; break;
        }; break;
        case 7: switch(this.kierunek){
            case 1: var rhtml = "<img id='auto' width='10%' src='img/auto7.webp'>"; break;
            case 2: var rhtml = "<img id='auto' width='10%' style='transform: rotate(180deg);' src='img/auto7.webp'>"; break;
        }; break;
        
    }

    this.element = $(rhtml); 

    this.element.css({
        position: 'absolute',
        left: this.x,
        top: this.y
    });

    $("body").append(this.element); 


    switch(this.kierunek) {
        case 2: var a = speed / 15 * (Math.random() * (4 - 1.8) + 1.8); break;
        case 1: var a = -(speed / 15 * (Math.random() * (4 - 1.8) + 1.8)); break;
    }


    Auto.prototype.check_granica = function(){
        if(this.pozycja_x < b.pozycja_x - window.innerWidth * 2 + t.x || this.pozycja_x > b.pozycja_x + window.innerWidth * 2 - t.x){
            return true;
        } 
    }

    var interval = setInterval(() => {
        this.x += a;
        this.pozycja_x += a;

        this.element.css({
            left: this.x,
            top: this.y
        });

        if(this.hp <= 0){
            clearInterval(interval);

            audio_wybuch.play();
        }
        if(this.check_granica()){
            $(this.element).remove();
            clearInterval(interval);
            tab_auta.splice(tab_auta.indexOf(this), 1);
        }

        if(isCollide(this, b)){
            b.upadek();
            clearInterval(interval);

            var intervall = setInterval(() => {
                this.element.css({
                    left: this.x,
                    top: this.y
                });
            }, 10);
            setTimeout(() => {
                clearInterval(intervall);
                $(this.element).remove();
                this.display();
            }, 6000);
        }
    }, 1);


    /* var interval2 = setInterval(() => {
        for(var i = 0; i < tab_auta.length; i++){
            if(isCollide(this, tab_auta[i])){
                if(tab_auta[tab_auta.indexOf(this)] !== tab_auta[i]){
                    clearInterval(interval);
                    clearInterval(intervall);

                    var intervall2 = setInterval(() => {
                        this.x += a / 5;
                        this.pozycja_x += a / 5;

                        this.element.css({
                            left: this.x,
                            top: this.y
                        });


                    }, 1);

                    setTimeout(() => {
                        clearInterval(intervall2);
                        
                        setInterval(() => {
                            this.element.css({
                                left: this.x,
                                top: this.y
                            });
                        }, 10);
                    }, 1000);
                }
            }
        }
    }, 10); */
}


function resp_aut(){
    for(var i = 0; i < 4; i++){
        var samochod = new Auto();
        samochod.display();
        tab_auta.push(samochod);
    }; 

    setInterval(() => {
        if(document.hasFocus() || tab_auta.length < 4){
            var samochod = new Auto();
            samochod.display();
            tab_auta.push(samochod);
        }
    }, 2000);
};
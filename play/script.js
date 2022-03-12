

var z_p_1 = 200;

var z_p_2 = 1;


var b_wyglad = 0;

var speed = 15;




function isCollide (entity1,entity2) {
    return !(entity1.x + entity1.width < entity2.x ||
             entity2.x + entity2.width < entity1.x ||
             entity1.y + entity1.height < entity2.y ||
             entity2.y + entity2.height < entity1.y);
}





var Bohater = function(x, y){
    this.x = x;
    this.y = y;

    this.width = window.innerWidth / 100 * 9;
    this.height = window.innerHeight / 100 * 9;

    this.pozycja_x = window.innerWidth / 2;
    this.pozycja_y = window.innerHeight / 2;

    this.hp = 200;

    this.money = 0;
};

Bohater.prototype.display = function() {
    var interval = setInterval(() => {
        if(z_p_1 < 240) {
            switch(b_wyglad) {
                case 0: var rhtml = "<img id='bohater_główny' width='9%' src='img/bohater_główny.webp'>"; break;

                case 0.1 : var rhtml = "<img id='bohater_główny' style='transform: rotate(90deg);'width='9%' src='img/bohater_główny.webp'>"; break;
                case 0.2 : var rhtml = "<img id='bohater_główny' style='transform: rotate(270deg);'width='9%' src='img/bohater_główny.webp'>"; break;
                case 0.3 : var rhtml = "<img id='bohater_główny' style='transform: rotate(1deg);'width='9%' src='img/bohater_główny.webp'>"; break;
                case 0.4 : var rhtml = "<img id='bohater_główny' style='transform: rotate(180deg);'width='9%' src='img/bohater_główny.webp'>"; break;

                case 1: var rhtml = "<img id='bohater_główny' style='transform: rotate(202deg);' width='9%' src='img/ruch.webp'>";  break;
                case 2: var rhtml = "<img id='bohater_główny' style='transform: rotate(20deg);' width='9%' src='img/ruch.webp'>";  break;
                case 3: var rhtml = "<img id='bohater_główny' style='transform: rotate(106deg);' width='9%' src='img/ruch.webp'>";  break;
                case 4: var rhtml = "<img id='bohater_główny' style='transform: rotate(300deg);' width='9%' src='img/ruch.webp'>";  break;

                case 11: var rhtml = "<img id='bohater_główny' style='transform: rotate(-120deg);' width='6%' src='img/atak.webp'>";  break;
                case 12: var rhtml = "<img id='bohater_główny' style='transform: rotate(70deg);' width='6%' src='img/atak.webp'>";  break;
                case 13: var rhtml = "<img id='bohater_główny' style='transform: rotate(160deg);' width='6%' src='img/atak.webp'>";  break;
                case 14: var rhtml = "<img id='bohater_główny' style='transform: rotate(-70deg);' width='6%' src='img/atak.webp'>";  break;

                case 21: var rhtml = "<img id='bohater_główny' style='transform: rotate(180deg);' width='6%' src='img/skok.webp'>";  break;
                case 22: var rhtml = "<img id='bohater_główny' style='transform: rotate(-1deg);' width='6%' src='img/skok.webp'>";  break;
                case 23: var rhtml = "<img id='bohater_główny' style='transform: rotate(90deg);' width='6%' src='img/skok.webp'>";  break;
                case 24: var rhtml = "<img id='bohater_główny' style='transform: rotate(-90deg);' width='6%' src='img/skok.webp'>";  break;

                case 31: var rhtml = "<img id='bohater_główny' style='transform: rotate(-85deg);' width='6%' src='img/strzał.webp'>";  break;
                case 32: var rhtml = "<img id='bohater_główny' style='transform: rotate(95deg);' width='6%' src='img/strzał.webp'>";  break;
                case 33: var rhtml = "<img id='bohater_główny' style='transform: rotate(180deg);' width='6%' src='img/strzał.webp'>";  break;
                case 34: var rhtml = "<img id='bohater_główny' style='transform: rotate(5deg);' width='6%' src='img/strzał.webp'>";  break;

                case 41: var rhtml = "<img id='bohater_główny' style='transform: rotate(45deg);' width='9%' src='img/upadek.webp'>";  break;
                case 42: var rhtml = "<img id='bohater_główny' style='transform: rotate(225deg);' width='9%' src='img/upadek.webp'>";  break;
                case 43: var rhtml = "<img id='bohater_główny' style='transform: rotate(-45deg);' width='9%' src='img/upadek.webp'>";  break;
                case 44: var rhtml = "<img id='bohater_główny' style='transform: rotate(135deg);' width='9%' src='img/upadek.webp'>";  break;
            }

            var a = 0;
            if(b_wyglad < 5){
                a = 40;
            }
            else if(b_wyglad > 20 && b_wyglad < 40){
                a = 82;
            }
            else if(b_wyglad > 40){
                a = 220;
            }
            else {
                a = 70;
            }

            z_p_1 += 1;

            if(z_p_1 == a){
                switch(b_wyglad) {
                    case 1: case 11: case 21: case 31: case 41: b_wyglad = 0.1;  break;
                    case 2: case 12: case 22: case 32: case 42: b_wyglad = 0.2;  break;
                    case 3: case 13: case 23: case 33: case 43: b_wyglad = 0.3;  break;
                    case 4: case 14: case 24: case 34: case 44: b_wyglad = 0.4;  break;
                };
                z_p_1 = 200; 
            }


            this.element = $(rhtml); 

            this.element.css({
                position: 'absolute',
                left: this.x,
                top: this.y
            });

            $("#bohater_główny").remove();
            $("body").append(this.element);

        }

    }, 10);

    var rhtml = "<img id='bohater_główny' width='9%' src='img/bohater_główny.webp'>";

    this.element = $(rhtml); 

    this.element.css({
        position: 'absolute',
        left: this.x,
        top: this.y
    });

    $("body").append(this.element); 
};






Bohater.prototype.skok = function(){
    z_p_2 = 0;

    function zmiana_polozenia_t (){
        var a = 0;

        b.x += b.width / 7;

        var interval = setInterval(() => {
            t.bottom();
            a += 1;

            if(a == 5){
                clearInterval(interval);
                b.x -= b.width / 7;
            }
        }, 160);  
    }

    function zmiana_polozenia_b (){
        var a = 0;

        b.x += b.width / 3;
        b.y += b.height / 2;

        var interval = setInterval(() => {
            t.top();
            a += 1;

            if(a == 5){
                clearInterval(interval);
                b.x -= b.width / 3;
                b.y -= b.height / 2;
            }
        }, 160);
    }

    function zmiana_polozenia_l (){
        var a = 0;

        b.y += b.height / 3;

        var interval = setInterval(() => {
            t.right();
            a += 1;

            if(a == 5){
                clearInterval(interval);
                b.y -= b.height / 3;
            }
        }, 160);       
    }

    function zmiana_polozenia_r (){
        var a = 0;

        b.x += b.width / 3;
        b.y += b.height / 4;

        var interval = setInterval(() => {
            t.left();
            a += 1;

            if(a == 5){
                clearInterval(interval);
                b.x -= b.width / 3;
                b.y -= b.height / 4;
            }
        }, 160);        
    }

    switch(b_wyglad){
        case 1: case 0.1: case 11: case 21: zmiana_polozenia_t(); b_wyglad = 21; break; 
        case 2: case 0.2: case 12: case 22: zmiana_polozenia_b(); b_wyglad = 22; break; 
        case 3: case 0.3: case 13: case 0: case 23:  zmiana_polozenia_l(); b_wyglad = 23; break; 
        case 4: case 0.4: case 14: case 24: zmiana_polozenia_r(); b_wyglad = 24; break; 
    }

    setTimeout(() => {
        z_p_2 = 1; 
    }, 1000);

}









Bohater.prototype.uderzenie = function(){
    z_p_2 = 0;

    function zmiana_polozenia_t (){
        b.x += b.width / 7;

        setTimeout(() => {
            b.x -= b.width / 7;
        }, 700);
    }

    function zmiana_polozenia_b (){
        b.x += b.width / 5;
        b.y += b.height;

        setTimeout(() => {
            b.x -= b.width / 5;
            b.y -= b.height;
        }, 700);
    }

    function zmiana_polozenia_l (){
        b.y += b.height / 3;

        setTimeout(() => {
            b.y -= b.height / 3;
        }, 700);
    }

    function zmiana_polozenia_r (){
        b.x += b.width / 3;
        b.y += b.height / 4;

        setTimeout(() => {
            b.x -= b.width / 3;
            b.y -= b.height / 4;
        }, 700);
    }
    switch(b_wyglad){
        case 1: case 0.1: case 11: zmiana_polozenia_t(); b_wyglad = 11; Cioss('t'); break; 
        case 2: case 0.2: case 12: zmiana_polozenia_b(); b_wyglad = 12; Cioss('b'); break; 
        case 3: case 0.3: case 13: case 0: zmiana_polozenia_l(); b_wyglad = 13; Cioss('l'); break; 
        case 4: case 0.4: case 14: zmiana_polozenia_r(); b_wyglad = 14; Cioss('r'); break; 
    }
    
    setTimeout(() => {
        z_p_2 = 1; 
    }, 800);

    check_ucieczka(1);
}



function Cioss(kierunek){
    c = new Cios(b.x, b.y, kierunek);
    c.display();
}


var tab_dzwieki_cios = ['sound/cios1.mp3', 'sound/cios2.mp3', 'sound/cios3.mp3', 'sound/cios4.mp3', 'sound/cios5.mp3', 'sound/cios6.mp3', 'sound/cios7.mp3'];

var Cios = function(x, y, kierunek){
    this.width = b.width;
    this.height = b.height;


    switch(kierunek){
        case 't': this.x = x + this.width / 15; this.y = y - this.height / 4; break;
        case 'b': this.x = x + this.width / 20; this.y = y + this.height / 2; break;
        case 'l': this.x = x - window.innerWidth / 30; this.y = y + b.height / 10; break;
        case 'r': this.x = x + window.innerWidth / 30; this.y = y + b.height / 4; break;
    };

}

Cios.prototype.display = function(){
    var rhtml = "<img id='pocisk' width='5%' src='img/cios.webp'>"; 

    this.element = $(rhtml); 

    this.element.css({
        position: 'absolute',
        left: this.x,
        top: this.y
    });

    $("body").append(this.element); 

    var interval = setInterval(() => {
        for(var i = 0; i < tab_osoby.length; i++){
            if(isCollide(this, tab_osoby[i])){
                $(this.element).remove();
                tab_osoby[i].hp -= getRandomInt(10, 20); 
                clearInterval(interval);

                var audio_cios = new Audio(tab_dzwieki_cios[getRandomInt(1, 8)]);
                audio_cios.play(); 
            }
        }
    }, 1);

    setTimeout(() => {
        $(this.element).remove();
        clearInterval(interval); 
    }, 1000);

};








var audio_strzał = new Audio('sound/strzał.mp3');

Bohater.prototype.strzał = function(){
    z_p_2 = 0;

    function zmiana_polozenia_t (){
        b.x += b.width / 7;

        setTimeout(() => {
            b.x -= b.width / 7;
        }, 820);
    }

    function zmiana_polozenia_b (){
        b.x += b.width / 8;
        b.y += 1.3 * b.height;

        setTimeout(() => {
            b.x -= b.width / 8;
            b.y -= 1.3 * b.height;
            z_p_1 = 0;
        }, 820);
    }

    function zmiana_polozenia_l (){
        b.x -= b.width / 10;
        b.y += b.height / 2;

        setTimeout(() => {
            b.x += b.width / 10;
            b.y -= b.height / 2;
        }, 820);
    }

    function zmiana_polozenia_r (){
        b.x += b.width / 2;
        b.y += b.height / 1.3;

        setTimeout(() => {
            b.x -= b.width / 2;
            b.y -= b.height / 1.3;
        }, 820);
    }

    audio_strzał.currentTime = 0;
    audio_strzał.play();

    switch(b_wyglad){
        case 1: case 0.1: case 11: zmiana_polozenia_t(); b_wyglad = 31; Pociski(b.x, b.y, 't'); break; 
        case 2: case 0.2: case 12: zmiana_polozenia_b(); b_wyglad = 32; Pociski(b.x, b.y, 'b'); break; 
        case 3: case 0.3: case 13: case 0: zmiana_polozenia_l(); b_wyglad = 33; Pociski(b.x, b.y, 'l'); break; 
        case 4: case 0.4: case 14: zmiana_polozenia_r(); b_wyglad = 34; Pociski(b.x, b.y, 'r'); break; 
    }


    setTimeout(() => {
        z_p_2 = 1; 
    }, 820);

    check_ucieczka(2);
};




function Pociski(x, y, kierunek){
    var a = 0;

    var interval = setInterval(() => {
        var p = new Pocisk(x, y, kierunek);
        p.display(); 
        
        a += 1;
        if(a == 8){
            clearInterval(interval);
        }
    }, 100);
}

var Pocisk = function(x, y, kierunek){
    switch(kierunek){
        case 't': this.lot_y = -4; this.lot_x = 0; this.x = x + b.width / 4; this.y = y; break;
        case 'b': this.lot_y = 4; this.lot_x = 0; this.x = x + b.width / 3; this.y = y + b.height / 2; break;
        case 'l': this.lot_y = 0; this.lot_x = -4; this.x = x; this.y = y + b.height / 2; break;
        case 'r': this.lot_y = 0; this.lot_x = 4; this.x = x + b.width / 2; this.y = y + b.height / 3; break;
    };

    this.width = window.innerWidth / 100;
    this.height = this.width * 0.697;

    this.pozycja_x = this.x;
    this.pozycja_y = this.y; 

}

Pocisk.prototype.display = function(){
    var rhtml = "<img id='pocisk' width='1%' src='img/pocisk.webp'>"; 

    this.element = $(rhtml); 

    this.element.css({
        position: 'absolute',
        left: this.x,
        top: this.y
    });

    $("body").append(this.element); 

    var interval = setInterval(() => {
        this.x += this.lot_x;
        this.y += this.lot_y; 

        this.pozycja_x += this.lot_x;
        this.pozycja_y += this.lot_y; 

        this.element.css({
            left: this.x,
            top: this.y
        });

        // if(granica_1(this) || granica_2(this) || granica_3(this) || granica_4(this)){
        //     $(this.element).remove();
        //     clearInterval(interval);
        // }
    
        for(var i = 0; i < tab_osoby.length; i++){
            if(isCollide(this, tab_osoby[i])){
                $(this.element).remove();
                tab_osoby[i].hp -= getRandomInt(10, 20); 
                clearInterval(interval);
            }
        }

        for(var i = 0; i < tab_auta.length; i++){
            if(isCollide(this, tab_auta[i])){
                $(this.element).remove();
                tab_auta[i].hp -= getRandomInt(10, 20); 
                clearInterval(interval);
            }
        }

    }, 1);

    setTimeout(() => {
        $(this.element).remove();
        clearInterval(interval);
    }, 5000);

};








Bohater.prototype.upadek = function(){
    z_p_2 = 0;
    switch(b_wyglad){
        case 1: case 0.1: case 11: case 21: case 31: b_wyglad = 41; break; 
        case 2: case 0.2: case 12: case 22: case 32: b_wyglad = 42; break; 
        case 3: case 0.3: case 13: case 0: case 23: case 33: b_wyglad = 43; break; 
        case 4: case 0.4: case 14: case 24: case 34:  b_wyglad = 44; break; 
    }

    z_p_1 = 0;

    b.hp -= 30;
    check_hp();


    setTimeout(() => {
        z_p_2 = 1; 
    }, 2200);
}







var b = new Bohater(window.innerWidth / 2, window.innerHeight / 2);
















function granica_1(a){
    if(a.pozycja_y <= t.height / 40){
        return true;
    }
    if(a.pozycja_x >= 0 && a.pozycja_x <= t.width / 3.7628797 - a.width / 3 && a.pozycja_y <= t.height / 6.1857142 - a.height / 3){
        return true;
    }
    if(a.pozycja_x >= t.width / 2.8286991 - a.width / 2 && a.pozycja_x <= t.width / 2.1987649 - a.width / 3 && a.pozycja_y <= t.height / 5.95189 - a.height / 3){
        return true;
    }
    if(a.pozycja_x >= t.width / 1.6508258 - a.width / 2 && a.pozycja_x <= t.width / 1.4626444 - a.width / 3 && a.pozycja_y <= t.height / 5.6601307 - a.height / 3){
        return true;
    }    
    if(a.pozycja_x >= t.width / 1.4622689 - a.width / 2 && a.pozycja_x <= t.width / 1.0601042 - a.width / 3 && a.pozycja_y <= t.height / 9.8971428 - a.height / 3){
        return true;
    }    
    if(a.pozycja_x >= t.width / 1.0599069 - a.width / 2 && a.pozycja_x <= t.width - a.width / 3 && a.pozycja_y <= t.height / 5.6601307 - a.height / 3){
        return true;
    }
}

function granica_2(a){
    if(a.pozycja_x < 0){
        return true;
    }
    if(a.pozycja_x >= t.width / 4.7474 && a.pozycja_x <= t.width / 3.7653668 && a.pozycja_y <= t.height / 6.1857142 - a.height / 2){
        return true;
    }
    if(a.pozycja_x >= t.width / 2.1987649 - 2 * a.width && a.pozycja_x <= t.width / 2.1987649 - a.width / 4 && a.pozycja_y <= t.height / 5.95189 - a.height){
        return true;
    }
    if(a.pozycja_x >= t.width / 1.4622689 -  2 * a.width && a.pozycja_x <= t.width / 1.4622689 - a.width / 4 && a.pozycja_y <= t.height / 6.1857142 - a.height / 2){
        return true;
    }

}

function granica_3 (a){
    if(a.pozycja_x > t.width){
        return true;
    }
    if(a.pozycja_x >= t.width / 2.8286991 - a.width / 1.4 && a.pozycja_x <= t.width / 2.73 && a.pozycja_y <= t.height / 5.95189 - a.height){
        return true;
    };
    if(a.pozycja_x >= t.width / 1.6508258 - a.width / 1.4  && a.pozycja_x <= t.width / 1.61 && a.pozycja_y <= t.height / 5.6601307 - a.height){
        return true;
    };
    if(a.pozycja_x >= t.width / 1.0599069 - a.width / 1.4  && a.pozycja_x <= t.width / 1.043 && a.pozycja_y <= t.height / 5.6601307 - a.height){
        return true;
    };
}

function granica_4 (a){
    if(a.pozycja_y >= t.height - t.height / 15){
        return true;
    }
}















var Tło = function(x, y){
    this.x = x;
    this.y = y;

    this.height = 3 * window.innerHeight;
    this.width = 3.2892609 * this.height; 
};

Tło.prototype.display = function() {
    var rhtml = "<img id='tło' height='300%' src='img/tło.webp'>"; 

    this.element = $(rhtml); 

    this.element.css({
        position: 'absolute',
        left: this.x,
        top: this.y
    });

    $("body").append(this.element); 
};

Tło.prototype.right = function (){
    if(granica_2(b)){
        b.x += 0;
    }
    else if(t.x > -10 || b.pozycja_x > t.width - window.innerWidth / 2) {
        if (b.pozycja_x > 0) {
            b.x -= speed;
            b.pozycja_x -= speed; 
        }
        else{
            b.x -= 0;
        }    
    }
    else {
        this.x += speed;
        b.pozycja_x -= speed;

        this.element.css ({
            left: this.x,
        });

        for(var i = 0; i < tab_osoby.length; i++){
            tab_osoby[i].x += speed; 
            tab_osoby[i].pozycja_x += speed;
        }

        for(var i = 0; i < tab_trupy.length; i++){
            tab_trupy[i].x += speed; 
            tab_trupy[i].pozycja_x += speed;
        }

        for(var i = 0; i < tab_auta.length; i++){
            tab_auta[i].x += speed; 
            tab_auta[i].pozycja_x += speed;
        }

    };
}
Tło.prototype.left = function (){
    if(granica_3(b)){
        b.x -= 0;
    }
    else if(t.x < 0 - t.width + window.innerWidth + 10 || b.x < window.innerWidth / 2){
        if(b.pozycja_x < t.width - b.width){
            b.x += speed; 
            b.pozycja_x += speed; 
        }
        else{
            b.x += 0;
        }
    }
    else {
        this.x -= speed;
        b.pozycja_x += speed;

        for(var i = 0; i < tab_osoby.length; i++){
            tab_osoby[i].x -= speed; 
            tab_osoby[i].pozycja_x -= speed;
        }

        for(var i = 0; i < tab_trupy.length; i++){
            tab_trupy[i].x -= speed; 
            tab_trupy[i].pozycja_x -= speed;
        }

        for(var i = 0; i < tab_auta.length; i++){
            tab_auta[i].x -= speed; 
            tab_auta[i].pozycja_x -= speed;
        }

        this.element.css ({
            left: this.x,
        });
    }
}
Tło.prototype.bottom = function (){
    if(t.y > - 10 || b.pozycja_y > t.height - window.innerHeight / 2) {
        if (granica_1(b) && b.pozycja_y < t.height / 2) {
            b.y += 0; 
        }
        else {
            b.y -= speed;
            b.pozycja_y -= speed;
        }
    }
    else {
        this.y += speed;
        b.pozycja_y -= speed;

        for(var i = 0; i < tab_osoby.length; i++){
            tab_osoby[i].y += speed; 
            tab_osoby[i].pozycja_y += speed;
        }

        for(var i = 0; i < tab_trupy.length; i++){
            tab_trupy[i].y += speed; 
            tab_trupy[i].pozycja_y += speed;
        }

        for(var i = 0; i < tab_auta.length; i++){
            tab_auta[i].y += speed; 
            tab_auta[i].pozycja_y += speed;
        }

        this.element.css ({
            top: this.y,
        });
    }
}
Tło.prototype.top = function (){
    if(t.y < 0 - t.height + window.innerHeight + 10 || b.y < window.innerHeight / 2){
        if (granica_4(b) && b.pozycja_y > t.height / 2){
            b.y += 0;
        }
        else {
            b.y += speed;
            b.pozycja_y += speed;
        }
    }
    else {
        this.y -= speed;
        b.pozycja_y += speed;

        for(var i = 0; i < tab_osoby.length; i++){
            tab_osoby[i].y -= speed; 
            tab_osoby[i].pozycja_y -= speed;
        }

        for(var i = 0; i < tab_trupy.length; i++){
            tab_trupy[i].y -= speed; 
            tab_trupy[i].pozycja_y -= speed;
        }

        for(var i = 0; i < tab_auta.length; i++){
            tab_auta[i].y -= speed; 
            tab_auta[i].pozycja_y -= speed;
        }

        this.element.css ({
            top: this.y,
        });
    }
}



var t = new Tło(0, 0);



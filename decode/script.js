function encryptData(data,iv,key){
    if(typeof data=="string"){
        data=data.slice();
        encryptedString = CryptoJS.AES.encrypt(data, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        }
        else{
        encryptedString = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });  
        }
        return encryptedString.toString();
}


function decryptData(encrypted,iv,key){
    var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        	  iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    return decrypted.toString(CryptoJS.enc.Utf8)
}




var data="jebać pis";
var iv  = CryptoJS.enc.Base64.parse("4");
var key=CryptoJS.SHA256("haselko");
var encryptedString=encryptData(data,iv,key);
console.log(encryptedString);



var iv  = CryptoJS.enc.Base64.parse("4");
var key=CryptoJS.SHA256("haselko");

var decrypteddata=decryptData(encryptedString,iv,key);
console.log(decrypteddata);
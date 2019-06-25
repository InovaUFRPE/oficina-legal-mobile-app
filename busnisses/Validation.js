export function validateCPF(cpf) {	
    cpf = cpf.replace(/[^\d]+/g,'');	
    if(cpf == '') return false;	
    // Elimina CPFs invalidos conhecidos	
    if (cpf.length != 11 || 
        cpf == "00000000000" || 
        cpf == "11111111111" || 
        cpf == "22222222222" || 
        cpf == "33333333333" || 
        cpf == "44444444444" || 
        cpf == "55555555555" || 
        cpf == "66666666666" || 
        cpf == "77777777777" || 
        cpf == "88888888888" || 
        cpf == "99999999999")
            return false;		
    // Valida 1o digito	
    add = 0;	
    for (i=0; i < 9; i ++)		
        add += parseInt(cpf.charAt(i)) * (10 - i);	
        rev = 11 - (add % 11);	
        if (rev == 10 || rev == 11)		
            rev = 0;	
        if (rev != parseInt(cpf.charAt(9)))		
            return false;		
    // Valida 2o digito	
    add = 0;	
    for (i = 0; i < 10; i ++)		
        add += parseInt(cpf.charAt(i)) * (11 - i);	
    rev = 11 - (add % 11);	
    if (rev == 10 || rev == 11)	
        rev = 0;	
    if (rev != parseInt(cpf.charAt(10)))
        return false;		
    return true;   
}

export function validateEmail(email) {
    user = email.substring(0, email.indexOf("@"));
    domain = email.substring(email.indexOf("@")+ 1, email.length);
     
    if ((user.length >=1) &&
        (domain.length >=3) && 
        (user.search("@")==-1) && 
        (domain.search("@")==-1) &&
        (user.search(" ")==-1) && 
        (domain.search(" ")==-1) &&
        (domain.search(".")!=-1) &&      
        (domain.indexOf(".") >=1)&& 
        (domain.lastIndexOf(".") < domain.length - 1)) {
    return true
    }
    else {
        return false
    }
}

export function ConfirmPassword(password, confirmPassword){
    if(password == confirmPassword){
        return true
    }
    else{
        return null
    }
}

export function ValidateCEP(cep){
       if (cep.length == 0){
        return null;            
    };
    if (cep.length == 8) {
       return cep.charAt(0)+cep.charAt(1)+'.'+
              cep.charAt(2)+cep.charAt(3)+cep.charAt(4)+'-'+   
              cep.charAt(5)+cep.charAt(6)+cep.charAt(7);              
    }
    else {                          
       return null;
   };
    
};


export function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}

export function getToken(length){
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    let random = '';
    for (let i = 0; i < length; i++) {
        let rnum = Math.floor(Math.random() * chars.length);
        random += chars.substring(rnum, rnum + 1);
    }
    return random;
}

export function checkBlankCamps(strTyped, camp){
    if(strTyped == ""){
        return ("\n- " + camp)
    }
    return ''  
}

export function validBlankCamps(blank) {
    if(blank == "\nCampo(s) em branco:\n"){
        return ''
    }
    return blank
}
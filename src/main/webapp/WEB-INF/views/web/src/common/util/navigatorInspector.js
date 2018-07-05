

    export function getNavType(){
        var ua = window.navigator.userAgent;
        var isIE = window.ActiveXObject !== undefined && ua.indexOf("MSIE") !== -1;
        var isFirefox = ua.indexOf("Firefox") !== -1;
        var isOpera = window.opr !== undefined;
        var isChrome = ua.indexOf("Chrome") && window.chrome;
        var isSafari = ua.indexOf("Safari") !== -1 && ua.indexOf("Version") !== -1;
        if (isIE) {
            return "IE";
        } else if (isFirefox) {
            return "Firefox";
        } else if (isOpera) {
            return "Opera";
        } else if (isChrome) {
            return "Chrome";
        } else if (isSafari) {
            return "Safari";
        } else {
            return "Unkown";
        }
            

        // //以下进行测试

        // if(Sys.ie) {return "ie";}
    
        // if(Sys.firefox) {return "firefox";}
    
        // if(Sys.chrome) {return "chrome";}
    
        // if(Sys.opera) {return "opera";}
    
        // if(Sys.safari) {return "safari";}
    
    }

    

    

    

    


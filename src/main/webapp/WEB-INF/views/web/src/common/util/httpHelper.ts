class HttpSend{

    public static post(url:string,bodyData : any,successCb : (json :any)=>void,errCb : (err:any)=>void){
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        fetch(url,{
            method:'POST',
            headers:myHeaders,
            body:JSON.stringify(bodyData)

        }).then((response)=>response.json())
        .then(successCb)
        .catch(errCb)
    }


    public static get(url : string,bodyData :any,async : boolean = true,successCb? : (json :any)=>void,errCb? : (err:any)=>void) : any{
        if(async){
            $.get({url,data : bodyData}).done((response)=>successCb(response)).fail(err=>errCb(err));
            return;
        }

        return $.ajax({
            url,
            data : bodyData,
            async : false
        }).responseJSON
    }
}


export {HttpSend}
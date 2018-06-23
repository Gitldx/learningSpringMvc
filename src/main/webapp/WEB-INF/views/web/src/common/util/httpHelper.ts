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
}


export {HttpSend}
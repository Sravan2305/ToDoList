export default function serviceWorkerDev()
{
    let swurl = `${process.env.PUBLIC_URL}/serviceworker.js`
    navigator.serviceWorker.register(swurl)
    .then((res)=>{
        console.log("Response is"+res);
    })
}
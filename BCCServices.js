
 function BccService(message){
    let bccservice;
    if(message=="STI"){
        bccservice="IsSTIs";
    }else if(message=="HIV")
    {
        bccservice="IsHIV";
    }else if(message=="SIP") 
    {
        bccservice="IsSIP";
    }else if(message=="Sex")
    {
        bccservice="IsSaferSex";
    }

    var sti= document.querySelectorAll("input[data-bind='checked: "+bccservice+"']"); 
    for (i=0; i<sti.length; i++) 
        {
            sti[i].checked=true; 
        }
}
module.exports= BccService;
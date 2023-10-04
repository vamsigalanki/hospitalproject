import React, { useEffect, useState } from "react";
import { useEdithospitalMutation, useGetHospitalidQuery, useLazyGetHospitalidQuery } from "../service/hospital";
import { useParams } from "react-router-dom";
import _ from "lodash"; 
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
const provider = new GoogleAuthProvider();
function Details(){
    var p=useParams();
    console.log(p); 
    var {isLoading,data}=useGetHospitalidQuery(p.id);
    var [beds,setBeds]=useState(null)
    var [bedTypes,setBedTypes]=React.useState([]);
    var [gh]=useEdithospitalMutation();
     var [jk]=useLazyGetHospitalidQuery();
     var [selectbed,setSelectedBed]=React.useState(-1)
     useEffect(()=>{
         if(data){
            var bedsByCategory= _.groupBy(data.beds,"bedtype");
            console.log(bedsByCategory);
            setBeds(bedsByCategory);
            var temp=[];
        for(var k in bedsByCategory){
            temp.push(k)
        }
        setBedTypes([...temp])
        }
     },[data]);
    
     function bookbed(bid){
         setSelectedBed(bid);
        console.clear();
        var tempbeds=data.beds;
        tempbeds=tempbeds.map((bed)=>{
            if(bed.bedid===bid){
                return{...bed,bedStatus:'occupied'}
            }
            else{
                return bed;
            }
           
        })
        console.log("tempbeds",tempbeds);
        var bedsByCategory= _.groupBy(tempbeds,"bedtype");
        setBeds(bedsByCategory)
     }
     function updateHospital(){
        const auth = getAuth();
    signInWithPopup(auth,provider)
    .then((result)=>{
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
      console.log(token)
      var temps=Object.values(beds).flat(1);
       temps=temps.map((b)=>{
        if(b.bedid===selectbed){
            return{...b,patients:[...b.patients,{useremail:user.email,token:user.accessToken}]}
        }
        else{
            return b
        }
      })
      data={...data,beds:[...temps]}
      gh(data).then(()=>{jk(p.id)
      })
    }).catch((error)=>{
      console.log(error);
    });
        console.clear();
     }
     return(<div>
        <h1>details</h1>
        {
            isLoading&&(<h1>isloading</h1>)
        }
        {
           !isLoading&& (
            <div>
                <h1>{data.HospitalName}</h1>
                <ul>{
                bedTypes.map((t)=>{
                    return<li>{t}-{beds[t].length}
                    {
                        beds[t].map((bed)=>{
                            return(
                            <>
                            {bed.bedStatus==='open'&&<i class="bi bi-clipboard h3 m-2" onClick={()=>{bookbed(bed.bedid)}}></i>}
                            {bed.bedStatus==='occupied'&&<i class="bi bi-clipboard-fill h3 m-2" onClick={()=>{bookbed(bed.bedid)}}></i>}
                            </>)
                        })
                    }</li>
                })}</ul>
                <button onClick={(()=>{updateHospital()})}>submit</button>
                </div>
           )
        }
        </div>);   
}
export default Details;
import React, { useState } from "react";
import { useEdithospitalMutation, useGetallHospitalQuery,} from "../../service/hospital";
function Addbeds(){
    var{isLoading,data}=useGetallHospitalQuery();
    var [addbeds] = useEdithospitalMutation();
    var[selectedbedtype,setSelectedBedType]=useState('');
    var[count,setCount]=useState(0);
    var[price,setPrice]=useState(0);
    var[selecthospital,setSelectHospital]=useState(null);
    function update(h) 
    {
      setSelectHospital(JSON.parse(h));

    }
    function save(){
        var beds=[];
        console.log(selectedbedtype)
        var number=selecthospital.beds.filter(b=>b.bedtype===selectedbedtype).length;
        for(var i=0;i<=count-1;i++)
        {
            var newBed={
                bedStatus:'open',
                bedtype:selectedbedtype,
                price,
                patients:[],
                bedid:`${selectedbedtype+(number+i+1)}`
            } 
            beds.push(newBed);
        }
        var editedhosp = {...selecthospital,beds:[...selecthospital.beds,...beds]}
        addbeds(editedhosp);

        

    }
    
    return(<div className="border border-2 border-Info m-2 p-2">
        <h1>addbeds</h1>{
            isLoading&&(<h1>Loading...</h1>)
        }
        {
          !isLoading&&(<>
            <select onChange={(e)=>{update(e.target.value)}}>
                <option value={null} disabled selected>please select</option>
                {
                    data.map((k)=>{
                        return(<option value={JSON.stringify(k)}>{k.HospitalName
                        }</option>)
                    }
                    )
                }
            </select>
            <br></br>
            </>
          )
         }
      {  
      selecthospital &&(
        <>
      <select onChange={(e)=>{setSelectedBedType(e.target.value)}}>
        <option disabled selected>please</option>{
            selecthospital.bedTypes.map((bs)=>{
                return(<option value={bs.bedType}>{bs.bedType}</option>)
            } 
            ) 
            }
            </select>
            <br></br>
            <input type="number" placeholder="enter  bed count" onChange={(e)=>{setCount(e.target.value)}}></input>
            <br></br>
            <input type="text" placeholder="enter bed price" onChange={(e)=>{setPrice(e.target.value)}}></input>
            </>)     
        }
        
         <button onClick={()=>{save()}}>save</button> 
         </div>)
}
export default Addbeds
 
import React from "react";
import { useGetallHospitalQuery } from "../../service/hospital";
import { Link } from "react-router-dom";
function Home(){
    var {isLoading,data}=useGetallHospitalQuery();
    console.log(data)
    return(<div className="my">
        <h1 >Home</h1>
        {
            isLoading&&(<h1>loading...</h1>)
        },

    <div >
          <div className="d-flex flex-wrap">
              {
                  !isLoading&&(data.map((d)=>{
                      return(<div className="my">
                          <div className="card" style={{width: "18rem"}}>
                          <img src={d.HospitalImage} class="card-img-top" alt="..."/>
                    
                    
                            <div class="card-body">
                     <p class="card-text">NAME:{d.HospitalName}</p>
                     <p class="card-text">LOCATION:{d.HospitalArea}</p>
                     <p class="card-text">Beds::{d.beds.length}</p>
                     <Link to={`detail/${d.id}`}>Details</Link>
                     </div>
                  </div>
                  </div>
                      )
                  }))
              }
              </div>
              </div>
    </div>)
}
export default Home;
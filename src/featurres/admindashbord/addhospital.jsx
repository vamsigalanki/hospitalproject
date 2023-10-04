import React, { useState } from "react";
import { Formik } from 'formik';
import { bedTypes } from "../../const";
import { useAddHospitalMutation} from "../../service/hospital";
function Addhospital(){
 var [addedbedtype,setAddedBedType]=React.useState([]);
 var [newbed,setNewbed]=useState({
  bedType:"",
  price:""
 })
 var[Addhospital]=useAddHospitalMutation();
 function addbedType(){
    setAddedBedType([...addedbedtype,newbed])
  }
    return(<div><h1>Add Hospital</h1>
    <Formik
      initialValues={{ HospitalName: '',
       HospitalImage: '',
       HospitalArea:"",
       reviews:[],
       bedTypes:[],
       beds:[]
     }}
      onSubmit={(Values)=>{
        Values.bedTypes=[...addedbedtype];
        Addhospital(Values).then((r)=>{
           console.log(r);
         })
      }}
      >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="HospitalName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.HospitalName}
            placeholder="Enter Hospital"
          />
          <br></br>
          <input
            type="text"
            name="HospitalImage"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.HospitalImage}
            placeholder="enter image"
          />
          <br></br>
          <input
            type="text"
            name="HospitalArea"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.HospitalArea}
            placeholder="enter the area"
          />
          <br></br>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Bed Type
</button>
<br></br>
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <lable htmlFor="">select bed type</lable>
        <select onChange={(e)=>{setNewbed({...newbed,bedType:e.target.value})}}>
          <option value={null} disabled selected>piease slect</option>
          {
            bedTypes.map((bedtypes)=>{
              return <option value={bedtypes}>{bedtypes}</option>
            })
          }
        </select>
        <br></br>
        <lable>PRICE:</lable>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input type="text" onChange={(e)=>{setNewbed({...newbed,price:e.target.value})}}></input>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"  onClick={()=>{addbedType(values)}}>submit</button>
      </div>
    </div>
  </div>
</div>
<button type="submit">
            Submit
          </button>
        </form>
      )}
    </Formik>
    </div>)

}
export default Addhospital;
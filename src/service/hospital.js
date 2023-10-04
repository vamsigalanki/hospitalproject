// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const hospitalApi = createApi({
  reducerPath: 'hospitalApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/hospitals/' }),
  endpoints:(builder)=>({
    getallHospital:builder.query({
      query:()=>``
    }),
    getHospitalid:builder.query({
      query:(id)=>`${id}`
    }),
    addHospital: builder.mutation({
      query: (newhsop) =>{
        return{
          url:``,
          method:'POST',
          body:newhsop
        }
      }
    }),
    edithospital: builder.mutation({
      query: (editedhosp) =>{
        return{
          url:`${editedhosp.id}`,
          method:'PUT',
          body:editedhosp
        }
      }
    }),
    
  })
})
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetallHospitalQuery,
  useAddHospitalMutation,
  useEdithospitalMutation,
  useGetHospitalidQuery,
  useLazyGetHospitalidQuery,
} = hospitalApi;
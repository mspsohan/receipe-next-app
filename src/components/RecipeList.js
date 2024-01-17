"use client"

import { Delete, EditOutlined } from "@mui/icons-material";
import Link from "next/link";
import Swal from "sweetalert2";
import { getAllReceipe } from "@/utils/getAllReceipe";
import RecipeEdit from "./RecipeEdit";
import axios from "axios";
import RecipeForm from "./RecipeForm";
import { useState } from "react";

const RecipeList = () => {
   const [search, setSearch] = useState('');

   const { data: receipes, handleRefresh } = getAllReceipe();

   const searchLowerCase = search.toLowerCase();

   const filterData = receipes?.filter(item => item.title.toLowerCase().includes(searchLowerCase));

   const handleDelete = (id) => {
      Swal.fire({
         title: "Are you sure?",
         text: "Your Receipe Will Be Deleted!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Delete Receipe"
      }).then(async (result) => {
         if (result.isConfirmed) {
            try {
               await axios.delete(`https://receipe-server.vercel.app/receipe/${id}`)
               Swal.fire({
                  title: "Deleted!",
                  text: "Delete Receipe Successfull",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 1000
               });
               handleRefresh()
            } catch (error) {
               alert(error)
            }
         }
      });
   }

   if (!receipes) {
      return <div className="flex justify-center items-center h-[50vh]">Loading........</div>
   }

   return (
      <>
         <RecipeForm setSearch={setSearch} />
         <div className="my-10">
            <h2 className="text-2xl border-b-2">Recipe List</h2>
         </div>
         <div className="p-6 container max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
               {
                  filterData?.map(receipe => (
                     <div key={receipe?._id} className="overflow-hidden rounded-2xl bg-gray-50">
                        <div className="flex items-center h-[250px] overflow-hidden">
                           <img src={receipe?.image} alt={receipe?.title} className="object-cover" />
                        </div>

                        <div className="p-6">
                           <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
                              <div className="h-12">
                                 <h2 className="mt-2 text-lg font-semibold text-gray-800">{receipe.title.slice(0, 90)}...</h2>
                              </div>
                           </div>
                           <hr className="mt-4 mb-4" />
                           <div className="flex flex-wrap justify-between">
                              <Link href={`/receipe/${receipe?._id}`} className="bg-blue-400 py-1 px-3 rounded-2xl hover:bg-blue-700 flex items-center">View Details</Link>
                              <div className="space-x-5 flex items-center">
                                 <RecipeEdit receipe={receipe}>
                                    <button className="bg-yellow-400 p-3 hover:bg-yellow-600 rounded-lg"><EditOutlined /></button>
                                 </RecipeEdit>
                                 <button onClick={() => handleDelete(receipe?._id)} className="bg-red-400 p-3 hover:bg-red-700 rounded-lg"><Delete /></button>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))
               }
            </div>
         </div>
      </>
   );
};
export default RecipeList;
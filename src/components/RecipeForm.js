"use client"
import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import ingredients from '../../ingredients.json';
import { TextField, Autocomplete, Chip, InputBase } from "@mui/material";
import axios from 'axios';
import Swal from 'sweetalert2';
import { getAllReceipe } from '@/utils/getAllReceipe';
import { Search } from '@mui/icons-material';

export default function RecipeForm({ setSearch }) {
   const [isOpen, setIsOpen] = useState(false);
   const [title, setTitle] = useState("")
   const [selectedIngredients, setSelectedIngredients] = useState([]);
   const [instruction, setInstruction] = useState("")
   const [image, setImage] = useState("")

   function closeModal() {
      setIsOpen(false);
   }

   function openModal() {
      setIsOpen(true);
   }

   const { handleRefresh } = getAllReceipe()

   const handleSubmit = async () => {
      if (!title || !selectedIngredients || !instruction || !image) {
         Swal.fire("Filed All the Input Field")
         return
      }
      const receipeData = { title, ingredient: selectedIngredients, instruction, image };
      try {
         const { data } = await axios.post("https://receipe-server.vercel.app/receipe", receipeData)
         Swal.fire({
            position: "center",
            icon: "success",
            title: "Receipe Added Successfully",
            showConfirmButton: false,
            timer: 1500
         });
         closeModal()
         setTitle("")
         setSelectedIngredients([])
         setInstruction("")
         setImage("")
         handleRefresh()
         if (data) {
            handleRefresh()
         }
      } catch (error) {
         Swal.fire(error)
      }
   };

   const handleSearch = (e) => {
      setSearch(e.target.value)
   }

   return (
      <>
         <div className="flex justify-between max-w-[1440px] mx-auto w-full">
            <button onClick={openModal} type="button" className="p-2 w-60 bg-yellow-400 text-black text-xl mt-10 rounded-2xl hover:bg-white">Create a Receipe</button>
            <div className='mt-10 relative'>
               <input
                  onChange={handleSearch}
                  type="text"
                  placeholder='Search Here by Title'
                  className='py-2 px-4 w-80 rounded-2xl relative text-black outline-none'
               />
               <button className='absolute top-0 bg-blue-500 rounded-r-2xl right-0 py-2 px-4 hover:bg-blue-700'><Search /></button>
            </div>
         </div>
         <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
               <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
               >
                  <div className="fixed inset-0 bg-black/25" />
               </Transition.Child>

               <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                     <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                     >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                           <Dialog.Title as="h3" className="text-3xl text-center mb-10 font-medium leading-6 text-gray-900">
                              Create A Receipe
                           </Dialog.Title>
                           <div className="mt-2">
                              <form className="w-full max-w-lg">
                                 <div className="flex flex-wrap -mx-3">
                                    <div className="w-full px-3 mb-6">
                                       <TextField
                                          sx={{ width: "100%" }}
                                          required
                                          onChange={(event) => setTitle(event.target.value)}
                                          id="outlined-required"
                                          label="Receipe Title"
                                       />
                                    </div>
                                    <div className="w-full px-3 mb-6">
                                       <Autocomplete
                                          multiple={true}
                                          required
                                          options={ingredients.map((item) => item.label)}
                                          onChange={(event, value) => setSelectedIngredients(value)}
                                          value={selectedIngredients}
                                          disableCloseOnSelect
                                          filterSelectedOptions
                                          sx={{ width: '100%' }}
                                          renderOption={(props, option) => {
                                             return (
                                                <li {...props} key={option}>
                                                   {option}
                                                </li>
                                             )
                                          }}
                                          renderTags={(ingredientValue, getIngredientProps) => {
                                             return ingredientValue.map((option, index) => (
                                                <Chip {...getIngredientProps({ index })} key={option} label={option} />
                                             ))
                                          }}
                                          renderInput={(params) => (
                                             <TextField
                                                {...params}
                                                label="Ingredients"
                                                placeholder="Ingredients"
                                             />
                                          )}
                                       />
                                    </div>
                                    <div className="w-full px-3 mb-6 ">
                                       <TextField
                                          sx={{ width: "100%" }}
                                          id="outlined-multiline-static"
                                          label="Receipe Instruction"
                                          onChange={(event) => setInstruction(event.target.value)}
                                          multiline
                                          required
                                          minRows={3}
                                       />
                                    </div>
                                    <div className="w-full px-3 mb-6 ">
                                       <TextField
                                          sx={{ width: "100%" }}
                                          onChange={(event) => setImage(event.target.value)}
                                          id="outlined-required"
                                          label="Receipe Image"
                                       />
                                    </div>
                                 </div>
                              </form>
                              <button onClick={handleSubmit} type="submit"
                                 className="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-400 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                                 Create Now
                              </button>
                           </div>
                        </Dialog.Panel>
                     </Transition.Child>
                  </div>
               </div >
            </Dialog >
         </Transition >
      </>
   )
}

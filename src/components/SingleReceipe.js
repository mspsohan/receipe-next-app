import Link from "next/link";

const SingleReceipe = ({ singleReceipe }) => {
   return (
      <div className="bg-gray-600">
         <div className="container mx-auto p-6">
            <div className="bg-white text-black p-6 rounded-lg shadow-lg">
               <h1 className="text-2xl font-bold mb-4 ">
                  {singleReceipe?.title}
               </h1>
               <img className="max-w-sm mx-auto my-4 rounded-lg shadow" src={singleReceipe?.image} alt="Chocolate Cake" />
               <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
               <ul className="list-disc list-inside mb-4">
                  {
                     singleReceipe?.ingredient?.map((item, index) => (
                        <li key={index} className="mb-2">{item}</li>
                     ))
                  }
               </ul>
               <h2 className="text-xl font-semibold mb-2">Instructions</h2>
               <p className="list-decimal list-inside mb-6">
                  {singleReceipe?.instruction}
               </p>
               <div className="text-center flex justify-end">
                  <Link href="/" className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">Go Home</Link>
               </div>
            </div>
         </div>
      </div>
   );
};
export default SingleReceipe;
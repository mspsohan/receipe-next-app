import SingleReceipe from "@/components/SingleReceipe";

const ReceipeDetails = async ({ params }) => {
   const response = await fetch(`https://receipe-server.vercel.app/receipe`, {
      cache: "no-store"
   })
   const data = await response.json()
   const singleReceipe = data.find(receipe => receipe?._id === params.id)
   return (
      <div>
         <SingleReceipe singleReceipe={singleReceipe} />
      </div>
   );
};
export default ReceipeDetails;
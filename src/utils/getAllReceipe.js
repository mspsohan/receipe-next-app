"use client";
import useSWR, { mutate } from "swr";

const fetcher = async (url) => {
   const res = await fetch(url, { cache: "no-store" });
   return res.json();
};

export const getAllReceipe = (search) => {
   const { data, error, isLoading, revalidate } = useSWR(
      `https://receipe-server.vercel.app/receipe?search=${search}`,
      fetcher,
      {
         revalidateOnFocus: false,
      }
   );

   const handleRefresh = () => {
      revalidate();
   };

   if (error) return <div>Error loading data</div>;
   if (!data) return <div>Loading...</div>;

   return { data, handleRefresh, isLoading };
};

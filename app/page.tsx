// "use client";
// import { useQuery } from "@tanstack/react-query";
// import React, { useEffect, useState } from "react";

// const Home = () => {
//   const [streamedData, setStreamedData] = useState("");

//   const { data, isLoading, error } = useQuery({
//     queryKey: ["ai-reponse"],
//     queryFn: async () => {
//       const response = await fetch("/api/chat");

//       if (!response.ok) {
//         throw new Error("Failed to fetch streamed data");
//       }

//       const reader = response.body?.getReader();
//       const decoder = new TextDecoder();

//       if (!reader) {
//         throw new Error("No reader available");
//       }

//       // Process the streamed data
//       while (true) {
//         const { done, value } = await reader.read();
//         if (done) break;

//         const chunk = decoder.decode(value, { stream: true });
//         setStreamedData((prev) => prev + chunk); // Update state with each chunk
//       }

//       return true;
//     },
//   });

//   return (
//     <div>
//       <p>{isLoading}</p>
//       {streamedData}
//     </div>
//   );
// };

// export default Home;
import React from "react";

const Home = () => {
  return <div>Home</div>;
};

export default Home;

"use client";
import React, { FormEvent, useState } from "react";
import { ArrowRight, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AuthenticationPage() {
  interface User {
    password: string;
    username: string;
  }
  const [user, setUser] = useState<User>({
    password: "admin",
    username: "admin",
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false); // New loading state

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("loginnnnn");
      setIsLoading(true);

      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        console.log("Login successful");
        router.push("/");
      } else {
        console.error("Server error:", response.statusText);
        setError("Server error. Please try again later.");
      }
    } catch (error) {
      console.error("Network error:", error);
      setError("Network error. Please check your internet connection.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="md:hidden"></div>
      <div className="container relative hidden h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Dashboard
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This website was crafted using the powerful combination
                of Next.js for efficient server-side rendering and routing,
                Chart.js for stunning data visualization, and Shad UI for
                creating beautiful and responsive user interfaces. Together,
                these cutting-edge technologies ensure a seamless and visually
                appealing browsing experience..&rdquo;
              </p>
              <footer className="text-right text-sm pr-4">~Yash Gharat</footer>
            </blockquote>
          </div>
        </div>
        <Card className="mx-auto bg-zinc-900 text-white flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <CardHeader>
            <CardTitle>Sign in to your account</CardTitle>
          </CardHeader>

          <CardContent>
            <form className="mt-8 ">
              <div className="space-y-5">
                <div>
                  <label htmlFor="" className="text-base font-medium">
                    {" "}
                    Username{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      value={user.username}
                      disabled
                    ></input>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="" className="text-base font-medium ">
                      {" "}
                      Password{" "}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      value={user.password}
                      disabled
                    ></input>
                  </div>
                </div>
                <div>
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full bg-white text-black"
                  >
                    {isLoading ? "Loading..." : "Get started"}{" "}
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        {/* </div> */}
        {/* </div> */}
      </div>
    </>
  );
}

// "use client";
// import React, { FormEvent, useState } from "react";
// import { ArrowRight, User } from "lucide-react";
// import { useRouter } from "next/navigation";

// interface User {
//   password: string;
//   username: string;
// }

// export default function AuthPage() {
//   const [user, setUser] = useState<User>({
//     password: "admin",
//     username: "admin",
//   });
//   const [error, setError] = useState<string>("");
//   const [isLoading, setIsLoading] = useState<boolean>(false); // New loading state

//   const router = useRouter();

//   const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       console.log("loginnnnn");
//       setIsLoading(true);

//       const response = await fetch("/api/admin/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(user),
//       });

//       if (response.ok) {
//         console.log("Login successful");
//         router.push("/");
//       } else {
//         console.error("Server error:", response.statusText);
//         setError("Server error. Please try again later.");
//       }
//     } catch (error) {
//       console.error("Network error:", error);
//       setError("Network error. Please check your internet connection.");
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   return (
//     <section className="flex min-h-screen flex-col items-center justify-between p-24">
//       <div className="flex border border-black rounded-3xl items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
//         <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
//           <h2 className="text-center text-2xl font-bold leading-tight text-black">
//             Sign in to your account
//           </h2>

//           <form className="mt-8 ">
//             <div className="space-y-5">
//               <div>
//                 <label
//                   htmlFor=""
//                   className="text-base font-medium text-gray-900"
//                 >
//                   {" "}
//                   Username{" "}
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
//                     type="email"
//                     placeholder="Email"
//                     value={user.username}
//                     disabled
//                   ></input>
//                 </div>
//               </div>
//               <div>
//                 <div className="flex items-center justify-between">
//                   <label
//                     htmlFor=""
//                     className="text-base font-medium text-gray-900"
//                   >
//                     {" "}
//                     Password{" "}
//                   </label>
//                 </div>
//                 <div className="mt-2">
//                   <input
//                     className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
//                     type="password"
//                     placeholder="Password"
//                     value={user.password}
//                     disabled
//                   ></input>
//                 </div>
//               </div>
//               <div>
//                 <button
//                   type="button"
//                   onClick={handleSubmit}
//                   className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
//                 >
//                   {isLoading ? "Loading..." : "Get started"}{" "}
//                   <ArrowRight className="ml-2" size={16} />
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }

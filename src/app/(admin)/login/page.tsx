"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "../../globals.css"; 
export default function LoginPage() {

  const router = useRouter();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  async function handleSubmit(e:any) {

    e.preventDefault();

    const res = await signIn("credentials",{
      email,
      password,
      redirect:false
    });

    if(!res?.error){
      router.push("/admin");
    }

  }

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl w-80 space-y-4"
      >

        <h2 className="text-xl font-semibold text-center">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button className="w-full bg-red-500 text-white py-2 rounded">
          Login
        </button>

      </form>

    </div>
  );
}
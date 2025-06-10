import { getServerAuthSession } from "@/utils/auth";
import Link from "next/link";
import { redirect } from "next/navigation";


export  default async function HomePage() {
    const session = await getServerAuthSession();
  
  
    if(!session) {
      redirect("/login")
    } 
    redirect("/dashboard/admin/profile")
}

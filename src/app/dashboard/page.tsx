"use client";

import { DashboardLayout } from "@/components/dashboard-layout"
import { useUser } from "@clerk/nextjs";

export default function Dashboard() {

  const user = useUser().user;

  console.log("User in Dashboard:", user);
  

  return <DashboardLayout />
}

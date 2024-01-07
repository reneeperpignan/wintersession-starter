"use client";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { redirect } from "next/navigation";
import { useAuthContext } from "../(context)/auth-context";
import MyOrgs from "./my-orgs";

export default function Dashboard() {
  const { user } = useAuthContext();

  if (!user) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/");
  }

  if (user === "loading") {
    return <TypographyP>Loading...</TypographyP>;
  }

  return (
    <div>
      <TypographyH1>Your Organizations and Clubs</TypographyH1>
      <MyOrgs
        userid={user.uid}
        username={user.displayName}
        email={user.email}
        //all things we don't need rn
        displayName={null}
        phoneNumber={null}
        photoURL={null}
        providerId=""
        uid=""
      />
    </div>
  );
}

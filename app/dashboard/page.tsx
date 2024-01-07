"use client";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { redirect } from "next/navigation";
import { useAuthContext } from "../(context)/auth-context";
import AddOrgDialog from "./orgs/add-org-dialog";
import RenderOrgs from "./orgs/render-orgs";

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
    <>
      <div className="justify-content flex items-center">
        <TypographyH1 className="ml-1 mr-1 flex-auto">Organizations and Clubs at Harvard</TypographyH1>
        <AddOrgDialog />
      </div>
      {user.email && (
        <TypographyP>
          This is a protected route accessible only to signed-in users. {`Your email is ${user.email}`}
        </TypographyP>
      )}

      <RenderOrgs
        userid={user.uid}
        username={user.displayName}
        email={user.email} //all things we don't need rn
        displayName={null}
        phoneNumber={null}
        photoURL={null}
        providerId=""
        uid=""
      />
    </>
  );
}

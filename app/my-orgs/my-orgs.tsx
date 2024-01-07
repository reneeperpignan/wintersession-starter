"use client";
import { TypographyP } from "@/components/ui/typography";
import { db } from "@/lib/firebase/firestore";
import { type Orgs } from "@/lib/firebase/schema";
import { type UserInfo } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "../(context)/auth-context";
import OrgCardMyOrgs from "./org-card-my-orgs";

export default function MyOrgs(userid: UserInfo) {
  const { user } = useAuthContext();
  console.log("!user: ", userid);
  console.log("userid", userid.uid);
  // console.log("uid", userid.uid); this is undefined

  console.log("userName", userid.username);
  console.log("email", userid.email);
  //here
  const [orgData, setOrgData] = useState<Orgs[]>([]);

  useEffect(() => {
    const q = query(collection(db, "organizations"), where("members", "array-contains", userid.uid));

    const unsub = onSnapshot(q, (snapshot) => {
      const orgList: Orgs[] = snapshot.docs.map(
        (doc): Orgs =>
          ({
            ...doc.data(),
            id: doc.id,
          }) as Orgs,
      );
      setOrgData(orgList);
    });
    return unsub;
  }, [userid]);

  if (!user) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/");
  }

  if (user === "loading") {
    return <TypographyP>Loading...</TypographyP>;
  }

  return (
    <div>
      <div> {userid.username && <TypographyP>{`Name: ${userid.username}`}</TypographyP>}</div>
      <div>{user.email && <TypographyP>{`Email: ${user.email}`}</TypographyP>}</div>
      <div className="flex w-screen flex-wrap items-center justify-center">
        {orgData.map((organization: Orgs) => (
          <div key={organization.id}>
            <OrgCardMyOrgs organization={organization} user={userid} />
          </div>
        ))}
      </div>
    </div>
  );
}

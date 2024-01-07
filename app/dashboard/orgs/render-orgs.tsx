"use client";
import { db } from "@/lib/firebase/firestore";
import { type Orgs } from "@/lib/firebase/schema";
import { type UserInfo } from "firebase/auth";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import OrgCard from "./org-card";

export default function RenderOrgs(uid: UserInfo) {
  const [orgData, setOrgData] = useState<Orgs[]>([]);

  console.log("user is renfer orgs", uid);
  // const { profile } = useAuthContext();

  useEffect(() => {
    const q = query(collection(db, "organizations"));

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
  }, []);

  return (
    <div className="flex h-screen w-screen flex-wrap items-center justify-center">
      {orgData.map((organization: Orgs) => (
        <div key={organization.id}>
          <OrgCard orgid={organization.id} uid={uid.uid} organization={organization} />
        </div>
      ))}
    </div>
  );
}

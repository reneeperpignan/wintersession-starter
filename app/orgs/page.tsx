"use client";
import { db } from "@/lib/firebase/firestore";
import { type Orgs } from "@/lib/firebase/schema";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import OrgCard from "./org-card";

async function getOrgFromFirestore() {
  const querySnapshot = await getDocs(collection(db, "organizations"));

  const data: [] = [];

  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}

async function getProfileFromFirestore() {
  const querySnapshot = await getDocs(collection(db, "profiles"));

  const data: [] = [];

  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}

export default function Page() {
  const [orgData, setOrgData] = useState([]);
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const orggdata = await getOrgFromFirestore();
      const proffdata = await getProfileFromFirestore();

      setOrgData(orggdata);
      setProfileData(proffdata);
    }
    fetchData();
  }, []);

  console.log(orgData);
  console.log(profileData);

  return (
    <div className="flex h-screen w-screen flex-wrap items-center justify-center">
      {orgData.map((organization: Orgs) => (
        <div>
          <OrgCard key={organization.id} id={organization.id} organization={organization} />
        </div>
      ))}
    </div>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { db } from "@/lib/firebase/firestore";
import { type Orgs } from "@/lib/firebase/schema";
import { type UserInfo } from "firebase/auth";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import OrgDetailsDialog from "./org-details-dialog";

interface OrgCardProps {
  organization: Orgs;
  user: UserInfo;
  orgid: string;
}
export default function OrgCard({ organization, user, orgid }: OrgCardProps) {
  // const { user, profile } = useAuthContext();
  // console.log(profile);
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleJoin = async () => {
    // e.preventDefault();

    const docRef = doc(db, "organizations", orgid);

    await updateDoc(docRef, {
      members: arrayUnion(user.userid),
    });

    toast({
      title: "Success!",
      description: `You joined ${organization.name}`,
    });
  };

  return (
    <div className="m-4 w-72 min-w-72 flex-none rounded border-2 p-3 shadow">
      <div className="flex h-full flex-col justify-between">
        <Card>
          <CardHeader>
            <CardTitle>
              <h3 className="mt-3 text-2xl font-semibold">{organization.name}</h3>
            </CardTitle>
            <CardDescription>
              <p>{organization.description ? organization.description.slice(0, 150).trim() + "..." : ""}</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h4 className="text-lg font-light italic">Type: {organization.type} </h4>
            <h4 className="text-lg font-light italic">Comp Type: {organization.comptype} </h4>
            <h4 className="text-lg font-light italic">
              Meeting Time: {organization.meetingday}, {organization.meetingtime}{" "}
            </h4>
          </CardContent>
          <CardFooter>
            <div className="flex">
              <Button className="ml-1 mr-1 flex-auto" onClick={openDialog}>
                Learn More
              </Button>
              <Button className="ml-1 mr-1 flex-auto" onClick={() => void handleJoin()}>
                Join
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      {isDialogOpen && <OrgDetailsDialog id={organization.id} organization={organization} onClose={closeDialog} />}
    </div>
  );
}

"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { db } from "@/lib/firebase/firestore";
import { type Orgs } from "@/lib/firebase/schema";
import { type UserInfo } from "firebase/auth";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import MyOrgDetailsDialog from "./my-org-detail-dialog";

interface OrgCardMyOrgsProps {
  organization: Orgs;
  user: UserInfo;
}
export default function OrgCardMyOrgs({ organization, user }: OrgCardMyOrgsProps) {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleLeave = async () => {
    const docRef = doc(db, "organizations", organization.id);

    await updateDoc(docRef, {
      members: arrayRemove(user.uid),
    });

    toast({
      title: "Success!",
      description: `You left ${organization.name}`,
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
            <div className="flex justify-evenly">
              <Button className="ml-1 mr-1 flex-auto" onClick={openDialog}>
                Learn More
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button type="button" className="ml-1 mr-1 flex-auto" variant="destructive">
                    Leave
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>You really want to leave?</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => void handleLeave()}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardFooter>
        </Card>
      </div>

      {isDialogOpen && <MyOrgDetailsDialog organization={organization} onClose={closeDialog} />}
    </div>
  );
}

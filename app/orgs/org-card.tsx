"use client";
import { useAuthContext } from "@/app/(context)/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import OrgDetailsDialog from "./org-details-dialog";

export default function OrgCard({ id, organization }) {
  const { user, profile } = useAuthContext();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
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
            <p>Card Content</p>
            {/* deal with author stuff later */}
            <h4 className="text-lg font-light italic">{organization.id}</h4>

            <h4 className="text-lg font-light italic">{profile.display_name}</h4>
          </CardContent>
          <CardFooter>
            <div className="flex justify-evenly">
              <Button className="mt-3 w-full" onClick={openDialog}>
                Learn More
              </Button>
              <Button className="mt-3 w-full">Join </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      {isDialogOpen && (
        <OrgDetailsDialog id={organization.id} organization={organization} userId={user.id} onClose={closeDialog} />
      )}
    </div>
  );
}

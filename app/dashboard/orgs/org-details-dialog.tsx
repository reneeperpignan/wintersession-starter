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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { db } from "@/lib/firebase/firestore";
import { type Orgs } from "@/lib/firebase/schema";
import { deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState, type SyntheticEvent } from "react";
import EditOrganization from "./edit-org-dialog";

interface OrgDetailsProps {
  id: string;
  organization: Orgs;
  onClose: () => void;
}

export default function OrgDetailsDialog({ id, organization, onClose }: OrgDetailsProps) {
  const { toast } = useToast();

  const router = useRouter();

  const handleDelete = async (id: string, e: SyntheticEvent) => {
    e.preventDefault();
    const decRef = doc(db, "organizations", id);
    await deleteDoc(decRef);

    router.refresh();

    onClose();

    toast({
      title: "Success!",
      description: `${organization.name} was deleted.`,
    });
  };

  //handle editing
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
        {/* <DialogTitle>{species ? species.common_name : ""}</DialogTitle> */}
        <div>
          <h1 className="mt-3 text-2xl font-semibold">Name: {organization ? organization.name : ""}</h1>

          <p>{organization ? (organization.description ? organization.description : "") : ""}</p>
          <h4 className="text-lg font-light italic">
            Meeting Time: {organization ? organization.meetingday : ""}, {organization ? organization.meetingtime : ""}
          </h4>
          <p> Type: {organization ? (organization.type ? organization.type : "") : ""}</p>
          <p>Comp Type: {organization ? (organization.comptype ? organization.comptype : "") : ""}</p>
        </div>
        <div className="flex">
          <Button
            type="submit"
            className="ml-1 mr-1 flex-auto"
            onClick={handleEditClick}
            // disabled={!isCurrentUser}
          >
            Edit
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                className="ml-1 mr-1 flex-auto"
                variant="destructive"

                // disabled={!isCurrentUser}
              >
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove your data from our
                  servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e: SyntheticEvent) => {
                    void (async () => {
                      await handleDelete(id, e);
                    })();
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button type="button" className="ml-1 mr-1 flex-auto" variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>

      {/* Render the EditSpecies component when editing is enabled */}
      {isEditing && <EditOrganization id={id} organization={organization} onClose={() => setIsEditing(false)} />}
    </Dialog>
  );
}

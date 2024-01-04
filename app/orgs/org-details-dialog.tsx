"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { db } from "@/lib/firebase/firestore";
import { deleteDoc, doc } from "firebase/firestore";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EditOrganization from "./edit-org-dialog";

export default function OrgDetailsDialog({ id, organization, userId, onClose }) {
  const router = useRouter();

  const handleDelete = async (id, e) => {
    e.preventDefault();
    const decRef = doc(db, "organizations", id);
    await deleteDoc(decRef);

    router.refresh();

    onClose();

    // showAlert('error', 'Org with id ${id} deleted successfully')
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
          <h3 className="mt-3 text-2xl font-semibold">{organization ? organization.name : ""}</h3>
          {/* <h4 className="text-lg font-light italic">{species ? species.scientific_name : ""}</h4> */}
          <p>{organization ? (organization.description ? organization.description : "") : ""}</p>
          {/* <p>Population: {species ? (species.total_population ? species.total_population : "") : ""}</p> */}
          {/* <p>
            <GetAuthor author={species ? species.author : ""} profiles={profiles} />
          </p> */}
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
          <Button
            type="button"
            className="ml-1 mr-1 flex-auto"
            variant="destructive"
            onClick={(e) => handleDelete(id, e)}
            // disabled={!isCurrentUser}
          >
            Delete
          </Button>
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

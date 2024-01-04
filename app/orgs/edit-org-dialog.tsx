"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { db } from "@/lib/firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";

export default function EditOrganization({ id, organization, onClose }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = async (id) => {
    const docRef = doc(db, "organizations", id);

    console.log(docRef);
    console.log(id);

    const data = {
      name: name,
    };

    console.log("set name to ", name);

    await updateDoc(docRef, data)
      .then((docRef) => {
        console.log("Value of an Existing Document Field has been updated");
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("onsubmit");

    onClose();

    // showAlert('error', 'Org with id ${id} deleted successfully')
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogHeader>
        <DialogTitle>Edit {organization ? organization.name : ""}</DialogTitle>
      </DialogHeader>
      <DialogContent>
        <p>Edit box</p>
        <input type="text" placeholder={organization.name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder={organization.description} onChange={(e) => setDescription(e.target.value)} />
        <div className="flex">
          <Button type="button" className="ml-1 mr-1 flex-auto" onClick={() => void onSubmit(id)}>
            Update
          </Button>
          <Button type="button" className="ml-1 mr-1 flex-auto" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

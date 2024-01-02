"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/lib/firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";

async function addDatatoFirestore(name: string, username: string, description: string) {
  try {
    const docRef = await addDoc(collection(db, "organizations"), {
      name: name,
      username: username,
      description: description,
    });
    console.log("Document written with ID: ", docRef.id);
    return true;
  } catch (error) {
    console.error("Error adding document ", error);
    return false;
  }
}

export default function AddOrgDialog() {
  // State variables to store form input values
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();
  //Handler fxn
  const addOrgHandler = async (e) => {
    console.log("hello");
    e.preventDefault();
    const added = await addDatatoFirestore(name, username, description);
    if (added) {
      setName("");
      setUsername("");
      setDescription("");

      alert("Data added to firestore DB!");
    }

    const newOrg = {
      name: "",
      description: "",
      createdAt: new Date(),
    };

    console.log(newOrg);

    router.push("/dashboard");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Organization</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add an org</DialogTitle>
          <DialogDescription>Add information about your club. Click save to add it to the catalog.</DialogDescription>
        </DialogHeader>

        <form onSubmit={addOrgHandler}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                placeholder="Tech For Social Good"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Description
              </Label>
              <Input
                id="username"
                placeholder="Work with clients to create tech for social impact"
                className="col-span-3"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Description
              </Label>
              <Input
                type="text"
                id="description"
                placeholder="Work with clients to create tech for social impact"
                className="col-span-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Add organization</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

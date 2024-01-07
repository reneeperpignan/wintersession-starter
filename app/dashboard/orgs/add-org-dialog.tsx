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
import { useToast } from "@/components/ui/use-toast";
import { db } from "@/lib/firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import { useState, type SyntheticEvent } from "react";

async function addDatatoFirestore(
  name: string,
  description: string,
  members: string[],
  type: string,
  comptype: string,
  meetingday: string,
  meetingtime: string,
) {
  try {
    const docRef = await addDoc(collection(db, "organizations"), {
      name: name,
      description: description,
      members: members,
      type: type,
      comptype: comptype,
      meetingday: meetingday,
      meetingtime: meetingtime,
    });
    console.log("Document written with ID: ", docRef.id);
    return true;
  } catch (error) {
    console.error("Error adding document ", error);
    return false;
  }
}

export default function AddOrgDialog() {
  const { toast } = useToast();

  // State variables to store form input values
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  const [type, setType] = useState("");
  const [comptype, setComptype] = useState("");
  const [meetingday, setMeetingday] = useState("");
  const [meetingtime, setMeetingtime] = useState("");

  //Handler fxn
  const addOrgHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    const added = await addDatatoFirestore(name, description, members, type, comptype, meetingday, meetingtime);
    if (added) {
      setName("");
      setDescription("");
      setMembers([]);
      setType("");
      setComptype("");
      setMeetingday("");
      setMeetingtime("");

      toast({
        title: "Success!",
        description: `${name} was added.`,
      });
    }
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

        <form onSubmit={(e: SyntheticEvent) => void addOrgHandler(e)}>
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
                type="text"
                id="description"
                placeholder="Work with clients to create tech for social impact"
                className="col-span-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type of Org
              </Label>
              <Input
                type="text"
                id="type"
                placeholder="Pre-professional, Music, etc."
                className="col-span-3"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="comptype" className="text-right">
                Type of Comp:
              </Label>
              <Input
                type="text"
                id="comptype"
                placeholder="Competitive, Completion, etc."
                className="col-span-3"
                value={comptype}
                onChange={(e) => setComptype(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="meetingday" className="text-right">
                Meeting Day:
              </Label>
              <Input
                type="text"
                id="meetingday"
                placeholder="Monday, Tuesday, etc."
                className="col-span-3"
                value={meetingday}
                onChange={(e) => setMeetingday(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="meetingday" className="text-right">
                Meeting Time:
              </Label>
              <Input
                type="text"
                id="meetingtime"
                placeholder="7:30, 2:00, etc."
                className="col-span-3"
                value={meetingtime}
                onChange={(e) => setMeetingtime(e.target.value)}
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

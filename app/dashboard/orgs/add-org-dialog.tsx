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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  //dropdown
  const [position, setPosition] = useState("bottom");

  const { toast } = useToast();

  // State variables to store form input values
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  const [type, setType] = useState("Type");
  const [comptype, setComptype] = useState("");
  const [meetingday, setMeetingday] = useState("");
  const [meetingtime, setMeetingtime] = useState("");

  //Handler fxn
  const addOrgHandler = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (name == "") {
      toast({
        title: "Bruh.",
        description: `You must have a name. `,
      });
      return;
    }

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

  const handleReset = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("clear");

    setName("");
    setDescription("");
    setMembers([]);
    setType("");
    setComptype("");
    setMeetingday("");
    setMeetingtime("");

    toast({
      title: "Data reset",
    });
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
                Type
              </Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="col-span-3">
                  <Button variant="outline">{type}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Choose the type</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                    <DropdownMenuRadioItem value="pre-professional" onClick={() => setType("Pre-professional")}>
                      Pre-Professional
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="music" onClick={() => setType("Music")}>
                      Music
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="sports" onClick={() => setType("Sports")}>
                      Sports
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="other" onClick={() => setType("Other")}>
                      Other
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="comptype" className="text-right">
                Comp Type
              </Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="col-span-3">
                  <Button variant="outline">{comptype}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Choose the comp type</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                    <DropdownMenuRadioItem value="Competitive" onClick={() => setComptype("Competitive")}>
                      Competitive{" "}
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="completion" onClick={() => setComptype("Completion")}>
                      Completion
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="none" onClick={() => setComptype("None")}>
                      None
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="meetingday" className="text-right">
                Meeting Day
              </Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="col-span-3">
                  <Button variant="outline">{meetingday}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Choose a day</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                    <DropdownMenuRadioItem value="sun" onClick={() => setMeetingday("Sunday")}>
                      Sunday{" "}
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="mon" onClick={() => setMeetingday("Monday")}>
                      Monday
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="tues" onClick={() => setMeetingday("Tuesday")}>
                      Tuesday
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="wed" onClick={() => setMeetingday("Wednesday")}>
                      Wednesday
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="thu" onClick={() => setMeetingday("Thursday")}>
                      Thursday
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="fri" onClick={() => setMeetingday("Friday")}>
                      Friday
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="sat" onClick={() => setMeetingday("Saturday")}>
                      Saturday
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="tbd" onClick={() => setMeetingday("Tbd")}>
                      Tbd
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="meetingtime" className="text-right">
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
            {/* stretch goal??? */}
            <DialogTrigger>
              <Button type="button" onClick={(e) => void handleReset(e)}>
                Clear
              </Button>
            </DialogTrigger>

            <DialogClose asChild>
              <Button type="submit">Add organization</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

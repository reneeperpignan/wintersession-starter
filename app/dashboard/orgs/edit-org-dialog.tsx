import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { db } from "@/lib/firebase/firestore";
import { type Orgs } from "@/lib/firebase/schema";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";

interface EditProps {
  id: string;
  organization: Orgs;
  onClose: () => void;
}

export default function EditOrganization({ id, organization, onClose }: EditProps) {
  //dropdwons
  const [position, setPosition] = useState("bottom");

  const { toast } = useToast();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [comptype, setComptype] = useState("");
  const [meetingday, setMeetingday] = useState("");
  const [meetingtime, setMeetingtime] = useState("");

  //more intuitive way:
  // const [open, setOpen] = useState(true);

  const onSubmit = async () => {
    const docRef = doc(db, "organizations", id);

    console.log(docRef);
    console.log(id);

    const orgdata = {
      name: name ? name : organization.name,
      description: description ? description : organization.description,
      type: type ? type : organization.type,
      comptype: comptype ? comptype : organization.comptype,
      meetingday: meetingday ? meetingday : organization.meetingday,
      meetingtime: meetingtime ? meetingtime : organization.meetingtime,
    };

    await updateDoc(docRef, orgdata)
      .then(() => {
        console.log("Value of an Existing Document Field has been updated");
      })
      .catch((error) => {
        console.log(error);
      });

    onClose();

    toast({
      title: "Success!",
      description: `${organization.name} was edited.`,
    });

    // showAlert('error', 'Org with id ${id} deleted successfully')
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogHeader>
        <DialogTitle>Edit {organization ? organization.name : ""}</DialogTitle>
      </DialogHeader>
      <DialogContent className="sm:max-w-[425px]">
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Name:
            </Label>

            <Input
              className="col-span-3"
              type="text"
              id="name"
              placeholder={organization.name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-left">
              Description:
            </Label>
            <Input
              className="col-span-3"
              type="text"
              id="description"
              placeholder={organization.description}
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
                    Competitive
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
                    Sunday
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
            <Label htmlFor="meetingtime" className="text-left">
              Meeting Time:
            </Label>
            <Input
              className="col-span-3"
              type="text"
              id="meetingtime"
              placeholder={organization.meetingtime}
              onChange={(e) => setMeetingtime(e.target.value)}
            />
          </div>
        </div>
        <div className="flex">
          <Button type="button" className="ml-1 mr-1 flex-auto" onClick={() => void onSubmit()}>
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

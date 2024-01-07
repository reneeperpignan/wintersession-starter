import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
      <DialogContent>
        <p>Edit box</p>
        <Label htmlFor="name" className="text-left">
          Name:
        </Label>
        <input type="text" id="name" placeholder={organization.name} onChange={(e) => setName(e.target.value)} />
        <Label htmlFor="description" className="text-left">
          Description:
        </Label>
        <input
          type="text"
          id="description"
          placeholder={organization.description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Label htmlFor="Type" className="text-left">
          Type:
        </Label>
        <input type="text" id="type" placeholder={organization.type} onChange={(e) => setType(e.target.value)} />
        <Label htmlFor="comptype" className="text-left">
          Comp type:
        </Label>
        <input
          type="text"
          id="comptype"
          placeholder={organization.comptype}
          onChange={(e) => setComptype(e.target.value)}
        />
        <Label htmlFor="meetingday" className="text-left">
          Meeting Day:
        </Label>
        <input
          type="text"
          id="meetingday"
          placeholder={organization.meetingday}
          onChange={(e) => setMeetingday(e.target.value)}
        />
        <Label htmlFor="meetingtime" className="text-left">
          Meeting Time:
        </Label>
        <input
          type="text"
          id="meetingtime"
          placeholder={organization.meetingtime}
          onChange={(e) => setMeetingtime(e.target.value)}
        />

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

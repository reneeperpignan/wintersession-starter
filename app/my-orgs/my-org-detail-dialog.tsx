import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { type Orgs } from "@/lib/firebase/schema";

interface MyOrgDetailsProps {
  organization: Orgs;
  onClose: () => void;
}

export default function MyOrgDetailsDialog({ organization, onClose }: MyOrgDetailsProps) {
  //handle editing

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
          <Button type="submit" className="ml-1 mr-1 flex-auto" disabled>
            Edit
          </Button>
          <Button disabled>Delete</Button>
          <Button type="button" className="ml-1 mr-1 flex-auto" variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

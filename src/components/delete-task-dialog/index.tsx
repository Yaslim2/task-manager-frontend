import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export const DeleteTaskDialog = ({
  open,
  onCancel,
  onSave,
}: {
  open: boolean;
  onCancel: () => void;
  onSave: () => void;
}) => {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete task</DialogTitle>
          <DialogDescription>
            You are sure that you want to delete the task?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onSave} className="bg-green-500 w-full">
            Yes
          </Button>
          <Button onClick={onCancel} className="bg-red-500 w-full">
            No
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

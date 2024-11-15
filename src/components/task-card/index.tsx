import { FilterStatus } from "@/components/filter-status";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StatusEnum } from "../table-tasks";

export const TaskCard = ({
  description,
  setDescription,
  setStatus,
  setTitle,
  title,
  isValid,
  onSave,
  descriptionPage,
  titlePage,
  status,
  buttonLabel,
}: {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  setStatus: (status?: StatusEnum) => void;
  isValid: boolean;
  onSave: () => Promise<void>;
  titlePage: string;
  descriptionPage: string;
  buttonLabel: string;
  status?: StatusEnum;
}) => {
  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        onSave();
      }}
    >
      <Card className="w-[410px]">
        <CardHeader>
          <CardTitle>{titlePage}</CardTitle>
          <CardDescription>{descriptionPage}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label className="text-left" htmlFor="title">
                Title
              </Label>
              <Input
                value={title}
                onChange={(ev) => {
                  setTitle(ev.target.value);
                }}
                type="name"
                id="title"
                placeholder="Title"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="text-left" htmlFor="description">
                Description
              </Label>
              <Textarea
                value={description}
                onChange={(ev) => {
                  setDescription(ev.target.value);
                }}
                placeholder="Type your message here."
                id="description"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="text-left">Status</Label>
              <FilterStatus
                status={status}
                widthFull
                handleChangeStatus={setStatus}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button type="submit" disabled={!isValid} className="w-full">
            {buttonLabel}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

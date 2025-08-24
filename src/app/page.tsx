import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
 return(
  <div className="flex flex-col gap-y-4  p-4">
    <div>
      <Button variant={"elevated"}>
        i am the  button
      </Button>
    </div>
    <div>
      <Input placeholder="i am the input ">
      </Input>
    </div>
    <div>
      <Progress value={50}/>
    </div>
    <div>
        <Textarea value="this is textarea"/>
    </div>
    <div>
      <Checkbox/>
    </div>

  </div>
 )


}
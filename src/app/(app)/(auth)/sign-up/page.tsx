import { SignUpView } from "@/modules/auth/ui/views/sign-up-view";
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation"
const page = async()=>{
    const session= await caller.auth.session()
   if(session.user){
      redirect("/");                        
   }
                                                // 'this is will redirect  us to again to the home page after one time login '
    return(
        <SignUpView/> 
    )

}

export default page;
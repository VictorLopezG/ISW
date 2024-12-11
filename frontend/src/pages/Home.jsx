"use client";

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"



const Home = () => {
  return (
    <main>
      <div className="h-screen w-full bg-[#efefef] flex justify-center items-center p-10">
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-[#ffff] p-10 rounded-3xl flex flex-col items-center space-y-2">
            <h1 className="text-5xl font-bold text-[#000]">Sistema de recepción de comandas</h1>
            <h2 className="text-4xl font-light text-rose-100">Grupo 10</h2>


            <Button disabled >
              <Loader2 className="animate-spin" />
              Please wait
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                toast("Event has been created", {
                  description: "Sunday, December 03, 2023 at 9:00 AM",
                  action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                  },
                })
              }
            >
              Show Toast
            </Button>

          </div>
        </div>

      </div>
    </main>
  )
}





export default Home;

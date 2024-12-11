import { Button } from "@/components/ui/button"


const Home = () => {
  return (
    <main>
      <div className="h-screen w-full bg-[#efefef] flex justify-center items-center p-10">
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-[#ffff] p-10 rounded-3xl flex flex-col items-center space-y-2">
            <h1 className="text-5xl font-bold text-[#000]">Sistema de recepción de comandas</h1>
            <h2 className="text-4xl font-light text-rose-100">Grupo 10</h2> <Button>Click me</Button>


    
          </div>
        </div>

      </div>
    </main>
  )
}





export default Home;

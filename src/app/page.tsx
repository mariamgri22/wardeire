import Main from "@/components/Main";
import Header from "../components/Header";


export default async function Home() {

  return (
    <div className=" container m-auto text-primary p-3 font-[family-name:var(--font-geist-sans)]">
       <Header/>
       <Main/>
    </div>
  );
}


import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function HeaderDispMoveis() {
  const [aberto, setAberto] = useState(false);

  const abrirMenu = () => {
    setAberto(true);
  };

  const fecharMenu = () => {
    setAberto(false);
  };

  return (
    <header className="z-50  py-4 flex flex-col text-lg sm:hidden justify-around items-center bg-black fixed text-white w-screen top-0">
      <button className="text-white" onClick={aberto ? fecharMenu : abrirMenu}>
        {aberto ? <X size={40} /> : <Menu size={40} />}
      </button>
      <div
        className={`${
          aberto ? "opacity-100 top-16" : "opacity-0 translate-y-[-100%] "
        } transition duration-200 flex flex-col w-full items-center space-y-4 ease-in-out absolute  z-50 bg-black`}
      >
        <a
          href="#acao"
          className="border-t-2 border-white w-2/3 text-center py-4"
        >
          Ação
        </a>
        <a
          href="#aventura"
          className="border-t-2 border-white w-2/3 text-center py-4"
        >
          Aventura
        </a>
        <a
          href="#comedia"
          className="border-t-2 border-white w-2/3 text-center py-4"
        >
          Comédia
        </a>
        <a
          href="#crime"
          className="border-t-2 border-white w-2/3 text-center py-4"
        >
          Crime
        </a>
        <a
          href="#terror"
          className="border-t-2 border-white w-2/3 text-center py-4"
        >
          Terror
        </a>
        <a
          href="#minhalista"
          className="border-t-2 border-white w-2/3 text-center py-4"
        >
          Minha lista
        </a>
      </div>
    </header>
  );
}

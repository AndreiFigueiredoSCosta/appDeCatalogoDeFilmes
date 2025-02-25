export default function Header() {
  return (
    <header className="hidden z-50 top-0 p-4 sm:flex justify-around items-center bg-black w-full fixed text-white text-lg">
      <a href="#acao" className="hover:underline">
        Ação
      </a>
      <a href="#aventura" className="hover:underline">
        Aventura
      </a>
      <a href="#comedia" className="hover:underline">
        Comédia
      </a>
      <a href="#crime" className="hover:underline">
        Crime
      </a>
      <a href="#terror" className="hover:underline">
        Terror
      </a>
      <a href="#minhalista" className="hover:underline">
        Minha lista
      </a>
    </header>
  );
}

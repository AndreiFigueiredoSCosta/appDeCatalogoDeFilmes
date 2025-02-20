import { useEffect, useState } from "react";
import { Plus, Star, Trash } from "lucide-react";
import { div } from "framer-motion/client";

export default function Filme({ titulo, imagem, nota, sinopse }) {
  const [virado, setVirado] = useState(false);
  const [jaAdicionado, setJaAdicionado] = useState(false);

  useEffect(() => {
    const minhaListaJSON = localStorage.getItem("minhaLista");
    const minhaLista = minhaListaJSON ? JSON.parse(minhaListaJSON) : [];
    const filmeJaAdicionado = minhaLista.some(
      (filme) => filme.titulo === titulo
    );
    setJaAdicionado(filmeJaAdicionado);
  }, [titulo]);

  const virarCard = () => {
    setVirado(!virado);
  };

  useEffect(() => {
    if (virado) {
      const handleClickFora = (event) => {
        if (!event.target.closest(".card")) {
          virarCard();
        }
      };

      document.addEventListener("mousedown", handleClickFora);
      return () => {
        document.removeEventListener("mousedown", handleClickFora);
      };
    }
  }, [virado]);

  const estrelas = () => {
    const totalEstrelas = 5;
    const estrelasPreenchidas = Math.round(nota / 2);

    return (
      <div className="flex">
        {[...Array(totalEstrelas)].map((_, index) => (
          <Star
            key={index}
            fill={index < estrelasPreenchidas ? "currentColor" : "none"}
            className="text-yellow-500"
          />
        ))}
      </div>
    );
  };

  const adicionarNaMinhaLista = () => {
    const novoFilme = { titulo, imagem, nota, sinopse };
    const minhaListaJSON = localStorage.getItem("minhaLista");
    const minhaLista = minhaListaJSON ? JSON.parse(minhaListaJSON) : [];
    const jaAdicionado = minhaLista.some((filme) => filme.titulo === titulo);
    minhaLista.push(novoFilme);
    localStorage.setItem("minhaLista", JSON.stringify(minhaLista));
    setJaAdicionado(true);
  };

  const removerDaMinhaLista = () => {
    const minhaListaJSON = localStorage.getItem("minhaLista");
    const minhaLista = minhaListaJSON ? JSON.parse(minhaListaJSON) : [];
    const novaLista = minhaLista.filter((filme) => filme.titulo !== titulo);
    localStorage.setItem("minhaLista", JSON.stringify(novaLista));
    setJaAdicionado(false);
  };

  return (
    <div className="relative">
      <button
        onClick={jaAdicionado ? removerDaMinhaLista : adicionarNaMinhaLista}
        className={`${
          virado
            ? "hidden"
            : "z-40 group/edit p-4 text-white absolute top-1 left-1 flex items-center"
        }`}
      >
        {jaAdicionado ? <Trash size={30} /> : <Plus size={30} />}
        <h1 className="font-bold opacity-0 group-hover/edit:opacity-100 transition-opacity duration-300">
          {jaAdicionado ? "Remover da minha lista" : "Adicionar na minha lista"}
        </h1>
      </button>
      <div
        id="frente"
        onClick={virarCard}
        className={`${
          virado ? "translate-y-[-110%] absolute" : "relative"
        }  card flip-card h-[550px] overflow-hidden hover:bg-black transition duration-200 cursor-pointer bg-stone-900 text-white p-4 rounded-lg shadow-lg`}
      >
        <div className="relative">
          <img
            src={`https://image.tmdb.org/t/p/w400${imagem}`}
            alt={titulo}
            className="rounded-md w-full"
          />
        </div>
        <h2 className="text-lg font-bold mt-2">{titulo}</h2>
        <div className="flex justify-between items-center">
          {estrelas()}
          <h2 className="text-lg font-bold mt-2">{nota.toFixed(1)}</h2>
        </div>
      </div>

      <div
        id="verso"
        onClick={virarCard}
        className={`${
          virado ? "relative" : "translate-y-[110%] absolute "
        } card h-[550px] overflow-hidden hover:bg-red-950 transition duration-200 cursor-pointer bg-red-900 text-white p-4 rounded-lg shadow-lg`}
      >
        <h2 className="text-lg font-bold mt-2">{titulo}</h2>
        <div className="flex justify-between items-center">
          {estrelas()}
          <h2 className="text-lg font-bold mt-2">{nota.toFixed(1)}</h2>
        </div>
        <div className="text-lg mt-4">
          <p>{sinopse}</p>
        </div>
      </div>
    </div>
  );
}

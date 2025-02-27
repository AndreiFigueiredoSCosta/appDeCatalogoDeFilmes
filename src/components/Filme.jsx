import { useEffect, useState } from "react";
import { Plus, Star, Trash } from "lucide-react";

export default function Filme({ titulo, imagem, nota, sinopse }) {
  const [virado, setVirado] = useState(false);
  const [jaAdicionado, setJaAdicionado] = useState(false);

  const verificarSeEstaNaLista = () => {
    const minhaListaJSON = localStorage.getItem("minhaLista");
    const minhaLista = minhaListaJSON ? JSON.parse(minhaListaJSON) : [];
    return minhaLista.some((filme) => filme.titulo === titulo);
  };

  useEffect(() => {
    setJaAdicionado(verificarSeEstaNaLista());
  }, [titulo]);

  useEffect(() => {
    const handleListaAtualizada = () => {
      setJaAdicionado(verificarSeEstaNaLista());
    };

    window.addEventListener("minhaListaAtualizada", handleListaAtualizada);
    return () => {
      window.removeEventListener("minhaListaAtualizada", handleListaAtualizada);
    };
  }, []);

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

  const dispatchListaAtualizada = () => {
    const evento = new Event("minhaListaAtualizada");
    window.dispatchEvent(evento);
  };

  const adicionarNaMinhaLista = () => {
    const novoFilme = { titulo, imagem, nota, sinopse };
    const minhaListaJSON = localStorage.getItem("minhaLista");
    const minhaLista = minhaListaJSON ? JSON.parse(minhaListaJSON) : [];

    if (!minhaLista.some((filme) => filme.titulo === titulo)) {
      minhaLista.push(novoFilme);
      localStorage.setItem("minhaLista", JSON.stringify(minhaLista));
      dispatchListaAtualizada();
    }
  };

  const removerDaMinhaLista = () => {
    const minhaListaJSON = localStorage.getItem("minhaLista");
    const minhaLista = minhaListaJSON ? JSON.parse(minhaListaJSON) : [];
    const novaLista = minhaLista.filter((filme) => filme.titulo !== titulo);
    localStorage.setItem("minhaLista", JSON.stringify(novaLista));
    dispatchListaAtualizada();
  };

  return (
    <div className="relative">
      <button
        onClick={jaAdicionado ? removerDaMinhaLista : adicionarNaMinhaLista}
        className={`${
          virado
            ? "hidden"
            : "z-30 group/edit p-4 text-white absolute top-1 left-1 flex items-center"
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
        }  card flip-card sm:h-[500px] h-[400px] w-[100%]  hover:bg-black transition duration-200 cursor-pointer bg-stone-900 text-white p-4 rounded-lg `}
      >
        <div className="relative">
          <img
            src={`https://image.tmdb.org/t/p/w400${imagem}`}
            alt={titulo}
            className="rounded-md w-full"
          />
        </div>
        <div className="flex flex-col justify-between">
          <h2 className="text-lg font-bold mt-2">{titulo}</h2>
          <div className="flex justify-between items-center">
            {estrelas()}
            <h2 className="text-lg font-bold mt-2">{nota.toFixed(1)}</h2>
          </div>
        </div>
      </div>

      <div
        id="verso"
        onClick={virarCard}
        className={`${
          virado ? "relative" : "translate-y-[110%] absolute "
        } sm:h-[500px] h-[400px]  hover:bg-red-950 transition duration-200 cursor-pointer bg-red-900 text-white p-4 rounded-lg shadow-lg`}
      >
        <h2 className="text-lg font-bold mt-2">{titulo}</h2>
        <div className="flex justify-between items-center">
          {estrelas()}
          <h2 className="text-lg font-bold mt-2">{nota.toFixed(1)}</h2>
        </div>
        <div className="text-sm mt-4">
          <p>{sinopse}</p>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import Titulo from "./Titulo1";
import Filme from "./Filme"; // Importando o componente Filme
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { div } from "framer-motion/client";

export default function MinhaLista({ titulo, idDiv }) {
  const [filmes, setFilmes] = useState([]);
  const [indiceAtual, setIndiceAtual] = useState(0);

  useEffect(() => {
    const filmesSalvosJSON = localStorage.getItem("minhaLista");
    const filmesSalvos = filmesSalvosJSON ? JSON.parse(filmesSalvosJSON) : [];
    setFilmes(filmesSalvos);
  }, []);

  const irParaProximo = () => {
    setIndiceAtual((prevIndice) => Math.min(prevIndice + 1, filmes.length - 1)); // Vai para o próximo filme, sem ultrapassar o limite
  };

  const irParaAnterior = () => {
    setIndiceAtual((prevIndice) => Math.max(prevIndice - 1, 0)); // Vai para o filme anterior, sem ultrapassar o limite
  };

  const filmesExibidos = filmes.slice(indiceAtual, indiceAtual + 1); // Exibindo apenas 1 filme por vez

  return (
    <div className="flex flex-col space-y-4 justify-center items-start min-w-screen bg-stone-700 mt-10 pb-20">
      <Titulo text="Minha lista" />
    </div>
  );
}

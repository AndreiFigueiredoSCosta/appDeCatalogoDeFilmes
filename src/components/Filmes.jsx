import { useEffect, useState } from "react";
import axios from "axios";
import Titulo from "./Titulo1";
import Filme from "./Filme"; // Importando o componente Filme
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function Filmes({ idGenero, titulo, idDiv }) {
  const [filmes, setFilmes] = useState([]);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [buscando, setBuscando] = useState(true);

  useEffect(() => {
    const buscarFilmes = async () => {
      setBuscando(true);
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/discover/movie",
          {
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOWZiMjIyYTQzODU3NGE2ZTBhYWJjOWU2YWRjNWQxNyIsIm5iZiI6MTczOTgxMDMzMC4yMzUwMDAxLCJzdWIiOiI2N2IzNjYxYTViOGM3ODllODQ5ZmI0NzciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.QdyliiPc9YL_fTigia0b4nOHoL5Q-T3icJ0_CysusDo",
            },
            params: {
              include_adult: false,
              include_video: false,
              language: "pt-BR",
              page: 1,
              sort_by: "popularity.desc",
              with_genres: idGenero,
            },
          }
        );

        setFilmes(response.data.results); // Atualizando o estado com os filmes
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }

      setBuscando(false);
    };

    buscarFilmes();
  }, [idGenero]);

  const irParaProximo = () => {
    setIndiceAtual((prevIndice) => (prevIndice + 4) % filmes.length); // Vai para o próximo grupo de 6 filmes
  };

  const irParaAnterior = () => {
    setIndiceAtual(
      (prevIndice) => (prevIndice - 4 + filmes.length) % filmes.length // Vai para o grupo anterior de 6 filmes
    );
  };

  const filmesExibidos = filmes
    .concat(filmes) // Duplicando os filmes para permitir o loop contínuo
    .slice(indiceAtual, indiceAtual + 6); // Selecionando os 6 filmes atuais, permitindo o loop contínuo

  return buscando ? (
    <div className="bg-stone-700 h-[775px] rounded-md flex justify-center items-center mt-10 mx-4">
      <Titulo text="Carregando filmes..." />
    </div>
  ) : (
    <div
      id={idDiv}
      className="flex flex-col space-y-4 justify-center items-start min-w-screen bg-stone-700 mt-10 pb-20"
    >
      <Titulo text={titulo} />
      <div className="text-white flex items-center relative">
        <button className="absolute left-0 z-40 bg-gradient-to-r from-stone-700 to-stone/50 h-full ">
          <div className="mx-4 bg-stone-900 rounded-md hover:bg-stone-950 transition duration-200">
            <ChevronLeftIcon size={64} onClick={irParaAnterior} />
          </div>
        </button>

        <div className="flex space-x-4 overflow-hidden transition-transform duration-500">
          {filmesExibidos.map((filme, index) => (
            <div
              key={filme.id}
              className={`overflow-hidden relative w-[30%] ${
                index === 0 || index === filmesExibidos.length - 1
                  ? "blur-sm pointer-events-none "
                  : ""
              } `}
            >
              <Filme
                titulo={filme.title}
                imagem={filme.poster_path}
                nota={filme.vote_average}
                sinopse={filme.overview}
              />
            </div>
          ))}
        </div>

        <button className="absolute right-0 z-40 bg-gradient-to-l from-stone-700 to-stone/50 h-full">
          <div className="mx-4 bg-stone-900 rounded-md hover:bg-stone-950 transition duration-200">
            <ChevronRightIcon size={64} onClick={irParaProximo} />
          </div>
        </button>
      </div>
    </div>
  );
}

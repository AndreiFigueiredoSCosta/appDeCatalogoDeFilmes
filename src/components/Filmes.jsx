import { useEffect, useState } from "react";
import axios from "axios";
import Titulo from "./Titulo1";
import Filme from "./Filme";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsRightIcon,
} from "lucide-react";

export default function Filmes({ idGenero, titulo, idDiv }) {
  const [filmes, setFilmes] = useState([]);
  const [buscando, setBuscando] = useState(true);
  const [slidePerView, setSlidePerView] = useState(6);
  const [activeIndex, setActiveIndex] = useState(0);

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
                "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOWZiMjIyYTQzODU3NGE2ZTBhYWJjOWU2YWRjNWQxNyIsIm5iZiI6MTczOTgxMDMzMC4yMzUwMDAxLCJzdWIiOiI2N2IzNjYxYTViOGM3ODllODQ5ZmI0NzciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.QdyliiPc9YL_fTigia0b4nOHoL5Q-T3icJ0_CysusDo",
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

        setFilmes(response.data.results);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }

      setBuscando(false);
    };

    buscarFilmes();
  }, [idGenero]);

  const isFirstSlideVisible = activeIndex === 0;
  const isLastSlideVisible = activeIndex + slidePerView >= filmes.length;

  return buscando ? (
    <div className="bg-stone-700 h-[775px] rounded-md flex justify-center items-center mt-10 mx-4">
      <Titulo text="Carregando filmes..." />
    </div>
  ) : (
    <div
      id={idDiv}
      className=" text-white relative flex flex-col  justify-center min-w-screen bg-stone-700 mt-10 pb-20"
    >
      <Titulo text={titulo} />

      <div
        className={`${
          isFirstSlideVisible
            ? "hidden"
            : "absolute top-0 left-0 bg-gradient-to-r z-40 from-stone-700 to-stone/50 w-28 h-full flex items-center"
        }`}
      >
        <button className="absolute custom-prev">
          <div className="mx-4 bg-stone-900 rounded-md hover:bg-stone-950 transition duration-200">
            <ChevronLeftIcon size={64} />
          </div>
        </button>
      </div>

      <div>
        <Swiper
          slidesPerView={slidePerView}
          slidesPerGroup={4}
          spaceBetween={10}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          modules={[Navigation]}
          allowTouchMove={false}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {filmes.map((filme, index) => {
            const isFirstVisible = index === activeIndex;
            const isLastVisible = index === activeIndex + slidePerView - 1;
            const isFirstOverall = index === 0;
            const isLastOverall = index === filmes.length - 1;

            const shouldBlur =
              (isFirstVisible || isLastVisible) &&
              !isFirstOverall &&
              !isLastOverall;

            return (
              <SwiperSlide
                key={filme.id}
                className={`transition-all duration-300 ${
                  shouldBlur ? "blur-sm pointer-events-none" : "blur-0"
                }`}
              >
                <Filme
                  titulo={filme.title}
                  imagem={filme.poster_path}
                  nota={filme.vote_average}
                  sinopse={filme.overview}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <div
        className={`${
          isLastSlideVisible
            ? "hidden"
            : "absolute right-0 top-0 bg-gradient-to-l z-40 from-stone-700 to-stone/50 w-28 h-full flex items-center"
        }`}
      >
        <button className="absolute custom-next">
          <div className="mx-4 bg-stone-900 rounded-md hover:bg-stone-950 transition duration-200">
            <ChevronRightIcon size={64} />
          </div>
        </button>
      </div>
    </div>
  );
}

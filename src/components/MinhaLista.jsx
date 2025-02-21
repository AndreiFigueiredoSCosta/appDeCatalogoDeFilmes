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

export default function MinhaLista() {
  const [filmes, setFilmes] = useState([]);
  const [vazio, setVazio] = useState(false);
  const [slidePerView, setSlidePerView] = useState(6);
  const [activeIndex, setActiveIndex] = useState(0);

  const isFirstSlideVisible = activeIndex === 0;
  const isLastSlideVisible = activeIndex + slidePerView >= filmes.length;

  useEffect(() => {
    const filmesSalvos = localStorage.getItem("minhaLista");
    if (filmesSalvos) {
      setFilmes(JSON.parse(filmesSalvos));
      setVazio(false);
    }

    setVazio(true);
  }, []);

  return vazio ? (
    <div className=" text-white relative flex flex-col  justify-center min-w-screen bg-stone-700 mt-10 pb-20">
      <Titulo text="Minha lista" />

      <div>
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
                    titulo={filme.titulo}
                    imagem={filme.imagem}
                    nota={filme.nota}
                    sinopse={filme.sinopse}
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
    </div>
  ) : (
    <div className=" text-white relative flex flex-col  justify-center min-w-screen bg-stone-700 mt-10 pb-20">
      <Titulo text="Minha lista" />
      <div className="flex justify-center items-center">
        <Titulo text="Você não adicionou nenhum filme na sua lista!" />
      </div>
    </div>
  );
}

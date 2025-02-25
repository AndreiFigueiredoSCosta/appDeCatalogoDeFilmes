import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Titulo from "./Titulo1";
import Filme from "./Filme";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function MinhaLista() {
  const [filmes, setFilmes] = useState([]);
  const [vazio, setVazio] = useState(false);
  const [slidePerView, setSlidePerView] = useState(6);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slidePerGroup, setSlidePerGroup] = useState(4);
  const swiperRef = useRef(null);

  const isFirstSlideVisible = activeIndex === 0;
  const isLastSlideVisible = activeIndex + slidePerView >= filmes.length;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidePerView(2);
        setSlidePerGroup(2);
      } else if (window.innerWidth < 800) {
        setSlidePerView(4);
        setSlidePerGroup(2);
      } else {
        setSlidePerView(6);
        setSlidePerGroup(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const filmesSalvos = localStorage.getItem("minhaLista");
    if (filmesSalvos) {
      const filmesAtualizados = JSON.parse(filmesSalvos);
      setFilmes(filmesAtualizados);
      setVazio(filmesAtualizados.length === 0);
    } else {
      setVazio(true);
    }
  }, []);

  useEffect(() => {
    const handleListaAtualizada = () => {
      const filmesAtualizados = localStorage.getItem("minhaLista");
      if (filmesAtualizados) {
        const filmesParseados = JSON.parse(filmesAtualizados);
        setFilmes(filmesParseados);
        setVazio(filmesParseados.length === 0);
        setActiveIndex(0);
      }
    };

    window.addEventListener("minhaListaAtualizada", handleListaAtualizada);
    return () => {
      window.removeEventListener("minhaListaAtualizada", handleListaAtualizada);
    };
  }, []);

  return vazio ? (
    <div
      id="minhalista"
      className="text-white relative flex flex-col justify-center min-w-screen bg-stone-700 mt-10 pb-20"
    >
      <Titulo text="Minha lista" />
      <div className="flex justify-center items-center">
        <Titulo text="Você não adicionou nenhum filme na sua lista!" />
      </div>
    </div>
  ) : (
    <div
      id="minhalista"
      className="text-white relative flex flex-col justify-center min-w-screen bg-stone-700 mt-10 pb-20"
    >
      <Titulo text="Minha lista" />

      <div
        className={`${
          isFirstSlideVisible
            ? "hidden"
            : "absolute top-0 left-0 bg-gradient-to-r z-40 from-stone-700 to-stone/50 w-28 h-full flex items-center"
        } ${slidePerView > 3 ? "" : "w-12 pointer-events-none"}`}
      >
        <button
          className={`absolute custom-prev ${slidePerView > 3 ? "" : "hidden"}`}
        >
          <div className="mx-4 bg-stone-900 rounded-md hover:bg-stone-950 transition duration-200">
            <ChevronLeftIcon size={64} />
          </div>
        </button>
      </div>

      {/* Swiper */}
      <div>
        <Swiper
          key={slidePerView}
          ref={swiperRef}
          slidesPerView={slidePerView}
          slidesPerGroup={4}
          spaceBetween={10}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          modules={[Navigation]}
          allowTouchMove={slidePerView < 3}
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
              !isLastOverall &&
              slidePerView > 3;

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
                  onRemover={() => removerFilme(filme.id)}
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
        } ${slidePerView > 3 ? "" : "w-12 pointer-events-none"}`}
      >
        <button
          className={`absolute custom-next ${slidePerView > 3 ? "" : "hidden"}`}
        >
          <div className="mx-4 bg-stone-900 rounded-md hover:bg-stone-950 transition duration-200">
            <ChevronRightIcon size={64} />
          </div>
        </button>
      </div>
    </div>
  );
}

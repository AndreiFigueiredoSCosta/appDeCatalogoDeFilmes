import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Titulo from "./Titulo1";
import Filme from "./Filme";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function Filmes({ idGenero, titulo, idDiv }) {
  const [filmes, setFilmes] = useState([]);
  const [buscando, setBuscando] = useState(true);
  const [slidePerView, setSlidePerView] = useState(6);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slidePerGroup, setSlidePerGroup] = useState(4);
  const swiperRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      let newSlides = 6;
      let newGroup = 4;

      if (window.innerWidth < 640) {
        newSlides = 2;
        newGroup = 2;
      } else if (window.innerWidth < 800) {
        newSlides = 4;
        newGroup = 2;
      }

      setSlidePerView(newSlides);
      setSlidePerGroup(newGroup);
      setActiveIndex(0); // Reseta o índice ativo ao mudar o tamanho da tela

      if (swiperRef.current) {
        swiperRef.current.slideTo(0); // Faz o Swiper voltar ao primeiro slide
        swiperRef.current.update(); // Atualiza o Swiper para recalcular os índices visíveis
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const buscarFilmes = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NWUzYzc5OTFlNGMxYjFjOWYwMWY0ZWQ2YTNkZDU3NiIsIm5iZiI6MTczOTgxMDMzMC4yMzUwMDAxLCJzdWIiOiI2N2IzNjYxYTViOGM3ODllODQ5ZmI0NzciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.IHMFBBmzz-vpFO8OMAb5h8CTS9hT5w5Ncdl-p1skcq8",
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

  useEffect(() => {
    buscarFilmes(true);
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
      className="text-white relative flex flex-col justify-center min-w-screen bg-stone-700 mt-10 pb-20"
    >
      <Titulo text={titulo} />

      <div
        className={`${
          isFirstSlideVisible
            ? "hidden"
            : "absolute top-0 left-0 bg-gradient-to-r z-40 from-stone-700 to-stone/50 w-28 h-full flex items-center"
        } ${slidePerView > 3 ? "" : "w-12 pointer-events-none"}`}
      >
        <button
          className={`absolute custom-prev-${idDiv} ${
            slidePerView > 3 ? "" : "hidden"
          }`}
        >
          <div className="mx-4 bg-stone-900 rounded-md hover:bg-stone-950 transition duration-200">
            <ChevronLeftIcon size={64} />
          </div>
        </button>
      </div>

      <div>
        <Swiper
          key={slidePerView}
          slidesPerView={slidePerView}
          slidesPerGroup={slidePerGroup}
          spaceBetween={10}
          navigation={{
            nextEl: `.custom-next-${idDiv}`,
            prevEl: `.custom-prev-${idDiv}`,
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
        } ${slidePerView > 3 ? "" : "w-12 pointer-events-none"}`}
      >
        <button
          className={`absolute custom-next-${idDiv}  ${
            slidePerView > 3 ? "" : "hidden"
          }`}
        >
          <div className="mx-4 bg-stone-900 rounded-md hover:bg-stone-950 transition duration-200">
            <ChevronRightIcon size={64} />
          </div>
        </button>
      </div>
    </div>
  );
}

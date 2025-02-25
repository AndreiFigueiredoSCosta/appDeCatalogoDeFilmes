import { useState } from "react";
import axios from "axios";
import Filmes from "./components/Filmes";
import Header from "./components/Header";
import MinhaLista from "./components/MinhaLista";
import HeaderDispMoveis from "./components/HeaderDIspMoveis";

export default function App() {
  return (
    <div className="bg-stone-900 min-h-screen pt-16 pb-16 scroll-smooth">
      <Header />
      <HeaderDispMoveis />
      <Filmes idGenero={28} titulo="Ação" idDiv="acao" />
      <Filmes idGenero={12} titulo="Aventura" idDiv="aventura" />
      <Filmes idGenero={35} titulo="Comédia" idDiv="comedia" />
      <Filmes idGenero={80} titulo="Crime" idDiv="crime" />
      <Filmes idGenero={27} titulo="Terror" idDiv="terror" />
      <MinhaLista />
    </div>
  );
}

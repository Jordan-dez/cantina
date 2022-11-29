import { Routes, Route, NavLink, Link } from "react-router-dom";
import Recipe from "./components/details/Recipe";
import Home from "./components/home/Home";
import NewRecipe from "./components/recipe-managers/NewRecipe";
import UpdateRecipe from "./components/recipe-managers/UpdateRecipe";
import "./App.css"
import { FaGithub, FaBars } from 'react-icons/fa';
import { ImSpoonKnife } from 'react-icons/im';
import { useState } from "react";

function App() {

  const [burgerOpen, setBurgerOpen] = useState(false) // state determinant l'affichage du menu burger
  const handleClick = () => {
    setBurgerOpen(!burgerOpen)
  }
  return (
    <>
      <header className="mak-navbar w-100"> {/* header */}
        <div className="container">
          <div className="row">
            <div className="col-6 col-sm-5">
              <Link to="/" className="mak-brand text-decoration-none"><ImSpoonKnife />cantina</Link>
            </div>
            <div className="col-6 col-sm-7">
              <button className={`btn-burger d-block d-sm-none`} onClick={handleClick}><FaBars /></button>
              <nav className={`${burgerOpen? "d-block" : "d-none"} mak-nav`}>{/* navigation */}
                <ul className="list-unstyled d-flex">
                  <li><NavLink to="/">Accueil</NavLink></li>
                  <li><NavLink to="new-recipe">Nouvelle recette</NavLink></li>
                </ul>
              </nav>{/* fin navigation */}
            </div>
          </div>
        </div>
      </header> {/* fin header */}
      <Routes> {/* routes */}
        <Route path="/" element={<Home />}></Route>
        <Route path="/recipe/:id" element={<Recipe />}></Route>
        <Route path="/new-recipe" element={<NewRecipe />}></Route>
        <Route path="/update-recipe/:id" element={<UpdateRecipe />}></Route>
      </Routes> {/* fin routes */}
      <footer> {/* footer */}
        <div className="container">
          <div className="row text-center">
            <p>
              <a href="https://github.com/Jordan-dez/cantina" className="gitlab text-decoration-none"><span>Source github</span> <FaGithub /></a>
            </p>
            <p className="copyright">
              Jordan KAYA © <span><ImSpoonKnife />cantina</span> 2022
            </p>
          </div>
        </div>
      </footer> {/* fin footer */}
    </>
  );
}

export default App;

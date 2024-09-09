import "./Inicio.css";
import { Nav } from "../utils/Nav/Nav";
import { Footer } from "../utils/Footer/Footer";
import { Tareas } from "../Tareas/Tareas";

export function Inicio (){
return(
    <>
    <Nav />
    <Tareas/>
    <Footer/>
    </>
)
}
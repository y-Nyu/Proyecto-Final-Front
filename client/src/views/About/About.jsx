import Profile from "../../components/Profiles/Profiles";
import profiles from "../../assets/profiles/profiles";
import style from "./About.module.css";

const About = () => {
  return (
    <div className="logo">
      <div className={`container text-center ${style.containerAbout}`}>

        <div className="row m-2 d-flex flex-column">
          <h2 className="mt-3 text-center text-uppercase">
            Te presentamos al equipo de desarrollo
          </h2>
          <h5 className="row m-2 d-flex flex-column">
            <em>
              Nuestro equipo está formado por individuos apasionados y
              comprometidos con el bienestar animal, el cual se unió para crear
              un sitio web para una tienda de mascotas. Cada miembro aporta
              habilidades unicas, donde combinaron su amor por los animales y la
              tecnología para ofrecer una experiencia excepcional. La plataforma
              ofrece productos detallados y de alta calidad, desde alimentos
              nutritivos hasta juguetes y accesorios, cuidadosamente
              seleccionados para el bienestar y la felicidad de tus queridos
              compañeros peludos.
            </em>
          </h5>
          <h5 className="row m-2 d-flex flex-column">
            <em>
              La dedicación demuestra cómo el amor por los animales y la
              tecnología pueden cambiar vidas...
            </em>
          </h5>
        </div>

        <div className={`row align-items-center ${style.row}`}>
          {
            profiles.map(profile => {
              return (<Profile
                key={profile.id}
                id={profile.id}
                name={profile.name}
                github={profile.github}
                linkedin={profile.linkedin}
                image={profile.image}
              />)
            })
          }
        </div>
        
      </div>
    </div>
  )
};

export default About;
import style from './Profiles.module.css'

const Profile = ( { id, name, github, linkedin, image } ) => {
  return (
    <div className="col-12 col-md-6 col-lg-3">
    <div className={`proyecto ${style.proyecto}`}>
        <img
        className={`object-cover w-100 shadow-md ${style.image} ${style.smallImage}`} 
        style={{ objectFit: "cover" }}
        src={image}
        alt={name}
        />
        <div className={`overlay ${style.overlay}`}>
        <p
            className={`text-center ${style.centeredParagraph} ${style.name}`}
        >
            {name}
        </p>
        <div className="iconos-contenedor text-center">
            <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            >
            <i className="bi bi-github"></i>
            </a>
            <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            >
            <i className="bi bi-linkedin"></i>
            </a>
        </div>
        </div>
    </div>
    </div>
  )
}

export default Profile;
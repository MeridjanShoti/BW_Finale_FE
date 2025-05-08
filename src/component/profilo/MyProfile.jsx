import { use, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Pencil } from "react-bootstrap-icons";
import { useSelector } from "react-redux";

function MyProfile() {
  const utente = useSelector((state) => state.user.user);
  useEffect(() => {
    console.log(utente.appUser.roles);
    console.log(utente);
  }, [utente]);
  return (
    <>
      {utente ? (
        <Container>
          <h1>Profilo</h1>
          <div className="d-flex align-items-center gap-3 mb-3 position-relative">
            <Pencil
              size={20}
              color="black"
              className="position-absolute nav-icon--lower ms-2"
              style={{ textShadow: "2px 2px 2px #FFFFFF" }}
            />
            <img src={utente.avatar} alt="Avatar" width="100" height="100" />
            <h3>{utente.appUser.username}</h3>
          </div>

          <div className="d-flex align-items-center gap-3 mb-3">
            <p className="mb-0">Nome: </p> <p className="mb-0">{utente.nome}</p>
          </div>
          <div className="d-flex align-items-center gap-3 mb-3">
            <p className="mb-0">Cognome: </p> <p className="mb-0">{utente.cognome}</p>
          </div>
          <div className="d-flex align-items-center gap-3 mb-3">
            <p className="mb-0">Email: </p> <p className="mb-0">{utente.email}</p>
          </div>
          <div className="d-flex align-items-center gap-3 mb-3">
            <p className="mb-0">Ruolo: </p>{" "}
            {<p className="mb-0">{utente.appUser.roles.includes("ROLE_ADMIN") ? "Admin" : "User"}</p>}
          </div>
          {/* <h3>Cognome: {utente.cognome}</h3>
          <h3>Email: {utente.email}</h3>
          <h3>Ruolo: {utente.appUser.ruolo}</h3> */}
        </Container>
      ) : (
        <div>
          <h1>Caricamento in corso...</h1>
        </div>
      )}
    </>
  );
}

export default MyProfile;

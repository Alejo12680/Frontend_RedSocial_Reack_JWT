import { Global } from "../../helpers/Global";
import { useForm } from "../../hooks/useForm"


export const Register = () => {

  // Usamos el hook personalizado useForm para cargar los datos del formulario
  const { form, changed } = useForm({});

  // Guardar un usuario en la BD mongo
  const saveUSer = async (e) => {
    // Prevenir que se actualice la pantalla
    e.preventDefault();

    // Obtener los datos del formulario
    let newUser = form;
    console.log(newUser);

    // Guardar usuario en la BD del Api Backend
    const request = await fetch(Global.url + "user/register", {
      method: "POST",
      // Combierte el objeto javascript a objeto JSON
      body: JSON.stringify(newUser),
      // Se indica que se envia un Json
      headers: {
        "Content-Type": "application/json"
      }
    });

    // Obtener la información retornada por la request
    const data = await request.json();
    console.log(data);

    // Redirigir en el index
    if (data.status === 'created') {
      window.location.href = '/';
    }
  };

  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Registro</h1>
      </header>

      {/* Formulario de Registro */}
      <div className="content__posts">
        <form className="register-form" onSubmit={saveUSer}>
          <div className="form-group">
            <label htmlFor="name">Nombres</label>
            <input type="text" name="name" required onChange={changed}/>
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Apellidos</label>
            <input type="text" name="last_name" required onChange={changed}/>
          </div>
          <div className="form-group">
            <label htmlFor="nick">Nick</label>
            <input type="text" name="nick" required onChange={changed}/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input type="email" name="email" required onChange={changed}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" required onChange={changed}/>
          </div>

          <input type="submit" value="Regístrate" className="btn btn-success" />
        </form>
      </div>
    </>
  )
}

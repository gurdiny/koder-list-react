import { useState } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";

export default function App() {
  const [koders, setKoders] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
    reset,
  } = useForm();

  function removeKoders(indexToRemove) {
    const newKoders = koders.filter((koder, idx) => idx !== indexToRemove);
    setKoders(newKoders);
  }

  function onSubmit(data) {
    setKoders([...koders, data]);
    reset();
  }
  return (
    <main className="w-full min-h-screen justify-center">
      <div className="flex flex-col">
        <div>
          <form
            className="flex gap-4 justify-center flex-row p-5"
            action=""
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className={clsx(
                "p-2 rounded-md text-black w-full max-w-screen-sm",
                {
                  "border-2 border-red-500 bg-red-100": errors.koderName,
                }
              )}
              type="text"
              placeholder="Nombre"
              {...register("koderName", {
                required: { value: true, message: "Campo requerido" },
                minLength: {
                  value: 2,
                  message: "Tu nombre debe tener Minimo 2 Palabras",
                },
                maxLength: { value: 20, message: "Maximo 20 palabras" },
              })}
            />

            <input
              className={clsx(
                "p-2 rounded-md text-black w-full max-w-screen-sm",
                {
                  "border-2 border-red-500 bg-red-100": errors.koderLastName,
                }
              )}
              type="text"
              placeholder="Apellido"
              {...register("koderLastName", {
                required: { value: true, message: "Campo requerido" },
                minLength: {
                  value: 2,
                  message: "Tu apellido debe tener minimo 2 Palabras",
                },
                maxLength: { value: 20, message: "Maximo 20 palabras" },
              })}
            />

            <input
              className={clsx(
                "p-2 rounded-md text-black w-full max-w-screen-sm",
                {
                  "border-2 border-red-500 bg-red-100": errors.koderEmail,
                }
              )}
              type="mail"
              placeholder="Correo electronico"
              {...register("koderEmail", {
                required: { value: true, message: "Campo requerido" },
                minLength: { value: 2, message: "Minimo 2 Palabras" },
                maxLength: { value: 20, message: "Maximo 20 palabras" },
              })}
            />

            <button
              type="submit"
              className="text-black px-3 rounded bg-white disabled:bg-stone-500"
            >
              {" "}
              Agregar
            </button>
          </form>
        </div>
        <div className="p-5">
          {errors.koderName && <p>{errors.koderName.message}</p>}
          {errors.koderLastName && <p>{errors.koderLastName.message}</p>}
          {errors.koderEmail && <p>{errors.koderEmail.message}</p>}
        </div>
      </div>

      <div className="mt-4  p-[5px_1rem] ">
        <ul>
          {koders.map((koder, idx) => {
            return (
              <li
                className="bg-stone-700 flex justify-between p-5 rounded items-center"
                key={`koder-${idx}`}
              >
                <div>
                  <p>{`${koder.koderName} ${koder.koderLastName}`}</p>
                  <p>{koder.koderEmail}</p>
                </div>
                <div>
                  <button
                    className="flex justify-center items-center bg-red-500 size-5 rounded-full"
                    onClick={() => removeKoders(idx)}
                  >
                    x
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}

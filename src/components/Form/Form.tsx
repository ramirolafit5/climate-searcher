import { useState } from "react";
import { countries } from "../../data/countries";
import styles from "./Form.module.css"
import { SearchType } from "../../types";
import Alert from "../Alert/Alert";

type FormProps = {
    fetchWeather: (search: SearchType) => Promise<void>
}

export default function Form({fetchWeather}: FormProps) {

    const [search, setSearch] = useState<SearchType>({
        city: '',
        country: ''
    })

    const [alert, setAlert] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => 
    {
        /* para no hacer 2 sets ponemos name="country" en ambos entonces lo reutilizamos */
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //si alguno esta vacio entonces..
        if (Object.values(search).includes("")) {
            setAlert("Todos los campos son obligatorios");
      
            // Limpiar la alerta después de 3 segundos (3000 milisegundos)
            setTimeout(() => {
              setAlert("");
            }, 3000);

            return; // Detener la ejecución del formulario
        }
        
        fetchWeather(search)

    }

    return (
        <form 
            className={styles.form}
            onSubmit={handleSubmit}
        >
            {/* si tenemos algo en alert entonces renderizao el componente de alert */}
            {alert && <Alert>{alert}</Alert>}
            <div className={styles.field}>
                <label htmlFor="city">Ciudad:</label>
                <input 
                    type="text" 
                    name="city" 
                    id="city"
                    placeholder="Ciudad"
                    value={search.city}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="country">País:</label>
                <select
                    id="country"
                    value={search.country}
                    name="country"
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione un país --</option>
                    {countries.map(country => (
                        <option key={country.code} value={country.code}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>


            <input 
                className={styles.submit}
                type="submit" 
                value="Consultar clima"/>
        </form>
    )
}

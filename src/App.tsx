import styles from "./App.module.css"
import Form from "./components/Form/Form"
import useWeather from "./components/hooks/useWeather"
import NotFound from "./components/NotFound/NotFound"
import Spinner from "./components/Spinner/Spinner"
import WeatherDetail from "./components/WeatherDetail/WeatherDetail"


function App() {

    const {weather, loading, notFound, fetchWeather, hasWeatherData} = useWeather()

    return (
        <>
            <h1 className={styles.title}>Buscador de clima</h1>
            <div className={styles.container}>
                <Form
                    fetchWeather={fetchWeather}
                />


                {loading && <Spinner/>}

                {notFound && <NotFound/>}
                 
                {/* if hasWeatherData is true so do that */}
                {hasWeatherData && 
                    <WeatherDetail
                        weather={weather}
                    />
                }
                
            </div>
        </>
    )
}

export default App

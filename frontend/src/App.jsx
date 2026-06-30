import { useEffect, useState } from "react";
import api from "./services/api";

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchBackend = async () => {
            try {
                const response = await api.get("/");
                setMessage(response.data.message);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBackend();
    }, []);

    return (
        <div>
            <h1>WeatherWise</h1>

            <h2>{message}</h2>
        </div>
    );
}

export default App;
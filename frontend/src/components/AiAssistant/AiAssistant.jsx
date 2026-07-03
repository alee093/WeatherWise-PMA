import Recommendation from "../Recomendation/Recommendation";
import "./AiAssistant.css";


function AiAssistant({ summary, weather }) {
  if (!summary) return null;

  return (
    <section className="ai-assistant-section">
      <h2>
        <i class="bi bi-stars"></i>
        AI Travel Assistant
      </h2>

      <p>{summary}</p>
      <Recommendation recommendations={weather.recommendations} />
    </section>
  );
}

export default AiAssistant;
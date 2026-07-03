import "./Recommendation.css";

function Recommendation({ recommendations }) {
    if (!recommendations || recommendations.    length === 0) {
        return null;
    }

    return (
        <section className="recommendation-section">
            <ul className="recommendation-list">
                {recommendations.map((item, index) => (
                    <li key={index}>
                    <strong>{item.category}</strong>
                    {item.text}
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Recommendation;
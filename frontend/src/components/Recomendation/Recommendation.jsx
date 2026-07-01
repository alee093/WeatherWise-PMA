function Recommendation({ recommendations }) {
    if (!recommendations || recommendations.    length === 0) {
        return null;
    }

    return (
        <section>
            <h2>Recommendations</h2>

            <ul>
                {recommendations.map((item, index) => (
                    <li key={index}>
                    <strong>{item.category}</strong>
                    <br />
                    {item.text}
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Recommendation;
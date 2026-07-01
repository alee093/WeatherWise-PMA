function AiAssistant({ summary }) {
  if (!summary) return null;

  return (
    <section>
      <h2>🤖 AI Weather Assistant</h2>

      <p>{summary}</p>
    </section>
  );
}

export default AiAssistant;
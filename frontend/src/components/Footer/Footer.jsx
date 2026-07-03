import "./Footer.css";

function Footer() {
return (
    <footer className="footer">
    <div className="footer-content">
        <h3>WeatherWise</h3>

        <p>
        Smart Weather Dashboard built with React, Express, MongoDB and
        Open-Meteo API.
        </p>

        <span>© 2026 Alejandro Baran</span>

        <div className="footer-pma">
        <h4>About Product Manager Accelerator</h4>

        <p>
            The Product Manager Accelerator Program is designed to support
            PM professionals through every stage of their career. From
            students looking for entry-level jobs to Directors looking to
            take on a leadership role, our program has helped over hundreds
            of students fulfill their career aspirations. Our Product
            Manager Accelerator community is ambitious and committed.
            Through our program they have learned, honed and developed new
            PM and leadership skills, giving them a strong foundation for
            their future endeavors.
        </p>

        <a
            href="https://www.linkedin.com/company/product-manager-accelerator/"
            target="_blank"
            rel="noreferrer"
        >
            🔗 PM Accelerator on LinkedIn
        </a>
        </div>
    </div>
    </footer>
);
}

export default Footer;
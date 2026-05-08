import { useEffect, useRef, useState } from "react";
import "./App.css";

const SKILLS = {
    Languages: ["Java", "JavaScript/TypeScript", "Python", "SQL", "Bash"],
    Backend: [
        "Spring Boot",
        "Spring Security",
        "Spring Data JPA",
        "Node.js",
        "Express.js",
    ],
    Databases: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
    "DevOps & Tools": [
        "Docker",
        "AWS",
        "GitHub Actions",
        "Jenkins",
        "Linux",
        "Git",
        "Maven",
    ],
    Concepts: [
        "REST APIs",
        "Distributed Systems",
        "Caching",
        "CI/CD",
        "OOP",
        "Design Patterns",
    ],
};

const EXPERIENCE = [
    {
        title: "Software Engineer II",
        company: "JPMorgan Chase & Co.",
        period: "Starting Jun 2026",
        points: [
            "Joining JPMorgan Chase as a Software Engineer to design and build Java backend services for financial systems.",
        ],
    },
    {
        title: "Software Applications Analyst",
        company: "USIC (Underground Services, Inc.)",
        period: "Aug 2024 — Mar 2026",
        points: [
            "Designed and executed automated and manual regression/integration test suites for distributed systems, improving release reliability and reducing post-deployment defects.",
            "Validated Apache Kafka–based event pipelines, ensuring reliable asynchronous communication, accurate event processing, and fault-tolerant message delivery across services.",
            "Managed configuration consistency across development and production environments to maintain system stability and performance.",
        ],
    },
    {
        title: "Technical Support Engineer",
        company: "Tek Experts",
        period: "Mar 2023 — May 2024",
        points: [
            "Developed SQL queries and Bash automation scripts to streamline data analysis and reduce recurring system errors across enterprise client environments.",
            "Improved operational reliability by identifying data inconsistencies and implementing corrective database fixes.",
        ],
    },
    {
        title: "Associate Software Engineer",
        company: "Finish Line, Inc.",
        period: "Jul 2021 — May 2022",
        points: [
            "Built Spring-based backend REST APIs for the Associate App to deliver accurate, near real-time product location and stock data.",
            "Optimized API performance with caching and database indexing, reducing response times by 15%.",
            "Implemented customer-facing mobile features in the iOS/Android app, including the JD/Finish Line Exclusive Status membership.",
        ],
    },
];

const EDUCATION = {
    degree: "B.S. Informatics, Minor in Computer Science",
    school: "Indiana University, Bloomington, IN",
    period: "May 2021",
    awards: "Academic Honors · Deshpande Schnabel Schl Scholarship",
};

function App() {
    const [repos, setRepos] = useState(null);
    const [error, setError] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const avatarRef = useRef(null);

    const handleAvatarMove = (e) => {
        const el = avatarRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const max = 12;
        el.style.transform = `perspective(600px) rotateY(${x * max}deg) rotateX(${-y * max}deg) scale(1.03)`;
    };

    const handleAvatarLeave = () => {
        const el = avatarRef.current;
        if (!el) return;
        el.style.transform = "";
    };

    useEffect(() => {
        const PINNED_LAST = "type-ahead-search";
        Promise.all([
            fetch(
                "https://api.github.com/users/dakinnir/repos?per_page=100",
            ).then((r) => (r.ok ? r.json() : Promise.reject(r.statusText))),
            fetch(`https://api.github.com/repos/dakinnir/${PINNED_LAST}`).then(
                (r) => (r.ok ? r.json() : Promise.reject(r.statusText)),
            ),
        ])
            .then(([all, pinned]) => {
                const top = all
                    .filter((r) => !r.fork && r.name !== PINNED_LAST)
                    .sort(
                        (a, b) =>
                            b.stargazers_count - a.stargazers_count ||
                            new Date(b.pushed_at) - new Date(a.pushed_at),
                    )
                    .slice(0, 4);
                setRepos([...top, pinned]);
            })
            .catch((e) => setError(String(e)));
    }, []);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-inner">
                    <a href="#top" className="brand">
                        DAKINNIR
                    </a>
                    <button
                        type="button"
                        className="nav-toggle"
                        aria-expanded={menuOpen}
                        aria-controls="primary-nav"
                        aria-label="Toggle navigation menu"
                        onClick={() => setMenuOpen((v) => !v)}
                    >
                        <span className={`hamburger ${menuOpen ? "open" : ""}`} aria-hidden="true">
                            <span />
                            <span />
                            <span />
                        </span>
                    </button>
                    <ul
                        id="primary-nav"
                        className={`nav-links ${menuOpen ? "open" : ""}`}
                        onClick={() => setMenuOpen(false)}
                    >
                        <li>
                            <a href="#experience">Experience</a>
                        </li>
                        <li>
                            <a href="#github">GitHub</a>
                        </li>
                        <li>
                            <a href="#education">Education</a>
                        </li>
                        <li>
                            <a
                                href="/DanielAkinniranyeResume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Resume
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            <main id="top">
                <header className="hero">
                    <img
                        ref={avatarRef}
                        className="avatar"
                        src="/profile.jpg"
                        alt="Daniel Akinniranye"
                        width="260"
                        height="260"
                        onMouseMove={handleAvatarMove}
                        onMouseLeave={handleAvatarLeave}
                    />
                    <h1>Daniel Akinniranye</h1>
                    <p className="tagline">Software Engineer</p>

                    <ul className="links">
                        <li>
                            <a href="mailto:dakinnir@gmail.com">Email</a>
                        </li>
                        <li>
                            <a
                                href="https://github.com/dakinnir"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitHub
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.linkedin.com/in/daniel-akinniranye/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                LinkedIn
                            </a>
                        </li>
                    </ul>
                </header>

                <section id="about">
                    <h2>About</h2>
                    <p>
                        I'm currently a Software Engineer at J.P. Morgan Chase,
                        working primarily on Java backend systems. I'm genuinely
                        interested in technology — how systems are designed, how
                        they fail, and how they get better — and I treat every
                        project as a chance to learn something new.
                    </p>
                    <p style={{ marginTop: 12 }}>
                        I care about writing reliable, thoughtful code and keep
                        growing by building side projects, reading engineering
                        write-ups, and digging into problems outside my
                        day-to-day stack. You can find some of my projects and
                        writings on{" "}
                        <a
                            href="https://github.com/dakinnir"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            my GitHub
                        </a>
                        .
                    </p>
                </section>

                <section id="skills">
                    <h2>Skills</h2>
                    <dl className="skill-groups">
                        {Object.entries(SKILLS).map(([group, items]) => (
                            <div key={group} className="skill-group">
                                <dt>{group}</dt>
                                <dd>
                                    <ul className="skills">
                                        {items.map((s) => (
                                            <li key={s}>{s}</li>
                                        ))}
                                    </ul>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </section>

                <section id="experience">
                    <h2>Experience</h2>
                    <ol className="experience">
                        {EXPERIENCE.map((e) => (
                            <li key={e.company + e.title}>
                                <div className="role">
                                    <h3>
                                        {e.company}
                                        <em className="role-title">
                                            {e.title}
                                        </em>
                                    </h3>
                                    <span className="meta">{e.period}</span>
                                </div>
                                <ul className="bullets">
                                    {e.points.map((p, i) => (
                                        <li key={i}>{p}</li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ol>
                </section>

                <section id="github">
                    <h2>From GitHub</h2>
                    <p className="muted">
                        Latest repos from{" "}
                        <a
                            href="https://github.com/dakinnir"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            @dakinnir
                        </a>
                    </p>
                    {error && <p className="muted">Could not load repos.</p>}
                    {!repos && !error && <p className="muted">Loading…</p>}
                    {repos && (
                        <ul className="repos">
                            {repos.map((r) => (
                                <li key={r.id}>
                                    <a
                                        href={r.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <h3>{r.name}</h3>
                                        <p>
                                            {r.description || "No description"}
                                        </p>
                                        <span className="meta">
                                            {r.language || "—"} · ★{" "}
                                            {r.stargazers_count}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

                <section id="education">
                    <h2>Education</h2>
                    <div className="role">
                        <h3>{EDUCATION.degree}</h3>
                        <span className="meta">{EDUCATION.period}</span>
                    </div>
                    <p>{EDUCATION.school}</p>
                    <p className="muted" style={{ marginTop: 4 }}>
                        {EDUCATION.awards}
                    </p>
                </section>

                <footer>
                    <p>© {new Date().getFullYear()} Daniel Akinniranye</p>
                </footer>
            </main>
        </>
    );
}

export default App;

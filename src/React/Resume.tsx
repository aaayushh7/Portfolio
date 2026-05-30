import React from 'react';
import './Resume.css';

interface ResumeProps {
  onClose: () => void;
}

const Resume: React.FC<ResumeProps> = ({ onClose }) => {
  return (
    <>
      <style>
        {`
          @media (max-width: 768px) {
            .resume-content {
              padding: 1rem;
            }

            .subheading, .contact-info, .social-links {
              flex-direction: column;
              align-items: flex-start;
              gap: 0.25rem;
            }

            .date-location {
              text-align: left;
              margin-top: 0.5rem;
            }
            
            .contact-info span, .social-links span {
              display: none;
            }

            .skills-list li {
              width: 100%;
            }
            
            .resume-header h1 {
                font-size: 2.5rem;
            }

            h2 {
                font-size: 1.5rem;
            }

            h3 {
                font-size: 1.1rem;
            }
          }
        `}
      </style>
      <div className="resume-container">
        <div className="resume-content">
          <button className="close-button" onClick={onClose}>x</button>
          <div className="resume-header">
            <h1>Ayush Tiwari</h1>
            <div className="contact-info">
              <a href="mailto:aayushtiwari071@gmail.com">aayushtiwari071@gmail.com</a>
              <span>|</span>
              <a href="tel:+916306500300">+91 6306500300</a>
            </div>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/ayush-tiwari-538ab824b " target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <span>|</span>
              <a href="https://aaayushh7.vercel.app/" target="_blank" rel="noopener noreferrer">Portfolio</a>
              <span>|</span>
              <a href="https://github.com/aaayushh7" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>

          <section className="resume-section">
            <h2>Education</h2>
            <div className="section-content">
              <div className="subheading">
                <div>
                  <h3>SRM Institute of Science and Technology</h3>
                  <p>B.Tech, Computer Science — CGPA: 8.6 / 10</p>
                </div>
                <div className="date-location">
                  <p>Aug 2022 – Jun 2026 (expected)</p>
                  <p>Chennai, India</p>
                </div>
              </div>
            </div>
          </section>

          <section className="resume-section">
            <h2>Experience</h2>
            <div className="section-content">
              <div className="subheading">
                <div>
                  <h3>Software Engineer Intern, R&D</h3>
                  <p>Genpact India Pvt. Ltd.</p>
                </div>
                <div className="date-location">
                  <p>Jan 2026 – Present</p>
                  <p>Bengaluru, India</p>
                </div>
              </div>
              <ul>
                <li>Architected a Jira webhook-driven autonomous API QA pipeline (Python + LangGraph) that auto-extracted acceptance criteria from issue descriptions and orchestrated multi-stage test generation — covering positive, negative, and edge-case scenarios — with results persisted in PostgreSQL.</li>
                <li>Built a RAG-based retrieval layer to dynamically surface contextually relevant OpenAPI specs per Jira issue, enabling LLM agents to generate schema-aware test cases without manual specification lookup.</li>
                <li>Engineered a rule-based validation and enrichment engine that verified generated tests against live API schemas and auto-repaired malformed payloads — eliminating LLM dependency for structural correction and expanding coverage via sampling-based scenario generation.</li>
                <li>Executed batched, multithreaded API tests via Python concurrent.futures and auto-generated frontend QA reports with expected vs. actual responses and pass/fail analysis, reducing repetitive manual API testing effort by 65%.</li>
              </ul>

              <div className="subheading">
                <div>
                  <h3>Freelance Software Developer</h3>
                  <p>Remote / Chennai, India</p>
                </div>
                <div className="date-location">
                  <p>Jun 2025 – Dec 2025</p>
                </div>
              </div>
              <ul>
                <li>Architected and delivered a multi-platform grocery marketplace (Android / iOS / Web) end-to-end: IONIC Capacitor mobile apps, Node.js / Express / MongoDB backend, and a real-time order and inventory management admin dashboard (Rs.85K contract).</li>
              </ul>

              <div className="subheading">
                <div>
                  <h3>Research Intern</h3>
                  <p>Samsung PRISM Research</p>
                </div>
                <div className="date-location">
                  <p>Mar 2024 – Nov 2024</p>
                  <p>Chennai, India</p>
                </div>
              </div>
              <ul>
                <li>Fine-tuned Llama-2-7b for sensor anomaly detection (custom attention layers), achieving 85% accuracy (+12% vs. baseline); deployed as a RESTful inference service on Docker / Kubernetes.</li>
                <li>Reduced inference latency and compute cost by 35% via 4-bit quantization and CUDA kernel optimizations; service processed 500+ data points/sec at 99.8% uptime.</li>
              </ul>

              <div className="subheading">
                <div>
                  <h3>Software Engineer Intern</h3>
                  <p>SRM Technologies</p>
                </div>
                <div className="date-location">
                  <p>Feb 2024 – Aug 2024</p>
                  <p>Chennai, India</p>
                </div>
              </div>
              <ul>
                <li>Developed AI video-conferencing backend (Node.js / Express) with WebRTC pipeline optimizations, cutting end-to-end latency 45% for 50+ DAU; improved Next.js app load time by 30% (to 2.2s) via route-based code splitting and lazy loading.</li>
                <li>Automated meeting transcription with durable background queues, saving 15+ manual hours/week across 10+ teams; optimized SQL query performance through targeted indexing and partitioning, reducing query cost by 30%.</li>
              </ul>
            </div>
          </section>

          <section className="resume-section">
            <h2>Projects</h2>
            <div className="section-content">
              <div className="project">
                <h3><a href="https://github.com/aaayushh7" target="_blank" rel="noopener noreferrer">Pastebin-Lite | Java 17, Spring Boot, PostgreSQL, React (Jan 2026)</a></h3>
                <ul>
                  <li>Built a paste-sharing service with TTL-based expiry, atomic view-count updates (database transactions preventing race conditions under concurrent load), and cryptographically secure 10-char IDs via SecureRandom.</li>
                </ul>
              </div>

              <div className="project">
                <h3><a href="https://github.com/aaayushh7" target="_blank" rel="noopener noreferrer">URL Shortener Service | Java, Spring Boot, Redis, PostgreSQL (Dec 2025)</a></h3>
                <ul>
                  <li>Engineered a scalable URL shortening service with custom aliases, redirect analytics, and expiration policies; implemented Redis caching and composite database indexing to minimise redirect latency under high concurrency.</li>
                </ul>
              </div>

              <div className="project">
                <h3><a href="https://github.com/aaayushh7" target="_blank" rel="noopener noreferrer">BookNest | Mistral AI, React, Firebase (Aug 2025)</a></h3>
                <ul>
                  <li>Built an AI-assisted reading platform with ISBN barcode scanning (reducing book-entry time by 95%), personalised Mistral-7B recommendations, and gamified streaks; scaled to 100+ users with a 65% engagement lift.</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="resume-section">
            <h2>Technical Skills</h2>
            <div className="section-content">
              <ul className="skills-list">
                <li><strong>Languages:</strong> Java, Python, JavaScript / TypeScript, SQL, C++</li>
                <li><strong>Backend & APIs:</strong> Spring Boot, Node.js / Express, FastAPI, REST, GraphQL, Microservices, Event-driven Architecture</li>
                <li><strong>Databases & Messaging:</strong> PostgreSQL, MongoDB, Redis, Kafka</li>
                <li><strong>Cloud & DevOps:</strong> Oracle Cloud Infrastructure (OCI), AWS (EC2, S3), Docker, Kubernetes, CI/CD</li>
                <li><strong>AI / ML:</strong> PyTorch, LangGraph, LLM Fine-tuning (Llama-2, Mistral), 4-bit Quantization</li>
                <li><strong>Concepts:</strong> System Design, Software Architecture, Data Structures & Algorithms, Distributed Systems, Concurrency, Observability</li>
              </ul>
            </div>
          </section>
          
          <section className="resume-section">
            <h2>Certifications</h2>
            <div className="section-content">
              <ul className="cert-list">
                <li>Oracle: Cloud Infrastructure (OCI) Foundations Associate (2024)</li>
                <li>Fortinet: Certified Associate in Cybersecurity (2024)</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Resume;

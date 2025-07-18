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
              <a href="https://linkedin.com/in/ayush-tiwari-538ab824b" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <span>|</span>
              <a href="https://aaayushh7.vercel.app/" target="_blank" rel="noopener noreferrer">Portfolio</a>
              <span>|</span>
              <a href="https://github.com/aaayushh7" target="_blank" rel="noopener noreferrer">GitHub: 50+ projects</a>
            </div>
          </div>

          <section className="resume-section">
            <h2>Education</h2>
            <div className="section-content">
              <div className="subheading">
                <div>
                  <h3>SRM Institute of Science and Technology</h3>
                  <p>B.Tech Computer Science (CGPA: 8.55/10)</p>
                </div>
                <div className="date-location">
                  <p>Aug 2022 – Jun 2026</p>
                  <p>Chennai, India</p>
                </div>
              </div>
              <div className="subheading">
                <div>
                  <h3>Lucknow Public School</h3>
                  <p>Higher Secondary Education (XII: 78%, X: 92.8%)</p>
                </div>
                <div className="date-location">
                  <p>Apr 2020 – Apr 2022</p>
                  <p>Lucknow, India</p>
                </div>
              </div>
            </div>
          </section>

          <section className="resume-section">
            <h2>Experience</h2>
            <div className="section-content">
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
                <li>Engineered AI video conferencing platform serving 200+ daily users, reducing latency by 45% through WebRTC optimizations.</li>
                <li>Boosted Next.js performance by 30% (2.2s load time) via code splitting and lazy loading techniques.</li>
                <li>Automated meeting transcriptions saving 15+ weekly hours for 50+ teams.</li>
              </ul>

              <div className="subheading">
                <div>
                  <h3>Research Intern</h3>
                  <p>Samsung Prism Research</p>
                </div>
                <div className="date-location">
                  <p>Mar 2024 – Nov 2024</p>
                  <p>Chennai, India</p>
                </div>
              </div>
              <ul>
                <li>Achieved 85% anomaly detection accuracy (12% improvement) by fine-tuning Llama2-7b with custom attention mechanisms.</li>
                <li>Accelerated model inference by 35% through quantization and CUDA kernel optimizations.</li>
                <li>Deployed edge solution processing 500+ sensor data points/second with 99.8% uptime.</li>
              </ul>

              <div className="subheading">
                <div>
                  <h3>Web Development Head</h3>
                  <p>CINTEL's Next-Gen AΙ</p>
                </div>
                <div className="date-location">
                  <p>Aug 2023 – Jun 2024</p>
                  <p>Chennai, India</p>
                </div>
              </div>
              <ul>
                <li>Led team of 8 engineers delivering 12+ full-stack solutions with 99.9% uptime for 1000+ users.</li>
                [span_0](start_span)<li>Mentored 15+ developers; improved code review efficiency by 25% through workshop training.[span_0](end_span)</li>
                <li>Automated CI/CD pipelines increasing deployment frequency by 40% and reducing errors by 60%.</li>
              </ul>
            </div>
          </section>

          <section className="resume-section">
            <h2>Projects</h2>
            <div className="section-content">
              <div className="project">
                <h3><a href="https://cravehub.store/" target="_blank" rel="noopener noreferrer">CraveHub | Production Q-commerce Platform (React, Node, Ionic)</a></h3>
                <ul>
                  [span_1](start_span)<li>Architected quick commerce solution handling 50+ concurrent orders with 99.5% reliability.[span_1](end_span)</li>
                  [span_2](start_span)<li>Generated 80K+ revenue through freelance development; iOS/Android launch scheduled August 2024.[span_2](end_span)</li>
                  [span_3](start_span)<li>Integrated payment gateway processing 8L+ transactions; reduced cart abandonment by 22%.[span_3](end_span)</li>
                </ul>
              </div>

              <div className="project">
                <h3><a href="https://github.com/aaayushh7" target="_blank" rel="noopener noreferrer">BookNest | AI Reading Platform (Mistral AI, React, Firebase)</a></h3>
                <ul>
                  <li>Built Fable-like platform with Google Auth, reading streaks, and session notes; [span_4](start_span)500+ registered users.[span_4](end_span)</li>
                  <li>Implemented QR scanning reducing book entry time by 95% (60s to 3s); [span_5](start_span)10K+ summaries generated.[span_5](end_span)</li>
                  <li>Boosted engagement 65% using Mistral AI recommendations and genre-based achievement badges.</li>
                </ul>
              </div>

              <div className="project">
                <h3><a href="https://github.com/aaayushh7" target="_blank" rel="noopener noreferrer">Authenticheck | Secure Video Platform (WebRTC, TensorFlow.js)</a></h3>
                <ul>
                  [span_6](start_span)<li>Built real-time facial recognition with 98.7% accuracy preventing 120+ unauthorized access attempts.[span_6](end_span)</li>
                  <li>Reduced bandwidth usage by 30% through video compression algorithms.</li>
                  <li>Automated meeting summaries saving participants 15+ hours/week in documentation.</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="resume-section">
            <h2>Technical Skills</h2>
            <div className="section-content">
              <ul className="skills-list">
                <li><strong>Languages:</strong> JavaScript/TS, Python, Java (Proficient)</li>
                <li><strong>Backend:</strong> Node.js, Express, Microservices, REST/GraphQL, AWS Lambda</li>
                <li><strong>AI/ML:</strong> PyTorch, TensorFlow, LLM Fine-tuning, Computer Vision, NLP</li>
                <li><strong>Infra:</strong> AWS, Docker, Kubernetes, CI/CD, Redis, MongoDB Atlas</li>
                <li><strong>Security:</strong> JWT, OAuth2, SSL/TLS, Cybersecurity Best Practices</li>
              </ul>
            </div>
          </section>
          
          <section className="resume-section">
            <h2>Certifications</h2>
            <div className="section-content">
              <ul className="cert-list">
                <li>JPMorgan Chase: Software Engineering & Investment Banking Virtual Experience (2025)</li>
                <li>Oracle: Cloud Infrastructure (OCI) Foundations Associate (2024)</li>
                <li>Fortinet: Certified Associate in Cybersecurity (2024)</li>
                <li>Coursera: Data Structures and Algorithms Specialization</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Resume;

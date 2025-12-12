import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home">
      <!-- Side Navigation -->
      <nav class="sidenav">
        <div class="logo-wrapper">
          <div class="logo">App</div>
        </div>
       
      </nav>
      <!-- Main Content -->
      <main class="main-content">
        <!-- Hero with Split Layout -->
        <section class="hero-split">
          <div class="hero-left">
            <div class="tag">Agence Digitale Premium</div>
            <h1 class="title">
              Créons ensemble
              <span class="highlight">l'excellence digitale</span>
            </h1>
            <p class="description">
              Nous transformons vos idées en expériences digitales extraordinaires 
              qui captivent et convertissent.
            </p>
            <div class="cta-group">
              <button class="btn-primary">
                Démarrer un projet
                <span class="arrow">→</span>
              </button>
              <div class="stats-inline">
                <div class="stat-mini">
                  <strong>250+</strong>
                  <span>Projets réussis</span>
                </div>
                <div class="stat-mini">
                  <strong>4.9/5</strong>
                  <span>Satisfaction client</span>
                </div>
              </div>
            </div>
          </div>
          
        </section>
        <!-- Services Minimal -->
        <section class="services-minimal">
          <div class="section-intro">
            <span class="label">Services</span>
            <h2>Ce que nous faisons de mieux</h2>
          </div>

          <div class="services-list">
            <div class="service-item">
              <div class="service-number">01</div>
              <div class="service-content">
                <h3>Stratégie Digitale</h3>
                <p>Analyse approfondie et roadmap personnalisée pour atteindre vos objectifs business</p>
              </div>
              <div class="service-link">→</div>
            </div>

            <div class="service-item">
              <div class="service-number">02</div>
              <div class="service-content">
                <h3>Design & Branding</h3>
                <p>Identité visuelle forte et interfaces qui marquent les esprits</p>
              </div>
              <div class="service-link">→</div>
            </div>

            <div class="service-item">
              <div class="service-number">03</div>
              <div class="service-content">
                <h3>Développement Web</h3>
                <p>Applications web modernes, scalables et performantes</p>
              </div>
              <div class="service-link">→</div>
            </div>

            <div class="service-item">
              <div class="service-number">04</div>
              <div class="service-content">
                <h3>Marketing Digital</h3>
                <p>Campagnes data-driven pour maximiser votre ROI</p>
              </div>
              <div class="service-link">→</div>
            </div>
          </div>
        </section>

        <!-- Metrics Dashboard Style -->
        <section class="metrics">
          <div class="metrics-grid">
            <div class="metric-card primary">
              <div class="metric-header">
                <span class="metric-label">Croissance</span>
                <span class="trend up">↑ 127%</span>
              </div>
              <div class="metric-value">2.4M+</div>
              <div class="metric-desc">Utilisateurs actifs mensuels</div>
              <div class="metric-chart">
                <div class="bar" style="height: 60%"></div>
                <div class="bar" style="height: 80%"></div>
                <div class="bar" style="height: 70%"></div>
                <div class="bar" style="height: 100%"></div>
              </div>
            </div>

            <div class="metric-card secondary">
              <div class="metric-header">
                <span class="metric-label">Performance</span>
                <span class="trend up">↑ 98%</span>
              </div>
              <div class="metric-value">99.9%</div>
              <div class="metric-desc">Taux de disponibilité</div>
            </div>

            <div class="metric-card tertiary">
              <div class="metric-header">
                <span class="metric-label">Équipe</span>
              </div>
              <div class="metric-value">45+</div>
              <div class="metric-desc">Experts passionnés</div>
            </div>
          </div>
        </section>

        <!-- Testimonial Modern -->
        <section class="testimonial-modern">
          <div class="testimonial-content">
            <div class="quote-mark">"</div>
            <p class="testimonial-quote">
              Une collaboration exceptionnelle qui a dépassé toutes nos attentes. 
              L'équipe a su comprendre notre vision et la transformer en une solution 
              innovante qui génère des résultats concrets.
            </p>
            <div class="testimonial-footer">
              <div class="author-info">
                <img src="data:image/svg+xml,%3Csvg width='50' height='50' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='25' cy='25' r='25' fill='%23667eea'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='20' font-weight='bold'%3ESD%3C/text%3E%3C/svg%3E" alt="Avatar" class="author-avatar">
                <div>
                  <div class="author-name">Sarah Dubois</div>
                  <div class="author-title">Directrice Marketing, InnovTech</div>
                </div>
              </div>
              <div class="rating">
                ⭐⭐⭐⭐⭐
              </div>
            </div>
          </div>
        </section>

        <!-- CTA Minimal -->
        <section class="cta-minimal">
          <h2>Prêt à démarrer ?</h2>
          <p>Discutons de votre projet autour d'un café virtuel</p>
          <button class="btn-cta">
            Réserver un créneau
            <span class="icon-arrow">→</span>
          </button>
        </section>

        <!-- Footer -->
        <footer class="footer">
          <div class="footer-content">
            <div class="footer-left">
              <div class="footer-logo">MonEntreprise</div>
              <p>Excellence digitale depuis 2015</p>
            </div>
            <div class="footer-links">
              <a href="#">LinkedIn</a>
              <a href="#">Twitter</a>
              <a href="#">Instagram</a>
              <a href="#">Dribbble</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  `,
  styles: [`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .home {
      display: flex;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #fafbfc;
      min-height: 100vh;
    }

    /* Side Navigation */
    .sidenav {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      width: 80px;
      background: #0f1419;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 30px 0;
      z-index: 100;
    }

    .logo-wrapper {
      margin-bottom: 50px;
    }

    .logo {
      width: 45px;
      height: 45px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 800;
      font-size: 1.1rem;
    }

    

    
    /* Main Content */
    .main-content {
      flex: 1;
      margin-left: 80px;
    }

    /* Hero Split */
    .hero-split {
      display: grid;
      grid-template-columns: 1fr 1fr;
      min-height: 100vh;
      align-items: center;
      gap: 60px;
      padding: 100px 80px;
      background: white;
    }

    .hero-left {
      max-width: 600px;
    }

    .tag {
      display: inline-block;
      padding: 8px 16px;
      background: #f0f4ff;
      color: #667eea;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 30px;
    }

    .title {
      font-size: 3.5rem;
      font-weight: 800;
      line-height: 1.1;
      color: #0f1419;
      margin-bottom: 25px;
    }

    .highlight {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: block;
    }

    .description {
      font-size: 1.2rem;
      color: #64748b;
      line-height: 1.7;
      margin-bottom: 40px;
    }

    .cta-group {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }

    .btn-primary {
      background: #0f1419;
      color: white;
      border: none;
      padding: 18px 35px;
      border-radius: 12px;
      font-size: 1.05rem;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 12px;
      transition: all 0.3s;
      width: fit-content;
    }

    .btn-primary:hover {
      transform: translateX(5px);
      background: #1a1f26;
    }

    .arrow {
      transition: transform 0.3s;
    }

    .btn-primary:hover .arrow {
      transform: translateX(5px);
    }

    .stats-inline {
      display: flex;
      gap: 40px;
    }

    .stat-mini {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .stat-mini strong {
      font-size: 1.8rem;
      color: #0f1419;
    }

    .stat-mini span {
      font-size: 0.9rem;
      color: #64748b;
    }

   


    .card-1 {
      top: 50px;
      right: 100px;
      animation-delay: 0s;
    }

    .card-2 {
      top: 200px;
      right: 50px;
      animation-delay: 0.5s;
    }

    .card-3 {
      top: 350px;
      right: 120px;
      animation-delay: 1s;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }

   

  

   
    /* Services Minimal */
    .services-minimal {
      padding: 120px 80px;
      background: #fafbfc;
    }

    .section-intro {
      margin-bottom: 80px;
    }

    .label {
      display: block;
      color: #667eea;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-size: 0.85rem;
      margin-bottom: 15px;
    }

    .section-intro h2 {
      font-size: 3rem;
      color: #0f1419;
      font-weight: 800;
    }

    .services-list {
      display: flex;
      flex-direction: column;
      gap: 1px;
      background: #e2e8f0;
    }

    .service-item {
      background: white;
      padding: 50px 60px;
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 40px;
      align-items: center;
      transition: all 0.3s;
      cursor: pointer;
    }

    .service-item:hover {
      background: #f8fafc;
      padding-left: 80px;
    }

    .service-number {
      font-size: 1.2rem;
      font-weight: 700;
      color: #cbd5e0;
    }

    .service-content h3 {
      font-size: 1.8rem;
      color: #0f1419;
      margin-bottom: 10px;
    }

    .service-content p {
      color: #64748b;
      line-height: 1.6;
    }

    .service-link {
      font-size: 2rem;
      color: #cbd5e0;
      transition: all 0.3s;
    }

    .service-item:hover .service-link {
      color: #667eea;
      transform: translateX(10px);
    }

    /* Metrics Dashboard */
    .metrics {
      padding: 120px 80px;
      background: white;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 30px;
    }

    .metric-card {
      padding: 40px;
      border-radius: 20px;
      position: relative;
      overflow: hidden;
    }

    .metric-card.primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .metric-card.secondary {
      background: #0f1419;
      color: white;
    }

    .metric-card.tertiary {
      background: #f0f4ff;
      color: #0f1419;
    }

    .metric-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
    }

    .metric-label {
      font-size: 0.9rem;
      opacity: 0.8;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .trend {
      font-size: 0.9rem;
      font-weight: 700;
      padding: 5px 12px;
      border-radius: 20px;
    }

    .trend.up {
      background: rgba(16, 185, 129, 0.2);
      color: #10b981;
    }

    .metric-value {
      font-size: 3.5rem;
      font-weight: 800;
      margin-bottom: 10px;
    }

    .metric-desc {
      font-size: 1rem;
      opacity: 0.8;
    }

    .metric-chart {
      display: flex;
      gap: 8px;
      align-items: flex-end;
      height: 60px;
      margin-top: 30px;
    }

    .bar {
      flex: 1;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 4px;
      transition: all 0.3s;
    }

    .metric-card:hover .bar {
      background: rgba(255, 255, 255, 0.5);
    }

    /* Testimonial Modern */
    .testimonial-modern {
      padding: 120px 80px;
      background: #fafbfc;
    }

    .testimonial-content {
      max-width: 900px;
      margin: 0 auto;
      background: white;
      padding: 60px;
      border-radius: 20px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    }

    .quote-mark {
      font-size: 6rem;
      color: #667eea;
      line-height: 1;
      margin-bottom: 20px;
      opacity: 0.2;
    }

    .testimonial-quote {
      font-size: 1.5rem;
      line-height: 1.8;
      color: #0f1419;
      margin-bottom: 40px;
    }

    .testimonial-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .author-info {
      display: flex;
      gap: 20px;
      align-items: center;
    }

    .author-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }

    .author-name {
      font-weight: 700;
      color: #0f1419;
      margin-bottom: 5px;
    }

    .author-title {
      color: #64748b;
      font-size: 0.95rem;
    }

    .rating {
      font-size: 1.2rem;
    }

    /* CTA Minimal */
    .cta-minimal {
      padding: 150px 80px;
      text-align: center;
      background: white;
    }

    .cta-minimal h2 {
      font-size: 3rem;
      color: #0f1419;
      margin-bottom: 20px;
    }

    .cta-minimal p {
      font-size: 1.3rem;
      color: #64748b;
      margin-bottom: 50px;
    }

    .btn-cta {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 20px 45px;
      border-radius: 12px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 15px;
      transition: all 0.3s;
    }

    .btn-cta:hover {
      transform: translateY(-3px);
      box-shadow: 0 15px 40px rgba(102, 126, 234, 0.3);
    }

    .icon-arrow {
      transition: transform 0.3s;
    }

    .btn-cta:hover .icon-arrow {
      transform: translateX(5px);
    }

    /* Footer */
    .footer {
      padding: 60px 80px;
      background: #0f1419;
      color: white;
    }

    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .footer-logo {
      font-size: 1.5rem;
      font-weight: 800;
      margin-bottom: 10px;
    }

    .footer-left p {
      color: #64748b;
    }

    .footer-links {
      display: flex;
      gap: 30px;
    }

    .footer-links a {
      color: #64748b;
      text-decoration: none;
      transition: color 0.3s;
    }

    .footer-links a:hover {
      color: white;
    }

    /* Responsive */
    @media (max-width: 1200px) {
      .hero-split {
        grid-template-columns: 1fr;
        padding: 80px 40px;
      }

     
      .services-minimal,
      .metrics,
      .testimonial-modern,
      .cta-minimal,
      .footer {
        padding-left: 40px;
        padding-right: 40px;
      }

      .metrics-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .sidenav {
        width: 60px;
        padding: 20px 0;
      }

      .main-content {
        margin-left: 60px;
      }

      .title {
        font-size: 2.5rem;
      }

      .service-item {
        grid-template-columns: 1fr;
        gap: 20px;
        padding: 30px;
      }

      .service-number {
        display: none;
      }

      .testimonial-quote {
        font-size: 1.2rem;
      }

      .footer-content {
        flex-direction: column;
        gap: 30px;
        text-align: center;
      }
    }
  `]
})
export class HomeComponent {}
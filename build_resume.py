import os
import sys
import base64
import subprocess
from pathlib import Path
import fitz  # PyMuPDF

def get_base64_image(image_path):
    if os.path.exists(image_path):
        with open(image_path, "rb") as img_file:
            return "data:image/jpeg;base64," + base64.b64encode(img_file.read()).decode('utf-8')
    return ""

def create_resume_html(output_html_path="resume.html"):
    profile_b64 = get_base64_image("profile.jpg")
    
    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Harsh Rathore — MERN Stack Developer | Full-Stack Web Engineer</title>
<style>
  @page {{
    size: A4 portrait;
    margin: 8.5mm 11.5mm 8.5mm 11.5mm;
  }}
  
  * {{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }}

  body {{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #1e293b;
    background-color: #ffffff;
    font-size: 8.95pt;
    line-height: 1.32;
    letter-spacing: -0.01em;
  }}

  a {{
    color: #1d4ed8;
    text-decoration: none;
    font-weight: 600;
  }}

  a:hover {{
    text-decoration: underline;
  }}

  /* HEADER BLOCK */
  .header {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2.2px solid #0f172a;
    padding-bottom: 5.5px;
    margin-bottom: 6px;
  }}

  .header-left {{
    flex: 1;
  }}

  .candidate-name {{
    font-size: 20pt;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.025em;
    line-height: 1.05;
    text-transform: uppercase;
  }}

  .candidate-title {{
    font-size: 10.2pt;
    font-weight: 750;
    color: #1d4ed8;
    margin-top: 1.5px;
    margin-bottom: 3.5px;
    letter-spacing: 0.02em;
  }}

  .contact-bar {{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
    font-size: 8.2pt;
    color: #475569;
    font-weight: 500;
  }}

  .contact-item {{
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }}

  .contact-item svg {{
    width: 11px;
    height: 11px;
    fill: #1d4ed8;
    flex-shrink: 0;
  }}

  .header-photo {{
    margin-left: 14px;
    flex-shrink: 0;
  }}

  .header-photo img {{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center 20%;
    border: 2px solid #0f172a;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12);
  }}

  /* SECTION FORMATTING */
  .section {{
    margin-bottom: 6.5px;
  }}

  .section:last-child {{
    margin-bottom: 0;
  }}

  .section-title {{
    font-size: 9.1pt;
    font-weight: 800;
    color: #0f172a;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    border-bottom: 1.2px solid #cbd5e1;
    padding-bottom: 1.5px;
    margin-bottom: 3.8px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }}

  .section-title span.accent-tag {{
    font-size: 7.2pt;
    font-weight: 600;
    color: #1d4ed8;
    text-transform: none;
    letter-spacing: normal;
  }}

  /* SUMMARY */
  .summary-text {{
    font-size: 8.5pt;
    color: #334155;
    line-height: 1.34;
    text-align: justify;
  }}

  .summary-text strong {{
    color: #0f172a;
  }}

  /* EDUCATION ROW */
  .edu-container {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }}

  .edu-card {{
    background: #f8fafc;
    border: 0.5px solid #e2e8f0;
    border-radius: 3px;
    padding: 4px 8px;
  }}

  .edu-degree {{
    font-size: 8.7pt;
    font-weight: 750;
    color: #0f172a;
  }}

  .edu-inst {{
    font-size: 8.1pt;
    font-weight: 600;
    color: #1d4ed8;
  }}

  .edu-meta {{
    font-size: 7.7pt;
    color: #64748b;
    display: flex;
    justify-content: space-between;
    margin-top: 1.5px;
  }}

  .edu-meta strong {{
    color: #0f172a;
  }}

  /* SKILLS TABLE / GRID */
  .skills-container {{
    display: flex;
    flex-direction: column;
    gap: 2.2px;
  }}

  .skill-row {{
    display: flex;
    font-size: 8.3pt;
    line-height: 1.30;
  }}

  .skill-category {{
    width: 148px;
    font-weight: 700;
    color: #0f172a;
    flex-shrink: 0;
  }}

  .skill-list {{
    flex: 1;
    color: #334155;
  }}

  .skill-list strong {{
    color: #0f172a;
    font-weight: 600;
  }}

  /* PROJECTS ENTRY */
  .entry {{
    margin-bottom: 4.8px;
  }}

  .entry:last-child {{
    margin-bottom: 0;
  }}

  .entry-header {{
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }}

  .entry-title-group {{
    display: flex;
    align-items: baseline;
    gap: 5px;
  }}

  .entry-title {{
    font-size: 8.9pt;
    font-weight: 750;
    color: #0f172a;
  }}

  .entry-tag {{
    font-size: 8pt;
    font-weight: 600;
    color: #1d4ed8;
  }}

  .entry-meta {{
    font-size: 7.9pt;
    font-weight: 600;
    color: #64748b;
    text-align: right;
    white-space: nowrap;
  }}

  .link-pill {{
    display: inline-flex;
    align-items: center;
    gap: 2px;
    padding: 0.5px 5px;
    background: #eff6ff;
    border: 0.5px solid #bfdbfe;
    border-radius: 3px;
    font-size: 7.3pt;
    font-weight: 600;
    color: #1d4ed8;
    margin-right: 2px;
  }}

  .link-pill:hover {{
    background: #dbeafe;
  }}

  .entry-tech-badge {{
    font-size: 7.5pt;
    font-weight: 600;
    color: #475569;
    margin-bottom: 1.5px;
  }}

  .entry-tech-badge span {{
    color: #1d4ed8;
  }}

  /* BULLET POINTS */
  ul.bullets {{
    list-style-type: none;
    padding-left: 0;
    margin-top: 1px;
  }}

  ul.bullets li {{
    position: relative;
    padding-left: 10px;
    font-size: 8.25pt;
    line-height: 1.30;
    color: #334155;
    margin-bottom: 1.6px;
    text-align: justify;
  }}

  ul.bullets li:last-child {{
    margin-bottom: 0;
  }}

  ul.bullets li::before {{
    content: "\\25AA";
    position: absolute;
    left: 0;
    color: #1d4ed8;
    font-size: 8.2pt;
    top: -0.5px;
  }}

  ul.bullets strong {{
    color: #0f172a;
    font-weight: 600;
  }}

  /* RESEARCH PAPER CARDS */
  .research-grid {{
    display: flex;
    flex-direction: column;
    gap: 3.2px;
  }}

  .paper-item {{
    font-size: 8.15pt;
    line-height: 1.30;
    color: #334155;
    padding-left: 10px;
    position: relative;
    text-align: justify;
  }}

  .paper-item::before {{
    content: "\\25AA";
    position: absolute;
    left: 0;
    color: #1d4ed8;
    font-size: 8.2pt;
    top: -0.5px;
  }}

  .paper-title {{
    font-weight: 700;
    color: #0f172a;
  }}

  .paper-journal {{
    font-weight: 600;
    color: #1d4ed8;
  }}

  .doi-badge {{
    display: inline-block;
    padding: 0px 4px;
    background: #f1f5f9;
    border: 0.5px solid #cbd5e1;
    border-radius: 2.5px;
    font-size: 7.2pt;
    font-weight: 600;
    color: #1d4ed8;
    margin-left: 3px;
  }}

  @media print {{
    html, body {{
      width: 100%;
      height: 100%;
      overflow: hidden;
    }}
  }}
</style>
</head>
<body>

  <!-- HEADER -->
  <header class="header">
    <div class="header-left">
      <h1 class="candidate-name">HARSH RATHORE</h1>
      <div class="candidate-title">MERN STACK DEVELOPER | FULL-STACK WEB ENGINEER</div>
      <div class="contact-bar">
        <span class="contact-item">
          <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          Surat, Gujarat, India
        </span>
        <span class="contact-item">
          <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          <a href="mailto:harshpratapsinghrathore555@gmail.com">harshpratapsinghrathore555@gmail.com</a>
        </span>
        <span class="contact-item">
          <svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          <a href="https://www.linkedin.com/in/harsh-rathore-1597012aa/" target="_blank">LinkedIn</a>
        </span>
        <span class="contact-item">
          <svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          <a href="https://github.com/harsh-pratap-singh-rathore" target="_blank">GitHub</a>
        </span>
        <span class="contact-item">
          <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
          <a href="https://harshrathore.vercel.app" target="_blank">Portfolio</a>
        </span>
      </div>
    </div>
    {f'<div class="header-photo"><img src="{profile_b64}" alt="Harsh Rathore"></div>' if profile_b64 else ''}
  </header>

  <!-- PROFESSIONAL SUMMARY -->
  <section class="section">
    <div class="section-title">
      PROFESSIONAL SUMMARY
      <span class="accent-tag">MERN Stack Architecture | High-Performance Web Systems | AI-Accelerated Delivery</span>
    </div>
    <p class="summary-text">
      <strong>MERN Stack Developer</strong> specializing in building scalable web applications with <strong>React (18/19)</strong>, <strong>Node.js</strong>, <strong>Express</strong>, and <strong>MongoDB</strong>. Proven track record engineering low-latency browser applications (&lt;50ms response), modular REST APIs, and commercial e-commerce platforms indexing 10,000+ items. Power-user of modern AI systems (<strong>Antigravity</strong>, <strong>Claude Code</strong>, local LLMs via Ollama) to accelerate feature scaffolding, testing, and full-stack development cycles by 3x. Published researcher with <strong>4 peer-reviewed papers</strong> across international journals (IRJMETS &amp; IJRASET).
    </p>
  </section>

  <!-- EDUCATION -->
  <section class="section">
    <div class="section-title">EDUCATION</div>
    <div class="edu-container">
      <div class="edu-card">
        <div class="edu-degree">Master of Computer Applications (MCA)</div>
        <div class="edu-inst">Uka Tarsadia University, Bardoli, Gujarat</div>
        <div class="edu-meta">
          <span>Full-Stack Web Architecture, Distributed Systems &amp; Advanced Algorithms</span>
          <span><strong>2026 - 2028</strong></span>
        </div>
      </div>
      <div class="edu-card">
        <div class="edu-degree">Bachelor of Computer Applications (BCA)</div>
        <div class="edu-inst">Uka Tarsadia University, Bardoli, Gujarat</div>
        <div class="edu-meta">
          <span>Software Engineering, Database Management &amp; Core CS | <strong>7.77 CGPA</strong></span>
          <span><strong>2023 - 2026</strong></span>
        </div>
      </div>
    </div>
  </section>

  <!-- TECHNICAL SKILLS -->
  <section class="section">
    <div class="section-title">TECHNICAL SKILLS</div>
    <div class="skills-container">
      <div class="skill-row">
        <div class="skill-category">Frontend &amp; Web UI:</div>
        <div class="skill-list"><strong>React.js (18/19)</strong>, <strong>JavaScript (ES6+)</strong>, HTML5, CSS3, Tailwind CSS, Responsive Web Design, Web Audio API DSP, State Management (Context, Hooks), Electron.</div>
      </div>
      <div class="skill-row">
        <div class="skill-category">Backend &amp; Databases:</div>
        <div class="skill-list"><strong>Node.js</strong>, <strong>Express.js</strong>, RESTful API Architecture, PHP, <strong>MongoDB (Mongoose, Document Modeling, Aggregations)</strong>, MySQL (Schema Design &amp; Queries), Session/JWT Auth.</div>
      </div>
      <div class="skill-row">
        <div class="skill-category">AI Systems &amp; Dev Tools:</div>
        <div class="skill-list"><strong>Antigravity</strong>, <strong>Claude Code</strong>, Local LLMs (Ollama), Prompt Engineering, AI-Assisted Full-Stack Building, Git &amp; GitHub, Postman, Linux/Bash, Vercel.</div>
      </div>
      <div class="skill-row">
        <div class="skill-category">Deep Learning &amp; Vision:</div>
        <div class="skill-list"><strong>PyTorch</strong>, <strong>TensorFlow / Keras</strong>, YOLO11n (Object Detection), CNNs (ResNet-50/18, MobileNetV2, EfficientNet-B0), Fast Fourier Transform (FFT), Model Evaluation &amp; Benchmarking.</div>
      </div>
    </div>
  </section>

  <!-- PROJECTS (ALL 4 FROM PORTFOLIO) -->
  <section class="section">
    <div class="section-title">FEATURED PROJECTS (PORTFOLIO PLATFORMS)</div>

    <!-- PROJECT 1: DROPIFY -->
    <div class="entry">
      <div class="entry-header">
        <div class="entry-title-group">
          <span class="entry-title">Dropify &mdash; Audiophile Web Streaming &amp; DSP Engine</span>
          <span class="entry-tag">| Flagship Web &amp; Desktop App</span>
        </div>
        <span class="entry-meta"><a href="https://github.com/harsh-pratap-singh-rathore/Dropify" target="_blank" class="link-pill">GitHub ↗</a> 2026</span>
      </div>
      <div class="entry-tech-badge"><span>Stack:</span> React 18, Web Audio API DSP, Node.js, Express, InnerTube API, Electron, Kotlin (Android), Tailwind CSS</div>
      <ul class="bullets">
        <li>Architected low-latency web audio streaming platform featuring browser-native <strong>10-band parametric equalizer</strong> (&plusmn;12dB biquad IIR peaking filters) and mid/side stereo acoustic stage widening.</li>
        <li>Engineered multi-source millisecond-synchronized lyrics resolver (LRCLIB API) and circadian playback auto-mixes; packaged unified cross-platform clients across Web, Desktop Electron, and Android APK with <strong>&lt;50ms stream initiation</strong>.</li>
      </ul>
    </div>

    <!-- PROJECT 2: SHREE KARNI TEXTILES -->
    <div class="entry">
      <div class="entry-header">
        <div class="entry-title-group">
          <span class="entry-title">Shree Karni Textiles &mdash; Enterprise E-Commerce Website for Client</span>
          <span class="entry-tag">| Client Production</span>
        </div>
        <span class="entry-meta"><a href="https://github.com/harsh-pratap-singh-rathore" target="_blank" class="link-pill">GitHub ↗</a> 2026</span>
      </div>
      <div class="entry-tech-badge"><span>Stack:</span> PHP, JavaScript (ES6+), MySQL, CSS3, Responsive Design, Composer</div>
      <ul class="bullets">
        <li>Architected full-stack enterprise e-commerce platform for custom textile distribution, cataloging <strong>10,000+ fabric SKUs</strong> with optimized image delivery pipelines and sub-second page loads.</li>
        <li>Engineered secure session authorization state, transactional cart persistence, and dynamic multi-parameter inventory indexing, handling concurrent wholesale catalog browsing and direct customer order inquiries.</li>
      </ul>
    </div>

    <!-- PROJECT 3: CODECANVAS -->
    <div class="entry">
      <div class="entry-header">
        <div class="entry-title-group">
          <span class="entry-title">CodeCanvas &mdash; Local AI-Assisted Portfolio Builder &amp; UI Workbench</span>
          <span class="entry-tag">| Developer Tooling</span>
        </div>
        <span class="entry-meta"><a href="https://github.com/harsh-pratap-singh-rathore/CodeCanvas" target="_blank" class="link-pill">GitHub ↗</a> 2026</span>
      </div>
      <div class="entry-tech-badge"><span>Stack:</span> JavaScript (ES6+), HTML5 Canvas, CSS3 Grid/Flexbox Engine, Local AI Code Generation</div>
      <ul class="bullets">
        <li>Engineered interactive developer creation suite allowing users to visually manipulate and inspect responsive layouts with zero external framework dependencies running at <strong>60 FPS</strong>.</li>
        <li>Integrated local AI code generation (leveraging <strong>Antigravity</strong> and <strong>Claude Code</strong> workflows) to translate natural language design instructions into clean CSS/HTML markup, slashing layout prototyping and site building time by <strong>60%</strong>.</li>
      </ul>
    </div>

    <!-- PROJECT 4: MYVOICE -->
    <div class="entry">
      <div class="entry-header">
        <div class="entry-title-group">
          <span class="entry-title">MyVoice &mdash; Civic Issue Reporting &amp; Municipal Triage Platform</span>
          <span class="entry-tag">| Civic Tech Platform</span>
        </div>
        <span class="entry-meta"><a href="https://github.com/harsh-pratap-singh-rathore" target="_blank" class="link-pill">GitHub ↗</a> 2024</span>
      </div>
      <div class="entry-tech-badge"><span>Stack:</span> PHP, MySQL, JavaScript (ES6+), RESTful APIs, Session Management, Bootstrap/CSS3</div>
      <ul class="bullets">
        <li>Engineered civic tech platform enabling citizens to report, geolocate, and track public infrastructure complaints (potholes, garbage/wastage, streetlight failures, drainage) directly to municipal authorities.</li>
        <li>Designed normalized relational MySQL database tracking issue lifecycles (<em>Reported</em>, <em>In Triage</em>, <em>Dispatched</em>, <em>Resolved</em>) with role-based admin controls, slashing ticket dispatch overhead by <strong>40%</strong>.</li>
      </ul>
    </div>
  </section>

  <!-- RESEARCH WORKS & PUBLICATIONS (ALL 4 PAPERS) -->
  <section class="section">
    <div class="section-title">
      RESEARCH WORKS &amp; PUBLICATIONS (04 PEER-REVIEWED PAPERS)
      <span class="accent-tag">Deep Learning | Computer Vision | Model Forensics</span>
    </div>
    <div class="research-grid">
      <div class="paper-item">
        <span class="paper-title">1. Multi-Class Waste Object Detection Using YOLO11n:</span> Deep learning approach for automated smart municipal waste segregation. Fine-tuned YOLO11n on TACO dataset (1,500 images, 4,784 annotations, 60 categories); achieved 45.63% Precision. Published in <span class="paper-journal">IRJMETS</span> (Sept 2025/2026) <a href="https://www.doi.org/10.56726/IRJMETS102755" target="_blank" class="doi-badge">DOI ↗</a>
      </div>
      <div class="paper-item">
        <span class="paper-title">2. Spatial vs. Frequency-Domain CNN Models for Detecting AI-Generated Images:</span> Comparative study evaluating baseline spatial CNN vs. hybrid Fast Fourier Transform (FFT) across 60,000 images; spatial CNN achieved 85.3% accuracy under real-world compression. Published in <span class="paper-journal">IJRASET</span> (Dec 2025) <a href="https://doi.org/10.22214/ijraset.2025.76618" target="_blank" class="doi-badge">DOI ↗</a>
      </div>
      <div class="paper-item">
        <span class="paper-title">3. Effectiveness of Deep Learning Models for Car Model Classification:</span> Evaluated ResNet50, MobileNetV2, and VGG16 across 7,463 images spanning 16 car models and 8 camera viewpoints; ResNet50 achieved 95.8% accuracy (100% on front-right angles). Published in <span class="paper-journal">IRJMETS</span> (Sept 2025) <a href="https://www.doi.org/10.56726/IRJMETS82757" target="_blank" class="doi-badge">DOI ↗</a>
      </div>
      <div class="paper-item">
        <span class="paper-title">4. Performance Benchmarking of CNN Architectures on CIFAR-100:</span> Controlled evaluation of ResNet-18, EfficientNet-B0, and GoogLeNet trained from scratch without pretraining bias on CIFAR-100 (60,000 images); ResNet-18 achieved 65% top-1 accuracy. Published in <span class="paper-journal">IJRASET</span> (Nov 2025) <a href="https://doi.org/10.22214/ijraset.2025.75713" target="_blank" class="doi-badge">DOI ↗</a>
      </div>
    </div>
  </section>

</body>
</html>
"""
    with open(output_html_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"Generated HTML: {output_html_path}")

def render_pdf_with_edge(html_path="resume.html", pdf_path="Harsh_Rathore_Resume.pdf"):
    edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    if not os.path.exists(edge_path):
        raise FileNotFoundError(f"Edge executable not found at: {edge_path}")
    
    abs_html = Path(html_path).resolve()
    abs_pdf = Path(pdf_path).resolve()
    
    file_url = f"file:///{str(abs_html).replace('\\', '/')}"
    cmd = [
        edge_path,
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={abs_pdf}",
        file_url
    ]
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Edge error: {result.stderr}")
    else:
        print(f"Edge successfully printed PDF to: {abs_pdf}")

def verify_and_render_preview(pdf_path="Harsh_Rathore_Resume.pdf", preview_png="resume_preview.png"):
    doc = fitz.open(pdf_path)
    page_count = len(doc)
    print(f"==================================================")
    print(f"PDF VERIFICATION: Total pages = {page_count}")
    print(f"==================================================")
    
    if page_count != 1:
        print(f"CRITICAL WARNING: Resume is {page_count} pages! Must be EXACTLY 1 page!")
    else:
        print("EXCELLENT: Resume strictly meets the 1-PAGE requirement!")
        
    page = doc[0]
    pix = page.get_pixmap(dpi=200)
    pix.save(preview_png)
    print(f"Rendered page 1 preview image: {preview_png} (size: {pix.width}x{pix.height})")
    
    rects = page.get_text('blocks')
    page_height = page.rect.height
    max_y1 = max(b[3] for b in rects)
    print(f"Page height: {page_height:.2f} pt")
    print(f"Bottom-most text y1: {max_y1:.2f} pt")
    print(f"Remaining bottom margin: {page_height - max_y1:.2f} pt ({((page_height - max_y1)/page_height)*100:.1f}%)")
    
    # Check for any replacement characters \ufffd in text
    full_text = page.get_text()
    if '\ufffd' in full_text:
        print("WARNING: Found replacement character \\ufffd in PDF text!")
    else:
        print("SUCCESS: Zero character encoding issues found! Clean, parseable text.")
        
    doc.close()
    return page_count

if __name__ == "__main__":
    create_resume_html("resume.html")
    render_pdf_with_edge("resume.html", "Harsh_Rathore_Resume.pdf")
    pages = verify_and_render_preview("Harsh_Rathore_Resume.pdf", "resume_preview.png")
    if pages != 1:
        sys.exit(1)
    else:
        print("Done successfully!")

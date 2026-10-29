import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY
from reportlab.pdfgen import canvas
import pypdf
import fitz  # PyMuPDF

PAGE_WIDTH, PAGE_HEIGHT = A4  # 595.275 x 841.889 pt

# Design Palette from Portfolio Aesthetic
COLOR_BG_IVORY    = HexColor("#F5F4F0")  # Warm ivory
COLOR_WHITE       = HexColor("#FFFFFF")
COLOR_DARK        = HexColor("#0D0D0D")  # Pure charcoal black
COLOR_RUBY        = HexColor("#9E1A2B")  # Accent crimson red
COLOR_SLATE       = HexColor("#24282F")  # Structural deep slate
COLOR_MUTED       = HexColor("#505050")  # Subtitle / secondary text
COLOR_BORDER      = HexColor("#D8D5CD")  # Clean structural divider
COLOR_CARD_BG     = HexColor("#FAF9F6")  # Card tint
COLOR_CHIP_BG     = HexColor("#EFECE6")  # Tag pill background
COLOR_LINK        = HexColor("#9E1A2B")  # Clickable ruby link

class NumberedCanvas(canvas.Canvas):
    """
    Two-pass canvas to dynamically compute and render running header,
    footer, formal academic metadata, and exact page counts ("Page X of Y").
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, total_pages):
        self.saveState()
        
        left = 32
        right = PAGE_WIDTH - 32
        top = PAGE_HEIGHT - 22
        bottom = 20

        # Running Top Header
        self.setFont("Helvetica-Bold", 7.2)
        self.setFillColor(COLOR_RUBY)
        self.drawString(left, top, "MCA TECHNICAL PROJECT SUBMISSION")
        
        self.setFont("Helvetica", 7.2)
        self.setFillColor(COLOR_MUTED)
        self.drawString(left + 160, top, "//  HARSH RATHORE — CREATIVE PORTFOLIO (ISSUE 02)")
        
        self.setFont("Helvetica-Bold", 7.2)
        self.setFillColor(COLOR_DARK)
        self.drawRightString(right, top, "ACADEMIC SESSION 2025–2026")

        # Top Header Rule
        self.setStrokeColor(COLOR_BORDER)
        self.setLineWidth(0.65)
        self.line(left, top - 4.5, right, top - 4.5)

        # Running Bottom Footer Rule
        self.setStrokeColor(COLOR_BORDER)
        self.setLineWidth(0.65)
        self.line(left, bottom + 13, right, bottom + 13)

        # Running Bottom Footer
        self.setFont("Helvetica", 7.0)
        self.setFillColor(COLOR_MUTED)
        self.drawString(left, bottom + 3.5, "Master of Computer Applications (MCA) · Full-Stack Web & AI Systems Engineering · Surat, Gujarat, India")
        
        page_str = f"Page {self._pageNumber} of {total_pages}"
        self.setFont("Helvetica-Bold", 7.2)
        self.setFillColor(COLOR_DARK)
        self.drawRightString(right, bottom + 3.5, page_str)

        self.restoreState()


def build_pdf(filename="Portfolio_Report.pdf"):
    # Margins: 32pt horizontal, 34pt top/bottom (giving 531.275pt width, 773.889pt height)
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=32,
        rightMargin=32,
        topMargin=34,
        bottomMargin=32
    )

    styles = getSampleStyleSheet()

    # Refined Typography System
    style_meta_badge = ParagraphStyle(
        'MetaBadge',
        fontName='Helvetica-Bold',
        fontSize=6.8,
        leading=8.5,
        textColor=COLOR_RUBY,
        alignment=TA_LEFT
    )

    style_main_title = ParagraphStyle(
        'MainTitle',
        fontName='Helvetica-Bold',
        fontSize=15.5,
        leading=18,
        textColor=COLOR_DARK,
        alignment=TA_LEFT,
        spaceAfter=2
    )

    style_sub_title = ParagraphStyle(
        'SubTitle',
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.2,
        textColor=COLOR_SLATE,
        alignment=TA_LEFT,
        spaceAfter=5
    )

    style_sec_heading = ParagraphStyle(
        'SecHeading',
        fontName='Helvetica-Bold',
        fontSize=8.8,
        leading=11.5,
        textColor=COLOR_DARK,
        spaceBefore=0,
        spaceAfter=0
    )

    style_body = ParagraphStyle(
        'Body',
        fontName='Helvetica',
        fontSize=7.6,
        leading=10.2,
        textColor=COLOR_DARK,
        alignment=TA_JUSTIFY
    )

    # Bullet lists must use TA_LEFT to prevent justification stretching
    style_body_tight = ParagraphStyle(
        'BodyTight',
        fontName='Helvetica',
        fontSize=7.2,
        leading=9.8,
        textColor=COLOR_DARK,
        alignment=TA_LEFT
    )

    style_table_header = ParagraphStyle(
        'TableHeader',
        fontName='Helvetica-Bold',
        fontSize=7.2,
        leading=9.2,
        textColor=COLOR_DARK
    )

    style_table_cell = ParagraphStyle(
        'TableCell',
        fontName='Helvetica',
        fontSize=6.9,
        leading=9.2,
        textColor=COLOR_DARK
    )

    content = []
    USABLE_W = PAGE_WIDTH - 64  # 531.275 pt

    def make_section_banner(number_str, title_str, tag_str=""):
        p_left = Paragraph(f"<font color='{COLOR_RUBY.hexval()}'><b>{number_str}</b></font>  <b>{title_str}</b>", style_sec_heading)
        p_right = Paragraph(f"<font color='{COLOR_MUTED.hexval()}'><b>{tag_str}</b></font>", ParagraphStyle('SecTag', fontName='Helvetica-Bold', fontSize=6.8, leading=9, alignment=TA_RIGHT))
        tbl = Table([[p_left, p_right]], colWidths=[370, USABLE_W - 370])
        tbl.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), COLOR_CARD_BG),
            ('TOPPADDING', (0,0), (-1,-1), 3.2),
            ('BOTTOMPADDING', (0,0), (-1,-1), 3.2),
            ('LEFTPADDING', (0,0), (-1,-1), 6),
            ('RIGHTPADDING', (0,0), (-1,-1), 6),
            ('BOX', (0,0), (-1,-1), 0.5, COLOR_BORDER),
            ('LINELEFT', (0,0), (0,0), 2.5, COLOR_RUBY),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE')
        ]))
        return tbl

    # ══════════════════════════════════════════════════════════════════════════
    # PAGE 1 CONTENT
    # ══════════════════════════════════════════════════════════════════════════

    # Document Header Box (Academic Context & Meta)
    p_meta = Paragraph("PORTFOLIO ISSUE — 02 // MASTER OF COMPUTER APPLICATIONS (MCA) PROJECT REPORT", style_meta_badge)
    p_title = Paragraph("HARSH RATHORE — CREATIVE PORTFOLIO", style_main_title)
    p_sub = Paragraph("<b>Full-Stack MERN Architecture, Autonomous LLM Pipelines & Ultra-Luxury Fluid Web Interfaces</b>", style_sub_title)
    
    meta_bar_data = [
        [
            Paragraph("<b>DEVELOPER:</b> Harsh Rathore", style_table_cell),
            Paragraph("<b>DEGREE:</b> Master of Computer Applications (MCA)", style_table_cell),
            Paragraph("<b>LOCATION:</b> Surat, Gujarat, IN (IST)", style_table_cell),
            Paragraph("<b>DEPLOYMENT:</b> Vercel / Netlify", style_table_cell)
        ]
    ]
    tbl_meta_bar = Table(meta_bar_data, colWidths=[120, 175, 125, 111.275])
    tbl_meta_bar.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_CARD_BG),
        ('BOX', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 3.2),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.2),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))

    header_box = Table([[Table([[p_meta], [p_title], [p_sub], [tbl_meta_bar]], colWidths=[USABLE_W])]], colWidths=[USABLE_W])
    header_box.setStyle(TableStyle([
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    content.append(header_box)
    content.append(Spacer(1, 7))

    # SECTION A: PORTFOLIO OVERVIEW
    sec_a_banner = make_section_banner("A //", "PORTFOLIO OVERVIEW & ARCHITECTURAL MANIFESTO", "EXECUTIVE SUMMARY")
    content.append(sec_a_banner)
    content.append(Spacer(1, 4))

    overview_text = (
        "<b>Project Synopsis:</b> The portfolio is an ultra-luxury, high-performance personal engineering showcase "
        "engineered at the intersection of haute-couture editorial typography, brutalist structural forms, and next-generation "
        "fluid interface physics (inspired by <b>ColorOS Aqua Dynamics & iOS Liquid Glass</b>). Handcrafted with raw, "
        "zero-dependency <b>HTML5, CSS3, and ES6+ Vanilla JavaScript</b>, it deliberately rejects bloated generic templates "
        "in favor of absolute performance, strict accessibility, and micro-engineered kinetic fidelity.<br/>"
        "<b>Core Academic & Professional Purpose:</b> Built as an exhaustive technical repository for formal MCA submission and "
        "production engineering evaluation. The portfolio demonstrates how thoughtful human interfaces converge with resilient, "
        "scalable engineering across the entire software lifecycle—leveraging <b>React</b> for reactive UI states, <b>Node.js & Express</b> "
        "for high-throughput REST APIs and middleware pipelines, <b>MongoDB Atlas</b> for document persistence and vector search, and "
        "<b>Google Gemini API</b> for autonomous AI tool orchestration.<br/>"
        "<b>Production Deployment & Verified Access:</b> Optimized for zero-configuration edge delivery. Configured for Vercel "
        "production hosting via <b><a href='https://harsh-pratapsingh-portfolio.vercel.app'><font color='#9E1A2B'>harsh-pratapsingh-portfolio.vercel.app</font></a></b> "
        "with complete source code archived at <b><a href='https://github.com/harsh-pratap-singh-rathore'><font color='#9E1A2B'>github.com/harsh-pratap-singh-rathore</font></a></b>."
    )
    tbl_overview = Table([[Paragraph(overview_text, style_body)]], colWidths=[USABLE_W])
    tbl_overview.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_CARD_BG),
        ('BOX', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 5.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5.5),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
    ]))
    content.append(tbl_overview)
    content.append(Spacer(1, 7))

    # SECTION B: VERIFIED TECHNOLOGY STACK
    sec_b_banner = make_section_banner("B //", "VERIFIED TECHNOLOGY STACK & ARCHITECTURAL ECOSYSTEM", "SOURCE INSPECTED")
    content.append(sec_b_banner)
    content.append(Spacer(1, 4))

    tech_table_data = [
        [
            Paragraph("<b>DOMAIN / LAYER</b>", style_table_header),
            Paragraph("<b>TECHNOLOGIES, FRAMEWORKS & LIBRARIES</b>", style_table_header),
            Paragraph("<b>ARCHITECTURAL ROLE & IMPLEMENTATION CONTEXT</b>", style_table_header)
        ],
        [
            Paragraph("<b>Core Languages</b>", style_table_cell),
            Paragraph("JavaScript (ES6+), TypeScript, HTML5, CSS3, PHP 8.x, Python 3.x", style_table_cell),
            Paragraph("Isomorphic client/server scripting, type-safe API routing, and AI data manipulation.", style_table_cell)
        ],
        [
            Paragraph("<b>Frontend & UI</b>", style_table_cell),
            Paragraph("Vanilla JS Engine, React 19, CSS3 Design Tokens, Tailwind CSS, Vite", style_table_cell),
            Paragraph("Zero-runtime client DOM engine, fluid viewport scaling, glassmorphic optics.", style_table_cell)
        ],
        [
            Paragraph("<b>Backend & APIs</b>", style_table_cell),
            Paragraph("Node.js, Express.js, RESTful Architecture, JWT Auth, CORS, SSE Streams", style_table_cell),
            Paragraph("Event-driven asynchronous I/O, modular middleware pipelines, and secure session management.", style_table_cell)
        ],
        [
            Paragraph("<b>Databases & Caching</b>", style_table_cell),
            Paragraph("MongoDB Atlas, Mongoose, MySQL, PostgreSQL, Redis In-Memory Cache", style_table_cell),
            Paragraph("Document storage, relational civic reporting schemas, and sub-50ms query caching.", style_table_cell)
        ],
        [
            Paragraph("<b>AI Systems & LLMs</b>", style_table_cell),
            Paragraph("Google Gemini API (2.5 Flash), Ollama Runtime, PyTorch, HNSW Vector RAG", style_table_cell),
            Paragraph("Autonomous tool-calling agents, dense vector semantic search, and hybrid BM25 retrieval.", style_table_cell)
        ],
        [
            Paragraph("<b>DevOps & Infrastructure</b>", style_table_cell),
            Paragraph("Vercel, Netlify, Git, GitHub Actions, Docker Containers, Linux / Unix CLI", style_table_cell),
            Paragraph("Edge routing, continuous integration, containerization, and static asset distribution.", style_table_cell)
        ]
    ]
    tbl_tech = Table(tech_table_data, colWidths=[95, 200, 236.275])
    tbl_tech.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), COLOR_CHIP_BG),
        ('BOX', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.35, COLOR_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 3.0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.0),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    content.append(tbl_tech)
    content.append(Spacer(1, 7))

    # SECTION C: CORE FEATURES & INTERACTIVE ENGINES (PART 1)
    sec_c_banner = make_section_banner("C //", "SYSTEM ARCHITECTURE & KEY FEATURES (PART 1: INTERACTIVE ENGINES)", "ENGINEERING RIGOR")
    content.append(sec_c_banner)
    content.append(Spacer(1, 4))

    feat_cards_data = [
        [
            Paragraph("<b>1. Cinematic Preloader & Session Cache</b>", style_table_header),
            Paragraph("<b>2. Fluid Liquid Glass Dual Navigation</b>", style_table_header),
            Paragraph("<b>3. Real-Time Telemetry & Optics</b>", style_table_header)
        ],
        [
            Paragraph(
                "• <b>Accelerated Entry:</b> 1.25s <code>requestAnimationFrame</code> 00–100% counter with 130ms letter reveal.<br/>"
                "• <b>Session Caching:</b> <code>sessionStorage</code> checks bypass preloader in 40ms on repeat visits.<br/>"
                "• <b>A11y Compliant:</b> Applies <code>inert</code> focus trapping to main DOM during intro execution.",
                style_body_tight
            ),
            Paragraph(
                "• <b>Desktop Segmented Glass:</b> Capsule bar with spring-overshoot elasticity (<code>scaleX(1.24)</code>).<br/>"
                "• <b>Mobile Glass Dock:</b> Ergonomic iOS floating bottom dock (<code>#iosBottomDock</code>) with touch haptics.<br/>"
                "• <b>Kinetic ScrollSpy:</b> Dynamic capsule glide tracking active section viewports.",
                style_body_tight
            ),
            Paragraph(
                "• <b>Live IST HUD Clock:</b> Real-time Indian Standard Time (GMT+05:30) updated dynamically.<br/>"
                "• <b>Magnetic Dual Cursor:</b> Interpolated dot & ring with magnetic button attraction.<br/>"
                "• <b>GPU Optimization:</b> Specular 3D hover effects throttled via <code>requestAnimationFrame</code>.",
                style_body_tight
            )
        ]
    ]
    tbl_feat = Table(feat_cards_data, colWidths=[173, 179, 179.275])
    tbl_feat.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), COLOR_CHIP_BG),
        ('BACKGROUND', (0,1), (-1,1), COLOR_CARD_BG),
        ('BOX', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.35, COLOR_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 3.8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.8),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    content.append(tbl_feat)
    content.append(Spacer(1, 7))

    # SECTION C (CONT.): TECHNICAL PROGRESS & SKILL TELEMETRY
    sec_c_sub_banner = make_section_banner("C.1 //", "ACTIVE ARCHITECTURAL CYCLES & SKILL PROGRESS TELEMETRY", "VERIFIED BENCHMARKS")
    content.append(sec_c_sub_banner)
    content.append(Spacer(1, 4))

    skills_data = [
        [
            Paragraph("<b>JAVASCRIPT (ES6+): 90% MASTERY</b><br/><font color='#555555'>Async patterns, Event loop mechanics, Closures, DOM engine architecture, Prototypes</font>", style_table_cell),
            Paragraph("<b>MERN ECOSYSTEM: 82% MASTERY</b><br/><font color='#555555'>React 19 hooks, Express modular routing, MongoDB document modeling & Atlas vector search</font>", style_table_cell)
        ],
        [
            Paragraph("<b>DL · ML · OLLAMA: 78% MASTERY</b><br/><font color='#555555'>Deep learning neural nets, Scikit algorithms, Ollama local model inference, PyTorch pipelines</font>", style_table_cell),
            Paragraph("<b>APIS & DATA SYSTEMS: 75% MASTERY</b><br/><font color='#555555'>RESTful API design, JWT/Session authentication, MySQL relational schemas & Redis cache</font>", style_table_cell)
        ]
    ]
    tbl_skills = Table(skills_data, colWidths=[265.6, 265.675])
    tbl_skills.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_CARD_BG),
        ('BOX', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.35, COLOR_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 3.8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.8),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    content.append(tbl_skills)

    # ══════════════════════════════════════════════════════════════════════════
    # PAGE BREAK TO PAGE 2
    # ══════════════════════════════════════════════════════════════════════════
    content.append(PageBreak())

    # ══════════════════════════════════════════════════════════════════════════
    # PAGE 2 CONTENT
    # ══════════════════════════════════════════════════════════════════════════

    # SECTION C (CONT.): SELECTED WORKS & RESEARCH MONOGRAPHS
    sec_proj_banner = make_section_banner("C.2 //", "FEATURED PROJECTS & ACADEMIC RESEARCH MONOGRAPHS", "CONFIRMED IMPLEMENTATIONS")
    content.append(sec_proj_banner)
    content.append(Spacer(1, 4))

    projects_data = [
        [
            Paragraph("<b>PROJECT / SPECIFICATION</b>", style_table_header),
            Paragraph("<b>CORE ARCHITECTURE & PROBLEM SOLVED</b>", style_table_header),
            Paragraph("<b>STACK & VERIFIED ACCESS LINKS</b>", style_table_header)
        ],
        [
            Paragraph("<b>01 // Dropify (Flagship)</b><br/><font color='#9E1A2B'>Audiophile Music Player</font>", style_table_cell),
            Paragraph("Next-gen audiophile music streaming platform featuring a custom 10-band Web Audio DSP equalizer, dynamic stereo spatializer, LRCLIB synchronized lyrics engine, YouTube stream decoding via InnerTube, and cross-platform clients (Web, Android APK v1.0.2, Electron).", style_table_cell),
            Paragraph("<b>Stack:</b> React 18, Web Audio DSP, Node.js, Kotlin<br/><b>Live URL:</b> <a href='https://dropify.vercel.app'><font color='#9E1A2B'>dropify.vercel.app [Visit]</font></a><br/><b>Repository:</b> <a href='https://github.com/harsh-pratap-singh-rathore/Dropify'><font color='#9E1A2B'>Dropify Repo [Code]</font></a>", style_table_cell)
        ],
        [
            Paragraph("<b>02 // Shree Karni Textiles</b><br/><font color='#9E1A2B'>B2B Wholesale Commerce</font>", style_table_cell),
            Paragraph("High-throughput enterprise fabric procurement portal indexing 10,000+ m² inventory. Engineered with multi-layered Redis caching, dynamic catalog indexing, and low-latency inquiry dispatch (48ms TTFB).", style_table_cell),
            Paragraph("<b>Stack:</b> PHP, JS, CSS3, Composer, HTML5<br/><b>Live URL:</b> <a href='https://shreekarnitextiles.com'><font color='#9E1A2B'>shreekarnitextiles.com [Visit]</font></a>", style_table_cell)
        ],
        [
            Paragraph("<b>03 // Code Canvas</b><br/><font color='#9E1A2B'>Developer Tooling / IDE</font>", style_table_cell),
            Paragraph("Real-time interactive CSS design studio and component workbench. Enables developers to manipulate box models, gradients, and typography directly on canvas with instant compiled CSS extraction.", style_table_cell),
            Paragraph("<b>Stack:</b> JavaScript, HTML5, CSS3, PHP<br/><b>Live URL:</b> <a href='https://codecanvas.page/public/index.html'><font color='#9E1A2B'>codecanvas.page [Visit]</font></a><br/><b>Repository:</b> <a href='https://github.com/harsh-pratap-singh-rathore/CodeCanvas'><font color='#9E1A2B'>CodeCanvas Repo [Code]</font></a>", style_table_cell)
        ],
        [
            Paragraph("<b>04 // My Voice</b><br/><font color='#9E1A2B'>Civic Infrastructure</font>", style_table_cell),
            Paragraph("Community public infrastructure incident triage and dispatch network. Features GPS-tagged incident logging, role-based admin triage, and relational status tracking.", style_table_cell),
            Paragraph("<b>Stack:</b> PHP, MySQL, JavaScript, CSS3<br/><b>Live URL:</b> <a href='https://myvoice.gt.tc/MyVoice/frontend/pages/index.php'><font color='#9E1A2B'>myvoice.gt.tc [Visit]</font></a>", style_table_cell)
        ],
        [
            Paragraph("<b>Research Monographs</b><br/><font color='#9E1A2B'>Editorial AI Archive</font>", style_table_cell),
            Paragraph("<b>• Autonomous LLM Agents:</b> Deterministic state machine bounds preventing runaway loops.<br/>"
                      "<b>• Dense Vector Retrieval:</b> Hybrid BM25 + dense vector embeddings in MongoDB Atlas.<br/>"
                      "<b>• Resilient Async Pipelines:</b> Transactional rollback state bus resolving race conditions.", style_table_cell),
            Paragraph("<b>Domain:</b> LLMs · Vector Search · RAG<br/><b>Archive:</b> <a href='https://github.com/harsh-pratap-singh-rathore'><font color='#9E1A2B'>github.com/harsh-pratap-singh-rathore</font></a>", style_table_cell)
        ]
    ]
    tbl_proj = Table(projects_data, colWidths=[120, 235, 176.275])
    tbl_proj.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), COLOR_CHIP_BG),
        ('BOX', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.35, COLOR_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 2.8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2.8),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    content.append(tbl_proj)
    content.append(Spacer(1, 6))

    # SECTION D: AI TOOLS UTILIZED — GOOGLE GEMINI
    sec_d_banner = make_section_banner("D //", "AI TOOLS UTILIZED — GOOGLE GEMINI IN ENGINEERING LIFECYCLE", "DEVELOPMENT ASSISTANCE")
    content.append(sec_d_banner)
    content.append(Spacer(1, 4))

    gemini_text = (
        "<b>Explicit Attribution:</b> <b>Google Gemini</b> served as the primary AI development assistant throughout the "
        "engineering and design lifecycle of this portfolio project. Gemini was utilized deliberately as a high-precision pair-programming "
        "and architectural reasoning companion across four primary phases:<br/>"
        "• <b>Vanilla JavaScript Motion & Physics Guidance:</b> Gemini assisted in drafting and mathematically tuning the custom "
        "kinetic algorithms—including the spring-overshoot stretching physics (<code>cubic-bezier(0.34, 1.56, 0.64, 1)</code>) for the "
        "segmented glass navigation capsules, the 3D card stack swipe geometry, and the interpolated magnetic cursor engine.<br/>"
        "• <b>Glassmorphism & Haute-Couture UI/UX Refinement:</b> Formulated multi-layered liquid acrylic styling rules "
        "(<code>backdrop-filter: blur(44px) saturate(220%)</code>), surface-tension borders, and responsive CSS Grid/Flexbox architectures.<br/>"
        "• <b>Performance Profiling & Layout Optimization:</b> Guided network payload optimization (reducing initial asset load by "
        "<b>2.05 MB</b> by replacing uncompressed PNGs with an 86.5 KB optimized fallback portrait), eliminating layout thrashing "
        "via <code>requestAnimationFrame</code> throttling, and implementing <code>sessionStorage</code> preloader caching.<br/>"
        "• <b>Security Hardening & Deployment Engineering:</b> Aided in structuring enterprise-grade HTTP security headers "
        "inside <code>vercel.json</code> to enforce MIME sniffing prevention, clickjacking protection, and static cache revalidation."
    )
    tbl_gemini = Table([[Paragraph(gemini_text, style_body)]], colWidths=[USABLE_W])
    tbl_gemini.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_CARD_BG),
        ('BOX', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 4.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4.5),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
    ]))
    content.append(tbl_gemini)
    content.append(Spacer(1, 6))

    # SECTION E: PROFESSIONAL LINKS & ACADEMIC CREDENTIALS
    sec_e_banner = make_section_banner("E //", "VERIFIED PROFESSIONAL NODES & CONTACT CHANNELS", "AUTHENTICATED PROFILES")
    content.append(sec_e_banner)
    content.append(Spacer(1, 4))

    links_data = [
        [
            Paragraph("<b>CHANNEL / PLATFORM</b>", style_table_header),
            Paragraph("<b>CONFIGURED IDENTIFIER / HANDLE</b>", style_table_header),
            Paragraph("<b>CLICKABLE HYPERLINK & ACCESS NODE</b>", style_table_header)
        ],
        [
            Paragraph("<b>GitHub Source Archive</b>", style_table_cell),
            Paragraph("<code>harsh-pratap-singh-rathore</code> (20+ Repos)", style_table_cell),
            Paragraph("<a href='https://github.com/harsh-pratap-singh-rathore'><font color='#9E1A2B'>https://github.com/harsh-pratap-singh-rathore</font></a>", style_table_cell)
        ],
        [
            Paragraph("<b>LinkedIn Professional Graph</b>", style_table_cell),
            Paragraph("<code>harsh-rathore-1597012aa</code> (Verified Profile)", style_table_cell),
            Paragraph("<a href='https://www.linkedin.com/in/harsh-rathore-1597012aa/'><font color='#9E1A2B'>https://www.linkedin.com/in/harsh-rathore-1597012aa/</font></a>", style_table_cell)
        ],
        [
            Paragraph("<b>Direct Dispatch Email</b>", style_table_cell),
            Paragraph("<code>harshpratapsinghrathore555@gmail.com</code>", style_table_cell),
            Paragraph("<a href='mailto:harshpratapsinghrathore555@gmail.com'><font color='#9E1A2B'>mailto:harshpratapsinghrathore555@gmail.com</font></a>", style_table_cell)
        ],
        [
            Paragraph("<b>Dropify Repository</b>", style_table_cell),
            Paragraph("<code>Dropify</code> Flagship Audiophile Repo", style_table_cell),
            Paragraph("<a href='https://github.com/harsh-pratap-singh-rathore/Dropify'><font color='#9E1A2B'>https://github.com/harsh-pratap-singh-rathore/Dropify</font></a>", style_table_cell)
        ],
        [
            Paragraph("<b>Code Canvas Repository</b>", style_table_cell),
            Paragraph("<code>CodeCanvas</code> UI Workbench Repository", style_table_cell),
            Paragraph("<a href='https://github.com/harsh-pratap-singh-rathore/CodeCanvas'><font color='#9E1A2B'>https://github.com/harsh-pratap-singh-rathore/CodeCanvas</font></a>", style_table_cell)
        ]
    ]
    tbl_links = Table(links_data, colWidths=[130, 160, 241.275])
    tbl_links.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), COLOR_CHIP_BG),
        ('BOX', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.35, COLOR_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 2.8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2.8),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    content.append(tbl_links)
    content.append(Spacer(1, 6))

    # SECTION F: DEVELOPMENT, REPOSITORY ORGANIZATION & DEPLOYMENT ARCHITECTURE
    sec_f_banner = make_section_banner("F //", "DEVELOPMENT WORKFLOW, CODEBASE STRUCTURE & DEPLOYMENT", "PRODUCTION CONFIG")
    content.append(sec_f_banner)
    content.append(Spacer(1, 4))

    deploy_text = (
        "<b>Codebase Architecture:</b> Structured with strict separation of concerns and zero build-step overhead: "
        "<code>index.html</code> (semantic markup with full WAI-ARIA accessibility attributes), <code>style.css</code> (5,400+ lines of custom "
        "tokens, fluid typography with CSS <code>clamp()</code>, and liquid acrylic optics), <code>script.js</code> (modular uncompiled "
        "vanilla JS engine driving preloader, cursor, docks, and 3D card stacks), and <code>data.js</code> (single-source-of-truth "
        "data model for projects, research, and profile credentials).<br/>"
        "<b>Production Deployment Pipeline:</b> Optimized for instant, zero-configuration deployment on <b>Vercel</b> and <b>Netlify</b>. "
        "Configured via <code>vercel.json</code> with enterprise security headers: <code>X-Content-Type-Options: nosniff</code> (MIME protection), "
        "<code>X-Frame-Options: DENY</code> (clickjacking prevention), and <code>X-XSS-Protection: 1; mode=block</code>. Static assets "
        "feature strict revalidation headers (<code>public, max-age=0, must-revalidate</code>) ensuring rapid client delivery and instant rollouts."
    )
    tbl_deploy = Table([[Paragraph(deploy_text, style_body)]], colWidths=[USABLE_W])
    tbl_deploy.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_CARD_BG),
        ('BOX', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 4.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4.5),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
    ]))
    content.append(tbl_deploy)
    content.append(Spacer(1, 6))

    # FORMAL ACADEMIC SIGN-OFF
    sign_off_data = [
        [
            Paragraph("<b>CANDIDATE DECLARATION & SUBMISSION NOTE:</b><br/>"
                      "This report is submitted in partial fulfillment of the requirements for the Master of Computer Applications (MCA) "
                      "evaluation. All technologies, features, and source repositories documented herein have been rigorously inspected and verified.", style_table_cell),
            Paragraph("<b>CANDIDATE SIGNATURE:</b><br/>"
                      "<b>Harsh Rathore</b><br/>"
                      "<font color='#555555'>Full-Stack Web & AI Systems Engineer · Surat, Gujarat</font>", style_table_cell)
        ]
    ]
    tbl_sign = Table(sign_off_data, colWidths=[351.275, 180])
    tbl_sign.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_CARD_BG),
        ('BOX', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.35, COLOR_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 3.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    content.append(tbl_sign)

    # Build Document using NumberedCanvas
    doc.build(content, canvasmaker=NumberedCanvas)
    print(f"PDF generated: {filename}")

if __name__ == "__main__":
    output_filename = "Portfolio_Report.pdf"
    build_pdf(output_filename)
    
    # Verify page count with pypdf
    reader = pypdf.PdfReader(output_filename)
    page_count = len(reader.pages)
    print(f"VERIFICATION: Total pages = {page_count}")
    if page_count != 2:
        print(f"WARNING: Expected exactly 2 pages, got {page_count}!")
        sys.exit(1)
    else:
        print("SUCCESS: Document strictly meets 2-page requirement.")

    # Re-render images to inspect visually
    doc_fitz = fitz.open(output_filename)
    for i, page in enumerate(doc_fitz):
        pix = page.get_pixmap(dpi=150)
        img_name = f"page_{i+1}.png"
        pix.save(img_name)
        print(f"Saved updated {img_name}")

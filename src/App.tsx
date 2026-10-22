import { useEffect, useRef, useState } from "react";
import {
  ArrowDown, ArrowLeft, ArrowRight, Check, Dumbbell, Menu, MoveUpRight, Play,
  Sparkles, X, Zap, HeartPulse, Instagram, Facebook, Youtube,
} from "lucide-react";

type Plan = {
  name: string;
  price: string;
  suffix: string;
  description: string;
  features: string[];
  featured?: boolean;
};

const plans: Plan[] = [
  {
    name: "STARTER",
    price: "₦19,000",
    suffix: "/ month",
    description: "A fresh start for your fitness journey.",
    features: ["Full gym access", "Locker room access", "2 group classes / week", "Fitness assessment"],
  },
  {
    name: "UNLIMITED",
    price: "₦39,000",
    suffix: "/ month",
    description: "Your routine, without the limits.",
    features: ["Everything in Starter", "Unlimited group classes", "Sauna & recovery zone", "Monthly progress check-in", "Guest pass every month"],
    featured: true,
  },
  {
    name: "ELITE",
    price: "₦69,000",
    suffix: "/ month",
    description: "Extra support. Exceptional results.",
    features: ["Everything in Unlimited", "2 personal training sessions", "Priority class booking", "Nutrition guidance", "Bring a friend anytime"],
  },
];

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const services = [
  {
    slug: "train-your-way",
    title: "TRAIN YOUR WAY",
    short: "Strength, cardio, mobility — the tools you need to make progress that feels good.",
    intro: "A training floor built for the way you want to move.",
    description: "Whether you are learning your first lift, building endurance, or making room for recovery, our coaches and training spaces help you find a rhythm that works for you. Choose your focus, get practical guidance, and progress at your own pace.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Modern strength training floor with gym equipment",
    detailImage: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=85",
    detailAlt: "Athlete working through a strength training session",
    points: ["Strength and free weights", "Cardio equipment and conditioning", "Mobility space and recovery tools"],
  },
  {
    slug: "good-energy",
    title: "GOOD ENERGY ONLY",
    short: "Big encouragement, zero judgment. Find your people and enjoy the process.",
    intro: "Training feels better when you do it together.",
    description: "Our group sessions bring people together around movement, music, and steady encouragement. Coaches guide every class with options for different experience levels, so you can challenge yourself, meet familiar faces, and enjoy showing up week after week.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Group fitness class training together",
    detailImage: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=85",
    detailAlt: "Bright studio ready for a coached group fitness class",
    points: ["Coach-led group workouts", "Welcoming classes for every level", "A community that celebrates progress"],
  },
  {
    slug: "built-around-you",
    title: "BUILT AROUND YOU",
    short: "Real coaching and flexible plans that fit your life, not the other way around.",
    intro: "A plan that meets you where you are.",
    description: "Your goals, schedule, and starting point are personal. Our coaches help you turn them into a practical routine, with clear next steps and room to adjust as life changes. Get one-to-one support, useful feedback, and a plan you can keep building on.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Personal trainer coaching a member during a workout",
    detailImage: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=1200&q=85",
    detailAlt: "Coach and athlete discussing a tailored training plan",
    points: ["Personal goal setting and assessments", "Flexible training plans", "Regular coaching and progress check-ins"],
  },
  {
    slug: "personal-training",
    title: "PERSONAL TRAINING",
    short: "One-to-one coaching, clear goals, and a plan made for your starting point.",
    intro: "Focused coaching for the goals that matter to you.",
    description: "Work one-to-one with a coach who takes time to understand your experience, goals, and schedule. Sessions are planned around you, with guidance on safe technique, steady progression, and adjustments as you get stronger.",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Personal trainer coaching a member through a strength exercise",
    detailImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=85",
    detailAlt: "One-to-one personal training session in a gym",
    points: ["A coach matched to your goals", "Technique guidance and tailored sessions", "Progress reviews that keep your plan relevant"],
  },
  {
    slug: "group-fitness",
    title: "GROUP FITNESS",
    short: "Move with the room, follow expert coaching, and find a class that fits your pace.",
    intro: "Good music, great coaching, and a room full of encouragement.",
    description: "Choose from coached sessions built around strength, conditioning, and movement. Instructors explain each workout, offer ways to scale the challenge, and help the whole room stay moving together. Come for the structure and leave with a little more energy.",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Members taking part in a group fitness workout",
    detailImage: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1200&q=85",
    detailAlt: "Fitness class members training together",
    points: ["A varied weekly class timetable", "Options for different experience levels", "Supportive coaches and training partners"],
  },
  {
    slug: "recovery-mobility",
    title: "RECOVERY & MOBILITY",
    short: "Make time to stretch, reset, and support the work you put into every workout.",
    intro: "Recovery is part of the routine.",
    description: "Give your body space to reset between training days. Use our mobility area for guided stretches, breathing, and gentle movement, or talk with a coach about building recovery into your weekly plan. Small, consistent recovery habits can help you feel ready for what comes next.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Member stretching in a calm mobility studio",
    detailImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=85",
    detailAlt: "Gentle stretching and recovery session",
    points: ["Dedicated space for stretching and mobility", "Recovery guidance from the coaching team", "Simple routines to complement your training"],
  },
];

const serviceIcons = [Dumbbell, HeartPulse, Sparkles, Zap, HeartPulse, MoveUpRight];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("UNLIMITED");
  const [submitted, setSubmitted] = useState(false);
  const [pauseServiceAutoplay, setPauseServiceAutoplay] = useState(false);
  const [activeService, setActiveService] = useState(() => services.find((service) => window.location.pathname === `/services/${service.slug}`) ?? null);
  const servicesTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = servicesTrackRef.current;
    if (!track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const firstSet = track.querySelector<HTMLElement>(".service-group");
    if (!firstSet) return;
    let previousTime = 0;
    let frameId = 0;
    const loopWidth = firstSet.getBoundingClientRect().width;
    const animate = (time: number) => {
      if (previousTime && !pauseServiceAutoplay && document.visibilityState === "visible") {
        track.scrollLeft += (time - previousTime) * 0.03;
        if (track.scrollLeft >= loopWidth) track.scrollLeft -= loopWidth;
      }
      previousTime = time;
      frameId = window.requestAnimationFrame(animate);
    };
    frameId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frameId);
  }, [pauseServiceAutoplay, activeService]);
  useEffect(() => {
    const syncService = () => setActiveService(services.find((service) => window.location.pathname === `/services/${service.slug}`) ?? null);
    window.addEventListener("popstate", syncService);
    return () => window.removeEventListener("popstate", syncService);
  }, []);

  const openService = (slug: string) => {
    const service = services.find((item) => item.slug === slug);
    if (!service) return;
    window.history.pushState({}, "", `/services/${slug}`);
    setActiveService(service);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToSection = (href: string) => {
    setMenuOpen(false);
    if (activeService) {
      window.history.pushState({}, "", `/${href}`);
      setActiveService(null);
      window.setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }), 30);
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollTo = (href: string) => {
    goToSection(href);
  };

  const scrollServices = (direction: number) => {
    servicesTrackRef.current?.scrollBy({ left: direction * 340, behavior: "smooth" });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="/" aria-label="Total Fitness Gym home" onClick={(event) => { event.preventDefault(); goToSection("#home"); }}>
          <span className="brand-mark"><Dumbbell size={20} strokeWidth={2.8} /></span>
          TOTAL FITNESS<span> GYM</span>
        </a>
        <nav className={menuOpen ? "nav nav-open" : "nav"} aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={(event) => { event.preventDefault(); scrollTo(item.href); }}>
              {item.label}
            </a>
          ))}
          <a className="nav-cta" href="#pricing" onClick={(event) => { event.preventDefault(); scrollTo("#pricing"); }}>
            Join the club <ArrowUpRightIcon />
          </a>
        </nav>
        <button className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {activeService ? <ServicePage service={activeService} onBack={() => goToSection("#services")} onJoin={() => goToSection("#pricing")} /> : <>
      <section className="hero" id="home">
        <div className="hero-photo" aria-hidden="true" />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow"><span /> YOUR NEXT CHAPTER STARTS HERE</div>
          <h1>STRONG<br />LOOKS <span>GOOD</span><br />ON YOU<span className="period">.</span></h1>
          <p>Build strength. Find your people. Feel unstoppable. Your goals are personal — your training should be too.</p>
          <div className="hero-actions">
            <button className="button button-hero" onClick={() => scrollTo("#pricing")}>Find your plan <ArrowRight size={18} /></button>
            <button className="play-link" onClick={() => scrollTo("#services")}><span className="play-circle"><Play size={14} fill="currentColor" /></span> Explore our services</button>
          </div>
        </div>
        <a className="scroll-cue" href="#services"><span>EXPLORE OUR SERVICES</span><ArrowDown size={29} /></a>
        <div className="hero-bottom-note">TRAIN HARD. LIVE WELL.</div>
      </section>

      <section className="ticker" aria-label="Total Fitness Gym values">
        <div className="ticker-track">
          {Array.from({ length: 2 }).map((_, index) => (
            <div className="ticker-group" key={index}>
              <span>MOVE BETTER</span><span className="ticker-dot" aria-hidden="true" /><span>FEEL STRONGER</span><span className="ticker-dot" aria-hidden="true" /><span>LIVE BRIGHTER</span><span className="ticker-dot" aria-hidden="true" /><span>YOUR PACE. YOUR POWER.</span><span className="ticker-dot" aria-hidden="true" />
            </div>
          ))}
        </div>
      </section>

      <section className="about section-pad" id="services">
        <div className="section-kicker"><span>01 / TOTAL FITNESS GYM SERVICES</span><span className="kicker-line" /></div>
        <div className="about-grid">
          <div>
            <h2>FIND YOUR<br /><span>WAY TO</span><br /><span className="outline-word">FEEL GOOD.</span></h2>
          </div>
          <div className="about-copy">
            <p className="lead">Good training should fit your goals, your starting point, and your life.</p>
            <p>Explore coaching, group classes, strength training, and recovery. Every service has its own approach, with a supportive team to help you decide where to begin.</p>
            <a href="#contact" className="text-link" onClick={(event) => { event.preventDefault(); scrollTo("#contact"); }}>Talk with our team <ArrowRight size={17} /></a>
          </div>
        </div>
        <div className="service-carousel" onMouseEnter={() => setPauseServiceAutoplay(true)} onMouseLeave={() => setPauseServiceAutoplay(false)} onFocusCapture={() => setPauseServiceAutoplay(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPauseServiceAutoplay(false); }}>
          <div className="service-carousel-controls" aria-label="Service carousel controls">
            <button aria-label="Scroll services left" onClick={() => scrollServices(-1)}><ArrowLeft size={18} /></button>
            <button aria-label="Scroll services right" onClick={() => scrollServices(1)}><ArrowRight size={18} /></button>
          </div>
          <div className="service-track" ref={servicesTrackRef}>
          {Array.from({ length: 2 }, (_, setIndex) => (
            <div className="service-group" key={setIndex} aria-hidden={setIndex === 1}>
              {services.map((service, index) => {
                const Icon = serviceIcons[index];
                return (
                  <a className={`feature-card service-card service-card-${index % 3}`} key={service.slug} tabIndex={setIndex === 1 ? -1 : undefined} href={`/services/${service.slug}`} onClick={(event) => { event.preventDefault(); openService(service.slug); }}>
                    <img className="service-card-image" src={service.image} alt="" loading="lazy" />
                    <span className="service-card-shade" />
                    <span className="feature-number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="feature-icon"><Icon /></span>
                    <h3>{service.title}</h3><p>{service.short}</p>
                    <span className="service-card-link">Explore service <ArrowRight size={15} /></span>
                  </a>
                );
              })}
            </div>
          ))}
          </div>
        </div>
      </section>

      <section className="gym-intro section-pad" id="our-gym">
        <div className="gym-intro-image-wrap">
          <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=85" alt="Open gym floor with strength and cardio equipment" loading="lazy" />
          <span className="gym-image-caption">A SPACE TO MOVE AT YOUR OWN PACE</span>
        </div>
        <div className="gym-intro-copy">
          <div className="section-kicker"><span>02 / ABOUT THE GYM</span><span className="kicker-line" /></div>
          <h2>ROOM TO<br />GET <span>STRONGER.</span></h2>
          <p className="gym-intro-lead">Total Fitness Gym is a place to build a routine that feels like yours.</p>
          <p>Come in with a clear goal or just a willingness to start. Explore the equipment, meet the coaching team, and find the services that fit your next step. We keep the focus on useful guidance, steady effort, and making every visit count.</p>
          <button className="button button-dark" onClick={() => scrollTo("#contact")}>Plan your first visit <ArrowRight size={17} /></button>
        </div>
      </section>

      <section className="gym-approach section-pad">
        <div className="section-kicker"><span>03 / THE TOTAL FITNESS APPROACH</span><span className="kicker-line" /></div>
        <div className="gym-approach-heading">
          <h2>GOOD HABITS.<br /><span>REAL PROGRESS.</span></h2>
          <p>A more welcoming way to train starts with the little things: feeling comfortable, knowing what to do, and having room to grow.</p>
        </div>
        <div className="approach-grid">
          <article><span>01</span><Dumbbell /><h3>START WHERE YOU ARE</h3><p>Build confidence with guidance that respects your experience and your pace.</p></article>
          <article><span>02</span><HeartPulse /><h3>FIND YOUR RHYTHM</h3><p>Choose a training style and routine you can return to consistently.</p></article>
          <article><span>03</span><Check /><h3>KEEP MOVING FORWARD</h3><p>Notice the progress you make, adjust your goals, and keep showing up for yourself.</p></article>
        </div>
      </section>

      <section className="quote-band">
        <div className="quote-symbol">“</div>
        <p>YOU DON'T HAVE TO BE<br />GREAT TO <span>START.</span></p>
        <div className="quote-bottom"><span>JUST START. WE'LL GO FROM THERE.</span><span>TOTAL FITNESS GYM / EST. 2024</span></div>
        <div className="quote-orbit" />
      </section>

      <section className="pricing section-pad" id="pricing">
        <div className="section-kicker"><span>04 / MEMBERSHIP</span><span className="kicker-line" /><span>NO HIDDEN FEES. JUST GOOD ENERGY.</span></div>
        <div className="pricing-heading">
          <h2>YOUR GOALS.<br /><span>YOUR PLAN.</span></h2>
          <p>Pick the membership that fits your life right now. You can always level up when you're ready.</p>
        </div>
        <div className="plans-grid">
          {plans.map((plan, index) => (
            <article className={`plan-card ${plan.featured ? "plan-featured" : ""}`} key={plan.name}>
              {plan.featured && <div className="popular-tag"><Sparkles size={13} /> MOST LOVED</div>}
              <div className="plan-top"><span>0{index + 1} / MEMBERSHIP</span><span className="plan-icon">{index === 0 ? <Dumbbell /> : index === 1 ? <Zap /> : <Sparkles />}</span></div>
              <h3>{plan.name}</h3>
              <p className="plan-description">{plan.description}</p>
              <div className="price">{plan.price}<span>{plan.suffix}</span></div>
              <div className="plan-divider" />
              <ul>{plan.features.map((feature) => <li key={feature}><span><Check size={13} /></span>{feature}</li>)}</ul>
              <button className={plan.featured ? "button button-dark" : "button button-outline"} onClick={() => { setSelectedPlan(plan.name); scrollTo("#contact"); }}>
                Choose {plan.name.toLowerCase()} <ArrowRight size={17} />
              </button>
            </article>
          ))}
        </div>
        <p className="pricing-note"><Check size={15} /> All plans include a no-pressure first visit. Cancel or change your plan anytime.</p>
      </section>

      <section className="contact section-pad" id="contact">
        <div className="contact-left">
          <div className="section-kicker"><span>05 / SAY HELLO</span><span className="kicker-line" /></div>
          <h2>LET'S MAKE<br />SOMETHING <span>HAPPEN.</span></h2>
          <p>Questions, goals, or just want to see the space? We're all ears. Your first step can be a simple hello.</p>
          <div className="contact-detail"><span className="contact-detail-icon">✳</span><div><small>COME FIND US</small><strong>24 Motion Street, Your City</strong></div></div>
          <div className="contact-detail"><span className="contact-detail-icon">@</span><div><small>DROP US A LINE</small><strong>hello@totalfitnessgym.com</strong></div></div>
          <div className="socials"><a href="https://instagram.com" aria-label="Instagram"><Instagram /></a><a href="https://facebook.com" aria-label="Facebook"><Facebook /></a><a href="https://youtube.com" aria-label="YouTube"><Youtube /></a></div>
        </div>
        <div className="contact-form-wrap">
          {submitted ? (
            <div className="success-state"><div className="success-icon"><Check size={26} /></div><h3>YOU'RE ON YOUR WAY.</h3><p>Thanks for reaching out! This demo form has captured your submission locally. Connect it to your email or CRM to receive real messages.</p><button className="button button-dark" onClick={() => setSubmitted(false)}>Send another message <ArrowRight size={17} /></button></div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-heading"><span>LET'S CONNECT</span><span className="form-star">✳</span></div>
              <label>Your name<input name="name" placeholder="What should we call you?" required /></label>
              <label>Email address<input name="email" type="email" placeholder="you@example.com" required /></label>
              <label>I'm interested in<select name="interest" value={selectedPlan} onChange={(event) => setSelectedPlan(event.target.value)}><option value="STARTER">Starter membership</option><option value="UNLIMITED">Unlimited membership</option><option value="ELITE">Elite membership</option><option value="TOUR">A gym tour</option><option value="OTHER">Something else</option></select></label>
              <label>Your message<textarea name="message" placeholder="Tell us a little about your goals..." rows={3} required /></label>
              <button type="submit" className="button button-red">Send it our way <ArrowRight size={18} /></button>
              <small className="form-privacy">By sending this, you're taking the first step. We love that for you.</small>
            </form>
          )}
        </div>
      </section>
      </>}

      <footer className="footer">
        <a className="brand footer-brand" href="#home"><span className="brand-mark"><Dumbbell size={18} strokeWidth={2.8} /></span> TOTAL FITNESS<span> GYM</span></a>
        <span>© 2026 TOTAL FITNESS GYM. BUILT FOR YOUR NEXT CHAPTER.</span>
        <a className="back-top" href="#home">BACK TO TOP <MoveUpRight size={15} /></a>
      </footer>
    </main>
  );
}

type Service = (typeof services)[number];

function ServicePage({ service, onBack, onJoin }: { service: Service; onBack: () => void; onJoin: () => void }) {
  return (
    <article className="service-page">
      <section className="service-hero">
        <img src={service.image} alt={service.imageAlt} />
        <div className="service-hero-shade" />
        <div className="service-hero-copy">
          <button className="service-back" onClick={onBack}><ArrowDown size={15} /> ALL SERVICES</button>
          <span className="service-eyebrow">WHAT WE OFFER / {String(services.indexOf(service) + 1).padStart(2, "0")}</span>
          <h1>{service.title}</h1>
          <p>{service.intro}</p>
        </div>
      </section>
      <section className="service-detail section-pad">
        <div className="service-detail-copy">
          <div className="section-kicker"><span>THE EXPERIENCE</span><span className="kicker-line" /></div>
          <h2>MAKE ROOM<br />TO <span>MOVE.</span></h2>
          <p>{service.description}</p>
          <ul>{service.points.map((point) => <li key={point}><Check size={16} />{point}</li>)}</ul>
          <button className="button button-red" onClick={onJoin}>Explore memberships <ArrowRight size={17} /></button>
        </div>
        <img className="service-detail-image" src={service.detailImage} alt={service.detailAlt} />
      </section>
      <section className="service-bottom section-pad">
        <div><span>YOUR NEXT CHAPTER STARTS HERE</span><h2>READY WHEN<br />YOU ARE.</h2></div>
        <button className="button button-dark" onClick={onJoin}>Find your membership <ArrowRight size={17} /></button>
      </section>
    </article>
  );
}

function ArrowUpRightIcon() {
  return <MoveUpRight size={16} />;
}

export default App;

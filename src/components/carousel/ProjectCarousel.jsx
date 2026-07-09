import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";

const projects = [
  { title: "ANPR", subtitle: "Automatic Number Plate Recognition", url: "https://github.com/akhilgolepu/ANPR", accent: "#0066FF", mock: "anpr", image: "/project_screenshots/TheAnpr.jpeg" },
  { title: "California House Price Prediction", subtitle: "Regression models for housing prices", url: "https://github.com/akhilgolepu/California-House-Price-Prediction", accent: "#10B981", mock: "pipeline", image: "/project_screenshots/CaliforniaHousePricePredictor.jpeg" },
  { title: "Car Price Prediction", subtitle: "Used car price estimator", url: "https://github.com/akhilgolepu/Car-Price-Prediction", accent: "#F59E0B", mock: "vision", image: "/project_screenshots/CarPricePrediction.jpeg" },
  { title: "Customer Segmentation", subtitle: "Clustering customers for marketing", url: "https://github.com/akhilgolepu/Customer_Segmentation", accent: "#EC4899", mock: "graph", image: "/project_screenshots/CustomerSegmentation.jpeg" },
  { title: "Customer Churn Prediction", subtitle: "Predicting churn with ML", url: "https://github.com/akhilgolepu/Customer-Churn-Prediction", accent: "#8B5CF6", mock: "dashboard", image: "/project_screenshots/CustomerChurnPrediction.jpeg" },
];

function Mock({ kind, accent }) {
  return (
    <div className="absolute inset-0 p-5 flex flex-col gap-3">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
      </div>
      <div className="flex-1 rounded-xl border border-border bg-background/50 p-4 grid grid-cols-6 gap-3">
        {kind === "dashboard" && (
          <>
            <div className="col-span-2 rounded-lg border border-border p-3"><div className="text-[10px] text-muted-foreground">Throughput</div><div className="text-2xl font-medium mt-2" style={{ color: accent }}>1.2M</div></div>
            <div className="col-span-2 rounded-lg border border-border p-3"><div className="text-[10px] text-muted-foreground">P99</div><div className="text-2xl font-medium mt-2">42ms</div></div>
            <div className="col-span-2 rounded-lg border border-border p-3"><div className="text-[10px] text-muted-foreground">Uptime</div><div className="text-2xl font-medium mt-2">99.98%</div></div>
            <div className="col-span-6 rounded-lg border border-border p-3 h-24 relative overflow-hidden">
              <svg viewBox="0 0 200 60" className="w-full h-full"><path d="M0,40 Q40,10 80,30 T160,20 T200,15" fill="none" stroke={accent} strokeWidth="1.5"/></svg>
            </div>
          </>
        )}
        {kind === "satellite" && (
          <div className="col-span-6 relative rounded-lg overflow-hidden" style={{ background: `radial-gradient(circle at 30% 40%, ${accent}33, transparent 60%), #0b0b0b` }}>
            <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
            <div className="absolute top-4 left-4 text-[10px] text-white/70">SAT-04 · pass 0241</div>
            <div className="absolute bottom-4 right-4 text-[10px] text-white/70" style={{ color: accent }}>● tracking</div>
          </div>
        )}
        {kind === "pipeline" && (
          <>
            {['ingest', 'transform', 'train', 'evaluate', 'deploy', 'monitor'].map((s, i) => (
              <div key={s} className="col-span-2 rounded-lg border border-border p-3 text-[11px]">
                <div className="text-muted-foreground">step {i + 1}</div>
                <div className="font-medium mt-1">{s}</div>
                <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden"><div className="h-full" style={{ width: `${20 + i * 12}%`, background: accent }} /></div>
              </div>
            ))}
          </>
        )}
        {kind === "vision" && (
          <div className="col-span-6 relative rounded-lg overflow-hidden bg-black">
            <div className="absolute inset-0 opacity-60" style={{ background: `conic-gradient(from 0deg, ${accent}, transparent, ${accent}88)` }} />
            <div className="absolute left-8 top-8 w-24 h-16 border-2 rounded" style={{ borderColor: accent }} />
            <div className="absolute left-10 top-6 text-[10px] px-1.5 py-0.5 rounded" style={{ background: accent, color: "#000" }}>person 0.97</div>
            <div className="absolute right-12 bottom-10 w-16 h-16 border-2 rounded" style={{ borderColor: accent }} />
          </div>
        )}
        {kind === "graph" && (
          <div className="col-span-6 relative rounded-lg overflow-hidden">
            <svg viewBox="0 0 300 140" className="w-full h-full">
              {Array.from({ length: 14 }).map((_, i) => {
                const x = 20 + (i % 7) * 40, y = 30 + Math.floor(i / 7) * 60;
                return <circle key={i} cx={x} cy={y} r={5} fill={accent} opacity={0.7} />;
              })}
              {Array.from({ length: 18 }).map((_, i) => (
                <line key={i} x1={20 + (i % 7) * 40} y1={30} x2={20 + ((i + 2) % 7) * 40} y2={90} stroke={accent} strokeOpacity="0.25" />
              ))}
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProjectCarousel() {
  const [index, setIndex] = useState(0);
  const ringRef = useRef(null);
  const stageRef = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px' });
  const radius = 520;
  const angleStep = 360 / projects.length;

  useEffect(() => {
    const onScroll = () => {
      if (!stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      const tilt = Math.max(-12, Math.min(12, center * -0.02));
      if (ringRef.current) {
        ringRef.current.style.setProperty("--tilt", `${tilt}deg`);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const rotate = -index * angleStep;

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{ paddingTop: '120px', paddingBottom: '120px', borderTop: '1px solid var(--border-line)' }}
    >
      <div className="max-w-layout mx-auto px-8">
        {/* Label */}
        <motion.span
          className="font-mono text-xs uppercase tracking-widest block mb-12"
          style={{ color: '#2563EB', letterSpacing: '0.1em' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          02 — Work
        </motion.span>

        <div className="relative">
          <div ref={stageRef} className="carousel-stage">
            <div
              ref={ringRef}
              className="carousel-ring"
              style={{ transform: `rotateX(var(--tilt, 0deg)) rotateY(${rotate}deg)` }}
            >
              {projects.map((p, i) => {
                const rot = i * angleStep;
                const active = i === index;
                return (
                  <a
                    key={p.title}
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="view"
                    className="carousel-card group"
                    style={{
                      transform: `rotateY(${rot}deg) translateZ(${radius}px)`,
                      opacity: active ? 1 : 0.55,
                      transition: "opacity 0.6s ease",
                    }}
                  >
                    <div className="absolute inset-0">
                      <img src={p.image} alt={p.title} className="w-full h-full object-contain" style={{ display: 'block' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setIndex((i) => (i - 1 + projects.length) % projects.length)}
              className="h-11 w-11 grid place-items-center rounded-full border border-border hover:bg-muted transition-colors"
              aria-label="Previous"
            >
              <ArrowLeft size={16} />
            </button>
            <div className="text-xs text-muted-foreground tabular-nums w-20 text-center">
              {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </div>
            <button
              onClick={() => setIndex((i) => (i + 1) % projects.length)}
              className="h-11 w-11 grid place-items-center rounded-full border border-border hover:bg-muted transition-colors"
              aria-label="Next"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

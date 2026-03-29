/**
 * CAFÉ TR3Z — Premium Website Component
 * Stack: React + Framer Motion
 * Aesthetic: Minimalist-Industrial / Cinematic Scroll
 * UI/UX Pro Max Audited ✓
 */

import { useRef, useEffect, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";

import heroImg from "../assets/hero-cup.png";
import spaceBarraImg from "../assets/space-barra.jpg";
import spaceLuzImg from "../assets/space-luz.jpg";
import spaceDetalleImg from "../assets/space-detalle.jpg";
import spaceHorasImg from "../assets/space-horas.jpg";
import spaceComunidadImg from "../assets/space-comunidad.jpg";

import bean1Img from "../assets/beans/bean1.png";
import bean2Img from "../assets/beans/bean2.png";
import bean3Img from "../assets/beans/bean3.png";
import bean4Img from "../assets/beans/bean4.png";
import bean5Img from "../assets/beans/bean5.png";
import bean6Img from "../assets/beans/bean6.png";
import bean7Img from "../assets/beans/bean7.png";
import bean8Img from "../assets/beans/bean8.png";
import bean9Img from "../assets/beans/bean9.png";
import bean10Img from "../assets/beans/bean10.png";
import bean11Img from "../assets/beans/bean11.png";
import bean12Img from "../assets/beans/bean12.png";

const BEAN_IMAGES = [bean1Img, bean2Img, bean3Img, bean4Img, bean5Img, bean6Img, bean7Img, bean8Img, bean9Img, bean10Img, bean11Img, bean12Img];


/* ─── DESIGN TOKENS ─── */
const COLORS = {
  white: "#FEFEFE",
  darkKhaki: "#46420C",
  goldenGlow: "#E4DC22",
  ashGrey: "#B5B4A2",
  pitchBlack: "#0D0C09",
};

/* ─── MENU DATA ─── */
const MENU_SECTIONS = [
  {
    category: "Café",
    items: [
      { name: "Espresso 2oz", price: "$30", desc: "La esencia pura de nuestro café." },
      { name: "Espresso Americano", prices: { CH: 50, M: 55, G: 62, XL: 105 }, desc: "Espresso extraído sobre agua caliente." },
      { name: "Capuccino / Latte", prices: { CH: 75, M: 80, G: 87, XL: 145 }, desc: "Bebidas a base de espresso con leche cremosa (Natural o esencia tr3z)." },
      { name: "Caramel Macchiato", prices: { CH: 80, M: 85, G: 92, XL: 155 }, desc: "Toque de vainilla y caramelo." },
      { name: "Cold Brew", prices: { CH: 70, M: 75, G: 82, XL: 140 }, desc: "Extracción lenta en frío por 18 horas." },
      { name: "Café de Olla", prices: { CH: 70, M: 75, G: 82, XL: 140 }, desc: "Café tradicional mexicano con canela y piloncillo." },
    ],
  },
  {
    category: "Barista",
    items: [
      { name: "Dolce Gusto", prices: { CH: 80, M: 85, G: 92, XL: 155 }, desc: "Vainilla - Canela. Una de las creaciones insignia." },
      { name: "Media Noche", prices: { CH: 80, M: 85, G: 92, XL: 155 }, desc: "Vainilla - Lavanda. Suave y aromático." },
      { name: "Selva Negra", prices: { CH: 80, M: 85, G: 92, XL: 155 }, desc: "Mocha - Cereza. Combinación exquisita." },
      { name: "Ferrero", prices: { CH: 80, M: 85, G: 92, XL: 155 }, desc: "Mocha - Avellana. Para los amantes del chocolate." },
      { name: "Mocha-Menta", prices: { CH: 80, M: 85, G: 92, XL: 155 }, desc: "Chocolate, café y toque refrescante de menta." },
      { name: "Mocharelo", prices: { CH: 80, M: 85, G: 92, XL: 155 }, desc: "Mocha - Caramelo." },
      { name: "Bebida de Temporada", prices: { CH: 80, M: 85, G: 92, XL: 155 }, desc: "Pregunta por la especialidad del mes en barra." },
    ],
  },
  {
    category: "Frappés",
    items: [
      { name: "Frappé Clásico", prices: { CH: 85, M: 90, G: 97, XL: 160 }, desc: "Café o esencia tr3z. (Pídelo sin café si gustas)" },
      { name: "Frappé Especial", prices: { CH: 90, M: 95, G: 102, XL: 165 }, desc: "Creaciones Barista, Chai o Matcha." },
    ]
  },
  {
    category: "Otras Bebidas",
    items: [
      { name: "Orange Espresso Tonic", prices: { CH: 80, M: 85, G: 92, XL: 155 }, desc: "Espresso, agua tónica y jugo de naranja." },
      { name: "Chocolate Artesanal", prices: { CH: 80, M: 85, G: 92, XL: 160 }, desc: "Chocolate rico y caliente. (Sin café)" },
      { name: "Matcha Latte", prices: { CH: 80, M: 85, G: 92, XL: 160 }, desc: "Té verde japonés, leche cremosa. (Sin café)" },
      { name: "Chai Vainilla Latte", prices: { CH: 80, M: 85, G: 92, XL: 160 }, desc: "Especias orientales con vainilla y leche." },
      { name: "Limonada Natural / Mineral", prices: { CH: 55, M: 60, G: 67, XL: 115 }, desc: "Opción refrescante para el calor." },
      { name: "Berries Tonic", prices: { CH: 70, M: 75, G: 82, XL: 140 }, desc: "Tónica burbujeante con frutos rojos." },
    ]
  },
  {
    category: "Alimentos",
    items: [
      { name: "Sandwich Corbani", price: "$115", desc: "Cerdo, pavo, peperoni, queso. Recomendado agregar tocino." },
      { name: "Sandwich Pecaminoso", price: "$129", desc: "Pavo, cerdo ahumado, tocino, doble queso, espinacas." },
      { name: "Waffle Polo Norte", price: "$129", desc: "2 waffles, fresas, plátano, helado de vainilla." },
      { name: "Waffle Loaded", price: "$135", desc: "Frutos rojos, plátano, galleta, crema batida, helado, bañado en salsa." },
      { name: "Ensalada Mediterránea", price: "$139", desc: "100g de pechuga, espinacas, fresas, queso feta, nueces." },
      { name: "Nachos Con Todo", prices: { CH: 125, G: 225 }, desc: "Carne asada, chorizo, chilibeans, queso, crema, jalapeños." },
    ]
  },
  {
    category: "Postres",
    items: [
      { name: "Postre de la casa", price: "$85", desc: "Pan de elote horneado del día con helado de vainilla." },
      { name: "Brownie a la moda", price: "$85", desc: "Brownie calientito servido con helado." },
      { name: "Big Apple Pie", price: "$105", desc: "Estilo Julian. Solo en temporada." },
      { name: "Strudel de manzana", price: "$89", desc: "Con helado de vainilla y toque de caramelo." },
      { name: "Rebanada de pastel", price: "$75", desc: "Pregunta en barra por las opciones de hoy." },
    ]
  }
];

const GALLERY_ITEMS = [
  { id: 1, label: "La Barra", aspect: "portrait", img: spaceBarraImg },
  { id: 2, label: "Luz Matutina", aspect: "landscape", img: spaceLuzImg },
  { id: 3, label: "El Detalle", aspect: "portrait", img: spaceDetalleImg },
  { id: 4, label: "Después de Horas", aspect: "landscape", img: spaceHorasImg },
  { id: 5, label: "Comunidad", aspect: "portrait", img: spaceComunidadImg },
];




/* ─── HOOKS ─── */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

/* ─── GRAIN OVERLAY ─── */
function GrainOverlay() {
  const isMobile = useIsMobile();
  if (isMobile) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        opacity: 0.035,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
      }}
    />
  );
}

/* ─── FLOATING NAV ─── */
function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { label: "Historia", href: "#story" },
    { label: "Menú", href: "#menu" },
    { label: "Espacio", href: "#space" },
    { label: "Domicilio", href: "#delivery" },
    { label: "Contacto", href: "#contact" },
  ];

  const linkStyle = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.75rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: COLORS.ashGrey,
    textDecoration: "none",
    transition: "color 0.2s",
    cursor: "pointer",
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 16,
          left: isMobile ? 16 : 0,
          right: isMobile ? 16 : 0,
          marginLeft: isMobile ? undefined : "auto",
          marginRight: isMobile ? undefined : "auto",
          width: isMobile ? "calc(100% - 32px)" : "fit-content",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: isMobile ? "space-between" : "center",
          gap: isMobile ? "0" : "2rem",
          padding: scrolled ? "0.6rem 1.5rem" : "1rem 1.5rem",
          borderRadius: "9999px",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          backgroundColor: scrolled ? "rgba(13,12,9,0.85)" : "transparent",
          border: scrolled ? "1px solid rgba(228,220,34,0.15)" : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.5)" : "none",
          transition: "background-color 0.4s, border-color 0.4s, padding 0.4s, box-shadow 0.4s",
        }}
      >
        {/* Logo */}
        <a href="#hero" style={{ display: "flex", alignItems: "center", gap: "0.4rem", textDecoration: "none", cursor: "pointer" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            <div style={{ height: "2.5px", width: "16px", backgroundColor: COLORS.goldenGlow, borderRadius: "2px" }} />
            <div style={{ height: "2.5px", width: "11px", backgroundColor: COLORS.goldenGlow, borderRadius: "2px", marginLeft: "5px" }} />
            <div style={{ height: "2.5px", width: "16px", backgroundColor: COLORS.goldenGlow, borderRadius: "2px" }} />
          </div>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 700,
            fontSize: "1rem",
            color: COLORS.white,
            letterSpacing: "0.08em",
          }}>
            TR<span style={{ color: COLORS.goldenGlow, display: "inline-block", transform: "translateY(-0.24em)" }}>3</span>Z
          </span>
        </a>

        {/* Desktop nav links */}
        {!isMobile && navLinks.map((item) => (
          <a
            key={item.label}
            href={item.href}
            style={linkStyle}
            onMouseEnter={(e) => (e.target.style.color = COLORS.goldenGlow)}
            onMouseLeave={(e) => (e.target.style.color = COLORS.ashGrey)}
          >
            {item.label}
          </a>
        ))}

        {!isMobile && (
          <a
            href="#contact"
            style={{
              padding: "0.45rem 1.2rem",
              borderRadius: "9999px",
              border: `1px solid ${COLORS.goldenGlow}`,
              color: COLORS.goldenGlow,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              textDecoration: "none",
              cursor: "pointer",
              transition: "background-color 0.3s, color 0.3s",
            }}
            onMouseEnter={(e) => { e.target.style.backgroundColor = COLORS.goldenGlow; e.target.style.color = COLORS.pitchBlack; }}
            onMouseLeave={(e) => { e.target.style.backgroundColor = "transparent"; e.target.style.color = COLORS.goldenGlow; }}
          >
            Visítanos
          </a>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              gap: menuOpen ? "0px" : "5px",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              position: "relative",
            }}
          >
            <span style={{
              display: "block",
              width: "20px",
              height: "2px",
              backgroundColor: COLORS.goldenGlow,
              borderRadius: "2px",
              transition: "all 0.3s ease",
              transform: menuOpen ? "rotate(45deg) translateY(0)" : "none",
              position: menuOpen ? "absolute" : "relative",
            }} />
            <span style={{
              display: "block",
              width: "20px",
              height: "2px",
              backgroundColor: COLORS.goldenGlow,
              borderRadius: "2px",
              transition: "all 0.3s ease",
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: "block",
              width: "20px",
              height: "2px",
              backgroundColor: COLORS.goldenGlow,
              borderRadius: "2px",
              transition: "all 0.3s ease",
              transform: menuOpen ? "rotate(-45deg) translateY(0)" : "none",
              position: menuOpen ? "absolute" : "relative",
            }} />
          </button>
        )}
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 999,
              backgroundColor: "rgba(13,12,9,0.97)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2.5rem",
            }}
          >
            {navLinks.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "2rem",
                  fontWeight: 600,
                  color: COLORS.white,
                  textDecoration: "none",
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                }}
              >
                {item.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              onClick={() => setMenuOpen(false)}
              style={{
                marginTop: "1rem",
                padding: "0.9rem 2.2rem",
                borderRadius: "9999px",
                border: `1.5px solid ${COLORS.goldenGlow}`,
                color: COLORS.goldenGlow,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.8rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Visítanos
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── HERO ─── */
function HeroSection() {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "25%" : "55%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "40%" : "80%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const smoothY2 = useSpring(y2, { stiffness: 60, damping: 24 });
  const smoothOpacity = useSpring(opacity, { stiffness: 50, damping: 24 });
  const smoothIndicatorOpacity = useSpring(indicatorOpacity, { stiffness: 50, damping: 24 });

  return (
    <section
      id="hero"
      ref={ref}
      style={{
        position: "relative",
        height: "100vh",
        minHeight: isMobile ? "600px" : "700px",
        overflow: "hidden",
        backgroundColor: COLORS.pitchBlack,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >

      {/* --- FLOATING COFFEE BEANS (Real Images) --- */}
      {[
        { top: "5%", left: "15%", size: 80, rotate: 25, dur: 6, delay: 0, img: 0 },
        { top: "8%", left: "30%", size: 55, rotate: -40, dur: 7, delay: 0.5, img: 2 },
        { top: "12%", right: "18%", size: 100, rotate: 60, dur: 5.5, delay: 1, img: 1 },
        { top: "35%", left: "8%", size: 70, rotate: -15, dur: 8, delay: 0.3, img: 2 },
        { top: "45%", left: "20%", size: 45, rotate: 80, dur: 6.5, delay: 1.2, img: 3 },
        { top: "72%", left: "12%", size: 85, rotate: -55, dur: 7.5, delay: 0.8, img: 4 },
        { top: "20%", right: "12%", size: 60, rotate: 35, dur: 6, delay: 0.6, img: 5 },
        { top: "50%", right: "15%", size: 90, rotate: -70, dur: 7, delay: 1.5, img: 3 },
        { top: "75%", right: "20%", size: 60, rotate: 20, dur: 5, delay: 0.2, img: 0 },
        { top: "85%", right: "35%", size: 40, rotate: -30, dur: 8, delay: 1.8, img: 2 },
        { top: "88%", left: "28%", size: 55, rotate: 45, dur: 6.8, delay: 0.4, img: 1 },
        { top: "60%", right: "8%", size: 45, rotate: -85, dur: 7.2, delay: 2.0, img: 4 },
        { top: "15%", left: "5%", size: 45, rotate: 10, dur: 5.8, delay: 1.1, img: 3 },
        { top: "25%", right: "25%", size: 50, rotate: -25, dur: 6.2, delay: 0.7, img: 5 },
        { top: "65%", left: "2%", size: 65, rotate: 110, dur: 8.5, delay: 1.5, img: 1 },
        { top: "40%", right: "2%", size: 75, rotate: -45, dur: 6.5, delay: 0.9, img: 0 },
        { top: "95%", right: "15%", size: 50, rotate: 65, dur: 5.5, delay: 2.2, img: 4 },
        { top: "80%", left: "18%", size: 35, rotate: -15, dur: 7, delay: 0.3, img: 2 },
        { top: "10%", right: "30%", size: 40, rotate: 85, dur: 6, delay: 1.6, img: 3 },
        { top: "55%", right: "25%", size: 55, rotate: -95, dur: 7.5, delay: 1.4, img: 5 },
      ].map((bean, i) => (
        <motion.div
          key={`bean-${i}`}
          animate={{
            y: [0, -12, 0, 10, 0],
            rotate: [bean.rotate, bean.rotate + 20, bean.rotate - 15, bean.rotate + 10, bean.rotate],
          }}
          transition={{ duration: bean.dur, repeat: Infinity, ease: "easeInOut", delay: bean.delay }}
          style={{
            position: "absolute",
            top: bean.top,
            left: bean.left,
            right: bean.right,
            bottom: bean.bottom,
            zIndex: i % 3 === 0 ? 15 : 1,
            pointerEvents: "none",
            width: bean.size,
            height: bean.size,
          }}
        >
          <img
            src={BEAN_IMAGES[bean.img]}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.4))",
            }}
          />
        </motion.div>
      ))}

      {/* --- MAIN CONTENT LAYOUT --- */}
      <div style={{ position: "relative", zIndex: 10, width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

        {/* "CAFÉ" — top-left area */}
        <div style={{ overflow: "hidden", position: "absolute", top: isMobile ? "9%" : "15%", left: isMobile ? "6%" : "15%", zIndex: 12 }}>
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: isMobile ? "clamp(3.5rem, 16vw, 5rem)" : "clamp(5rem, 10vw, 10rem)",
              fontWeight: 700,
              lineHeight: 1,
              color: COLORS.white,
              margin: 0,
              textShadow: "0 4px 30px rgba(0,0,0,0.6)",
            }}
          >
            CAFÉ
          </motion.h1>
        </div>

        {/* "TR3Z" — right of center */}
        <div style={{ overflow: "hidden", position: "absolute", top: isMobile ? "auto" : "36%", bottom: isMobile ? "38%" : "auto", right: isMobile ? "6%" : "15%", zIndex: 12 }}>
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: isMobile ? "clamp(3.5rem, 16vw, 5rem)" : "clamp(5rem, 10vw, 10rem)",
              fontWeight: 700,
              lineHeight: 1,
              color: COLORS.white,
              margin: 0,
              textShadow: "0 4px 30px rgba(0,0,0,0.6)",
            }}
          >
            TR<span style={{ color: COLORS.goldenGlow, display: "inline-block", transform: "translateY(-0.22em)" }}>3</span>Z
          </motion.h1>
        </div>

        {/* Signature Cup — centered */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.85, rotate: 0 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: 12 }}
          transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "relative",
            zIndex: 11,
            width: isMobile ? "min(75vw, 340px)" : "min(42vw, 550px)",
            aspectRatio: "1",
            y: smoothY2,
          }}
        >
          <img
            src={heroImg}
            alt="Café Tr3z Signature Coffee"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              filter: "drop-shadow(0 30px 50px rgba(0,0,0,0.8)) drop-shadow(0 0 80px rgba(0,0,0,0.4))",
            }}
          />
        </motion.div>

        {/* --- DIAGONAL YELLOW BANNER WITH BUTTONS --- */}
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            bottom: isMobile ? "12%" : "18%",
            left: "-5%",
            right: "-5%",
            zIndex: 20,
            backgroundColor: COLORS.goldenGlow,
            transform: "rotate(-3deg)",
            padding: isMobile ? "1.5rem 0" : "1.5rem 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: isMobile ? "1.5rem" : "3rem",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          {/* Styled Nav Buttons */}
          <a
            href="#menu"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: isMobile ? "0.8rem" : "0.95rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: COLORS.goldenGlow,
              backgroundColor: COLORS.pitchBlack,
              textDecoration: "none",
              cursor: "pointer",
              padding: "0.8rem 2.5rem",
              borderRadius: "999px",
              border: "1px solid transparent",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.white;
              e.currentTarget.style.color = COLORS.pitchBlack;
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.pitchBlack;
              e.currentTarget.style.color = COLORS.goldenGlow;
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
            }}
          >
            Ver Menú
          </a>
          
          <a
            href="#story"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: isMobile ? "0.8rem" : "0.95rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: COLORS.goldenGlow,
              backgroundColor: COLORS.pitchBlack,
              textDecoration: "none",
              cursor: "pointer",
              padding: "0.8rem 2.5rem",
              borderRadius: "999px",
              border: "1px solid transparent",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.white;
              e.currentTarget.style.color = COLORS.pitchBlack;
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.pitchBlack;
              e.currentTarget.style.color = COLORS.goldenGlow;
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
            }}
          >
            Nuestra Historia
          </a>
        </motion.div>

        {/* Small tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          style={{
            position: "absolute",
            bottom: isMobile ? "5%" : "8%",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: COLORS.ashGrey,
            opacity: 0.6,
            zIndex: 21,
            whiteSpace: "nowrap",
          }}
        >
          Mexicali, B.C. · Est. 2019
        </motion.p>

      </div>

    </section>
  );
}

/* ─── ACCORDION CARD DATA — EL ORIGEN ─── */
/* ─── PIDE A DOMICILIO ─── */
function DeliverySection() {
  const isMobile = useIsMobile();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" });

  return (
    <section id="delivery" ref={sectionRef} style={{ backgroundColor: COLORS.pitchBlack, padding: isMobile ? "5rem 6%" : "8rem 10%", position: "relative" }}>
      {/* Ambient Glow */}
      <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "50%", height: "50%", borderRadius: "50%", background: "radial-gradient(circle, rgba(228,220,34,0.05) 0%, transparent 60%)", pointerEvents: "none" }} />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }} 
        style={{ textAlign: "center", marginBottom: isMobile ? "3rem" : "5rem" }}
      >
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", color: COLORS.goldenGlow, textTransform: "uppercase", marginBottom: "1rem" }}>
          — Lleva Café Tr3z Contigo —
        </p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "clamp(2rem, 8vw, 3rem)" : "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, color: COLORS.white, margin: 0 }}>
          Pide a Domicilio
        </h2>
      </motion.div>

      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: "2rem", justifyContent: "center", maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {[
          {
            appName: "Rappi",
            url: "https://www.rappi.com.mx/restaurantes/1923801310-cafe-tr3z",
            tagline: "Llega directo a tu puerta",
            delay: 0,
            routePath: "M 30,160 C 50,150 60,100 90,90 C 120,80 110,50 140,55 C 170,60 160,30 200,25 C 240,20 230,60 260,55 C 290,50 280,25 310,30",
            dotStart: "0%",
          },
          {
            appName: "DiDi Food",
            url: "https://web.didiglobal.com/mx/food/mexicali-bcn/cafe-tr3z/5764607643247968488/",
            tagline: "Ordena fácil y rápido",
            delay: 0.3,
            routePath: "M 30,30 C 60,35 50,80 80,90 C 110,100 130,60 160,55 C 190,50 180,110 210,120 C 240,130 260,80 290,70 C 310,65 310,100 310,115",
            dotStart: "0%",
          }
        ].map((app) => (
          <motion.a 
            key={app.appName}
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: app.delay }}
            whileHover={{ scale: 1.02, borderColor: COLORS.goldenGlow }}
            whileTap={{ scale: 0.98 }}
            style={{
              flex: 1,
              position: "relative",
              borderRadius: "20px",
              border: "1px solid rgba(228,220,34,0.12)",
              backgroundColor: "#0e0e0b",
              textDecoration: "none",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
              minHeight: isMobile ? "280px" : "320px",
              transition: "border-color 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            {/* City Grid Background */}
            <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.4 }}>
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id={`grid-${app.appName}`} width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 L 0 40" fill="none" stroke="rgba(228,220,34,0.08)" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#grid-${app.appName})`} />
                {/* Irregular "street" blocks */}
                <rect x="15%" y="20%" width="18%" height="25%" rx="2" fill="none" stroke="rgba(228,220,34,0.06)" strokeWidth="0.5" />
                <rect x="45%" y="10%" width="22%" height="30%" rx="2" fill="none" stroke="rgba(228,220,34,0.06)" strokeWidth="0.5" />
                <rect x="60%" y="55%" width="15%" height="20%" rx="2" fill="none" stroke="rgba(228,220,34,0.06)" strokeWidth="0.5" />
                <rect x="10%" y="60%" width="20%" height="18%" rx="2" fill="none" stroke="rgba(228,220,34,0.06)" strokeWidth="0.5" />
                <rect x="75%" y="30%" width="12%" height="25%" rx="2" fill="none" stroke="rgba(228,220,34,0.05)" strokeWidth="0.5" />
              </svg>
            </div>

            {/* Dark overlay gradient — fades grid at edges */}
            <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "radial-gradient(ellipse at 50% 60%, transparent 20%, #0e0e0b 85%)", pointerEvents: "none" }} />

            {/* Animated Route SVG */}
            <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}>
              <svg width="100%" height="100%" viewBox="0 0 340 180" preserveAspectRatio="xMidYMid meet" style={{ position: "absolute", inset: 0 }}>
                {/* The dotted route (static) */}
                <path 
                  d={app.routePath}
                  fill="none" 
                  stroke="rgba(228,220,34,0.15)" 
                  strokeWidth="2" 
                  strokeDasharray="6 4" 
                />

                {/* The golden glowing route (animated draw) */}
                <motion.path 
                  d={app.routePath}
                  fill="none" 
                  stroke={COLORS.goldenGlow} 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 2.5, delay: app.delay + 0.5, ease: "easeInOut" }}
                  style={{ filter: "drop-shadow(0 0 6px rgba(228,220,34,0.5))" }}
                />

                {/* Start Pin — Café Tr3z */}
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: app.delay + 0.3, duration: 0.4, type: "spring" }}
                >
                  {app.appName === "Rappi" ? (
                    <>
                      <circle cx="30" cy="160" r="6" fill={COLORS.goldenGlow} opacity="0.25" />
                      <circle cx="30" cy="160" r="3.5" fill={COLORS.goldenGlow} />
                    </>
                  ) : (
                    <>
                      <circle cx="30" cy="30" r="6" fill={COLORS.goldenGlow} opacity="0.25" />
                      <circle cx="30" cy="30" r="3.5" fill={COLORS.goldenGlow} />
                    </>
                  )}
                </motion.g>

                {/* End Pin — Destination */}
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: app.delay + 2.8, duration: 0.5, type: "spring", stiffness: 200 }}
                >
                  {app.appName === "Rappi" ? (
                    <>
                      <circle cx="310" cy="30" r="8" fill="none" stroke={COLORS.goldenGlow} strokeWidth="1.5" opacity="0.4" />
                      <circle cx="310" cy="30" r="4" fill={COLORS.white} />
                    </>
                  ) : (
                    <>
                      <circle cx="310" cy="115" r="8" fill="none" stroke={COLORS.goldenGlow} strokeWidth="1.5" opacity="0.4" />
                      <circle cx="310" cy="115" r="4" fill={COLORS.white} />
                    </>
                  )}
                </motion.g>

                {/* ☕ Café icon at start */}
                {app.appName === "Rappi" ? (
                  <motion.text x="18" y="148" fontSize="10" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: app.delay + 0.5 }}>☕</motion.text>
                ) : (
                  <motion.text x="18" y="18" fontSize="10" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: app.delay + 0.5 }}>☕</motion.text>
                )}

                {/* 📍 Home icon at end */}
                {app.appName === "Rappi" ? (
                  <motion.text x="300" y="18" fontSize="10" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: app.delay + 3 }}>📍</motion.text>
                ) : (
                  <motion.text x="300" y="103" fontSize="10" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: app.delay + 3 }}>📍</motion.text>
                )}

                {/* Animated glowing dot travelling the path */}
                <motion.circle
                  r="4"
                  fill={COLORS.goldenGlow}
                  style={{ filter: "drop-shadow(0 0 8px rgba(228,220,34,0.9))" }}
                  initial={{ offsetDistance: "0%" }}
                  animate={isInView ? { offsetDistance: "100%" } : {}}
                  transition={{
                    duration: 3,
                    delay: app.delay + 0.5,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                >
                  <animateMotion
                    dur="3s"
                    begin={`${app.delay + 0.5}s`}
                    repeatCount="indefinite"
                    path={app.routePath}
                  />
                </motion.circle>

                {/* Pulse ring radiating from the glowing dot */}
                <motion.circle
                  r="4"
                  fill="none"
                  stroke={COLORS.goldenGlow}
                  strokeWidth="1"
                  opacity="0.4"
                >
                  <animateMotion
                    dur="3s"
                    begin={`${app.delay + 0.5}s`}
                    repeatCount="indefinite"
                    path={app.routePath}
                  />
                  <animate attributeName="r" values="4;12;4" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0;0.4" dur="1.5s" repeatCount="indefinite" />
                </motion.circle>
              </svg>
            </div>

            {/* Content Overlay */}
            <div style={{ position: "relative", zIndex: 3, padding: isMobile ? "1.8rem" : "2.2rem", display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
              {/* Top: App Name */}
              <div>
                <div style={{ color: COLORS.goldenGlow, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", marginBottom: "0.5rem" }}>
                  — Tu café en camino —
                </div>
                <h3 style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: isMobile ? "2.2rem" : "2.6rem", color: COLORS.white, margin: 0, fontWeight: 900, fontStyle: app.appName === "Rappi" ? "italic" : "normal", letterSpacing: app.appName === "DiDi Food" ? "-1.5px" : "normal", textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}>
                  {app.appName}
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: COLORS.ashGrey, letterSpacing: "0.03em", marginTop: "0.4rem" }}>
                  {app.tagline}
                </p>
              </div>

              {/* Bottom: CTA */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: app.delay + 2.5, duration: 0.5 }}
                style={{ marginTop: "auto", paddingTop: "1.5rem" }}
              >
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  backgroundColor: COLORS.goldenGlow,
                  color: COLORS.pitchBlack,
                  padding: "0.7rem 1.6rem",
                  borderRadius: "99px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  boxShadow: "0 4px 20px rgba(228,220,34,0.25)",
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  Pedir en {app.appName}
                </div>
              </motion.div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
/* ─── MENU ─── */
function MenuSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredItem, setHoveredItem] = useState(null);
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section id="menu" ref={ref} style={{ backgroundColor: COLORS.pitchBlack, padding: isMobile ? "5rem 0" : "8rem 0", position: "relative" }}>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={{ textAlign: "center", marginBottom: isMobile ? "3rem" : "5rem" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", color: COLORS.goldenGlow, textTransform: "uppercase", marginBottom: "1rem" }}>
          — Nuestra Carta —
        </p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "clamp(2rem, 8vw, 3rem)" : "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, color: COLORS.white, margin: 0 }}>
          El Menú
        </h2>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.2 }}
        style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "3rem", padding: isMobile ? "0 1rem" : 0, flexWrap: "wrap" }}>
        {MENU_SECTIONS.map((section, i) => (
          <button
            key={section.category}
            onClick={() => setActiveCategory(i)}
            style={{
              padding: isMobile ? "0.6rem 1.2rem" : "0.5rem 1.5rem",
              borderRadius: "9999px",
              border: `1px solid ${activeCategory === i ? COLORS.goldenGlow : "rgba(181,180,162,0.2)"}`,
              backgroundColor: activeCategory === i ? COLORS.goldenGlow : "transparent",
              color: activeCategory === i ? COLORS.pitchBlack : COLORS.ashGrey,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: isMobile ? "0.75rem" : "0.7rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.25s",
            }}
          >
            {section.category}
          </button>
        ))}
      </motion.div>

      <div style={{ maxWidth: "680px", margin: "0 auto", padding: isMobile ? "0 1.5rem" : "0 2rem" }}>
        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }}>
            {MENU_SECTIONS[activeCategory].items.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                onMouseEnter={() => !isMobile && setHoveredItem(item.name)}
                onMouseLeave={() => !isMobile && setHoveredItem(null)}
                onClick={() => isMobile && setHoveredItem(hoveredItem === item.name ? null : item.name)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  padding: isMobile ? "1.2rem 0" : "1.5rem 0",
                  borderBottom: "1px solid rgba(181,180,162,0.12)",
                  cursor: isMobile ? "pointer" : "default",
                  position: "relative",
                }}
              >
                <motion.div
                  animate={{ scaleX: hoveredItem === item.name ? 1 : 0 }}
                  style={{ position: "absolute", left: -12, top: "50%", translateY: "-50%", width: "3px", height: "60%", backgroundColor: COLORS.goldenGlow, transformOrigin: "top", borderRadius: "2px" }}
                />
                <div style={{ flex: 1, paddingRight: isMobile ? "0" : "2rem" }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "1.1rem" : "1.25rem", fontWeight: 600, color: hoveredItem === item.name ? COLORS.white : COLORS.ashGrey, margin: 0, transition: "color 0.2s" }}>
                    {item.name}
                  </p>
                  <AnimatePresence>
                    {hoveredItem === item.name && (
                      <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                        style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: COLORS.ashGrey, margin: "0.35rem 0 0", overflow: "hidden" }}>
                        {item.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  {/* Always show desc on mobile */}
                  {isMobile && hoveredItem !== item.name && (
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "rgba(181,180,162,0.5)", margin: "0.25rem 0 0" }}>
                      {item.desc}
                    </p>
                  )}
                  {/* Mobile Sizes/Prices Grid */}
                  {isMobile && item.prices && (
                    <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
                      {Object.entries(item.prices).map(([size, p]) => (
                        <span key={size} style={{ fontSize: "0.7rem", color: COLORS.ashGrey, fontFamily: "'DM Sans', sans-serif" }}>
                          {size} <span style={{ color: hoveredItem === item.name ? COLORS.goldenGlow : COLORS.white, fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", transition: "color 0.2s" }}>${p}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                {/* Desktop Sizes/Prices Grid */}
                {!isMobile && item.prices && (
                  <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-end", flexShrink: 0 }}>
                    {Object.entries(item.prices).map(([size, p]) => (
                      <div key={size} style={{ textAlign: "center", minWidth: "30px" }}>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: "rgba(181,180,162,0.5)", display: "block", marginBottom: "0.2rem" }}>{size}</span>
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 500, color: hoveredItem === item.name ? COLORS.goldenGlow : COLORS.ashGrey, transition: "color 0.2s" }}>${p}</span>
                      </div>
                    ))}
                  </div>
                )}
                {/* Single price (both mobile/desktop) */}
                {item.price && (
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 500, marginLeft: "1.5rem", paddingTop: "0.1rem", whiteSpace: "nowrap", flexShrink: 0, color: hoveredItem === item.name ? COLORS.goldenGlow : (isMobile ? COLORS.white : COLORS.ashGrey), transition: "color 0.2s" }}>
                    {item.price}
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "rgba(181,180,162,0.4)", textAlign: "center", marginTop: "3rem", letterSpacing: "0.1em" }}>
          Precios en pesos mexicanos · Ingredientes de temporada pueden variar
        </motion.p>
      </div>
    </section>
  );
}

/* ─── SPACE / GALLERY ─── */
function SpaceSection() {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-30%"]);
  const smoothX = useSpring(x, { stiffness: 40, damping: 15 });

  return (
    <section id="space" ref={ref} style={{ backgroundColor: "#0a0a08", padding: isMobile ? "5rem 0" : "8rem 0", overflow: "hidden" }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={{ padding: "0 8%", marginBottom: isMobile ? "2rem" : "4rem" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", color: COLORS.goldenGlow, textTransform: "uppercase", marginBottom: "0.75rem" }}>— El Espacio —</p>
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-end", gap: isMobile ? "1rem" : 0 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "clamp(2rem, 8vw, 3rem)" : "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, color: COLORS.white, margin: 0, lineHeight: 1 }}>
            El Espacio
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: COLORS.ashGrey, maxWidth: "320px", textAlign: isMobile ? "left" : "right", lineHeight: 1.6 }}>
            Ladrillo expuesto, linternas cálidas, sillas desiguales — un lugar que se siente como sala de estar, porque lo es.
          </p>
        </div>
      </motion.div>

      {isMobile ? (
        /* Mobile: vertical scrollable gallery */
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "0 5%" }}>
          {GALLERY_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ borderRadius: "12px", overflow: "hidden", height: "240px", border: "1px solid rgba(181,180,162,0.1)", position: "relative" }}
            >
              <div style={{ width: "100%", height: "100%", backgroundColor: i % 2 === 0 ? "#1a1a14" : "#141410",
                backgroundImage: `url(${item.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center" }}>
              </div>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1rem", background: "linear-gradient(to top, rgba(13,12,9,0.85) 0%, transparent 100%)" }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", color: COLORS.goldenGlow, textTransform: "uppercase", margin: "0 0 0.2rem" }}>0{item.id} / 0{GALLERY_ITEMS.length}</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", color: COLORS.white, margin: 0, fontWeight: 600 }}>{item.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Desktop: horizontal scroll */
        <>
          <motion.div style={{ display: "flex", gap: "1.5rem", paddingLeft: "8%", x: smoothX, width: "max-content" }}>
            {GALLERY_ITEMS.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                style={{ position: "relative", borderRadius: "12px", overflow: "hidden", flexShrink: 0, width: item.aspect === "portrait" ? "320px" : "480px", height: "420px", cursor: "pointer", border: "1px solid rgba(181,180,162,0.1)" }}
              >
                <div style={{ width: "100%", height: "100%", backgroundColor: i % 2 === 0 ? "#1a1a14" : "#141410",
                  backgroundImage: `url(${item.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center" }}>
                </div>
                <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}
                  style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,12,9,0.85) 0%, transparent 60%)", display: "flex", alignItems: "flex-end", padding: "1.5rem" }}>
                  <div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", color: COLORS.goldenGlow, textTransform: "uppercase", margin: "0 0 0.3rem" }}>0{item.id} / 0{GALLERY_ITEMS.length}</p>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: COLORS.white, margin: 0, fontWeight: 600 }}>{item.label}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
            <div style={{ width: "8vw", flexShrink: 0 }} />
          </motion.div>
          <motion.div style={{ marginTop: "3rem", padding: "0 8%", display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(181,180,162,0.15)", position: "relative" }}>
              <motion.div style={{ position: "absolute", top: 0, left: 0, height: "100%", backgroundColor: COLORS.goldenGlow, scaleX: useTransform(scrollYProgress, [0, 0.8], [0, 1]), transformOrigin: "left" }} />
            </div>
          </motion.div>
        </>
      )}
    </section>
  );
}

/* ─── STORY ─── */
function StorySection() {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: true, margin: "-15%" });
  const paragraphVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.9, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] } }),
  };

  return (
    <section id="story" ref={ref} style={{ backgroundColor: COLORS.pitchBlack, padding: isMobile ? "5rem 0" : "10rem 0", position: "relative", overflow: "hidden" }}>
      {!isMobile && (
        <div aria-hidden="true" style={{ position: "absolute", right: "-5%", top: "50%", transform: "translateY(-50%)", fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20rem, 35vw, 40rem)", fontWeight: 700, color: "rgba(228,220,34,0.03)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>3</div>
      )}

      <div style={{ 
        maxWidth: "1000px", 
        margin: "0 auto", 
        padding: isMobile ? "3rem 1.5rem" : "5rem 4rem",
        position: "relative",
        border: `1.5px solid ${COLORS.goldenGlow}`,
        borderRadius: "16px",
        backgroundColor: COLORS.pitchBlack,
        overflow: "hidden"
      }}>
        {/* Brick Background Layer */}
        <div aria-hidden="true" style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='42' height='44' viewBox='0 0 42 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e4dc22' fill-opacity='0.15'%3E%3Cpath d='M0 0h42v44H0V0zm1 1h40v20H1V1zM0 23h20v20H0V23zm22 0h20v20H22V23z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          zIndex: 0
        }} />
        {/* Black Center Gradient Layer */}
        <div aria-hidden="true" style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, rgba(13,12,9,1) 30%, rgba(13,12,9,0.7) 75%, transparent 100%)",
          zIndex: 1
        }} />

        {/* Content Layer */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <motion.p custom={0} variants={paragraphVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", color: COLORS.goldenGlow, textTransform: "uppercase", marginBottom: isMobile ? "2rem" : "3rem" }}>
          — Nuestra Historia —
        </motion.p>

        <motion.blockquote custom={1} variants={paragraphVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "clamp(1.5rem, 6vw, 2.2rem)" : "clamp(2rem, 4vw, 3.2rem)", fontWeight: 500, color: COLORS.white, lineHeight: 1.25, margin: isMobile ? "0 0 3rem" : "0 0 4rem", borderLeft: `3px solid ${COLORS.goldenGlow}`, paddingLeft: isMobile ? "1.2rem" : "2rem", fontStyle: "italic" }}>
          "No abrimos un café. Construimos una sala de estar para personas que se toman su café tan en serio como sus ideas."
        </motion.blockquote>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "2rem" : "3rem" }}>
          {[
            { title: "El Nombre", body: "TR3Z es trece — la dirección donde comenzamos. Tres líneas horizontales, un número dorado. Una marca tan precisa como nuestras proporciones de extracción." },
            { title: "El Oficio", body: "Granos de origen único directamente de agricultores en Oaxaca y Chiapas. Tostados semanalmente. Calibrados diariamente. Nos obsesionamos con las variables para que tú no tengas que hacerlo." },
            { title: "El Espacio", body: "Ladrillo expuesto, sillas disparejas, focos Edison y arte abstracto de artistas locales. Deliberadamente imperfecto — porque la autenticidad no se puede fabricar." },
            { title: "La Comunidad", body: "Desde los pour-overs de las 7am hasta las sesiones de estudio nocturnas. Cada persona que cruza la puerta merece hospitalidad excepcional, sin excepciones." },
          ].map((block, i) => (
            <motion.div key={block.title} custom={i + 2} variants={paragraphVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: COLORS.goldenGlow, margin: "0 0 0.75rem" }}>{block.title}</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: COLORS.ashGrey, lineHeight: 1.75, margin: 0 }}>{block.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div custom={6} variants={paragraphVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}
          style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: isMobile ? "2.5rem" : "4rem" }}>
          {["Calidad y Oficio", "Autenticidad", "Comunidad", "Accesibilidad", "Experiencia Sensorial"].map((v) => (
            <span key={v} style={{ padding: "0.4rem 1rem", borderRadius: "9999px", border: "1px solid rgba(228,220,34,0.25)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", color: COLORS.ashGrey, textTransform: "uppercase" }}>{v}</span>
          ))}
        </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT / FOOTER ─── */
function ContactSection() {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="contact" ref={ref} style={{ backgroundColor: "#080807", padding: isMobile ? "5rem 0 0" : "8rem 0 0", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "0 5%" : "0 8%" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={{ marginBottom: isMobile ? "3rem" : "5rem" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", color: COLORS.goldenGlow, textTransform: "uppercase", marginBottom: "1rem" }}>— Encuéntranos —</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "clamp(1.8rem, 7vw, 2.5rem)" : "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 700, color: COLORS.white, margin: 0, lineHeight: 1.1 }}>
            Disfruta un momento<br />
            <span style={{ color: COLORS.goldenGlow, fontStyle: "italic" }}>con nosotros</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.5fr", gap: isMobile ? "2rem" : "4rem", alignItems: "start" }}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            {[
              { 
                label: "¡Sigue nuestras redes sociales!", 
                links: [
                  { name: "Instagram", url: "https://www.instagram.com/tr3zcafe/" },
                  { name: "Facebook", url: "https://www.facebook.com/tr3zcafe" }
                ]
              },
              { label: "Horario", value: "Lun–Vie: 7:00am – 9:00pm\nSáb–Dom: 8:00am – 10:00pm" },
              { label: "Teléfono", value: "686.216.7652" }
            ].map((info, i) => (
              <motion.div key={info.label} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 + i * 0.1 }} style={{ marginBottom: "2rem" }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", color: COLORS.goldenGlow, textTransform: "uppercase", margin: "0 0 0.4rem" }}>{info.label}</p>
                {info.links ? (
                  <div style={{ display: "flex", gap: "1.5rem" }}>
                    {info.links.map(link => (
                      <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", color: COLORS.white, margin: 0, lineHeight: 1.5, textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={(e) => (e.target.style.color = COLORS.goldenGlow)}
                        onMouseLeave={(e) => (e.target.style.color = COLORS.white)}
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                ) : info.link ? (
                  <a href={info.link} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: COLORS.white, margin: 0, lineHeight: 1.5, whiteSpace: "pre-line", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.target.style.color = COLORS.goldenGlow)}
                    onMouseLeave={(e) => (e.target.style.color = COLORS.white)}
                  >
                    {info.value}
                  </a>
                ) : (
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: COLORS.white, margin: 0, lineHeight: 1.5, whiteSpace: "pre-line" }}>{info.value}</p>
                )}
              </motion.div>
            ))}
            <a
              href="https://wa.me/5216862167652"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "1rem",
                padding: "0.9rem 2.2rem",
                borderRadius: "9999px",
                border: `1.5px solid ${COLORS.goldenGlow}`,
                color: COLORS.goldenGlow,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                cursor: "pointer",
                transition: "background-color 0.3s, color 0.3s",
              }}
              onMouseEnter={(e) => { e.target.style.backgroundColor = COLORS.goldenGlow; e.target.style.color = COLORS.pitchBlack; }}
              onMouseLeave={(e) => { e.target.style.backgroundColor = "transparent"; e.target.style.color = COLORS.goldenGlow; }}
            >
              Reservar por WhatsApp
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, delay: 0.3 }}
            style={{ borderRadius: "16px", overflow: "hidden", height: isMobile ? "260px" : "380px", border: "1px solid rgba(228,220,34,0.15)", position: "relative" }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3359.2543918958627!2d-115.4419404246365!3d32.65267389033083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d770101af0912f%3A0x43fbe536b2909e4e!2sCaf%C3%A9%20Tr3z!5e0!3m2!1sen!2smx!4v1774719404482!5m2!1sen!2smx" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: isMobile ? "3rem" : "6rem",
        padding: isMobile ? "1.5rem 5%" : "2rem 8%",
        borderTop: "1px solid rgba(181,180,162,0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
        flexDirection: isMobile ? "column" : "row",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            <div style={{ height: "2.5px", width: "16px", backgroundColor: COLORS.goldenGlow, borderRadius: "2px" }} />
            <div style={{ height: "2.5px", width: "11px", backgroundColor: COLORS.goldenGlow, borderRadius: "2px", marginLeft: "5px" }} />
            <div style={{ height: "2.5px", width: "16px", backgroundColor: COLORS.goldenGlow, borderRadius: "2px" }} />
          </div>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: COLORS.white, marginLeft: "0.5rem", fontSize: "0.9rem" }}>
            Café TR<span style={{ color: COLORS.goldenGlow, display: "inline-block", transform: "translateY(-0.24em)" }}>3</span>Z
          </span>
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: "rgba(181,180,162,0.35)", letterSpacing: "0.1em", margin: 0, textAlign: "center" }}>
          © {new Date().getFullYear()} Café Tr3z · Mexicali, B.C., México · Todos los derechos reservados
        </p>
      </div>
    </section>
  );
}

/* ─── ROOT ─── */
export default function CafeTr3z() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');
        
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        
        body {
          background-color: #0D0C09;
          color: #FEFEFE;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          overflow-x: hidden;
        }

        ::selection {
          background-color: rgba(228,220,34,0.3);
          color: #FEFEFE;
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0D0C09; }
        ::-webkit-scrollbar-thumb { background: #46420C; border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: #E4DC22; }

        /* Accessibility: respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }

        /* Focus states for keyboard navigation */
        a:focus-visible, button:focus-visible {
          outline: 2px solid #E4DC22;
          outline-offset: 3px;
          border-radius: 4px;
        }
      `}</style>

      <GrainOverlay />
      <FloatingNav />

      <main>
        <HeroSection />
        <StorySection />
        <MenuSection />
        <SpaceSection />
        <DeliverySection />
        <ContactSection />
      </main>
    </>
  );
}

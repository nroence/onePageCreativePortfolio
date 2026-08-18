"use client";

import Lenis from "lenis";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

const graphicWorks = [
  ["/graphic-1.png", "Creative Profile", "Profile I made for our Thesis Event."],
  ["/graphic-2.png", "DRK Carwash Brand Bundle", "Graphics, logo, and materials I made for a local car wash."],
  ["/graphic-3.png", "Web App Poster", "Poster for the web app I developed."],
  ["/graphic-4.png", "Church Invitation Post", "Multiple templates for church use."],
  ["/graphic-5.png", "DEN-GAT Noodle Brand Bundle", "Packaging layout for DEN-GAT's Sam-Sam noodle brand."],
  ["/graphic-6.png", "Church Invitation Post", "Creative post for Thrive Youth."],
  ["/graphic-7.png", "Pop-up Announcement Carousel", "Interactive carousel for quick announcements and feed engagement."],
  ["/graphic-8.png", "Bible Carousel Post", "Scriptural passages and reflections formatted for a multi-slide carousel."],
  ["/graphic-9.png", "Inspirational Daily Life Carousel", "Lifestyle reflections and daily motivation designed for social feeds."],
] as const;

const thumbnails = [
  ["/thumbnail-1.png", "YouTube Thumbnail Concept 01", "High-contrast visual hierarchy designed to maximize click-through rate."],
  ["/thumbnail-2.png", "YouTube Thumbnail Concept 02", "Promotional visual featuring bold typography and clean framing."],
  ["/thumbnail-3.png", "YouTube Thumbnail Concept 03", "Hook-focused layout with dynamic typography and subject framing."],
  ["/thumbnail-4.png", "YouTube Thumbnail Concept 04", "Branded visual asset designed to stand out on feed recommendations."],
] as const;

const projects = [
  ["FEU Tech Official", "Institutional page management, 168k followers", "https://www.facebook.com/FEUTechOfficial"],
  ["Studying with Jake", "Editing and content management, 108k followers", "https://www.instagram.com/studyingwithjake/"],
  ["One Stop OAC", "Service page editing, 35k followers", "https://www.facebook.com/onestopOAC"],
  ["WFCMI", "Church media management, Church Community", ""],
  ["Thrive Youth", "Youth social media content, Youth Community", "https://www.facebook.com/WeAreThriveYouth"],
  ["FEU Tech TICaP", "Event media and admin, 1k followers", "https://www.facebook.com/FEUTechTICaP"],
  ["Rework In Progress", "Owner and creative director, Personal clothing brand", "https://www.tiktok.com/@rework.inprogress"],
  ["Daily Daizies", "Content strategy and growth, Personal flower shop", "https://www.instagram.com/dailydaizies_/"],
] as const;

const videos = [
  ["/video-1.mp4", ["Podcast", "Talking Head", "Finance", "Realestate"]],
  ["/video-2.mp4", ["Fitness", "Coaching", "Courses"]],
  ["/video-3.mp4", ["Clothing", "Projects", "BTS"]],
] as const;

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ScrollText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.55"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.28, 1]);

  return <motion.p ref={ref} style={{ opacity: reduce ? 1 : opacity }} className={className}>{children}</motion.p>;
}

function GraphicCard({ item, fallback, aspect = "aspect-[3/4]" }: { item: readonly [string, string, string]; fallback: string; aspect?: string }) {
  const [detailsVisible, setDetailsVisible] = useState(false);

  return (
    <article className={`group relative ${aspect} overflow-hidden bg-navy`}>
      <button
        type="button"
        aria-label={`Show details for ${item[1]}`}
        aria-pressed={detailsVisible}
        onClick={() => setDetailsVisible((visible) => !visible)}
        className="h-full w-full text-left"
      >
        <img
          src={item[0]}
          alt={item[1]}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = fallback;
          }}
        />
        <div className={`absolute inset-0 flex flex-col justify-end bg-blue p-5 text-white transition-opacity duration-300 ${detailsVisible ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"}`}>
          <h3 className="text-3xl font-black leading-[0.78] tracking-[-0.08em]">{item[1]}</h3>
          <p className="mt-3 max-w-[28ch] text-sm font-bold leading-[0.92]">{item[2]}</p>
        </div>
      </button>
    </article>
  );
}

function VideoCard({ src, titles }: { src: string; titles: readonly string[] }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="overflow-hidden border border-blue bg-blue text-canvas">
      {playing ? (
        <video className="aspect-[9/16] w-full bg-blue object-cover" controls autoPlay preload="metadata">
          <source src={src} type="video/mp4" />
          Your browser does not support video playback.
        </video>
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="relative flex aspect-[9/16] w-full flex-col justify-end bg-blue p-5 text-left transition-colors hover:bg-navy">
          <span className="absolute left-5 top-5 text-xs font-bold uppercase tracking-[0.08em]">Watch video</span>
          <span className="absolute right-5 top-5 font-garamond text-lg font-bold italic leading-none text-white">Style</span>
          <ul className="mt-auto list-disc space-y-0 pl-7 marker:text-white">
            {titles.map((title) => <li key={title} className="text-4xl font-black leading-[0.64] tracking-[-0.08em] sm:text-5xl">{title}</li>)}
          </ul>
        </button>
      )}
    </div>
  );
}

export default function Home() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    let frame = 0;
    const update = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  async function copyEmail() {
    const email = "norenceestranero@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = email;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <main className="mx-auto min-h-[100dvh] max-w-[1600px] overflow-hidden border-x border-line bg-canvas">
      <div aria-hidden="true" className="grain pointer-events-none fixed inset-0 z-50 opacity-[0.055]" />

      <nav className="sticky top-0 z-20 border-b border-line bg-canvas/95 backdrop-blur-sm">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <a href="#top" className="text-sm font-bold uppercase tracking-[-0.06em]">NE</a>
          <div className="flex items-center gap-4 text-xs font-bold sm:gap-7 sm:text-sm">
            <a className="transition-colors hover:text-blue" href="#video">Video</a>
            <a className="transition-colors hover:text-blue" href="#graphics">Graphics</a>
            <a className="transition-colors hover:text-blue" href="#about">About</a>
            <a className="transition-colors hover:text-blue" href="#reach-out">Reach Out</a>
          </div>
        </div>
      </nav>

      <section id="top" className="grid min-h-[calc(100dvh-4rem)] border-b border-line md:grid-cols-[1.08fr_.92fr]">
        <div className="flex flex-col justify-between border-b border-line p-5 sm:p-8 md:border-b-0 md:border-r lg:p-12">
          <div>
            <p className="mb-7 text-xs font-bold uppercase tracking-[0.06em] text-blue">Video Editor & Social Media Creative</p>
            <h1 className="max-w-[8ch] text-[clamp(4.8rem,13vw,12rem)] font-black leading-[0.78] tracking-[-0.1em]">Norence</h1>
            <p className="relative z-10 -mt-2 ml-2 font-garamond text-[clamp(1.9rem,4vw,4.4rem)] font-bold italic leading-[0.8] tracking-[-0.08em] text-blue sm:-mt-4">Multimedia Designer</p>
          </div>
          <div className="mt-16 max-w-xl md:mt-8">
            <p className="text-xl leading-[0.98] sm:text-3xl">
              I edit short-form videos, design social media content, and manage digital content. I focus on <em className="font-garamond text-[1.1em] font-bold italic leading-[1.1] text-blue">clear visuals, strong hooks, and clean editing</em>.
            </p>
            <a href="#about" className="mt-7 inline-flex border-b-2 border-blue pb-1 text-sm font-bold text-blue transition-colors hover:border-ink hover:text-ink">Get to know more about me</a>
          </div>
        </div>
        <div className="group relative m-4 aspect-[3/4] self-center overflow-hidden bg-navy md:m-8">
          <img src="/hero-1.png" alt="Featured creative work" className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0" />
          <img src="/hero-2.png" alt="Featured creative work alternate view" className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      </section>

      <section className="grid border-b border-line md:grid-cols-[1fr_1fr_1.25fr]">
        <div className="relative border-b border-line p-6 md:border-b-0 lg:p-10 md:after:absolute md:after:right-0 md:after:top-6 md:after:bottom-6 md:after:w-px md:after:bg-line lg:after:top-10 lg:after:bottom-10">
          <h2 className="text-3xl font-black leading-none">Services</h2>
          <ul className="mt-8 list-disc space-y-1 pl-5 text-lg leading-[0.9] marker:text-blue">
            <li>Short-form and long-form video editing</li>
            <li>Social media creatives and thumbnails</li>
          </ul>
        </div>
        <div className="relative border-b border-line p-6 md:border-b-0 lg:p-10 md:after:absolute md:after:right-0 md:after:top-6 md:after:bottom-6 md:after:w-px md:after:bg-line lg:after:top-10 lg:after:bottom-10">
          <h2 className="text-3xl font-black leading-none">Tools</h2>
          <p className="mt-8 leading-tight">Adobe Illustrator, DaVinci Resolve, CapCut Pro, Canva Pro, Google Studio, ChatGPT, Eleven Labs, Higgsfield AI, Codex, Figma</p>
        </div>
        <div className="p-6 lg:p-10">
          <h2 className="text-3xl font-black leading-none">Editing skills</h2>
          <div className="mt-8 flex flex-wrap gap-2">
            {["Captions and subtitles", "Smooth transitions", "Sound effects and audio syncing", "Basic motion graphics", "Video pacing", "Hook-focused editing", "Platform-ready formatting", "Fast turnaround"].map((skill) => (
              <span key={skill} className="rounded-full bg-blue px-3 py-1.5 text-xs font-bold text-canvas">{skill}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="video" className="border-b border-line px-4 py-20 sm:px-6 lg:px-12 lg:py-28">
        <Reveal>
          <h2 className="max-w-[12ch] text-5xl font-black leading-[0.85] tracking-[-0.08em] sm:text-7xl">Video Editing & Management</h2>
          <p className="mt-6 max-w-2xl text-lg leading-tight">Three preview edits in short form. A collection of edited videos and social pages, arranged from largest reach to personal ventures.</p>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {videos.map(([src, titles]) => <VideoCard key={src} src={src} titles={titles} />)}
        </div>
        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <a href="https://drive.google.com/drive/folders/1nME-gJTj8EhtyreiWGVJnGg56bxCHoWb?usp=sharing" target="_blank" rel="noreferrer" className="inline-flex bg-blue px-5 py-3 text-sm font-bold text-canvas transition-transform hover:-translate-y-1 active:translate-y-0">Access Video Portfolio</a>
          <p className="max-w-md text-sm leading-tight">View all my edited clips, raw-to-final samples, and project archives in one place.</p>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4">
          {projects.map(([name, detail, href]) => {
            const follower = detail.match(/\d+k followers$/i)?.[0];
            const description = follower ? detail.slice(0, -follower.length - 2) : detail;
            const content = <><strong className="block text-lg font-black leading-none">{name}</strong><span className="mt-1 block text-xs leading-tight">{description}{follower ? <span className="font-garamond text-sm font-bold italic text-blue">{`, ${follower}`}</span> : null}</span></>;

            return href ? (
              <a key={name} href={href} target="_blank" rel="noreferrer" className="rounded-md border border-line px-4 py-3 text-sm transition-colors hover:bg-navy hover:text-canvas">{content}</a>
            ) : (
              <div key={name} className="rounded-md border border-line px-4 py-3 text-sm">{content}</div>
            );
          })}
        </div>
      </section>

      <section id="graphics" className="border-b border-line px-4 py-20 sm:px-6 lg:px-12 lg:py-28">
        <Reveal><h2 className="text-5xl font-black leading-[0.85] tracking-[-0.08em] sm:text-7xl">Graphic Works</h2>
        <p className="mt-6 max-w-xl text-lg leading-tight">My showcase of graphic design, promotional visuals, and social media post layouts.</p></Reveal>
        <div className="mt-12 grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
          {graphicWorks.map((item, index) => <GraphicCard key={item[0]} item={item} fallback={index % 2 ? "/portfolio-reference-02.png" : "/portfolio-reference-01.png"} />)}
        </div>
        <div className="minimal-scrollbar mt-1 grid grid-flow-col auto-cols-[84%] gap-1 overflow-x-auto pb-3 sm:auto-cols-[46%] lg:auto-cols-[calc((100%-3rem)/4)]">
          {thumbnails.map((item, index) => <GraphicCard key={item[0]} item={item} aspect="aspect-video" fallback={index % 2 ? "/portfolio-reference-01.png" : "/portfolio-reference-02.png"} />)}
        </div>
      </section>

      <section id="about" className="grid border-b border-line md:grid-cols-[1fr_1fr]">
        <div className="p-6 sm:p-10 lg:p-12">
          <h2 className="text-5xl font-black leading-[0.85] tracking-[-0.08em] sm:text-7xl">About Me</h2>
          <ScrollText className="mt-10 max-w-2xl text-xl leading-[0.98] sm:text-3xl">I am a Bachelor of Information Technology graduate with a strong interest in <em className="font-garamond text-[1.1em] font-bold italic leading-[1.1] text-blue">creative technology and digital media</em>. I enjoy creating visual content that is clear, useful, and engaging.</ScrollText>
        </div>
        <div className="border-t border-line p-6 md:border-l md:border-t-0 sm:p-10 lg:p-12">
          <ScrollText className="max-w-none text-xl leading-[0.95] sm:text-2xl lg:text-[2rem]">My work combines design, editing, and technology. I use creativity, AI, and analytics to support the creative process. This helps me <em className="font-garamond text-[1.1em] font-bold italic leading-[1.1] text-blue">research hooks, study competitors, understand engagement</em>, and find new ways to reuse existing content.</ScrollText>
          <div className="mt-16 border-t border-line pt-5 text-lg leading-relaxed">
            <a className="block underline decoration-blue decoration-2 underline-offset-4" href="mailto:norenceestranero@gmail.com">norenceestranero@gmail.com</a>
            <a className="block" href="https://www.facebook.com/norenceee" target="_blank" rel="noreferrer">@norenceee</a>
            <p>WhatsApp: +639214514177</p>
          </div>
        </div>
      </section>

      <section id="reach-out" className="px-4 py-20 sm:px-6 lg:px-12 lg:py-28">
        <div className="max-w-3xl">
          <h2 className="text-6xl font-black leading-[0.8] tracking-[-0.09em] sm:text-8xl">Reach Out</h2>
          <p className="mt-8 text-xl leading-tight sm:text-3xl">Have a project in mind? Let's discuss what you need and how I can help.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="https://calendly.com/norenceestranero/30min" target="_blank" rel="noreferrer" className="bg-blue px-5 py-3 text-sm font-bold text-canvas transition-transform hover:-translate-y-1 active:translate-y-0">Schedule a Meeting</a>
            <button type="button" onClick={copyEmail} className="border border-blue px-5 py-3 text-sm font-bold text-blue transition-colors hover:bg-blue hover:text-canvas active:translate-y-px">Copy Email</button>
          </div>
          <p aria-live="polite" className="mt-4 min-h-5 text-sm font-bold text-blue">{copied ? "Email copied to clipboard!" : ""}</p>
        </div>
      </section>

      <footer className="border-t border-line px-4 py-5 text-xs font-bold sm:px-6 lg:px-12">© 2026 NORENCE ENOCH. All Rights Reserved.</footer>
    </main>
  );
}

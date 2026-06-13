import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Zap, Cpu, Wrench, ShieldCheck, Gauge, MapPin, Mail, Clock, Star } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

const PHONE = "3407737555";
const PHONE_DISPLAY = "340 773 7555";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  name: "SMD Impianti Elettrici",
  telephone: "+39 340 773 7555",
  email: "smd.impianti@pec.it",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via Montmayeur 37",
    addressLocality: "Aosta",
    addressRegion: "Valle d'Aosta",
    postalCode: "11100",
    addressCountry: "IT",
  },
  areaServed: ["Aosta", "Valle d'Aosta"],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.3", reviewCount: "27" },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], opens: "08:00", closes: "20:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "11:00", closes: "20:00" },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SMD Impianti Elettrici | Elettricista ad Aosta" },
      { name: "description", content: "SMD Impianti Elettrici, il tuo elettricista di fiducia ad Aosta. Impianti civili, industriali, domotica e certificazioni. Disponibile tutti i giorni. Chiama ora." },
      { name: "keywords", content: "elettricista Aosta, impianti elettrici Aosta, elettricista Valle d'Aosta, domotica Aosta, certificazioni elettriche Aosta" },
      { property: "og:title", content: "SMD Impianti Elettrici | Elettricista ad Aosta" },
      { property: "og:description", content: "Elettricista di fiducia ad Aosta. Impianti civili, industriali, domotica e certificazioni." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  component: Index,
});

function CallButton({ className = "", label = "Chiama ora" }: { className?: string; label?: string }) {
  return (
    <a
      href={`tel:${PHONE}`}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-accent-foreground shadow-[var(--shadow-card)] transition-transform hover:scale-[1.02] active:scale-[0.98] ${className}`}
      aria-label="Chiama SMD Impianti Elettrici"
    >
      <Phone className="h-5 w-5" aria-hidden /> {label}
    </a>
  );
}

const services = [
  { icon: Zap, title: "Impianti elettrici civili e industriali", desc: "Progettazione e installazione di impianti su misura per abitazioni, uffici e aziende." },
  { icon: Gauge, title: "Quadri elettrici", desc: "Realizzazione, sostituzione e adeguamento di quadri elettrici a norma." },
  { icon: Cpu, title: "Domotica", desc: "Sistemi smart per controllare luci, clima e sicurezza dalla tua casa." },
  { icon: ShieldCheck, title: "Certificazioni e collaudi", desc: "Dichiarazioni di conformità DM 37/08, verifiche e collaudi professionali." },
  { icon: Wrench, title: "Manutenzione e riparazioni", desc: "Interventi rapidi per guasti, manutenzioni programmate e pronto intervento." },
];

const reviews = [
  { name: "Mauro D.", stars: 5, text: "Ho assistito e usufruito personalmente di molti dei servizi di SMD Impianti Elettrici, e della mia esperienza sono rimasto molto soddisfatto. Tutti i servizi forniti sono andati a buon fine, l'efficienza e la puntualità non mancano di certo, la qualità è ottima e il prezzo è perfetto." },
  { name: "Luca P.", stars: 5, text: "Chiamato per un'emergenza elettrica... che dire, professionale, disponibile e rapido nel risolvere il problema. Consiglio!" },
  { name: "Anna V.", stars: 5, text: "Ottima esperienza: reattivo, puntuale e molto professionale. Ottimo rapporto qualità-prezzo, lo richiamerò sicuramente." },
  { name: "Roberto G.", stars: 5, text: "Puntualità e qualità impeccabili. Ha rifatto l'impianto elettrico di casa con grande professionalità." },
  { name: "Francesca L.", stars: 5, text: "Servizio eccellente! Reattività e professionalità fuori dal comune. Prezzi onesti e lavoro garantito." },
  { name: "Davide M.", stars: 4, text: "Buon lavoro nel complesso. Qualità e professionalità ci sono, qualche piccolo ritardo sulla tabella di marcia." },
  { name: "Chiara R.", stars: 5, text: "Reattivo, puntuale e di grande professionalità. Ha risolto un problema che altri elettricisti non avevano saputo gestire." },
  { name: "Paolo S.", stars: 5, text: "Puntualità, qualità e professionalità al top. Impianto domotico installato a regola d'arte, sono entusiasta." },
  { name: "Sara F.", stars: 2, text: "Purtroppo esperienza negativa. Qualità del lavoro non all'altezza delle aspettative e prezzo superiore al preventivo." },
];

const hours: [string, string][] = [
  ["Lunedì", "08:00 – 20:00"],
  ["Martedì", "08:00 – 20:00"],
  ["Mercoledì", "08:00 – 20:00"],
  ["Giovedì", "08:00 – 20:00"],
  ["Venerdì", "08:00 – 20:00"],
  ["Sabato", "08:00 – 20:00"],
  ["Domenica", "11:00 – 20:00"],
];

function ReviewCard({ review }: { review: { name: string; stars: number; text: string } }) {
  const isLong = review.text.length > 140;
  const [expanded, setExpanded] = useState(false);
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
      <div className="flex gap-0.5">
        {[0,1,2,3,4].map((i) => <Star key={i} className={`h-4 w-4 ${i < review.stars ? "fill-accent text-accent" : "text-muted-foreground/30"}`} />)}
      </div>
      <p className={`mt-4 flex-1 leading-relaxed text-foreground ${!expanded && isLong ? "line-clamp-3" : ""}`}>"{review.text}"</p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-left text-xs font-medium text-accent hover:underline"
        >
          {expanded ? "Mostra di meno ↑" : "Mostra di più ↓"}
        </button>
      )}
      <p className="mt-4 text-sm font-semibold text-muted-foreground">— {review.name}</p>
    </article>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#top" className="flex items-center gap-2 font-bold tracking-tight">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-accent-foreground">
              <Zap className="h-5 w-5" />
            </span>
            <span>SMD <span className="hidden sm:inline text-muted-foreground font-medium">Impianti Elettrici</span></span>
          </a>
          <nav className="hidden gap-6 text-sm font-medium text-muted-foreground md:flex">
            <a href="#servizi" className="hover:text-foreground">Servizi</a>
            <a href="#chi-siamo" className="hover:text-foreground">Chi siamo</a>
            <a href="#testimonianze" className="hover:text-foreground">Recensioni</a>
            <a href="#contatti" className="hover:text-foreground">Contatti</a>
          </nav>
          <a href={`tel:${PHONE}`} className="hidden items-center gap-2 text-sm font-semibold text-foreground md:inline-flex">
            <Phone className="h-4 w-4 text-accent-foreground" /> {PHONE_DISPLAY}
          </a>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.86_0.18_95_/_0.3),_transparent_60%)]" />
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-16 md:pb-32 md:pt-28">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-accent" /> Disponibile oggi ad Aosta
              </div>
              <h1 className="text-4xl font-bold leading-[1.05] md:text-6xl lg:text-7xl">
                Il tuo elettricista di fiducia ad <span className="bg-accent text-accent-foreground px-2 rounded-md">Aosta</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
                Professionalità, rapidità e affidabilità per impianti elettrici civili, industriali e domotica. Interventi in giornata in tutta la Valle d'Aosta.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <CallButton label={`📞 Chiama ora · ${PHONE_DISPLAY}`} />
                <a href="#servizi" className="text-sm font-semibold text-foreground underline-offset-4 hover:underline">Scopri i servizi →</a>
              </div>
              <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8">
                <div><dt className="text-xs uppercase tracking-wide text-muted-foreground">Esperienza</dt><dd className="mt-1 text-2xl font-bold">15+ anni</dd></div>
                <div><dt className="text-xs uppercase tracking-wide text-muted-foreground">Valutazione</dt><dd className="mt-1 text-2xl font-bold">4,3/5</dd></div>
                <div><dt className="text-xs uppercase tracking-wide text-muted-foreground">Aperto</dt><dd className="mt-1 text-2xl font-bold">7/7</dd></div>
              </dl>
            </div>
            <div className="relative flex justify-center md:justify-end">
              <div className="w-full max-w-sm overflow-hidden rounded-2xl shadow-[var(--shadow-card)] md:max-w-md">
                <img
                  src="/elettricista.avif"
                  alt="Elettricista professionista ad Aosta - SMD Impianti Elettrici"
                  className="h-auto w-full"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="servizi" className="border-t border-border bg-secondary/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Servizi</p>
            <h2 className="text-3xl font-bold md:text-5xl">Impianti elettrici ad Aosta, a regola d'arte</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <article key={s.title} className="group rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-card)]">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <s.icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="chi-siamo" className="py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Chi siamo</p>
            <h2 className="text-3xl font-bold md:text-5xl">Un'azienda locale, seria e sempre disponibile.</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              SMD Impianti Elettrici è una realtà valdostana al servizio di famiglie e imprese di Aosta e dintorni. Da anni offriamo soluzioni elettriche affidabili, eseguite con cura e nel rispetto delle normative vigenti.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Siamo operativi <strong className="text-foreground">tutti i giorni dalle 8:00 alle 20:00</strong> (domenica dalle 11:00 alle 20:00) per interventi, sopralluoghi e preventivi gratuiti.
            </p>
            <div className="mt-8"><CallButton /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: ShieldCheck, t: "A norma DM 37/08" },
              { icon: Clock, t: "Interventi in giornata" },
              { icon: Zap, t: "Materiali certificati" },
              { icon: Wrench, t: "Preventivi gratuiti" },
            ].map((b) => (
              <div key={b.t} className="rounded-2xl border border-border bg-card p-6">
                <b.icon className="h-7 w-7" />
                <p className="mt-4 font-semibold">{b.t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonianze" className="border-t border-border bg-secondary/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Recensioni</p>
              <h2 className="text-3xl font-bold md:text-5xl">Cosa dicono i nostri clienti</h2>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
              <div className="flex">{[0,1,2,3,4].map((i) => <Star key={i} className="h-4 w-4 fill-accent text-accent" />)}</div>
              <span className="text-sm font-semibold">4,3/5</span>
              <span className="text-sm text-muted-foreground">su Google Maps</span>
            </div>
          </div>
          <div className="relative px-10 md:px-12">
            <Carousel
              opts={{
                align: "start",
                slidesToScroll: 1,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-3">
                {reviews.map((r) => (
                  <CarouselItem key={r.name} className="basis-[85%] pl-3 sm:basis-[45%] lg:basis-[31%]">
                    <ReviewCard review={r} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-2 border-border bg-card hover:bg-accent hover:text-accent-foreground" />
              <CarouselNext className="-right-2 border-border bg-card hover:bg-accent hover:text-accent-foreground" />
            </Carousel>
          </div>
        </div>
      </section>

      <section id="contatti" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Contatti</p>
            <h2 className="text-3xl font-bold md:text-5xl">Contattaci oggi stesso</h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 shrink-0" />
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Indirizzo</p>
                    <p className="font-semibold">Via Montmayeur 37, 11100 Aosta (AO)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-1 h-5 w-5 shrink-0" />
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Telefono</p>
                    <a href={`tel:${PHONE}`} className="font-semibold hover:underline">{PHONE_DISPLAY}</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-1 h-5 w-5 shrink-0" />
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Email</p>
                    <a href="mailto:smd.impianti@pec.it" className="font-semibold hover:underline">smd.impianti@pec.it</a>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-border pt-6">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold"><Clock className="h-4 w-4" /> Orari di apertura</div>
                <dl className="grid grid-cols-1 gap-1 text-sm">
                  {hours.map(([d, h]) => (
                    <div key={d} className="flex justify-between border-b border-border/60 py-2 last:border-0">
                      <dt className="text-muted-foreground">{d}</dt>
                      <dd className="font-medium">{h}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-8"><CallButton className="w-full sm:w-auto" /></div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <iframe
                title="Mappa SMD Impianti Elettrici ad Aosta"
                src="https://www.google.com/maps?q=Via+Montmayeur+37,+Aosta&output=embed"
                className="h-full min-h-[400px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-secondary/40 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 text-sm text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} SMD Impianti Elettrici · Aosta, Valle d'Aosta</p>
          <p>Elettricista Aosta · Impianti elettrici · Domotica · Certificazioni</p>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
        <a
          href={`tel:${PHONE}`}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-base font-bold text-accent-foreground shadow-[var(--shadow-card)]"
        >
          <Phone className="h-5 w-5" /> 📞 Chiama ora · {PHONE_DISPLAY}
        </a>
      </div>
      <div className="h-20 md:hidden" aria-hidden />
    </div>
  );
}

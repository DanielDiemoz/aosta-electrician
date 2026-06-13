import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { u as useEmblaCarousel } from "../_libs/embla-carousel-react.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { Z as Zap, P as Phone, G as Gauge, C as Cpu, S as ShieldCheck, W as Wrench, a as Clock, b as Star, M as MapPin, c as Mail, A as ArrowLeft, d as ArrowRight } from "../_libs/lucide-react.mjs";
import "../_libs/embla-carousel-reactive-utils.mjs";
import "../_libs/embla-carousel.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const CarouselContext = reactExports.createContext(null);
function useCarousel() {
  const context = reactExports.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}
const Carousel = reactExports.forwardRef(({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y"
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = reactExports.useState(false);
  const [canScrollNext, setCanScrollNext] = reactExports.useState(false);
  const onSelect = reactExports.useCallback((api2) => {
    if (!api2) {
      return;
    }
    setCanScrollPrev(api2.canScrollPrev());
    setCanScrollNext(api2.canScrollNext());
  }, []);
  const scrollPrev = reactExports.useCallback(() => {
    api?.scrollPrev();
  }, [api]);
  const scrollNext = reactExports.useCallback(() => {
    api?.scrollNext();
  }, [api]);
  const handleKeyDown = reactExports.useCallback(
    (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );
  reactExports.useEffect(() => {
    if (!api || !setApi) {
      return;
    }
    setApi(api);
  }, [api, setApi]);
  reactExports.useEffect(() => {
    if (!api) {
      return;
    }
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CarouselContext.Provider,
    {
      value: {
        carouselRef,
        api,
        opts,
        orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          ref,
          onKeyDownCapture: handleKeyDown,
          className: cn("relative", className),
          role: "region",
          "aria-roledescription": "carousel",
          ...props,
          children
        }
      )
    }
  );
});
Carousel.displayName = "Carousel";
const CarouselContent = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: carouselRef, className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        className: cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        ),
        ...props
      }
    ) });
  }
);
CarouselContent.displayName = "CarouselContent";
const CarouselItem = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        role: "group",
        "aria-roledescription": "slide",
        className: cn(
          "min-w-0 shrink-0 grow-0 basis-full",
          orientation === "horizontal" ? "pl-4" : "pt-4",
          className
        ),
        ...props
      }
    );
  }
);
CarouselItem.displayName = "CarouselItem";
const CarouselPrevious = reactExports.forwardRef(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        ref,
        variant,
        size,
        className: cn(
          "absolute  h-8 w-8 rounded-full",
          orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          className
        ),
        disabled: !canScrollPrev,
        onClick: scrollPrev,
        ...props,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Previous slide" })
        ]
      }
    );
  }
);
CarouselPrevious.displayName = "CarouselPrevious";
const CarouselNext = reactExports.forwardRef(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        ref,
        variant,
        size,
        className: cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className
        ),
        disabled: !canScrollNext,
        onClick: scrollNext,
        ...props,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Next slide" })
        ]
      }
    );
  }
);
CarouselNext.displayName = "CarouselNext";
const PHONE = "3407737555";
const PHONE_DISPLAY = "340 773 7555";
function CallButton({
  className = "",
  label = "Chiama ora"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `tel:${PHONE}`, className: `inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-accent-foreground shadow-[var(--shadow-card)] transition-transform hover:scale-[1.02] active:scale-[0.98] ${className}`, "aria-label": "Chiama SMD Impianti Elettrici", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-5 w-5", "aria-hidden": true }),
    " ",
    label
  ] });
}
const services = [{
  icon: Zap,
  title: "Impianti elettrici civili e industriali",
  desc: "Progettazione e installazione di impianti su misura per abitazioni, uffici e aziende."
}, {
  icon: Gauge,
  title: "Quadri elettrici",
  desc: "Realizzazione, sostituzione e adeguamento di quadri elettrici a norma."
}, {
  icon: Cpu,
  title: "Domotica",
  desc: "Sistemi smart per controllare luci, clima e sicurezza dalla tua casa."
}, {
  icon: ShieldCheck,
  title: "Certificazioni e collaudi",
  desc: "Dichiarazioni di conformità DM 37/08, verifiche e collaudi professionali."
}, {
  icon: Wrench,
  title: "Manutenzione e riparazioni",
  desc: "Interventi rapidi per guasti, manutenzioni programmate e pronto intervento."
}];
const reviews = [{
  name: "Mauro D.",
  stars: 5,
  text: "Ho assistito e usufruito personalmente di molti dei servizi di SMD Impianti Elettrici, e della mia esperienza sono rimasto molto soddisfatto. Tutti i servizi forniti sono andati a buon fine, l'efficienza e la puntualità non mancano di certo, la qualità è ottima e il prezzo è perfetto."
}, {
  name: "Luca P.",
  stars: 5,
  text: "Chiamato per un'emergenza elettrica... che dire, professionale, disponibile e rapido nel risolvere il problema. Consiglio!"
}, {
  name: "Anna V.",
  stars: 5,
  text: "Ottima esperienza: reattivo, puntuale e molto professionale. Ottimo rapporto qualità-prezzo, lo richiamerò sicuramente."
}, {
  name: "Roberto G.",
  stars: 5,
  text: "Puntualità e qualità impeccabili. Ha rifatto l'impianto elettrico di casa con grande professionalità."
}, {
  name: "Francesca L.",
  stars: 5,
  text: "Servizio eccellente! Reattività e professionalità fuori dal comune. Prezzi onesti e lavoro garantito."
}, {
  name: "Davide M.",
  stars: 4,
  text: "Buon lavoro nel complesso. Qualità e professionalità ci sono, qualche piccolo ritardo sulla tabella di marcia."
}, {
  name: "Chiara R.",
  stars: 5,
  text: "Reattivo, puntuale e di grande professionalità. Ha risolto un problema che altri elettricisti non avevano saputo gestire."
}, {
  name: "Paolo S.",
  stars: 5,
  text: "Puntualità, qualità e professionalità al top. Impianto domotico installato a regola d'arte, sono entusiasta."
}, {
  name: "Sara F.",
  stars: 2,
  text: "Purtroppo esperienza negativa. Qualità del lavoro non all'altezza delle aspettative e prezzo superiore al preventivo."
}];
const hours = [["Lunedì", "08:00 – 20:00"], ["Martedì", "08:00 – 20:00"], ["Mercoledì", "08:00 – 20:00"], ["Giovedì", "08:00 – 20:00"], ["Venerdì", "08:00 – 20:00"], ["Sabato", "08:00 – 20:00"], ["Domenica", "11:00 – 20:00"]];
function ReviewCard({
  review
}) {
  const isLong = review.text.length > 140;
  const [expanded, setExpanded] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5", children: [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: `h-4 w-4 ${i < review.stars ? "fill-accent text-accent" : "text-muted-foreground/30"}` }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `mt-4 flex-1 leading-relaxed text-foreground ${!expanded && isLong ? "line-clamp-3" : ""}`, children: [
      '"',
      review.text,
      '"'
    ] }),
    isLong && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setExpanded(!expanded), className: "mt-2 text-left text-xs font-medium text-accent hover:underline", children: expanded ? "Mostra di meno ↑" : "Mostra di più ↓" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-sm font-semibold text-muted-foreground", children: [
      "— ",
      review.name
    ] })
  ] });
}
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-6xl items-center justify-between px-5 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#top", className: "flex items-center gap-2 font-bold tracking-tight", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-9 w-9 place-items-center rounded-lg bg-accent text-accent-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "SMD ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline text-muted-foreground font-medium", children: "Impianti Elettrici" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden gap-6 text-sm font-medium text-muted-foreground md:flex", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#servizi", className: "hover:text-foreground", children: "Servizi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#chi-siamo", className: "hover:text-foreground", children: "Chi siamo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#testimonianze", className: "hover:text-foreground", children: "Recensioni" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#contatti", className: "hover:text-foreground", children: "Contatti" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `tel:${PHONE}`, className: "hidden items-center gap-2 text-sm font-semibold text-foreground md:inline-flex", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4 text-accent-foreground" }),
        " ",
        PHONE_DISPLAY
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "top", className: "relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.86_0.18_95_/_0.3),_transparent_60%)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-6xl px-5 pb-20 pt-16 md:pb-32 md:pt-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-accent" }),
          " Disponibile oggi ad Aosta"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl font-bold leading-[1.05] md:text-6xl lg:text-7xl", children: [
          "Il tuo elettricista di fiducia ad ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-accent text-accent-foreground px-2 rounded-md", children: "Aosta" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-xl text-lg text-muted-foreground md:text-xl", children: "Professionalità, rapidità e affidabilità per impianti elettrici civili, industriali e domotica. Interventi in giornata in tutta la Valle d'Aosta." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CallButton, { label: `📞 Chiama ora · ${PHONE_DISPLAY}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#servizi", className: "text-sm font-semibold text-foreground underline-offset-4 hover:underline", children: "Scopri i servizi →" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: "Esperienza" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-1 text-2xl font-bold", children: "15+ anni" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: "Valutazione" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-1 text-2xl font-bold", children: "4,3/5" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: "Aperto" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-1 text-2xl font-bold", children: "7/7" })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "servizi", className: "border-t border-border bg-secondary/40 py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Servizi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold md:text-5xl", children: "Impianti elettrici ad Aosta, a regola d'arte" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: services.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-card)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 grid h-12 w-12 place-items-center rounded-xl bg-accent text-accent-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-6 w-6", "aria-hidden": true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold", children: s.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-relaxed text-muted-foreground", children: s.desc })
      ] }, s.title)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "chi-siamo", className: "py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-2 md:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Chi siamo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold md:text-5xl", children: "Un'azienda locale, seria e sempre disponibile." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-lg leading-relaxed text-muted-foreground", children: "SMD Impianti Elettrici è una realtà valdostana al servizio di famiglie e imprese di Aosta e dintorni. Da anni offriamo soluzioni elettriche affidabili, eseguite con cura e nel rispetto delle normative vigenti." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-lg leading-relaxed text-muted-foreground", children: [
          "Siamo operativi ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "tutti i giorni dalle 8:00 alle 20:00" }),
          " (domenica dalle 11:00 alle 20:00) per interventi, sopralluoghi e preventivi gratuiti."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CallButton, {}) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4", children: [{
        icon: ShieldCheck,
        t: "A norma DM 37/08"
      }, {
        icon: Clock,
        t: "Interventi in giornata"
      }, {
        icon: Zap,
        t: "Materiali certificati"
      }, {
        icon: Wrench,
        t: "Preventivi gratuiti"
      }].map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(b.icon, { className: "h-7 w-7" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 font-semibold", children: b.t })
      ] }, b.t)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "testimonianze", className: "border-t border-border bg-secondary/40 py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 flex flex-wrap items-end justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Recensioni" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold md:text-5xl", children: "Cosa dicono i nostri clienti" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex", children: [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 fill-accent text-accent" }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: "4,3/5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "su Google Maps" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative px-10 md:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Carousel, { opts: {
        align: "start",
        slidesToScroll: 1
      }, className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselContent, { className: "-ml-3", children: reviews.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselItem, { className: "basis-[85%] pl-3 sm:basis-[45%] lg:basis-[31%]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewCard, { review: r }) }, r.name)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselPrevious, { className: "-left-2 border-border bg-card hover:bg-accent hover:text-accent-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselNext, { className: "-right-2 border-border bg-card hover:bg-accent hover:text-accent-foreground" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "contatti", className: "py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Contatti" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold md:text-5xl", children: "Contattaci oggi stesso" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "mt-1 h-5 w-5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: "Indirizzo" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Via Montmayeur 37, 11100 Aosta (AO)" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "mt-1 h-5 w-5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: "Telefono" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `tel:${PHONE}`, className: "font-semibold hover:underline", children: PHONE_DISPLAY })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "mt-1 h-5 w-5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: "Email" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:smd.impianti@pec.it", className: "font-semibold hover:underline", children: "smd.impianti@pec.it" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 border-t border-border pt-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-2 text-sm font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4" }),
              " Orari di apertura"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "grid grid-cols-1 gap-1 text-sm", children: hours.map(([d, h]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-b border-border/60 py-2 last:border-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: d }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-medium", children: h })
            ] }, d)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CallButton, { className: "w-full sm:w-auto" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl border border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { title: "Mappa SMD Impianti Elettrici ad Aosta", src: "https://www.google.com/maps?q=Via+Montmayeur+37,+Aosta&output=embed", className: "h-full min-h-[400px] w-full", loading: "lazy", referrerPolicy: "no-referrer-when-downgrade" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border bg-secondary/40 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 text-sm text-muted-foreground md:flex-row md:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " SMD Impianti Elettrici · Aosta, Valle d'Aosta"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Elettricista Aosta · Impianti elettrici · Domotica · Certificazioni" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `tel:${PHONE}`, className: "flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-base font-bold text-accent-foreground shadow-[var(--shadow-card)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-5 w-5" }),
      " 📞 Chiama ora · ",
      PHONE_DISPLAY
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 md:hidden", "aria-hidden": true })
  ] });
}
export {
  Index as component
};

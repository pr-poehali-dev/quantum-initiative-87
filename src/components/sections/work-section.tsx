import { useReveal } from "@/hooks/use-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import Icon from "@/components/ui/icon"

const EVENTS = [
  {
    title: "Джем на крыше",
    place: "Лофт «Высота» · ул. Рубинштейна",
    status: "live",
    timer: "Идёт 2-й час",
    distance: "850 м",
    crowd: 78,
    direction: "left",
  },
  {
    title: "Дегустация натурального вина",
    place: "Бар «Цех» · наб. Фонтанки",
    status: "soon",
    timer: "Старт через 15 мин",
    distance: "1.2 км",
    crowd: 42,
    direction: "right",
  },
  {
    title: "Стендап open-mic",
    place: "Клуб «Подвал» · Лиговский пр.",
    status: "hour",
    timer: "Старт через 58 мин",
    distance: "2.4 км",
    crowd: 31,
    direction: "left",
  },
]

const STATUS_MAP: Record<string, { label: string; color: string; dot: string }> = {
  live: { label: "Идёт сейчас", color: "text-green-400 border-green-400/40", dot: "bg-green-400" },
  soon: { label: "Скоро старт", color: "text-cyan-300 border-cyan-300/40", dot: "bg-cyan-300" },
  hour: { label: "Через час", color: "text-violet-300 border-violet-300/40", dot: "bg-violet-300" },
}

export function WorkSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-8 transition-all duration-700 md:mb-12 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Афиша
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Что происходит прямо сейчас</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {EVENTS.map((event, i) => (
            <EventCard key={i} event={event} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function EventCard({
  event,
  index,
  isVisible,
}: {
  event: (typeof EVENTS)[number]
  index: number
  isVisible: boolean
}) {
  const status = STATUS_MAP[event.status]

  const getRevealClass = () => {
    if (!isVisible) {
      return event.direction === "left" ? "-translate-y-12 opacity-0" : "translate-y-12 opacity-0"
    }
    return "translate-y-0 opacity-100"
  }

  return (
    <div
      className={`group flex flex-col justify-between rounded-2xl border border-foreground/15 bg-foreground/[0.06] p-5 backdrop-blur-md transition-all duration-700 hover:border-foreground/30 hover:bg-foreground/[0.1] md:p-6 ${getRevealClass()}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div>
        <div className="mb-4 flex items-center justify-between">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${status.color}`}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className={`absolute h-1.5 w-1.5 animate-ping rounded-full ${status.dot} opacity-70`} />
              <span className={`relative h-1.5 w-1.5 rounded-full ${status.dot}`} />
            </span>
            {status.label}
          </span>
          <span className="font-mono text-xs text-foreground/50">{event.distance}</span>
        </div>

        <h3 className="mb-1.5 font-sans text-xl font-light text-foreground transition-transform duration-300 group-hover:translate-x-1 md:text-2xl">
          {event.title}
        </h3>
        <p className="mb-4 font-mono text-xs text-foreground/50">{event.place}</p>

        <div className="mb-1 flex items-center gap-2">
          <Icon name="Timer" size={16} className="text-foreground/70" />
          <span className="font-sans text-lg font-light text-foreground md:text-xl">{event.timer}</span>
        </div>

        <div className="mb-5 mt-3">
          <div className="mb-1 flex items-center justify-between font-mono text-[10px] text-foreground/50">
            <span>Людность</span>
            <span>{event.crowd}%</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-foreground/15">
            <div
              className={`h-full rounded-full ${event.crowd > 60 ? "bg-green-400" : "bg-cyan-300"}`}
              style={{ width: `${event.crowd}%` }}
            />
          </div>
        </div>
      </div>

      <MagneticButton variant="primary" size="sm" className="w-full">
        Мне нужно туда!
      </MagneticButton>
    </div>
  )
}

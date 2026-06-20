import { useReveal } from "@/hooks/use-reveal"

const TEAM = [
  {
    name: "Алексей Морозов",
    role: "Основатель & CEO",
    bio: "Запустил 3 городских стартапа. Убеждён, что лучший вечер начинается со спонтанного решения.",
    initials: "АМ",
    color: "from-violet-500/20 to-purple-600/10",
    border: "border-violet-400/30",
    direction: "left",
  },
  {
    name: "Мария Соколова",
    role: "Head of Product",
    bio: "Проектирует опыт, при котором пользователь находит событие раньше, чем успевает передумать идти.",
    initials: "МС",
    color: "from-cyan-500/20 to-blue-600/10",
    border: "border-cyan-400/30",
    direction: "top",
  },
  {
    name: "Дмитрий Ким",
    role: "Tech Lead",
    bio: "Строит live-инфраструктуру, которая обновляет афишу каждые 5 секунд без единого сбоя.",
    initials: "ДК",
    color: "from-green-500/20 to-emerald-600/10",
    border: "border-green-400/30",
    direction: "right",
  },
]

export function TeamSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-10 transition-all duration-700 md:mb-14 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Команда
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Люди за пульсом</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {TEAM.map((member, i) => {
            const getRevealClass = () => {
              if (!isVisible) {
                switch (member.direction) {
                  case "left": return "-translate-x-12 opacity-0"
                  case "right": return "translate-x-12 opacity-0"
                  default: return "-translate-y-12 opacity-0"
                }
              }
              return "translate-x-0 translate-y-0 opacity-100"
            }

            return (
              <div
                key={i}
                className={`group rounded-2xl border bg-gradient-to-br p-6 backdrop-blur-md transition-all duration-700 hover:border-foreground/30 md:p-8 ${member.color} ${member.border} ${getRevealClass()}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl border bg-gradient-to-br ${member.color} ${member.border}`}>
                  <span className="font-mono text-lg font-semibold text-foreground/80">{member.initials}</span>
                </div>
                <h3 className="mb-1 font-sans text-xl font-light text-foreground md:text-2xl">
                  {member.name}
                </h3>
                <p className={`mb-4 font-mono text-xs uppercase tracking-wider ${member.border.replace("border-", "text-").replace("/30", "/70")}`}>
                  {member.role}
                </p>
                <p className="text-sm leading-relaxed text-foreground/70 md:text-base">
                  {member.bio}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

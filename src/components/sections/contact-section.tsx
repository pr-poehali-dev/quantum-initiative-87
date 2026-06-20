import { useReveal } from "@/hooks/use-reveal"
import { useState, type FormEvent } from "react"
import { MagneticButton } from "@/components/magnetic-button"
import Icon from "@/components/ui/icon"

export function ContactSection() {
  const { ref, isVisible } = useReveal(0.3)
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitSuccess(true)
    setFormData({ name: "", email: "", phone: "", message: "" })
    setTimeout(() => setSubmitSuccess(false), 5000)
  }

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-8 transition-all duration-700 md:mb-10 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-4xl font-light leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Связаться
          </h2>
          <p className="font-mono text-xs text-foreground/60 md:text-base">/ Напишите нам или добавьте событие</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* Left — form */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-mono text-xs text-foreground/60">Имя *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full border-b border-foreground/30 bg-transparent py-2 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/60 focus:outline-none"
                    placeholder="Ваше имя"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-mono text-xs text-foreground/60">Телефон</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border-b border-foreground/30 bg-transparent py-2 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/60 focus:outline-none"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block font-mono text-xs text-foreground/60">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full border-b border-foreground/30 bg-transparent py-2 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/60 focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="mb-1 block font-mono text-xs text-foreground/60">Сообщение / О событии *</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full border-b border-foreground/30 bg-transparent py-2 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/60 focus:outline-none resize-none"
                  placeholder="Что, где и когда происходит?"
                />
              </div>

              <div className="pt-1">
                <MagneticButton variant="primary" size="lg" className="w-full">
                  {isSubmitting ? "Отправка..." : "Отправить"}
                </MagneticButton>
                {submitSuccess && (
                  <p className="mt-3 text-center font-mono text-sm text-green-400">
                    Спасибо! Скоро добавим на карту.
                  </p>
                )}
              </div>
            </form>

            {/* Contacts */}
            <div className="mt-6 flex flex-wrap gap-6 border-t border-foreground/10 pt-6">
              <a href="mailto:hello@coliseum.city" className="group flex items-center gap-2">
                <Icon name="Mail" size={14} className="text-foreground/50" />
                <span className="font-mono text-xs text-foreground/60 transition-colors group-hover:text-foreground/90">
                  hello@coliseum.city
                </span>
              </a>
              <div className="flex items-center gap-2">
                <Icon name="MapPin" size={14} className="text-foreground/50" />
                <span className="font-mono text-xs text-foreground/60">Санкт-Петербург</span>
              </div>
              <div className="flex items-center gap-4">
                {["Telegram", "VK", "Instagram"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="font-mono text-xs text-foreground/50 transition-colors hover:text-foreground/90"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — map */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="relative h-64 overflow-hidden rounded-2xl border border-foreground/15 md:h-full md:min-h-[300px]">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=30.25%2C59.90%2C30.45%2C60.00&layer=mapnik&marker=59.9500%2C30.3500"
                className="h-full w-full border-0 opacity-80 grayscale"
                title="Карта — Санкт-Петербург"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-foreground/10" />
              <div className="absolute bottom-3 left-3 rounded-lg border border-foreground/20 bg-black/60 px-3 py-1.5 backdrop-blur-md">
                <p className="font-mono text-xs text-foreground/80">Санкт-Петербург, Россия</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

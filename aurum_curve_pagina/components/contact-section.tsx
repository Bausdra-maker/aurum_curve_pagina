import { Mail, MessageCircle, Phone } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const EMAIL = 'bautistalarocavelezlopez@gmail.com'
const PHONE_DISPLAY = '+54 911 5005 3839'
const PHONE_TEL = '+5491150053839'
const WHATSAPP = 'https://wa.me/5491150053839?text=Hola%20Aurum%20Curve%2C%20quiero%20info%20mayorista'

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-3xl scroll-mt-32 px-4 py-20">
      <div className="flex flex-col items-center gap-10 text-center">
        <div className="flex flex-col gap-3">
          <p className="text-xs tracking-[0.3em] text-primary uppercase">Contacto y soporte</p>
          <h2 id="contact-title" className="font-serif text-4xl font-medium md:text-5xl">
            Llenemos tu local
          </h2>
          <p className="text-pretty text-muted-foreground">
            ¿Dudas sobre precios, talles o envíos? Nuestro equipo mayorista te responde en un día hábil.
          </p>
        </div>

        <ul className="flex flex-col gap-6 sm:flex-row sm:gap-12">
          <li className="flex items-center gap-3 text-left">
            <span className="flex size-10 items-center justify-center rounded-full bg-accent/50">
              <Mail className="size-4 text-primary" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <a href={`mailto:${EMAIL}`} className="font-medium break-all hover:text-primary">
                {EMAIL}
              </a>
            </div>
          </li>
          <li className="flex items-center gap-3 text-left">
            <span className="flex size-10 items-center justify-center rounded-full bg-accent/50">
              <Phone className="size-4 text-primary" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">Teléfono</p>
              <a href={`tel:${PHONE_TEL}`} className="font-medium hover:text-primary">
                {PHONE_DISPLAY}
              </a>
            </div>
          </li>
        </ul>

        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:${EMAIL}?subject=Consulta%20mayorista`}
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
          >
            <Mail aria-hidden="true" />
            Escribir por Gmail
          </a>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: 'lg' }), 'bg-success text-primary-foreground hover:bg-success/90')}
          >
            <MessageCircle aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { company } from '../data/company';
import { ContactForm } from './ContactForm';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

/** Contact details beside the enquiry form. */
export function ContactBlock({ heading = true }: { heading?: boolean }) {
  const { contact } = company;
  return (
    <section id="details" className="scroll-mt-24 py-24 md:py-32" aria-labelledby={heading ? 'contact-title' : undefined}>
      <div className="container-site">
        {heading && (
          <SectionHeading id="contact-title" eyebrow="Contact" index="11" title={'Tell Us What\nYou’re Building.'} highlight={['Building']} size="md" className="mb-16 md:mb-20" />
        )}
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="space-y-10 lg:col-span-4">
            <Reveal>
              <ContactRow icon={<Mail className="h-4 w-4" />} label="Email">
                <a href={`mailto:${contact.email}`} className="text-lg text-bone transition-colors hover:text-brand-cyan md:text-xl">
                  {contact.email}
                </a>
              </ContactRow>
            </Reveal>
            <Reveal delay={0.06}>
              <ContactRow icon={<Phone className="h-4 w-4" />} label="Phone">
                {contact.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="block text-lg text-bone transition-colors hover:text-brand-cyan md:text-xl">
                    {p}
                  </a>
                ))}
              </ContactRow>
            </Reveal>
            <Reveal delay={0.12}>
              <ContactRow icon={<MapPin className="h-4 w-4" />} label="Head office">
                <address className="not-italic leading-relaxed text-bone/85">
                  {contact.address.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </address>
                <a href={contact.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-[14px] text-bone-muted hover:text-bone">
                  Get directions <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </ContactRow>
            </Reveal>
            <Reveal delay={0.18} className="rounded-2xl border border-line/[0.07] p-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-bone-dim">What happens next</p>
              <ol className="mt-4 space-y-3 text-[15px] text-bone/80">
                <li className="flex gap-3">
                  <span className="font-display text-bone-dim">01</span> We reply to schedule a call.
                </li>
                <li className="flex gap-3">
                  <span className="font-display text-bone-dim">02</span> We hold a discovery meeting.
                </li>
                <li className="flex gap-3">
                  <span className="font-display text-bone-dim">03</span> You receive a clear proposal and scope.
                </li>
              </ol>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-8">
            <div className="rounded-[28px] border border-line/[0.07] bg-gradient-to-b from-line/[0.03] to-transparent p-6 sm:p-8 md:p-12">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-bone-dim">
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line/10 text-bone-muted">{icon}</span>
        {label}
      </p>
      {children}
    </div>
  );
}

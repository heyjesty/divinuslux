import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState, type FormEvent, type ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Check, AlertCircle, Mail, Loader2, ChevronDown } from 'lucide-react';
import { services } from '../data/services';
import { company } from '../data/company';
import { Button } from './Button';
import { ease } from '../animations/motion';

const ENDPOINT = (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined)?.trim() ?? '';
const MIN_FILL_MS = 3000;

type Fields = { name: string; email: string; phone: string; company: string; service: string; budget: string; message: string };
type Status = 'idle' | 'sending' | 'success' | 'error' | 'unconfigured';

const empty: Fields = { name: '', email: '', phone: '', company: '', service: '', budget: '', message: '' };
const budgets = ['Under ₹1 lakh', '₹1 – 5 lakh', '₹5 – 15 lakh', '₹15 lakh +', 'Not sure yet'];

function validate(f: Fields) {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (f.name.trim().length < 2) e.name = 'Please enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Please enter a valid email address.';
  if (f.phone.trim() && !/^[+()\d\s-]{7,20}$/.test(f.phone.trim())) e.phone = 'Please enter a valid phone number.';
  if (!f.service) e.service = 'Please choose a service.';
  if (f.message.trim().length < 20) e.message = 'Tell us a little more (at least 20 characters).';
  return e;
}

const mailtoFor = (f: Fields) => {
  const body = [
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    f.phone && `Phone: ${f.phone}`,
    f.company && `Company: ${f.company}`,
    `Service: ${f.service}`,
    f.budget && `Budget: ${f.budget}`,
    `
${f.message}`,
  ]
    .filter((l): l is string => typeof l === 'string' && l !== '')
    .join('\n');
  return `mailto:${company.contact.email}?subject=${encodeURIComponent(`Project enquiry — ${f.service || 'General'}`)}&body=${encodeURIComponent(body)}`;
};

export function ContactForm() {
  const [params] = useSearchParams();
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [honeypot, setHoneypot] = useState('');
  const startedAt = useRef(Date.now());

  useEffect(() => {
    const s = params.get('service');
    if (s && services.some((x) => x.title === s)) setFields((f) => ({ ...f, service: s }));
  }, [params]);

  const set = (k: keyof Fields) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const next = { ...fields, [k]: e.target.value };
    setFields(next);
    if (touched[k]) setErrors(validate(next));
  };
  const blur = (k: keyof Fields) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(fields));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(fields);
    setErrors(errs);
    setTouched({ name: true, email: true, phone: true, service: true, message: true });
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    // Spam protection: hidden honeypot field and a minimum time on the form.
    if (honeypot || Date.now() - startedAt.current < MIN_FILL_MS) {
      setStatus('error');
      return;
    }
    if (!ENDPOINT) {
      setStatus('unconfigured');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...fields, _subject: `Website enquiry — ${fields.service}`, source: window.location.href }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('success');
      setFields(empty);
      setTouched({});
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <StatusPanel icon={<Check className="h-6 w-6" />} title="Thank you — your message has been sent." tone="ok">
        Our team will get back to you shortly at the email address you provided.
        <div className="mt-8">
          <Button onClick={() => setStatus('idle')} variant="ghost" icon="none">
            Send another message
          </Button>
        </div>
      </StatusPanel>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="relative" aria-describedby="form-note">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Full name" required error={touched.name ? errors.name : undefined}>
          <input id="f-name" className="field" autoComplete="name" value={fields.name} onChange={set('name')} onBlur={blur('name')} aria-invalid={Boolean(touched.name && errors.name)} aria-describedby={errors.name ? 'e-name' : undefined} />
        </Field>
        <Field id="email" label="Email address" required error={touched.email ? errors.email : undefined}>
          <input id="f-email" type="email" className="field" autoComplete="email" value={fields.email} onChange={set('email')} onBlur={blur('email')} aria-invalid={Boolean(touched.email && errors.email)} aria-describedby={errors.email ? 'e-email' : undefined} />
        </Field>
        <Field id="phone" label="Phone number" error={touched.phone ? errors.phone : undefined}>
          <input id="f-phone" type="tel" className="field" autoComplete="tel" value={fields.phone} onChange={set('phone')} onBlur={blur('phone')} aria-invalid={Boolean(touched.phone && errors.phone)} aria-describedby={errors.phone ? 'e-phone' : undefined} />
        </Field>
        <Field id="company" label="Company name">
          <input id="f-company" className="field" autoComplete="organization" value={fields.company} onChange={set('company')} />
        </Field>
        <Field id="service" label="Service interested in" required error={touched.service ? errors.service : undefined}>
          <SelectWrap><select id="f-service" className="field appearance-none pr-10" value={fields.service} onChange={set('service')} onBlur={blur('service')} aria-invalid={Boolean(touched.service && errors.service)} aria-describedby={errors.service ? 'e-service' : undefined}>
            <option value="" className="bg-ink-800">Select a service</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title} className="bg-ink-800">
                {s.title}
              </option>
            ))}
            <option value="Other" className="bg-ink-800">Something else</option>
          </select></SelectWrap>
        </Field>
        <Field id="budget" label="Project budget (optional)">
          <SelectWrap><select id="f-budget" className="field appearance-none pr-10" value={fields.budget} onChange={set('budget')}>
            <option value="" className="bg-ink-800">Prefer not to say</option>
            {budgets.map((b) => (
              <option key={b} value={b} className="bg-ink-800">
                {b}
              </option>
            ))}
          </select></SelectWrap>
        </Field>
        <Field id="message" label="Project description" required error={touched.message ? errors.message : undefined} className="sm:col-span-2">
          <textarea id="f-message" rows={6} className="field resize-y" value={fields.message} onChange={set('message')} onBlur={blur('message')} aria-invalid={Boolean(touched.message && errors.message)} aria-describedby={errors.message ? 'e-message' : undefined} placeholder="Goals, timeline, anything we should know…" />
        </Field>
      </div>

      {/* Honeypot — hidden from people and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="f-website">Website</label>
        <input id="f-website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      <AnimatePresence>
        {(status === 'error' || status === 'unconfigured') && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.5, ease }} className="overflow-hidden">
            <div role="alert" className={`mt-6 flex gap-3 rounded-2xl border p-5 text-[14.5px] leading-relaxed ${status === 'error' ? 'border-red-300 bg-red-50 text-red-800' : 'border-brand-blue/30 bg-brand-blue/[0.07] text-bone'}`}>
              {status === 'error' ? <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" /> : <Mail className="mt-0.5 h-5 w-5 shrink-0" />}
              <div>
                {status === 'error' ? (
                  <p>Sorry, your message could not be sent. Please try again, or email us directly — your details are ready to go.</p>
                ) : (
                  <p>Online submission isn’t switched on yet, so nothing has been sent. Your message is ready to send from your email app instead.</p>
                )}
                <a href={mailtoFor(fields)} className="mt-3 inline-flex items-center gap-2 font-medium text-bone underline decoration-white/30 underline-offset-4 hover:decoration-white">
                  <Mail className="h-4 w-4" /> Send by email to {company.contact.email}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p id="form-note" className="max-w-sm text-[13px] text-bone-dim">
          Fields marked * are required. We only use your details to reply to your enquiry.
        </p>
        <Button type="submit" variant="gradient" disabled={status === 'sending'} icon={status === 'sending' ? 'none' : 'arrow'}>
          {status === 'sending' ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Sending…
            </span>
          ) : (
            'Send enquiry'
          )}
        </Button>
      </div>
    </form>
  );
}

function Field({ id, label, required, error, children, className = '' }: { id: string; label: string; required?: boolean; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={`f-${id}`} className="mb-2 block text-[13px] text-bone-muted">
        {label}
        {required && <span className="text-brand-cyan"> *</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p id={`e-${id}`} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-2 text-[12.5px] text-red-600">
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatusPanel({ icon, title, children, tone }: { icon: React.ReactNode; title: string; children: React.ReactNode; tone: 'ok' }) {
  return (
    <motion.div role="status" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="rounded-3xl border border-line/10 bg-line/[0.02] p-10 text-center md:p-14">
      <span className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${tone === 'ok' ? 'bg-emerald-50 text-emerald-600' : ''}`}>{icon}</span>
      <h3 className="mt-6 font-display text-2xl font-medium">{title}</h3>
      <div className="mx-auto mt-3 max-w-md text-bone-muted">{children}</div>
    </motion.div>
  );
}

function SelectWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-bone-dim" />
    </div>
  );
}

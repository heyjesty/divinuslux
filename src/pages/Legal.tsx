import { Page } from '../components/Page';
import { Seo } from '../components/Seo';
import { PageHero } from '../components/PageHero';
import { company } from '../data/company';

/**
 * Placeholder legal pages. The wording below is a general starting point and
 * MUST be reviewed by Divinuslux (and a legal adviser) before launch.
 */
const content = {
  privacy: {
    title: 'Privacy Policy',
    path: '/privacy-policy',
    sections: [
      ['Who we are', `${company.legalName} ("Divinuslux", "we") operates this website. You can contact us at ${company.contact.email}.`],
      ['Information we collect', 'When you submit our enquiry form or email us, we receive the details you provide — such as your name, email address, phone number, company and project information. We do not ask for sensitive personal data through this website.'],
      ['How we use it', 'We use your information only to respond to your enquiry, provide the services you request and keep a record of our communication. We do not sell your personal information.'],
      ['Service providers', 'If online form submission is enabled, enquiries are delivered through a third-party form service acting on our behalf. Our website is hosted by a third-party provider that may process technical data such as IP addresses in server logs.'],
      ['Retention', 'We keep enquiry information for as long as needed to respond and for reasonable business records, then delete it.'],
      ['Your rights', `You may ask us to access, correct or delete the personal information we hold about you by writing to ${company.contact.email}.`],
      ['Changes', 'We may update this policy from time to time. The latest version will always be available on this page.'],
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    path: '/terms',
    sections: [
      ['About these terms', `These terms apply to your use of the ${company.legalName} website. By using the site you agree to them.`],
      ['Content', 'Website content is provided for general information. We work to keep it accurate but do not guarantee that it is complete or current. Project work shown belongs to the respective clients and is displayed to illustrate our services.'],
      ['Intellectual property', `Unless stated otherwise, the design, text and graphics of this website belong to ${company.legalName}. Client names, logos and websites remain the property of their owners.`],
      ['External links', 'Our site links to and previews third-party websites, including client projects. We are not responsible for the content or policies of those sites.'],
      ['Services', 'Any services we provide are governed by a separate written agreement or proposal. Nothing on this website forms a contract or guarantees particular results, including search rankings.'],
      ['Liability', 'To the extent permitted by law, we are not liable for any loss arising from use of this website.'],
      ['Governing law', 'These terms are governed by the laws of India, and the courts of Ernakulam, Kerala have jurisdiction.'],
      ['Contact', `Questions about these terms can be sent to ${company.contact.email}.`],
    ],
  },
} as const;

export default function Legal({ kind }: { kind: 'privacy' | 'terms' }) {
  const c = content[kind];
  return (
    <Page>
      <Seo title={c.title} description={`${c.title} for the ${company.legalName} website.`} path={c.path} breadcrumbs={[{ name: c.title, path: c.path }]} />
      <PageHero eyebrow="Legal" title={c.title} crumbs={[{ name: c.title }]} intro="Last updated: to be confirmed before launch." />
      <section className="pb-28">
        <div className="container-site max-w-3xl">
          <div className="prose-article">
            {c.sections.map(([h, p]) => (
              <div key={h}>
                <h2>{h}</h2>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Page>
  );
}

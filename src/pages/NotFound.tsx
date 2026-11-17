import { Page } from '../components/Page';
import { Seo } from '../components/Seo';
import { Button } from '../components/Button';
import { VideoBackground } from '../components/VideoBackground';

export default function NotFound() {
  return (
    <Page>
      <Seo title="Page not found" description="The page you are looking for could not be found." path="/404" noindex />
      <section className="relative flex min-h-[100svh] items-center overflow-hidden">
        <VideoBackground />
        <div className="container-site relative text-center">
          <p className="text-gradient animate-shimmer font-display text-[clamp(6rem,22vw,16rem)] font-semibold leading-none tracking-[-0.06em]">404</p>
          <h1 className="mt-4 font-display text-3xl font-medium md:text-4xl">This page drifted off the network.</h1>
          <p className="mx-auto mt-4 max-w-md text-bone-muted">The link may be broken or the page may have moved.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button to="/">Back to home</Button>
            <Button to="/projects" variant="ghost">
              See our work
            </Button>
          </div>
        </div>
      </section>
    </Page>
  );
}

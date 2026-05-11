import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';
import ProjectShotImg from '../components/ProjectShotImg';
import { getProjectBySlug } from '../data/projects';
import NotFound from './NotFound';

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return <NotFound />;
  }

  const heroVisual = project.coverImage ?? project.image;
  const extraShots = [
    ...(project.screenshots?.map((src, i) => ({
      src,
      alt: `${project.title} screenshot ${i + 1}`,
      caption: undefined as string | undefined,
    })) ?? []),
    ...(project.gallery ?? []),
  ];

  return (
    <article className="relative px-6 pb-24 lg:px-10 xl:px-14 2xl:px-20">
      <div className="pointer-events-none absolute right-6 top-0 font-japanese text-5xl text-[#facc15]/5 md:text-7xl">
        詳細
      </div>

      <div className="relative z-10 mx-auto max-w-4xl xl:max-w-5xl">
        <nav className="mb-10" aria-label="Breadcrumb">
          <Link
            to="/projects"
            className="interactive inline-flex items-center gap-2 text-sm font-medium text-[#facc15] hover:text-[#fde047] md:text-base"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            All projects
          </Link>
        </nav>

        <header className="mb-12">
          <span className="mb-3 inline-block rounded-full border border-[#facc15]/30 bg-[#facc15]/10 px-3 py-1 font-mono-custom text-xs uppercase tracking-wider text-[#facc15]">
            {project.category}
          </span>
          <h1 className="font-display text-4xl tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-white/70 md:text-xl">{project.description}</p>
          {project.highlights && project.highlights.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-3">
              {project.highlights.map((h) => (
                <li
                  key={h}
                  className="rounded-lg border border-[#facc15]/20 bg-[#141414]/90 px-4 py-2 text-sm text-[#facc15]/90"
                >
                  {h}
                </li>
              ))}
            </ul>
          )}
        </header>

        <div className="relative mb-16 aspect-[21/9] min-h-[220px] w-full overflow-hidden rounded-2xl border border-[#facc15]/20 shadow-[0_24px_80px_rgba(0,0,0,0.45)] md:rounded-3xl">
          {project.videoUrl ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={project.videoUrl}
              muted
              loop
              playsInline
              autoPlay
              aria-label={`${project.title} preview`}
            />
          ) : (
            <ProjectShotImg src={heroVisual} alt="" className="absolute inset-0 h-full w-full object-cover" />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-transparent to-[#0a0a0a]/30" />
        </div>

        <div className="max-w-none space-y-10 text-base md:text-lg">
          <section>
            <h2 className="font-display text-sm uppercase tracking-wider text-[#facc15]">Overview</h2>
            <p className="mt-3 text-white/75 leading-relaxed">{project.longDescription}</p>
          </section>

          {project.problem && (
            <section>
              <h2 className="font-display text-sm uppercase tracking-wider text-[#facc15]">Problem</h2>
              <p className="mt-3 text-white/75 leading-relaxed">{project.problem}</p>
            </section>
          )}

          {project.solution && (
            <section>
              <h2 className="font-display text-sm uppercase tracking-wider text-[#facc15]">Approach</h2>
              <p className="mt-3 text-white/75 leading-relaxed">{project.solution}</p>
            </section>
          )}

          <section>
            <h2 className="font-display text-sm uppercase tracking-wider text-[#facc15]">Tech stack</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-[#facc15]/15 bg-[#1a1a1a] px-3 py-1.5 font-mono-custom text-sm text-[#facc15]/85"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-sm uppercase tracking-wider text-[#facc15]">Features</h2>
            <ul className="mt-4 space-y-2">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-white/75">
                  <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-[#facc15]" aria-hidden />
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          {project.repositoryOverview && (
            <section>
              <h2 className="font-display text-sm uppercase tracking-wider text-[#facc15]">Project structure</h2>
              <pre className="mt-4 overflow-x-auto rounded-xl border border-[#facc15]/15 bg-[#0d0d0d] p-4 font-mono-custom text-xs leading-relaxed text-white/70 sm:text-sm">
                {project.repositoryOverview}
              </pre>
            </section>
          )}

          {project.setupGuide && (
            <section>
              <h2 className="font-display text-sm uppercase tracking-wider text-[#facc15]">Getting started</h2>
              <pre className="mt-4 whitespace-pre-wrap rounded-xl border border-[#facc15]/15 bg-[#0d0d0d] p-4 font-mono-custom text-xs leading-relaxed text-white/70 sm:text-sm">
                {project.setupGuide}
              </pre>
            </section>
          )}

          {project.documentationNotes && (
            <section>
              <h2 className="font-display text-sm uppercase tracking-wider text-[#facc15]">Documentation</h2>
              <p className="mt-3 text-white/75 leading-relaxed">{project.documentationNotes}</p>
            </section>
          )}

          {extraShots.length > 0 && (
            <section>
              <h2 className="font-display text-sm uppercase tracking-wider text-[#facc15]">Screenshots & gallery</h2>
              <p className="mt-2 text-sm text-white/50">
                Screenshots are listed in <code className="text-[#facc15]/80">src/data/projects.ts</code> (under{' '}
                <code className="text-[#facc15]/80">public/images/projects/</code>).
              </p>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {extraShots.map((item, i) => (
                  <figure key={`${item.src}-${i}`} className="overflow-hidden rounded-xl border border-[#facc15]/15 bg-[#111]">
                    <ProjectShotImg
                      src={item.src}
                      alt={item.alt ?? `${project.title} visual ${i + 1}`}
                      className="aspect-video w-full object-cover"
                    />
                    {item.caption && (
                      <figcaption className="border-t border-[#facc15]/10 px-3 py-2 text-xs text-white/55">
                        {item.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </section>
          )}

          {project.licenseLine && (
            <p className="border-l-2 border-[#facc15]/40 pl-4 text-sm text-white/50">{project.licenseLine}</p>
          )}

          <div className="flex flex-wrap gap-4 border-t border-[#facc15]/10 pt-10">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="interactive inline-flex items-center gap-2 rounded-lg border border-[#facc15]/25 bg-[#1a1a1a] px-5 py-3 text-sm text-white/80 hover:border-[#facc15]/50 hover:text-white"
              >
                <Github className="h-4 w-4" aria-hidden />
                Source
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="interactive inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#facc15] to-[#fbbf24] px-6 py-3 text-sm font-semibold text-[#0a0a0a] hover:opacity-90"
              >
                <ExternalLink className="h-4 w-4" aria-hidden />
                Live demo
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectDetail;

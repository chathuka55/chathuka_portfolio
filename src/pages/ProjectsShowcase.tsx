import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { projects } from '../data/projects';
import ProjectShotImg from '../components/ProjectShotImg';

const cardImage = (image: string, cover?: string) => cover ?? image;

const ProjectsShowcase = () => {
  return (
    <div className="relative px-6 pb-24 lg:px-10 xl:px-14 2xl:px-20">
      <div className="pointer-events-none absolute left-4 top-0 font-japanese text-[4rem] text-[#facc15]/5 sm:text-[6rem] md:left-10 md:text-[8rem]">
        作品
      </div>

      <div className="relative z-10 mx-auto max-w-6xl xl:max-w-7xl 2xl:max-w-[92rem]">
        <header className="mb-14 md:mb-20">
          <p className="section-label mb-3">Portfolio</p>
          <h1 className="font-display text-4xl tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            All projects
            <span className="mt-2 block font-japanese text-2xl text-[#facc15]/70 sm:text-3xl md:text-4xl">
              プロジェクト一覧
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-white/60 md:text-lg">
            Browse featured work in one place. Each card links to a dedicated case study page with tech
            stack, narrative, and gallery placeholders you can replace with your own photos.
          </p>
          <Link
            to="/#projects"
            className="interactive mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#facc15] hover:text-[#fde047] md:text-base"
          >
            Back to home featured section
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </header>

        <ul className="grid gap-8 sm:grid-cols-2 xl:grid-cols-2 xl:gap-10">
          {projects.map((project, index) => (
            <li key={project.slug}>
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#facc15]/15 bg-[#0f0f0f]/80 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
              >
                <Link to={`/projects/${project.slug}`} className="relative block aspect-[16/10] overflow-hidden">
                  <ProjectShotImg
                    src={cardImage(project.image, project.coverImage)}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-[#facc15]/30 bg-[#0a0a0a]/60 px-3 py-1 font-mono-custom text-[10px] uppercase tracking-wider text-[#facc15] backdrop-blur-sm">
                    {project.category}
                  </span>
                </Link>

                <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
                  <div>
                    <h2 className="font-display text-2xl text-white md:text-3xl">{project.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-white/65 md:text-base">{project.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-[#facc15]/12 bg-[#1a1a1a]/80 px-2.5 py-1 font-mono-custom text-[11px] text-[#facc15]/85"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap gap-3 pt-2">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="interactive inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#facc15] to-[#fbbf24] px-5 py-2.5 text-sm font-semibold text-[#0a0a0a] hover:opacity-90 sm:flex-none md:px-8 md:py-3 md:text-base"
                    >
                      Case study
                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                    </Link>
                    {(project.liveUrl ?? project.githubUrl) && (
                      <a
                        href={project.liveUrl ?? project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="interactive inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-[#facc15]/35 bg-[#262626]/40 px-5 py-2.5 text-sm font-medium text-[#facc15] hover:bg-[#facc15]/10 md:px-8 md:py-3 md:text-base"
                      >
                        <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
                        Live / repo
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectsShowcase;

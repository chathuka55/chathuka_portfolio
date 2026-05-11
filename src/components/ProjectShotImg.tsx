import { useMemo, useState, type ImgHTMLAttributes } from 'react';

const EXTS = ['.png', '.jpg', '.jpeg', '.webp'] as const;

/** `/images/projects/foo/ss3.png` → `/images/projects/foo/ss3` */
function shotBasePath(src: string): string | null {
  const m = src.match(/^(\/images\/projects\/[^/]+\/ss\d+)\.(png|jpe?g|webp)$/i);
  return m ? m[1] : null;
}

type ProjectShotImgProps = {
  src: string;
  alt: string;
  className?: string;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;

/**
 * For local project screenshots under /images/projects/<folder>/ssN.<ext>.
 * Cycles through common extensions if the first request 404s (e.g. code used .png but files are .jpg).
 */
export default function ProjectShotImg({ src, alt, className, ...rest }: ProjectShotImgProps) {
  const base = useMemo(() => shotBasePath(src), [src]);
  const [extIndex, setExtIndex] = useState(0);

  const resolvedSrc = base ? `${base}${EXTS[extIndex]}` : src;

  return (
    <img
      key={resolvedSrc}
      src={resolvedSrc}
      alt={alt}
      className={className}
      {...rest}
      onError={() => {
        if (!base) return;
        setExtIndex((i) => (i < EXTS.length - 1 ? i + 1 : i));
      }}
    />
  );
}

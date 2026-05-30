import React from 'react';
import { ImageMetadata } from 'astro';
import SpotlightCard from './SpotlightCard';

interface ProjectCardProps {
  title: string;
  image?: ImageMetadata;
  imageSrc?: string;
  link: string;
  preview: string;
  status: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, image, imageSrc, link, preview, status }) => {
  const src = image?.src ?? imageSrc;

  return (
    <SpotlightCard className="group" spotlightColor="rgba(164, 118, 255, 0.2)">
      <a
        href={preview}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 mb-4 bg-[#1414149c] border border-[var(--white-icon-tr)]">
          {src ? (
            <img
              src={src}
              alt={title}
              className="w-full h-48 md:h-72 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div
              className="w-full h-48 md:h-72 flex items-center justify-center text-[var(--white-icon)] text-sm px-6 text-center"
              aria-hidden="true"
            >
              No preview image
            </div>
          )}
        </div>
        <div className="flex items-center px-3">
          <div className="flex-grow">
            <h4 className="text-2xl font-semibold">{title}</h4>
            <span className="py-1 text-sm text-[var(--white-icon)]">
              {status}
            </span>
          </div>
          <div className="flex gap-2 ml-auto">
            <a
              target="_blank"
              href={link}
              aria-label="GitHub"
              className="size-14 flex justify-center items-center text-[var(--white-icon)] hover:text-white transition duration-300 ease-in-out border border-1 border-[var(--white-icon-tr)] p-3 rounded-xl bg-[#1414149c] hover:bg-[var(--white-icon-tr)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-7"
              >
                <path d="M24 12L18.3431 17.6569L16.9289 16.2426L21.1716 12L16.9289 7.75736L18.3431 6.34315L24 12ZM2.82843 12L7.07107 16.2426L5.65685 17.6569L0 12L5.65685 6.34315L7.07107 7.75736L2.82843 12ZM9.78845 21H7.66009L14.2116 3H16.3399L9.78845 21Z" />
              </svg>
            </a>
            <a
              target="_blank"
              href={preview}
              aria-label="Preview"
              className="size-14 flex justify-center items-center text-[var(--white-icon)] hover:text-white transition duration-300 ease-in-out border border-1 border-[var(--white-icon-tr)] p-3 rounded-xl bg-[#1414149c] hover:bg-[var(--white-icon-tr)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-7"
              >
                <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z" />
              </svg>
            </a>
          </div>
        </div>
      </a>
    </SpotlightCard>
  );
};

export default ProjectCard; 
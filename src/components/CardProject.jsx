import React from "react";
import { Link } from "react-router-dom";

const CardProject = ({ project }) => {
  return (
    <div className="bg-[#0a0a1a] border border-white/10 rounded-xl p-4 shadow-md hover:scale-105 transition-transform duration-300">
      <img
        src={project.Image}
        alt={project.Title}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-semibold text-white">{project.Title}</h3>
      <p className="text-sm text-gray-400 mb-3">{project.Description}</p>
      <div className="flex justify-between items-center">
        <Link
          to={`/project/${project.id}`}
          className="text-blue-400 hover:underline text-sm"
        >
          View Details
        </Link>
        <a
          href={project.Live}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-400 hover:underline text-sm"
        >
          Live Demo
        </a>
      </div>
    </div>
  );
};

export default CardProject;

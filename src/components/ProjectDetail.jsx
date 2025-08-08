import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, ExternalLink, Github, Code2, Star,
  ChevronRight, Layers, Layout, Globe, Package, Cpu, Code,
} from "lucide-react";
import Swal from "sweetalert2";

// Hardcoded project data
const myProjects = [
  {
    id: "1",
    Title: "Dice Game",
    Description:
      "A simple and engaging 2-player dice game where players take turns rolling the dice to compete. Built with clean logic and animated rolls, the project emphasizes interactivity and responsive UI for smooth gameplay.",
    Features: [
      "Turn-based multiplayer logic",
      "Animated dice rolls with transitions",
      "Dynamic score tracking system",
      "Clean and responsive user interface",
    ],
    TechStack: ["React", "JavaScript", "CSS", "Vite"],
    Github: "https://github.com/AbdulRehman938/dice_game",
    Live: "https://dice-game-ashy-one.vercel.app/",
    Image: "/projects-img/DiceApp.png",
  },
  {
    id: "2",
    Title: "Kasmo Landing Page",
    Description:
      "A professional, fully responsive landing page designed for a fictional tech brand. Combines elegant design with modern layouts to showcase a product or service effectively.",
    Features: [
      "Fully responsive across all screen sizes",
      "Sleek and minimal design for high conversion",
      "Reusable components for scalability",
      "Smooth scroll and animated sections",
    ],
    TechStack: ["React", "Tailwind", "GSAP", "Framer Motion"],
    Github: "https://github.com/AbdulRehman938/Kasmo_Landing_page",
    Live: "https://kasmo-landing-page.vercel.app/",
    Image: "/projects-img/KasmoApp.png",
  },
  {
    id: "3",
    Title: "API Weather App",
    Description:
      "A modern weather forecasting app that fetches real-time data from an API. The app features location search, detailed weather metrics, and a clean UI for quick insights.",
    Features: [
      "Real-time API integration",
      "City-based weather search",
      "Temperature, humidity, and wind data",
      "User-friendly responsive design",
    ],
    TechStack: ["React", "JavaScript", "CSS", "API"],
    Github: "https://github.com/AbdulRehman938/API-Weather-APP",
    Live: "https://api-weather-app-ten.vercel.app/",
    Image: "/projects-img/WeatherApp.png",
  },
  {
    id: "4",
    Title: "Countries Info Page",
    Description:
      "Displays detailed information about countries using REST APIs. The project includes search and filtering features with a focus on performance and accessibility.",
    Features: [
      "Search and filter countries",
      "Dark/light mode toggle",
      "RESTful API integration",
      "Responsive cards and layout",
    ],
    TechStack: ["React", "JavaScript", "Tailwind", "API"],
    Github: "https://github.com/AbdulRehman938/Countries-info",
    Live: "https://countries-info-coral.vercel.app/",
    Image: "/projects-img/Countries-info.png",
  },
  {
    id: "5",
    Title: "Speechify App Clone",
    Description:
      "A working clone of the Speechify text-to-speech app that allows users to input text and hear it read out loud. Designed for accessibility and enhanced user engagement.",
    Features: [
      "Text-to-speech conversion",
      "Voice and speed selection",
      "Play/pause playback control",
      "Smooth and clean UI design",
    ],
    TechStack: ["Next.js", "React", "Tailwind", "JavaScript"],
    Github: "https://github.com/AbdulRehman938/Speechify2",
    Live: "https://speechify2.vercel.app/",
    Image: "/projects-img/SpeechifyApp.png",
  },
];

const TECH_ICONS = {
  React: Globe,
  Tailwind: Layout,
  Express: Cpu,
  Python: Code,
  JavaScript: Code,
  HTML: Code,
  CSS: Code,
  Vite: Package,
  API: Code,
  default: Package,
};

const TechBadge = ({ tech }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS["default"];
  return (
    <div className="group relative overflow-hidden px-3 py-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 cursor-default">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
      <div className="relative flex items-center gap-2">
        <Icon className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
        <span className="text-sm font-medium text-blue-300/90 group-hover:text-blue-200 transition-colors">
          {tech}
        </span>
      </div>
    </div>
  );
};

const FeatureItem = ({ feature }) => (
  <li className="group flex items-start space-x-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10">
    <div className="relative mt-2">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
      <div className="relative w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 group-hover:scale-125 transition-transform duration-300" />
    </div>
    <span className="text-base text-gray-300 group-hover:text-white transition-colors">
      {feature}
    </span>
  </li>
);

const ProjectStats = ({ project }) => {
  const techStackCount = project?.TechStack?.length || 0;
  const featuresCount = project?.Features?.length || 0;
  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-[#0a0a1a] rounded-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 opacity-50 blur-2xl z-0" />
      <div className="relative z-10 flex items-center space-x-3 bg-white/5 p-3 rounded-lg border border-blue-500/20 hover:scale-105 hover:border-blue-500/50 hover:shadow-lg transition-all">
        <div className="bg-blue-500/20 p-2 rounded-full">
          <Code2 className="text-blue-300 w-5 h-5" strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="text-xl font-semibold text-blue-200">{techStackCount}</div>
          <div className="text-xs text-gray-400">Technologies</div>
        </div>
      </div>
      <div className="relative z-10 flex items-center space-x-3 bg-white/5 p-3 rounded-lg border border-purple-500/20 hover:scale-105 hover:border-purple-500/50 hover:shadow-lg transition-all">
        <div className="bg-purple-500/20 p-2 rounded-full">
          <Layers className="text-purple-300 w-5 h-5" strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="text-xl font-semibold text-purple-200">{featuresCount}</div>
          <div className="text-xs text-gray-400">Key Features</div>
        </div>
      </div>
    </div>
  );
};

const handleGithubClick = (githubLink) => {
  if (githubLink === "Private") {
    Swal.fire({
      icon: "info",
      title: "Source Code Private",
      text: "Sorry, this project's source code is private.",
      confirmButtonText: "Got it",
      confirmButtonColor: "#3085d6",
      background: "#030014",
      color: "#ffffff",
    });
    return false;
  }
  return true;
};

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const selected = myProjects.find((p) => String(p.id) === id);
    if (selected) {
      const enhanced = {
        ...selected,
        Features: selected.Features || [],
        TechStack: selected.TechStack || [],
      };
      setProject(enhanced);
    }
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="text-center space-y-6 animate-fadeIn">
          <div className="w-24 h-24 mx-auto border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
          <h2 className="text-3xl font-bold text-white">Loading Project...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] px-[2%] py-16 overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-blue-400 hover:underline"
        >
          <ArrowLeft size={18} />
          <span>Back to Portfolio</span>
        </button>

        <img
          src={project.Image}
          alt={project.Title}
          className="rounded-xl w-full object-cover shadow-lg"
        />

        <h1 className="text-4xl font-bold text-white">{project.Title}</h1>
        <p className="text-gray-300 text-lg">{project.Description}</p>

        <ProjectStats project={project} />

        {project.TechStack.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-white text-xl font-semibold">Technologies Used:</h3>
            <div className="flex flex-wrap gap-2">
              {project.TechStack.map((tech, idx) => (
                <TechBadge key={idx} tech={tech} />
              ))}
            </div>
          </div>
        )}

        {project.Features.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-white text-xl font-semibold">Features:</h3>
            <ul className="space-y-1">
              {project.Features.map((feature, idx) => (
                <FeatureItem key={idx} feature={feature} />
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-4 pt-6">
          {project.Github && (
            <a
              href={project.Github !== "Private" ? project.Github : "#"}
              onClick={() => handleGithubClick(project.Github)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              <Github size={18} />
              <span>{project.Github === "Private" ? "Private Repo" : "GitHub"}</span>
            </a>
          )}
          {project.Live && (
            <a
              href={project.Live}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 flex items-center gap-2"
            >
              <ExternalLink size={18} />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;

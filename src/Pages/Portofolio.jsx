import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes } from "lucide-react";

const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="px-3 py-1.5 text-slate-300 hover:text-white text-sm font-medium transition-all duration-300 ease-in-out flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 hover:border-white/20 backdrop-blur-sm group relative overflow-hidden"
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform duration-300 ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}`}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const techStacks = [
  { icon: "/techstack-img/html.svg", language: "HTML" },
  { icon: "/techstack-img/css.svg", language: "CSS" },
  { icon: "/techstack-img/javascript.svg", language: "JavaScript" },
  { icon: "/techstack-img/tailwind.svg", language: "Tailwind CSS" },
  { icon: "/techstack-img/reactjs.svg", language: "ReactJS" },
  { icon: "/techstack-img/vite.svg", language: "Vite" },
  { icon: "/techstack-img/vercel.svg", language: "Vercel" },
  { icon: "/techstack-img/express.svg", language: "expressJs" },
  { icon: "/techstack-img/framer.svg", language: "framerMotion" },
  { icon: "/techstack-img/git.svg", language: "git" },
  { icon: "/techstack-img/github.svg", language: "github" },
  { icon: "/techstack-img/gsap.svg", language: "GSAP" },
  { icon: "/techstack-img/mysql.svg", language: "mySQL" },
  { icon: "/techstack-img/three.svg", language: "threeJs" },
  { icon: "/techstack-img/node.svg", language: "nodeJs" },
];

const demoProjects = [
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
    Image: "public/projects-img/DiceApp.png",
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
    Image: "public/projects-img/KasmoApp.png",
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
    Image: "public/projects-img/WeatherApp.png",
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
    Image: "public/projects-img/Countries-info.png",
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
    Image: "public/projects-img/SpeechifyApp.png",
  },
  // Add more demo projects as needed
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    AOS.init({ once: false });
    setProjects(demoProjects);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback(() => {
    setShowAllProjects((prev) => !prev);
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#10b981]">
          <span style={{
            color: '#3b82f6',
            backgroundImage: 'linear-gradient(45deg, #3b82f6 10%, #10b981 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Discover my journey as a developer through hands-on projects, certifications, and the technologies I've mastered. Each tab reflects my dedication to learning and building impactful digital experiences.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(59, 130, 246, 0.03) 0%, rgba(16, 185, 129, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background: "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(16, 185, 129, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(59, 130, 246, 0.2)",
                  "& .lucide": {
                    color: "#10b981",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />} label="Projects" {...a11yProps(0)} />
            <Tab icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />} label="Certificates" {...a11yProps(1)} />
            <Tab icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />} label="Tech Stack" {...a11yProps(2)} />
          </Tabs>
        </AppBar>

        <SwipeableViews axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={value} onChangeIndex={setValue}>
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProjects.length > 0 ? (
                displayedProjects.map((project) => (
                  <CardProject key={project.id} project={project} />
                ))
              ) : (
                <p className="text-gray-400">No projects available.</p>
              )}
            </div>
            {projects.length > initialItems && (
              <div className="flex justify-center mt-6">
                <ToggleButton
                  onClick={() => toggleShowMore("projects")}
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Certificate ImgSertif="/Certificate-img/Board.png" />
              <Certificate ImgSertif="public\Certificate-img\Meta1.png" />
              <Certificate ImgSertif="public\Certificate-img\Meta2.png" />
              <Certificate ImgSertif="public\Certificate-img\Meta3.png" />
            </div>
          </TabPanel>


          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="flex flex-wrap justify-center gap-6">
              {techStacks.map((stack, idx) => (
                <TechStackIcon key={idx} icon={stack.icon} language={stack.language} />
              ))}
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}

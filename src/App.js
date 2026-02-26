import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Section from './components/Section';
import ItemListRow from './components/ItemListRow';
import Modal from './components/Modal';
import ScrollIndicator from './components/ScrollIndicator';
import ChatInterface from './components/ChatInterface';
import Hero from './components/Hero';
import { useChapterNav } from './hooks/useChapterNav';
import { portfolioData } from './data/portfolio';

function App() {
  const { currentChapter, scrollToChapter } = useChapterNav(4);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);

  // Ensure scroll starts at the beginning on mount
  useEffect(() => {
    const container = document.getElementById('chapters-container');
    if (container) {
      container.scrollLeft = 0;
    }
  }, []);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('debugAssets') !== '1') {
      return;
    }

    const mediaRows = portfolioData.projects
      .filter((project) => project.thumbnail || project.thumbnailVideo || project.demoVideo)
      .map((project) => ({
        id: project.id,
        thumbnail: project.thumbnail || '(none)',
        thumbnailVideo: project.thumbnailVideo || '(none)',
        demoVideo: project.demoVideo || '(none)'
      }));

    console.group('[asset-debug] Portfolio media URL resolution');
    console.log('PUBLIC_URL:', process.env.PUBLIC_URL || '(empty)');
    console.table(mediaRows);
    console.groupEnd();
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#111111]">
      <Header
        name={portfolioData.intro.name}
        descriptor="Software / Analytics"
        currentChapter={currentChapter}
        totalChapters={4}
      />
      
      <Sidebar currentChapter={currentChapter} onNavigate={scrollToChapter} />
      
      <ScrollIndicator />

      <main
        id="chapters-container"
        className={`ml-[16.666667%] flex overflow-x-scroll snap-x snap-mandatory scroll-smooth h-screen ${currentChapter < 3 ? 'section-fade' : 'section-fade last-section'}`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* HOME */}
        <Section index={0}>
          <Hero />
        </Section>

        {/* PROJECTS */}
        <Section
          index={1}
          title="PROJECTS"
          subtitle="Some things I've enjoyed building."
          metadata="REV 0.3"
        >
          <div className="col-span-12 space-y-6">
            {portfolioData.projects.map((project, idx) => (
              <ItemListRow
                key={project.id}
                index={idx + 1}
                title={project.title}
                subtitle={project.how}
                tags={project.tags}
                thumbnail={project.thumbnail}
                thumbnailVideo={project.thumbnailVideo}
                thumbnailVideoStart={project.thumbnailVideoStart}
                thumbnailVideoDuration={project.thumbnailVideoDuration}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </Section>

        {/* EXPERIENCE */}
        <Section 
          index={2} 
          title="EXPERIENCE" 
          subtitle="Contexts I've worked in"
          metadata="UPDATED 2026-02-03"
        >
          <div className="col-span-12 space-y-6">
            {portfolioData.experience.map((exp, idx) => (
              <ItemListRow
                key={exp.id}
                index={idx + 1}
                title={exp.role}
                subtitle={`${exp.org} — ${exp.dates}`}
                tags={[exp.summary]}
                thumbnail={exp.logo}
                onClick={() => setSelectedExperience(exp)}
              />
            ))}
          </div>
        </Section>

        {/* CHAT */}
        <Section 
          index={3} 
          title="nateAI" 
          subtitle="Chat with nateAI, an RAG-powered chatbot trained on my portfolio, built and deployed with Vercel serverless functions."
          metadata="LIVE"
        >
          <ChatInterface />
        </Section>
      </main>

      {/* Project Modal */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title || ''}
      >
        {selectedProject && (
          <>
            <div className={`flex gap-6 mb-6 ${selectedProject.demoVideo ? 'flex-row' : 'flex-col'}`}>
              {selectedProject.demoVideo && (
                <div className="flex-shrink-0 w-1/2">
                  {console.log("MODAL VIDEO SRC:", selectedProject?.demoVideo)}
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full border border-[#111111] mb-4"
                  >
                    <source src={selectedProject.demoVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <p className="text-base">{selectedProject.how}</p>
                </div>
              )}
              <div className={`${selectedProject.demoVideo ? 'w-1/2' : 'w-full'}`}>
                <div className="mb-4">
                  <h3 className="text-sm font-mono mb-2 uppercase">Why</h3>
                  <p className="text-base mb-4">{selectedProject.why || selectedProject.impact}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-sm font-mono mb-2 uppercase">Details</h3>
                  <ul className="space-y-2">
                    {selectedProject.details.map((detail, idx) => (
                      <li key={idx} className="flex text-sm">
                        <span className="mr-3">—</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {selectedProject.stack && selectedProject.stack.length > 0 && (
                  <div>
                    <h3 className="text-sm font-mono mb-2 uppercase">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.stack.map((tech, idx) => (
                        <span key={idx} className="text-xs font-mono px-3 py-1 border border-[#111111]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-4 pt-4 border-t border-[#111111]">
              {selectedProject.links.github && (
                <a
                  href={selectedProject.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#111111] px-6 py-3 hover:bg-[#111111] hover:text-[#f7f7f5] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2D5016]"
                >
                  VIEW CODE
                </a>
              )}
              {selectedProject.links.live && (
                <a
                  href={selectedProject.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#111111] px-6 py-3 hover:bg-[#111111] hover:text-[#f7f7f5] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2D5016]"
                >
                  VIEW LIVE
                </a>
              )}
            </div>
          </>
        )}
      </Modal>

      {/* Experience Modal */}
      <Modal
        isOpen={!!selectedExperience}
        onClose={() => setSelectedExperience(null)}
        title={selectedExperience?.role || ''}
      >
        {selectedExperience && (
          <>
            <div className="mb-6">
              <p className="text-lg mb-2">{selectedExperience.org}</p>
              <p className="text-base text-gray-600 mb-4">{selectedExperience.dates}</p>
              <p className="text-base italic">{selectedExperience.summary}</p>
            </div>
            {selectedExperience.overview && (
              <div className="mb-4">
                <h3 className="text-sm font-mono mb-3 uppercase">Overview</h3>
                <p className="text-sm">{selectedExperience.overview}</p>
              </div>
            )}
            {selectedExperience.whatIBuilt && selectedExperience.whatIBuilt.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-mono mb-3 uppercase">What I Built</h3>
                <ul className="space-y-2">
                  {selectedExperience.whatIBuilt.map((item, idx) => (
                    <li key={idx} className="flex text-sm">
                      <span className="mr-3">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {selectedExperience.impact && selectedExperience.impact.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-mono mb-3 uppercase">Impact</h3>
                <ul className="space-y-2">
                  {selectedExperience.impact.map((item, idx) => (
                    <li key={idx} className="flex text-sm">
                      <span className="mr-3">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {selectedExperience.stack && selectedExperience.stack.length > 0 && (
              <div>
                <h3 className="text-sm font-mono mb-3 uppercase">Technologies & Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedExperience.stack.map((tech, idx) => (
                    <span key={idx} className="text-xs font-mono px-3 py-1 border border-[#111111]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </Modal>
    </div>
  );
}

export default App;

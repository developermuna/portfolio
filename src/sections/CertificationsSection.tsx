import FadeIn from '../components/FadeIn';

const certifications = [
  {
    title: 'Full-Stack Web Development',
    issuer: 'Coursera / Meta',
    date: '2023',
    description: 'Comprehensive certification covering front-end and back-end development, responsive design, and database management.',
  },
  {
    title: 'Advanced React Patterns',
    issuer: 'Frontend Masters',
    date: '2023',
    description: 'Deep dive into advanced React concepts, performance optimization, and custom hooks architecture.',
  },
  {
    title: 'Cloud Computing Fundamentals',
    issuer: 'AWS Training',
    date: '2022',
    description: 'Foundational knowledge of cloud concepts, core services, security, architecture, pricing, and support.',
  }
];

const CertificationsSection = () => {
  return (
    <section
      id="certifications"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]
        -mt-10 sm:-mt-12 md:-mt-14 relative z-40
        py-12 sm:py-20 md:py-32"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase text-center leading-none tracking-tight
            mb-12 sm:mb-20 md:mb-28 px-5"
          style={{ fontSize: 'clamp(2rem, 5vw, 60px)' }}
        >
          Achievements
        </h2>
      </FadeIn>

      {/* Horizontal scroll on mobile, Grid on tablet+ */}
      <div className="max-w-6xl mx-auto flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 pb-8 md:pb-0 px-6 sm:px-10 md:px-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {certifications.map((cert, i) => (
          <FadeIn key={i} delay={i * 0.1} y={30} className="flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-auto snap-center">
            <div className="bg-[#D7E2EA]/5 border border-[#D7E2EA]/10 rounded-3xl p-6 sm:p-8 h-full flex flex-col gap-4 hover:bg-[#D7E2EA]/10 transition-colors duration-300">
              <div className="flex justify-between items-start gap-4">
                <span className="text-[#D7E2EA]/50 font-medium tracking-widest uppercase text-xs sm:text-sm">
                  {cert.date}
                </span>
                <span className="bg-[#D7E2EA]/10 text-[#D7E2EA] px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                  {cert.issuer}
                </span>
              </div>
              <h3 className="text-[#D7E2EA] font-semibold text-lg sm:text-xl md:text-2xl uppercase tracking-wide mt-2">
                {cert.title}
              </h3>
              <p className="text-[#D7E2EA]/60 font-light leading-relaxed flex-grow text-sm sm:text-base">
                {cert.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default CertificationsSection;

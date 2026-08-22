import FadeIn from '../components/FadeIn';

const skills = [
  'HTML5',
  'CSS3',
  'JavaScript (ES6+)',
  'React.js',
  'Node.js',
  'Express.js',
  'MongoDB',
  'Supabase',
  'Tailwind CSS',
  'TypeScript',
  'Framer Motion',
  'Git / GitHub',
];

const SkillsSection = () => {
  return (
    <section
      id="skills"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]
        -mt-10 sm:-mt-12 md:-mt-14 relative z-20
        px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="text-[#0C0C0C] font-black uppercase text-center leading-none tracking-tight
            mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(2rem, 5vw, 60px)' }}
        >
          Skills & Tech
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
        {skills.map((skill, i) => (
          <FadeIn key={skill} delay={i * 0.05} y={20}>
            <div
              className="px-6 py-3 sm:px-8 sm:py-4 rounded-full border-2 border-[#0C0C0C]/10
                text-[#0C0C0C] font-medium uppercase tracking-wider
                shadow-sm hover:shadow-md transition-shadow
                hover:bg-[#0C0C0C] hover:text-white transition-colors duration-300"
              style={{ fontSize: 'clamp(0.85rem, 2vw, 1.2rem)' }}
            >
              {skill}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;

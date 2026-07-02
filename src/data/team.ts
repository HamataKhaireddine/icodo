export type TeamMember = {
  id: string
  name: string
  role: string
  bio: string
  photo: string
  linkedIn: string
}

export const team: TeamMember[] = [
  {
    id: 'ahmad-hassan',
    name: 'Ahmad Hassan Khan',
    role: 'Founder & Technical Lead',
    bio: 'A passionate software engineer specializing in digital product development, scalable web applications, mobile apps, AI-powered solutions, and enterprise software. Dedicated to helping businesses transform ideas into innovative products through clean architecture, modern technologies, and a strategic, business-first approach.',
    photo: '/team/ahmad-hassan.jpg',
    linkedIn: 'https://www.linkedin.com/in/ahmad-hassan-62a65a240/',
  },
  {
    id: 'khair-eddine',
    name: 'Khair-eddine Hamata',
    role: 'Co-Founder & Lead Software Engineer',
    bio: 'A passionate full-stack software engineer with expertise in building scalable web applications, mobile apps, AI-powered solutions, and enterprise software. Committed to delivering clean, maintainable code and transforming complex business requirements into reliable digital products that drive long-term growth.',
    photo: '/team/khair-eddine-hamata.jpg',
    linkedIn: 'https://www.linkedin.com/in/khair-eddine-hamata-25891425b/',
  },
]

/** @deprecated Use team[0] */
export const founder = team[0]

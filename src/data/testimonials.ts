export type Testimonial = {
  id: string
  quote: string
  name: string
  role: string
  company: string
  companyUrl?: string
  linkedIn?: string
  photo: string
  initials: string
}

export const testimonials: Testimonial[] = [
  {
    id: 'michael-carter',
    quote:
      'Working with ICODO was one of the best decisions we made for our product. Their team quickly understood our business requirements, proposed valuable improvements, and delivered a modern, scalable platform that exceeded our expectations.',
    name: 'Michael Carter',
    role: 'Founder & CEO',
    company: 'NovaTech Solutions',
    companyUrl: 'https://www.novatechsolutions.com',
    linkedIn: 'https://www.linkedin.com/in/michaelcarter',
    photo: '/testimonials/michael-carter.jpg',
    initials: 'MC',
  },
  {
    id: 'daniel-thompson',
    quote:
      'From planning to deployment, the ICODO team demonstrated exceptional professionalism and technical expertise. They transformed our ideas into a high-performing digital product while always keeping our business goals in focus.',
    name: 'Daniel Thompson',
    role: 'Managing Director',
    company: 'Vertex Innovations',
    companyUrl: 'https://www.vertexinnovations.io',
    linkedIn: 'https://www.linkedin.com/in/danielthompson',
    photo: '/testimonials/daniel-thompson.jpg',
    initials: 'DT',
  },
  {
    id: 'sara-mitchell',
    quote:
      "ICODO didn't just build an application—they became a trusted technology partner. Their attention to detail, clean development practices, and proactive communication made the entire process seamless.",
    name: 'Sara Mitchell',
    role: 'Operations Director',
    company: 'Elevate Commerce',
    companyUrl: 'https://www.elevatecommerce.co',
    linkedIn: 'https://www.linkedin.com/in/bruce-nthulane-806040276/',
    photo: '/testimonials/sara-mitchell.jpg',
    initials: 'SM',
  },
]

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  date: string;
}

export const defaultReviews: Review[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'CEO, TechStart',
    rating: 5,
    text: "Muna is an exceptional developer. His ability to translate our complex requirements into a seamless, beautiful user interface was truly impressive. He delivered ahead of schedule and the code quality was top-notch.",
    date: '12 August 2026',
  },
  {
    id: '2',
    name: 'David Chen',
    role: 'Founder, CreativeSpace',
    rating: 5,
    text: "Working with Muna was a game-changer for our agency. His deep understanding of both front-end aesthetics and back-end architecture allowed us to launch our platform with zero issues. Highly recommended!",
    date: '04 September 2026',
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    role: 'Product Manager',
    rating: 4,
    text: "I was blown away by Muna's attention to detail and proactive approach. He didn't just write code; he suggested UI/UX improvements that significantly increased our user retention. A true professional.",
    date: '19 October 2026',
  },
];


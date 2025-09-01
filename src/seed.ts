import config from "next/config"
import { getPayload } from "payload"

const categories = [
  {
    name: "All",
    slug: "all",
    subcategories:[
      { name: "Business & Money",
    slug: "business-money",},
    {
      name: "Software Development",
    slug: "software-development",
    },
    {
            name: "Writing & Publishing",
    slug: "writing-publishing",
    },
    {
      name: "Education",
    slug: "education",
    },
    {
       name: "Self Improvement",
    slug: "self-improvement",
    },
    {
      name: "Fitness & Health",
    slug: "fitness-health",
    },
    {
      name: "Music",
    slug: "music",
    },
    {
       name: "Drawing & Painting",
    slug: "drawing-painting",
    },
    {
      name: "Photography",
    slug: "photography",
    }


    ]
  },
  {
    name: "Business & Money",
    slug: "business-money",
    color: "#FFB347",
    subcategories: [
      { name: "Accounting", slug: "accounting" },
      {
        name: "Entrepreneurship",
        slug: "entrepreneurship",
      },
      { name: "Gigs & Side Projects", slug: "gigs-side-projects" },
      { name: "Investing", slug: "investing" },
      { name: "Management & Leadership", slug: "management-leadership" },
      {
        name: "Marketing & Sales",
        slug: "marketing-sales",
      },
      { name: "Networking, Careers & Jobs", slug: "networking-careers-jobs" },
      { name: "Personal Finance", slug: "personal-finance" },
      { name: "Real Estate", slug: "real-estate" },
    ],
  },
  {
    name: "Software Development",
    slug: "software-development",
    color: "#7EC8E3",
    subcategories: [
      { name: "Web Development", slug: "web-development" },
      { name: "Mobile Development", slug: "mobile-development" },
      { name: "Game Development", slug: "game-development" },
      { name: "Programming Languages", slug: "programming-languages" },
      { name: "DevOps", slug: "devops" },
    ],
  },
  {
    name: "Writing & Publishing",
    slug: "writing-publishing",
    color: "#D8B5FF",
    subcategories: [
      { name: "Fiction", slug: "fiction" },
      { name: "Non-Fiction", slug: "non-fiction" },
      { name: "Blogging", slug: "blogging" },
      { name: "Copywriting", slug: "copywriting" },
      { name: "Self-Publishing", slug: "self-publishing" },
    ],
  },
  {
    name: "Other",
    slug: "other",
  },
  {
    name: "Education",
    slug: "education",
    color: "#FFE066",
    subcategories: [
      { name: "Online Courses", slug: "online-courses" },
      { name: "Tutoring", slug: "tutoring" },
      { name: "Test Preparation", slug: "test-preparation" },
      { name: "Language Learning", slug: "language-learning" },
    ],
  },
  {
    name: "Self Improvement",
    slug: "self-improvement",
    color: "#96E6B3",
    subcategories: [
      { name: "Productivity", slug: "productivity" },
      { name: "Personal Development", slug: "personal-development" },
      { name: "Mindfulness", slug: "mindfulness" },
      { name: "Career Growth", slug: "career-growth" },
    ],
  },
  {
    name: "Fitness & Health",
    slug: "fitness-health",
    color: "#FF9AA2",
    subcategories: [
      { name: "Workout Plans", slug: "workout-plans" },
      { name: "Nutrition", slug: "nutrition" },
      { name: "Mental Health", slug: "mental-health" },
      { name: "Yoga", slug: "yoga" },
    ],
  },
  {
    name: "Design",
    color: "#B5B9FF",
    slug: "design",
    subcategories: [
      { name: "UI/UX", slug: "ui-ux" },
      { name: "Graphic Design", slug: "graphic-design" },
      { name: "3D Modeling", slug: "3d-modeling" },
      { name: "Typography", slug: "typography" },
    ],
  },
  {
    name: "Drawing & Painting",
    slug: "drawing-painting",
    color: "#FFCAB0",
    subcategories: [
      { name: "Watercolor", slug: "watercolor" },
      { name: "Acrylic", slug: "acrylic" },
      { name: "Oil", slug: "oil" },
      { name: "Pastel", slug: "pastel" },
      { name: "Charcoal", slug: "charcoal" },
    ],
  },
  {
    name: "Music",
    slug: "music",
    color: "#FFD700",
    subcategories: [
      { name: "Songwriting", slug: "songwriting" },
      { name: "Music Production", slug: "music-production" },
      { name: "Music Theory", slug: "music-theory" },
      { name: "Music History", slug: "music-history" },
    ],
  },
  {
    name: "Photography",
    slug: "photography",
    color: "#FF6B6B",
    subcategories: [
      { name: "Portrait", slug: "portrait" },
      { name: "Landscape", slug: "landscape" },
      { name: "Street Photography", slug: "street-photography" },
      { name: "Nature", slug: "nature" },
      { name: "Macro", slug: "macro" },
    ],
  },
]

const seed = async () => {
  const payload = await getPayload({config})

  for (const category of categories) {
    const parentCategory = await payload.create({
      collection: 'categories',
      data: {
        name: category.name,
        slug: category.slug,
        color: category.color ?? null,
        parent:null,
      } as any,
    })

    for (const subCategory of category.subcategories || []) {
      await payload.create({
        collection: 'categories',
         data: {
          name: subCategory.name,
          slug: subCategory.slug,
          parent: parentCategory.id,
        } as any,
      })
    }
  }
}

try {
  await seed()
  console.log('seeding complete succesfully')
  process.exit(0)
} catch (error) {
  console.error('Error mens seeding:', error)
  console.log('there is a error ')
  process.exit(1)
}
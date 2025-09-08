
interface Props {
    params: Promise<{
        category: string
    }>
}

const Page = async ({params}: Props) => {
    const {category} = await params

  return (
    <div>category: {category}</div>
  )
}

export default Page
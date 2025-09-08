
interface Props {
    params: Promise<{
        category: string
        subcategory: string
    }>
}

const Page = async ({params}: Props) => {
    const {category, subcategory} = await params

  return (
    <div>category: {category} 
    <br/>
     subcategory: {subcategory}</div>
  )
}

export default Page
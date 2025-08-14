import { useParams } from "react-router"

const CreatePage = () => {
    const {token} = useParams<{token:string}>()
  return (
    <div>CreatePage {token}</div>
  )
}

export default CreatePage
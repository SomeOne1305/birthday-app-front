import { useLoaderData, useNavigation } from 'react-router'

const VerifyPage = () => {

  const data = useLoaderData()
  const navigation = useNavigation()
  if(navigation.state == 'loading'){
    return <h1>Loading....</h1>
  }
  return (
    <h1>
      hello
    </h1>
  )
}

export default VerifyPage
import {useParams} from 'react-router-dom'

function Dashboard() {
    const {user} = useParams()


    return (
        <h1>Hi {user}</h1>
    )
}

export default Dashboard
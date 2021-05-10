import styled from 'styled-components'
import Button from '../../Buttons/Button'

const Wrapper = styled.div`
    width: 200px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
   
    align-items: center;
    padding: 10px;
`

const Profile = ({user, logout}) => {
    return (
        <Wrapper>
            <p> {user?.firstName} {user?.lastName} </p>
            <Button onClick={logout}>
                Log Out
            </Button>
        </Wrapper> 
    )
}

export default Profile
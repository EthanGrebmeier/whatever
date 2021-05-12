import styled from 'styled-components'


const Wrapper = styled.input`
    border: 2px solid black;
    margin: 0;
    background: black;
    color: black;
`

const Checkbox = ({handleChange, value}) => {

    return (
        <Wrapper type="checkbox" value={value} checked={value} onChange={handleChange}/>
    )
}

export default Checkbox
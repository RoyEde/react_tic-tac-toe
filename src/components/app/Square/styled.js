import styled from 'styled-components'

export const Square = styled.button`
align-items: center;
cursor: pointer;
display: flex;
height: 16vh;
justify-content: center;
outline: none;
transition: all .5s;
width: 16vh;
&:hover {
  background-color: ${(value) => value === null ? '#eee' : 'inherit'};
}
`

// TODO add this refactor: color: ${(value) => value ? 'red' : 'blue'};
export const SquareContent = styled.p`
font-family: Fira Mono, monospace;
font-size: 4vh;
`
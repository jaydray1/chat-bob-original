import React from 'react'
import { useQuery, gql } from '@apollo/client'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import WebFont from 'webfontloader'
//@ts-ignore
import rickMorty from '../../public/rickMorty.mp3'

const RickHeader = styled.div`
  text-align: center;
`

const RickWelcome = styled.p`
  font-size: 110px;
`

const RickSubText = styled.p`
  font-size: 20px;
`

const RickPic = styled.img`
  height: 35%;
  border-radius: 50%;
  transform: scale(1);
  transition: all 0.9s ease 0s;
  margin-top: 55px;
`

const RickName = styled.p`
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 22px;
  transition: all 0.9s ease 0s;
  color: black;
`

const RickCard = styled(Link)`
    flex: 0 1 calc(25% - 1em);
    background-color: #f7f5ec;
    cursor: pointer;
    margin: 6px;
    border-radius: 10px;
    text-decoration: none;
    height: 255px;
    outline: 3px solid limegreen;
    opacity: 1;
    :nth-child(3n + 3) {
      cursor: not-allowed;
      user-select: none;
      opacity: 0.4;
      outline: 3px solid orangered !important;
      :hover {
        cursor: not-allowed;
      }
    }
    :visited {
      color: inherit;
    }
    :hover ${RickPic} {
      box-shadow: 0 0 0 14px #f7f5ec;
      transform: scale(0.7);
    }
    :hover ${RickName} {
      line-height: normal;
      font-size: 24px;
    }
`


const RickRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: center;
  justify-content: center;
`


interface Character {
    id: number
    image: string
    name: string
}

interface CharacterListData {
    characters: {
        results: Character[]
    }
}

const GET_CHARACTERS = gql`
query {
    characters(page: 2, filter: { name: "rick" }) {
      results {
        name
        id
        image
      }
    }
  }
`

const RickMortyPage = () => {
  const audio = new Audio("./rickMorty.mp3")
    
    const { data, loading, error } = useQuery<CharacterListData>(GET_CHARACTERS)

    const start = () => {
      audio.play()
    }

    React.useEffect(() => {
      WebFont.load({
        google: {
          families: ['Liu Jian Mao Cao']
        }
      })
    }, [])

    if (loading) {
        return <div>LOADING</div>
    }

    if (error) {
        return <div>{error.message}</div>
    }
    
    return (
      <>
      <RickHeader>
        <RickWelcome style={{fontFamily: 'Liu Jian Mao Cao'}}>Welcome to Rick</RickWelcome>
        <RickSubText>Please choose the Rick with whom you need to speak.</RickSubText>
      </RickHeader>
        <RickRow>
           {data && data.characters.results.map((char) => (
             <RickCard to={`/${char.id}/${char.name}`} key={char.id}>
                  <RickPic src={`${char.image}`} alt={`${char.name}`} />
                  <RickName>{char.name}</RickName>
             </RickCard>
           ))}
        </RickRow>
      </>
    )
    }

export default RickMortyPage
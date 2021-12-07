import React from 'react'
import { useQuery, gql } from '@apollo/client'
import styled from 'styled-components'

const RickPic = styled.img`
  height: 50%;
  border-radius: 50%;
  transform: scale(1);
  transition: all 0.9s ease 0s;
`

const RickName = styled.p`
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 22px;
  transition: all 0.9s ease 0s;
`

const RickCard = styled.div`
    flex: 0 1 calc(25% - 1em);
    border: 2px solid red;
    background-color: #f7f5ec;
    cursor: pointer;
    margin: 20px;
    :hover ${RickPic} {
      box-shadow: 0 0 0 14px #f7f5ec;
      transform: scale(0.7);
    }
    :hover ${RickName} {
      line-height: normal;
      font-size: 32px;
    }
`


const RickRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: center;
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
  const [merchantName, setMerchantName] = React.useState<number>()

    const handleMerchantCardClicked = (rickId: number) => {
        setMerchantName(rickId)
    }
    
    const { data, loading, error } = useQuery<CharacterListData>(GET_CHARACTERS)

    if (loading) {
        return <div>LOADING</div>
    }

    if (error) {
        return <div>{error.message}</div>
    }
    
    return (
        <RickRow>
            These could be some things
           {data && data.characters.results.map((char) => (
               <RickCard key={char.id}> 
                  <RickPic src={`${char.image}`} alt={`${char.name}`} />
                  <RickName>{char.name}</RickName>
                  change here two two
                  {/* <p>{char.name}</p>
                  <img src={`${char.image}`} alt={`${char.name}`}/> */}
               </RickCard>
           ))}
        </RickRow>
    )
    }

export default RickMortyPage
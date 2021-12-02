import React from 'react'
import { Header, Segment } from 'semantic-ui-react'

function AccountList({ accounts }) {

  const accountsList = accounts.map(account => <MovieCard key={movie.imdbId} movie={movie} link={true} />)

  return (
    accountsList.length > 0 ? (
      <Card.Group doubling centered>
        {movieList}
      </Card.Group >
    ) : (
        <Segment padded color='blue'>
          <Header textAlign='center' as='h4'>No movies</Header>
        </Segment>
      )
  )
}

export default MovieList
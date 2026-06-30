import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { addVote } from '../reducers/anecdoteReducer'
import Notification from './Notification'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === '') {
      return anecdotes
    }
    return anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
  })
  console.log(anecdotes)
  const filter = useSelector(({ filter }) => filter)
  console.log(filter)

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  const handleVote = async (anecdote) => {
    console.log('anecdote id', anecdote.id)
    dispatch(addVote(anecdote.id))
    dispatch(showNotification(`You voted '${anecdote.content}'`, 10))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
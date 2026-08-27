import { useMemo, useState } from 'react'
import { genres, stories } from './data/stories'

function Library({ onBack, onOpenStory }) {
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('All')
  const filteredStories = useMemo(() => stories.filter((story) => {
    const q = query.trim().toLowerCase()
    return (genre === 'All' || story.genre === genre) && (!q || `${story.title} ${story.author} ${story.genre}`.toLowerCase().includes(q))
  }), [genre, query])

  return <div className="library-page">
    <header className="library-header"><button className="back-button" onClick={onBack}>← Fancy Tales</button><span className="library-label">Story Library</span><span className="library-count">{filteredStories.length} stories</span></header>
    <main className="library-content">
      <div className="library-intro"><p className="eyebrow">Find your next favourite</p><h1>Every story has<br /><em>a place here.</em></h1><p>Browse original fiction by genre, search for a title, or simply wander until a story catches your eye.</p></div>
      <div className="library-controls"><label className="large-search"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by title, author or genre..." aria-label="Search the story library" /></label><div className="genre-list" aria-label="Filter by genre">{genres.map((item) => <button className={genre === item ? 'genre-button active' : 'genre-button'} key={item} onClick={() => setGenre(item)}>{item}</button>)}</div></div>
      <div className="full-story-grid">{filteredStories.map((story, index) => <article className="library-card" key={story.id}><div className={`library-cover cover-${index % 4}`}><span>{story.status}</span><strong>{story.title}</strong><small>{story.genre}</small></div><div className="library-card-body"><div><h2>{story.title}</h2><p className="author">by {story.author}</p></div><p className="description">{story.description}</p><div className="card-footer"><span>{story.chapters} chapters</span><button onClick={() => onOpenStory(story)}>Start reading →</button></div></div></article>)}</div>
      {filteredStories.length === 0 && <div className="library-empty"><span>✦</span><h2>No stories found</h2><p>Try another title, author, or genre.</p></div>}
    </main>
  </div>
}
export default Library

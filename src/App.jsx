import { useState } from 'react'
import Library from './Library'
import { stories } from './data/stories'

function Home({ onLibrary }) {
  const [query, setQuery] = useState('')
  const featuredStories = stories.slice(0, 3)
  const filteredStories = featuredStories.filter((story) =>
    `${story.title} ${story.author}`.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="app-shell">
      <header className="site-header">
        <button className="brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="brand-mark">✦</span>
          <span>Fancy Tales</span>
        </button>
        <nav aria-label="Main navigation">
          <button onClick={onLibrary}>Library</button>
          <a href="#about">About</a>
        </nav>
        <button className="header-button" onClick={onLibrary}>Start Reading</button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Stories worth getting lost in</p>
            <h1>Open a book.<br /><em>Enter another world.</em></h1>
            <p className="hero-text">Discover original novels, heartfelt stories, and unforgettable adventures — all in one beautiful reading space.</p>
            <div className="hero-actions">
              <button className="primary-button" onClick={onLibrary}>Explore the library <span>→</span></button>
              <a className="text-link" href="#featured">View featured stories</a>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="book-glow" />
            <div className="open-book"><span>F</span><span>T</span></div>
            <div className="floating-note note-one">✧</div>
            <div className="floating-note note-two">❋</div>
          </div>
        </section>

        <section className="library-section" id="featured">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Your next adventure</p>
              <h2>Featured stories</h2>
            </div>
            <label className="search-box">
              <span>⌕</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search stories..." aria-label="Search stories" />
            </label>
          </div>
          <div className="story-grid">
            {filteredStories.map((story) => (
              <article className="story-card" key={story.id}>
                <div className="cover"><span>{story.status}</span><strong>{story.title}</strong></div>
                <div className="story-info">
                  <h3>{story.title}</h3>
                  <p>by {story.author}</p>
                  <button onClick={onLibrary}>Read story →</button>
                </div>
              </article>
            ))}
            {filteredStories.length === 0 && <p className="empty-state">No stories found.</p>}
          </div>
          <button className="library-link" onClick={onLibrary}>Browse the full library →</button>
        </section>

        <section className="about-section" id="about">
          <p className="eyebrow">Made for readers & writers</p>
          <h2>A little corner for stories that deserve to be remembered.</h2>
          <p>Fancy Tales is being built as a welcoming home for original fiction, curious readers, and the authors behind the stories.</p>
        </section>
      </main>

      <footer><span>✦ Fancy Tales</span><span>Read. Imagine. Remember.</span></footer>
    </div>
  )
}

function App() {
  const [page, setPage] = useState('home')
  return page === 'library' ? <Library onBack={() => setPage('home')} /> : <Home onLibrary={() => setPage('library')} />
}

export default App

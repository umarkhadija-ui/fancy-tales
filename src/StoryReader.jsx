import { useState } from 'react'
import { chapters } from './data/chapters'

export default function StoryReader({ story, onBack }) {
  const storyChapters = chapters[story.id] ?? []
  const [chapterIndex, setChapterIndex] = useState(0)
  const chapter = storyChapters[chapterIndex]
  const progress = storyChapters.length ? ((chapterIndex + 1) / storyChapters.length) * 100 : 0

  return (
    <main className="reader-page">
      <header className="reader-header">
        <button className="back-button" onClick={onBack}>← Library</button>
        <span>Fancy Tales</span>
        <span>{chapterIndex + 1} / {storyChapters.length || 1}</span>
      </header>

      <div className="reader-progress"><span style={{ width: `${progress}%` }} /></div>

      <article className="reader-content">
        <p className="eyebrow">{story.genre} · {story.author}</p>
        <h1>{story.title}</h1>
        {chapter ? (
          <>
            <p className="chapter-label">Chapter {chapterIndex + 1}</p>
            <h2>{chapter.title}</h2>
            <p className="reader-text">{chapter.text}</p>
          </>
        ) : (
          <p className="reader-text">This story is being prepared for reading. Check back soon for the first chapter.</p>
        )}
      </article>

      <nav className="chapter-nav" aria-label="Chapter navigation">
        <button disabled={chapterIndex === 0} onClick={() => setChapterIndex((i) => i - 1)}>← Previous</button>
        <button disabled={chapterIndex >= storyChapters.length - 1} onClick={() => setChapterIndex((i) => i + 1)}>Next →</button>
      </nav>
    </main>
  )
}

const EpisodeCardSkeleton = () => {
  return (
    <div className="episode">
      <div className="title opacityPulse" />
      <div className="duration opacityPulse" />
      <div className="plays opacityPulse" />

      <style jsx>{`
        .title,
        .duration,
        .plays {
          background: var(--primary-20);
        }
        .episode {
          display: block;
          text-decoration: none;
          margin: 0 0.6em;
          padding: 1rem 0;
          border-bottom: var(--default-border);
        }
        .title {
          height: 16px;
          margin: 16px 0;
        }
        .duration {
          height: 12px;
          width: 65%;
          margin-bottom: 8px;
        }
        .plays {
          height: 12px;
          width: 25%;
          margin: 0;
        }
      `}</style>
    </div>
  )
}

export default EpisodeCardSkeleton

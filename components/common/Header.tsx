import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { usePlayer } from 'lib/hooks/use-player'
import IconButton from '../ui/IconButton'
import ArrowLeft from 'components/icons/ArrowLeft'
import cn from 'classnames'
import Logo from '@components/icons/Logo'
import Search from '@components/icons/Search'

type Props = {
  headerText: string
  navigation: boolean
  button: React.ReactNode
}

const Header = ({ headerText, navigation = true, button = null }: Props) => {
  const router = useRouter()

  const { current } = usePlayer()

  const [isShowed, setIsShowed] = useState(false)

  const fixNavigation = () => {
    if (window.scrollY > 110) {
      setIsShowed(true)
    } else {
      setIsShowed(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', fixNavigation)
    return () => {
      window.removeEventListener('scroll', fixNavigation)
    }
  }, [])

  return (
    <header
      className={cn({ ['playing']: current, ['home']: router.route === '/' })}
    >
      {navigation && (
        <IconButton
          onClick={() => router.back()}
          ariaLabel="Go back"
          className="back-btn"
        >
          <ArrowLeft />
        </IconButton>
      )}

      {headerText ? (
        <p className={cn('title', { ['show']: isShowed })}>{headerText}</p>
      ) : (
        <div className="logo">
          <Logo style={{ marginRight: '0.4rem' }} />
          Podcasts
        </div>
      )}

      {button ? (
        button
      ) : (
        <IconButton
          onClick={() => router.push('/search')}
          ariaLabel="Go to search"
        >
          <Search />
        </IconButton>
      )}

      <style jsx>{`
        header {
          z-index: 100;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 0.8rem;
          background: var(--white);
          height: 3.5rem;
        }
        header > :global(.back-btn) {
          position: absolute;
          left: 0.5rem;
        }
        header > :global(:last-child) {
          position: absolute;
          right: 0.5rem;
        }
        .title {
          margin: 0;
          font-size: var(--font-md);
          font-weight: bold;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          max-width: 65%;
          opacity: 0;
          transform: translateY(6px);
          transition-property: opacity, transform;
          transition-duration: 0.2s;
        }
        .title.show {
          opacity: 1;
          transform: translateY(2px);
        }
        .logo {
          position: absolute;
          left: 0;
          padding: 0.8rem;
          font-weight: bold;
          font-size: var(--font-2xl);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        @media screen and (min-width: 766px) {
          header {
            padding: 0 1.5rem;
          }
          .title {
            font-size: var(--font-md);
          }
          header.playing > :global(.back-btn) {
            left: 1.5rem;
          }
          .logo {
            font-size: var(--font-xl);
            margin-left: 1rem;
          }
        }
        @media screen and (min-width: 1024px) {
          header.playing {
            padding: 0 21rem 0 1.5rem;
          }
          header.playing > :global(:last-child) {
            right: 21.5rem;
          }
          .home > :global(:last-child) {
            right: 9.5rem;
          }
          .home .logo {
            margin-left: 10.5rem;
          }
          .home.playing .logo {
            margin-left: 2.5rem;
          }
        }
        @media screen and (min-width: 1440px) {
          header.playing {
            padding: 0 23rem 0 1.5rem;
          }
          header.playing > :global(:last-child) {
            right: 23.5rem;
          }
          .home > :global(:last-child) {
            right: 12.5rem;
          }
          .home .logo {
            margin-left: 12.5rem;
          }
        }
      `}</style>
    </header>
  )
}

export default Header

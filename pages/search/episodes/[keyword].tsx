import Layout from 'components/common/Layout'
import PageTitle from '@components/ui/PageTitle'
import { useRouter } from 'next/router'
import { useFetch } from 'lib/hooks/use-fetch'
import ClearSearchButton from 'components/search/ClearSearchButton'
import EpisodesList from '@components/episodes/EpisodesList'
import SearchErrorMessage from 'components/search/SearchErrorMessage'
import { getEpisodesSearchUrl } from 'lib/api'

export default function SeachChannel() {
  const {
    query: { keyword },
  } = useRouter()

  const episodesUrl = getEpisodesSearchUrl(keyword as string)
  const { data, isLoading } = useFetch<TEpisode[]>(episodesUrl, 'audio_clips')

  return (
    <Layout
      headerText={`"${keyword}" in search`}
      pageTitle="Search"
      button={<ClearSearchButton />}
      navigation={false}
    >
      {!isLoading && data.length === 0 ? (
        <SearchErrorMessage keyword={keyword as string} />
      ) : (
        <>
          <PageTitle title={`"${keyword}" in search`} />
          <EpisodesList
            title="All Episodes"
            episodes={data}
            loading={isLoading}
            style={{ marginTop: '1rem' }}
          />
        </>
      )}
    </Layout>
  )
}

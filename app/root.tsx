/* eslint-disable jsx-a11y/alt-text */
import { json, redirect } from '@remix-run/node'

import {
  Form,
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetcher,
  useLoaderData,
  useNavigation,
  useSubmit,
} from '@remix-run/react'

import frame from './images/frame.webp'
import logo from './images/icons/logo-ff.svg'
import read from './images/icons/read.svg'

import type {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunctionArgs,
} from '@remix-run/node'

import appStylesHref from './app.css'

import {
  createEmptyArticle,
  updateArticle,
  getArticles,
  ArticleRecord,
} from './data'

import invariant from 'tiny-invariant'

import { useEffect } from 'react'

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.articleId, 'Missing articleId param')
  const article = await createEmptyArticle()
  const formData = await request.formData()
  return updateArticle(params.articleId, {
    favorite: formData.get('favorite') === 'true',
  })
}

/* export const action = async () => {
  const article = await createEmptyArticle()
  return redirect(`/articles/${article.id}/edit`)
} */

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: appStylesHref },
]

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const q = url.searchParams.get('q')
  const articles = await getArticles(q)
  return json({ articles, q })
}

export default function App() {
  const { articles, q } = useLoaderData<typeof loader>()
  const navigation = useNavigation()
  const submit = useSubmit()
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('q')

  useEffect(() => {
    const searchField = document.getElementById('q')
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || ''
    }
  }, [q])

  /* useEffect(() => {
    const scroller = document.querySelector('.scroller')
    scroller.addEventListener('scroll', handleScroll)

    return () => scroller.removeEventListener('scroll', handleScroll)
  }, []) */

  const handleScroll = (event) => {
    const scroller2 = document.querySelector('.scroller-lg')
    const scrollPos = Math.round((event.currentTarget.scrollLeft / 85.5) * 438)
    scroller2.scrollTo({
      left: scrollPos,
      behavior: 'smooth',
    })
    const scrollerHeader = document.querySelector('.read')
    const scrollPosHeader = Math.round(
      (event.currentTarget.scrollLeft / 85.5) * 108
    )
    scrollerHeader.scrollTo({
      left: scrollPosHeader,
      behavior: 'smooth',
    })
    //const primaryImageId = document.querySelector('.scroller img').id
  }

  return (
    <html lang="de">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body>
        <div id="page-wrapper">
          <header>
            <img id="logo" src={logo} alt="logo" />
            <div className="read">
              {articles.map((article) => (
                <NavLink
                  key={article.index}
                  className={({ isActive, isPending }) =>
                    isActive ? 'active' : isPending ? 'pending' : ''
                  }
                  className={navigation.state === 'loading' ? 'loading' : ''}
                  to={`articles/${article.page}#detail`}
                >
                  <img src={read} /> {article.page}
                </NavLink>
              ))}
            </div>
            <div className="edition">
              <span>{articles[0].edition}</span>
            </div>
          </header>
          <div>
            <Form
              id="search-form"
              onChange={(event) => {
                const isFirstSearch = q === null
                submit(event.currentTarget, {
                  replace: !isFirstSearch,
                })
              }}
              role="search"
            >
              <input
                id="q"
                aria-label="Search articles"
                className={searching ? 'loading' : ''}
                defaultValue={q || ''}
                placeholder="Search"
                type="search"
                name="q"
              />
              <div id="search-spinner" aria-hidden hidden={!searching} />
            </Form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>

          <nav id="tn">
            {articles.length ? (
              <ul className="scroller" onScroll={handleScroll}>
                {articles.map((article) => (
                  <li key={article.index}>
                    <NavLink
                      className={({ isActive, isPending }) =>
                        isActive ? 'active' : isPending ? 'pending' : ''
                      }
                      to={`articles/${article.page}#detail`}
                    >
                      {article.page ? (
                        <img
                          alt={`${article.author} ${article.title} articleImage`}
                          key={article.articleImage}
                          src={article.articleImage}
                          id={article.index}
                        />
                      ) : (
                        <i>No Name</i>
                      )}{' '}
                      {article.favorite ? <span></span> : null}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No articles</i>
              </p>
            )}
          </nav>

          <nav id="lg">
            {articles.length ? (
              <ul className="scroller-lg">
                {articles.map((article) => (
                  <li key={article.index}>
                    <NavLink
                      className={({ isActive, isPending }) =>
                        isActive ? 'active' : isPending ? 'pending' : ''
                      }
                      to={`articles/${article.page}#detail`}
                    >
                      {article.page ? (
                        <img
                          alt={`${article.author} ${article.title} articleImage`}
                          key={article.articleImage}
                          src={article.articleImage}
                          id={article.index}
                          width={390}
                          height={453}
                        />
                      ) : (
                        <i>No Name</i>
                      )}{' '}
                      {article.favorite ? <span></span> : null}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No articles</i>
              </p>
            )}
          </nav>
        </div>

        <div
          className={
            navigation.state === 'loading' && !searching ? 'loading' : ''
          }
          id="detail"
        >
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
const Favorite: FunctionComponent<{
  article: Pick<ArticleRecord, 'favorite'>
}> = ({ article }) => {
  const fetcher = useFetcher()
  const favorite = article.favorite

  return (
    <fetcher.Form method="post">
      <button
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        name="favorite"
        value={favorite ? 'false' : 'true'}
      >
        {favorite ? '★' : '☆'}
      </button>
    </fetcher.Form>
  )
}

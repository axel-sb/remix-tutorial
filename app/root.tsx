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

import Article from './routes/articles.$articleId'

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
  getArticle,
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
    const scrollPos = Math.round((event.currentTarget.scrollLeft / 84.2) * 438)
    scroller2.scrollTo({
      left: scrollPos,
      behavior: 'smooth',
    })
    const scrollerHeader = document.querySelector('.read')
    const scrollerHeaderLink = document.querySelector(
      '#page-wrapper>header>div.read>a.active'
    )
    const scrollPosHeader = Math.round(
      (event.currentTarget.scrollLeft / 84.2) * 283.5
    )
    scrollerHeader.scrollTo({
      left: scrollPosHeader,
      behavior: 'smooth',
    })
    scrollerHeaderLink.style.opacity = '1' // computedStyleMap.
  }

  const handleClick = (event) => {
    const articleText = document.querySelector('#detail')
    articleText.style.opacity = '1'
    articleText.style.display = 'block'
    articleText.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const hide = (event) => {
    const articleText = document.querySelector('#detail')
    articleText.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    articleText.style.opacity = '0'
    articleText.style.display = 'none'
  }

  return (
    <html lang="de">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>*</title>
        <Links />
        <Meta />
      </head>

      <body>
        <div id="page-wrapper" onClick={handleClick}>
          <header>
            <img id="logo" src={logo} alt="logo" />

            {/* pageName and title  _______________________________________________
             */}
            <div className="read">
              {articles.map((article) => (
                <NavLink
                  key={article.articleImage}
                  className={({ isActive, isPending }) =>
                    isActive ? 'active' : isPending ? 'pending' : ''
                  }
                  to={`articles/${article.page}#detail`}
                >
                  <div className="mainWrapper">
                    <div className="pageNameWrapper">{article.page}</div>
                    <div className="iconWrapper">
                      {/* svg _________________________________________________________*/}
                      <svg
                        height="100%"
                        strokeMiterlimit="10"
                        version="1.1"
                        viewBox="0 0 28.8066 34.2094"
                        width="100%"
                        xmlSpace="preserve"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs />
                        <clipPath id="ArtboardFrame">
                          <rect height="34.2094" width="28.8066" x="0" y="0" />
                        </clipPath>
                        <g clipPath="url(#ArtboardFrame)" id="Untitled">
                          <g opacity="1">
                            <path
                              d="M1 0L29.8066 0L29.8066 0L29.8066 34.2094L29.8066 34.2094L1 34.2094L1 34.2094L1 0L1 0Z"
                              fill="#000000"
                              fillRule="nonzero"
                              opacity="0"
                              stroke="none"
                            />
                            <path
                              d="M26.4894 8.23224L26.4894 28.394C26.4894 31.2278 25.0793 32.6379 22.2862 32.6379L12.8108 32.6379C15.1194 32.3148 17.5182 31.8356 20.1982 31.0922C22.9506 30.3058 24.2116 28.5432 24.2116 25.384L24.2116 5.53406C24.2116 5.07403 24.1765 4.64001 24.1048 4.23684C25.6909 4.76585 26.4894 6.09979 26.4894 8.23224Z"
                              fill="#000000"
                              fillRule="nonzero"
                              opacity="1"
                              stroke="none"
                            />
                            <path
                              d="M1.96174 27.9737C1.96174 30.3329 3.42608 31.5532 5.93443 31.4041C10.4902 31.16 14.5171 30.7397 19.6965 29.316C21.6219 28.7737 22.3675 27.7568 22.3675 25.384L22.3675 5.53406C22.3675 2.83587 20.9169 1.52068 18.3136 2.13082C14.5171 2.98502 10.4902 3.66296 5.60903 3.94769C3.41252 4.08327 1.96174 5.33068 1.96174 7.78481L1.96174 27.9737ZM4.14469 27.5805L4.14469 7.73057C4.14469 6.59164 4.84973 6.1442 5.86665 6.08996C10.5308 5.84591 14.4764 5.16797 18.1915 4.32733C19.4525 4.0426 20.1847 4.69342 20.1847 5.9137L20.1847 25.3027C20.1847 26.5501 19.7643 27.1059 18.7203 27.3772C14.4764 28.5567 10.5308 28.9906 6.02935 29.2211C4.84973 29.2753 4.14469 28.6788 4.14469 27.5805Z"
                              fill="#000000"
                              fillRule="nonzero"
                              opacity="1"
                              stroke="none"
                            />
                            <path
                              d="M8.06836 10.8362C11.9375 10.5901 15.0547 10.0569 18.2402 9.34592C18.8691 9.2092 19.0195 8.89475 19.0195 8.51194C19.0195 8.08811 18.6914 7.71897 18.0898 7.84202C15.0547 8.51194 11.9375 9.05881 8.06836 9.30491C7.52148 9.34592 7.27539 9.67405 7.27539 10.0979C7.27539 10.5354 7.60352 10.8635 8.06836 10.8362ZM8.06836 15.2385C11.9375 14.9924 15.0547 14.4455 18.2402 13.7483C18.8691 13.6115 19.0195 13.2971 19.0195 12.9143C19.0195 12.4905 18.6914 12.1213 18.0898 12.2444C15.0547 12.9143 11.9375 13.4612 8.06836 13.7072C7.52148 13.7483 7.27539 14.0764 7.27539 14.4865C7.27539 14.924 7.60352 15.2658 8.06836 15.2385ZM8.06836 19.6408C11.9375 19.3947 15.0547 18.8479 18.2402 18.1506C18.8691 18.0139 19.0195 17.6994 19.0195 17.3166C19.0195 16.8928 18.6914 16.5237 18.0898 16.6467C15.0547 17.3166 11.9375 17.8635 8.06836 18.1096C7.52148 18.1506 7.27539 18.4787 7.27539 18.8889C7.27539 19.3264 7.60352 19.6682 8.06836 19.6408ZM8.06836 24.0295C10.3105 23.9065 11.8008 23.6877 13.2773 23.4553C13.7285 23.3733 13.9746 23.0178 13.9746 22.6623C13.9746 22.2522 13.6465 21.8557 13.0312 21.9651C11.7188 22.1701 10.2695 22.3752 8.06836 22.4983C7.52148 22.5393 7.27539 22.8674 7.27539 23.2776C7.27539 23.7151 7.60352 24.0569 8.06836 24.0295Z"
                              fill="#000000"
                              fillRule="nonzero"
                              opacity="0"
                              stroke="none"
                            />
                          </g>
                          {/*{' '}
                          <text
                            id="pageNum"
                            fill="#000000"
                            fontFamily="Impact"
                            fontSize="14"
                            opacity=".4 "
                            stroke="none"
                            textAnchor="middle"
                            transform="matrix(1, -0.122785, -2.44929e-16, 1, 0, 0)"
                            x="0"
                            y="0"
                          >
                            <tspan textLength="15" x="14.40" y="30">
                              00
                            </tspan>
                          </text>{' '}
                          */}
                        </g>
                      </svg>{' '}
                    </div>
                  </div>
                  <div className="titleWrapper"> {article.title}</div>
                </NavLink>
              ))}
            </div>

            <div id="edition">
              <div>29. Jahrgang</div>
              <div>{articles[0].editionName}</div>
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
          {/* 
          thumbnails_______________________________________________
          */}
          <nav id="tn">
            {articles.length ? (
              <ul className="scroller" onScroll={handleScroll}>
                {articles.map((article) => (
                  <li key={article.articleImage}>
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

          {/*  scroller large _________________________________________
           */}
          <nav id="lg">
            {articles.length ? (
              <ul className="scroller-lg">
                {articles.map((article) => (
                  <li key={article.articleImage}>
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

        {/* detail page ________________________________ */}
        <div
          className={
            navigation.state === 'loading' && !searching ? 'loading' : ''
          }
          id="detail"
          onClick={hide}
        >
          <Outlet />
        </div>
        {/* #endregion */}
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

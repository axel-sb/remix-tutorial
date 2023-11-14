import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Form, useLoaderData, useNavigate } from '@remix-run/react'
import invariant from 'tiny-invariant'

import { getArticle, updateArticle } from '../data'

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.articleId, 'Missing articleId param')
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  console.log(
    '❦   ⸺▶︎   action   ⸺▶︎   Object.fromEntries(formData):',
    Object.fromEntries(formData)
  )
  await updateArticle(params.articleId, updates)
  return redirect(`/articles/${params.articleId}`)
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.articleId, 'Missing articleId param')
  const article = await getArticle(params.articleId)
  if (!article) {
    throw new Response('Not Found', { status: 404 })
  }
  return json({ article })
}

export default function EditArticle() {
  const { article } = useLoaderData<typeof loader>()
  const navigate = useNavigate()

  return (
    <Form id="article-form" method="post">
      <p>
        <span>Name</span>
        <input
          defaultValue={article.author}
          aria-label="First name"
          name="author"
          type="text"
          placeholder="First"
        />
        <input
          aria-label="Last name"
          defaultValue={article.title}
          name="title"
          placeholder="Last"
          type="text"
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          defaultValue={article.articleContent}
          name="articleContent"
          placeholder="@jack"
          type="text"
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          aria-label="Avatar URL"
          defaultValue={article.articleImage}
          name="articleImage"
          placeholder="https://example.com/articleImage.jpg"
          type="text"
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea defaultValue={article.notes} name="notes" rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button onClick={() => navigate(-1)} type="button">
          Cancel
        </button>
      </p>
    </Form>
  )
}

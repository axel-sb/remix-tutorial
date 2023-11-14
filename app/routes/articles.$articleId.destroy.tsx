import type { ActionFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import invariant from 'tiny-invariant'

import { deleteArticle } from '../data'

export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(params.articleId, 'Missing articleId param')
  await deleteArticle(params.articleId)
  return redirect('/')
}

import React, { lazy } from 'react'
import { Switch, Route } from 'react-router-dom'

const Header = lazy(() => import('./Header'))
const Posts = lazy(() => import('./Posts'))
const Post = lazy(() => import('./Post'))
const Portofolio = lazy(() => import('./Portofolio'))

export default function Home() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' children={<Posts />} />
        <Route path='/portofolio' children={<Portofolio />} />
        <Route path='/post/:id' children={<Post />} />
      </Switch>
    </div>
  )
}
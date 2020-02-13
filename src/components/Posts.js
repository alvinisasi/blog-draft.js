import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import firebase from '../firebase.js'
import { EditorState, convertFromRaw } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import createImagePlugin from 'draft-js-image-plugin'
import styled from 'styled-components'
import '../styles.css'

const imagePlugin = createImagePlugin()

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 8px;
  margin: 16px;

  @media(max-width: 768px){
    flex-direction: column;
  }
`
const Card = styled.div`
  text-decoration: none;
  color: #eee;
  border-radius: 16px;
  -webkit-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1);
  -moz-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1);
  box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin: 8px;
  height: 500px;
  overflow: hidden;
  background: -webkit-linear-gradient(rgba(0,0,0,1) 0%, rgba(92,91,73,1) 60%, rgba(238,238,238,1) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: 0.3s;

  h1 {
    text-decoration: none;
  }

  &:before, &:after {
    -webkit-box-shadow:0 0 20px rgba(0,0,0,0.8);
    -moz-box-shadow:0 0 20px rgba(0,0,0,0.8);
    box-shadow:0 0 20px rgba(0,0,0,0.8);
  }

  &:hover {
    opacity: 0.9;
  }

  @media(max-width: 768px){
    width: 100%;
  }
`

class Posts extends Component {
  constructor(props){
    super(props)
    this.ref = firebase.firestore().collection('posts')
    this.unsubscribe = null
    this.state = {
      posts: [],
      date: new Date(),
      editorState: EditorState.createEmpty()
    }
  }

  onCollectionUpdate = (querySnapshot) => {
    const posts = []
      querySnapshot.forEach((doc) => {
        //this.renderContentAsRawJs = content
        const {title, content, category, date } = doc.data()
        const postContent = EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
        posts.push({
          key: doc.id,
          doc,
          title,
          content: postContent,
          category,
          date
        })
      })
      this.setState({
        posts
      })
  }
  

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  }

  render(){
    const posts = this.state.posts
    
    const contentlist = posts.map(post => 
      
        <Card key={post.key}>
          <Link to={`/post/${post.key}`}>
          <article className='posts'>
            <div> 
              <h1 className='mt0 lh-title'>{post.title}</h1>
              <span className='f6 dark-gray i'>{post.category}</span>
              <div className="readonly-editor">
                <Editor editorState={post.content} plugins={[imagePlugin]} readOnly={true} /> 
              </div>
            </div>
            <p className="f6 lh-copy gray mv0">By <span className="ttu">Alvin Miftah</span></p>
            <time className="f6 db gray">{post.date}</time>
          </article>  
          </Link>
        </Card>
      
    )
    return(
      <Layout>
        {contentlist}
      </Layout>
    )
  }
}
 
export default Posts
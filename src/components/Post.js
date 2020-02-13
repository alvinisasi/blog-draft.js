import React, { useState, useEffect } from 'react'
import firebase from '../firebase.js'
import { EditorState, convertFromRaw } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import createImagePlugin from 'draft-js-image-plugin'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

const Layout = styled.div`
	margin: 48px 80px 48px 80px;

	@media(max-width: 768px){
		margin: 24px 48px 24px 48px;
	}
`

const imagePlugin = createImagePlugin()

export default function Post(){
	let { id } = useParams()
	const [posts, setPosts] = useState([])
	const ref = firebase.firestore().collection('posts').doc(id)

	useEffect(() => {
		const posts = []
		ref.get().then(doc => {
			console.log(doc.data()); 
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
			setPosts(posts)	
		});
	}, [])

	return(
		<Layout>
			{posts.map(post => (
				<article className='posts' key={post.key}>
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
			))}  
		</Layout>
	)
}

/*
export default class Post extends Component{
	constructor(props){
		super(props)
		this.ref = firebase.firestore().collection('posts').doc('KEpcDy32P3mZerhuQq45')
		let { id } = useParams()
    this.state = {
      posts: [],
      date: new Date(),
      editorState: EditorState.createEmpty()
    }
	}

  componentDidMount() {
		
		const posts = []
		this.ref.get().then((doc) => {
			if(doc.exist){
				const {title, content, category, date } = doc.data()
				console.log("Document data:", doc.data());
				const postContent = EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
				posts.push({
					key: doc.id,
					doc,
					title,
					content: postContent,
					category,
					date
				})
				this.setState({
					posts
				})		
			} else {
				console.log("No such document!");
			}
		}).catch(e => {
			console.log(e)
		}) 
  }

	render(){
		const post = this.state.posts
		
		return(
			<Layout>
			<h1>{ this.id }</h1>
				<article className='posts' key={post.key}>
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
			</Layout>
		) 
	}
}
*/
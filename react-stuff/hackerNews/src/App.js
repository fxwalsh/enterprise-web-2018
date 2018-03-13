import React from 'react';
import _ from 'lodash';
import api from './test/stubAPI';
import { Link } from 'react-router';

class Form extends React.Component {
  state = { title: '', link: ''};

  handleTitleChange = (e) => {
      this.setState({title: e.target.value});
  };

  handleLinkChange = (e) => {
      this.setState({link: e.target.value});
  };

  handleSubmit = (e) => {
      e.preventDefault();
      var title = this.state.title.trim();
      var link = this.state.link.trim();
      if (!title ) {
          return;
      }
      this.props.addHandler(title,link );
      this.setState({title: '', link: ''});
  };

  render() {
      return (
          <form style={{marginTop: '30px'}}>
              <h3>Add a new post</h3>
              <div className="form-group">
                  <input type="text"
                      className="form-control" placeholder="Title"
                      value={this.state.title}
                      onChange={this.handleTitleChange} ></input>
              </div>
              <div className="form-group">
                  <input type="text"
                      className="form-control" placeholder="Link"
                      value={this.state.link}
                      onChange={this.handleLinkChange} ></input>
              </div>
              <button type="submit" className="btn btn-primary"
                  onClick={this.handleSubmit} >Post</button>
          </form>
      );
  }
}

class NewsItem extends React.Component {
  handleVote = () =>  this.props.upvoteHandler(this.props.post.id);

  render() {
      let lineStyle = {
           fontSize: '20px', marginLeft: '10px'  };
      let cursor = { cursor: 'pointer' } ;
      let line ;
      if (this.props.post.link ) {
         line = <a href={this.props.post.link} >
                      {this.props.post.title} </a> ;
      } else {
         line = <span>{this.props.post.title} </span> ;
      }
      return (
        <div >
          <span className="glyphicon glyphicon-thumbs-up" 
              style={cursor} 
              onClick={this.handleVote} ></span>
          {this.props.post.upvotes}
          <span style={lineStyle} >{line}<span>
              <Link to={'/posts/' + this.props.post.id }>Comments</Link>
            </span>
          </span>
        </div>  
        );
    }
}

class NewsList extends React.Component {
  render() {
      let items = this.props.posts.map((post,index) => {
         return <NewsItem key={index} 
                          post={post} 
                          upvoteHandler={this.props.upvoteHandler}  /> ;
        } )
    return (
       <div>
          {items}
       </div>
      );
  }
}

class HackerApp extends React.Component {

  addPost = (title, link) => {   
      if (api.add(title ,link )) {  
          this.setState({});
      }
  };

  incrementUpvote = (id) => {
      api.upvote(id) ;
      this.setState({});
  };

  render() {
      var posts = _.sortBy(api.getAll(), function(post) {
          return - post.upvotes;
      }
      );
      return (
          <div >
             <NewsList posts={posts} 
                  upvoteHandler={this.incrementUpvote} />
             <Form addHandler={this.addPost}  />
          </div>
      );
  } 
}

export default HackerApp;

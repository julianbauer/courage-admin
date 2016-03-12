import './index.styl';
import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import UpdateStoryMutation from '../../mutations/UpdateStoryMutation.jsx';
import CreateStoryMutation from '../../mutations/CreateStoryMutation.jsx';
import DeleteStoryMutation from '../../mutations/DeleteStoryMutation.jsx';

export class Stories extends React.Component {
	render() {
		return (
			<div id="stories">
				<NewStory viewerId={this.props.viewer.id}/>
        {this.props.viewer.allStorys.edges.map(({node}) => (
						<Story key={node.id} viewer={this.props.viewer} story={node}/>
          )).reverse()
        }
			</div>
		)
	}
}

export class NewStory extends React.Component {
	static propTypes = {
		viewerId: PropTypes.string.isRequired,
	};

	constructor(props) {
		super(props)
		this.state = {
			popupToggled: false,
			storyTitle: "",
			storyContent: "",
			storyImageUrl: ""
		}
	}

	togglePopup() {
		if(this.state.popupToggled) {
			this.setState({
				popupToggled: false,
				storyTitle: "",
				storyContent: "",
				storyImageUrl: ""
			})
		} else {
			this.setState({popupToggled: true})
		}
	}

	onTitleChange(event) {
		this.setState({storyTitle: event.target.value});
		console.log(this.state.storyTitle)
	}

	onContentChange(event) {
		this.setState({storyContent: event.target.value});
	}

	onImageUrlChange(event) {
		this.setState({storyImageUrl: event.target.value});
	}

	submitChanges() {
		Relay.Store.commitUpdate(new CreateStoryMutation({
       viewerId: this.props.viewerId,
			 title: this.state.storyTitle,
			 content: this.state.storyContent,
			 imageUrl: this.state.storyImageUrl
     }))
		 this.setState({
			 popupToggled: false,
			 storyTitle: "",
			 storyContent: "",
			 storyImageUrl: ""
		 })
	}

	render() {
		const storyImageStyle = {
			backgroundImage: 'url(' + this.state.storyImageUrl + ')'
		}
		return (
			<div id="newStoryContainer">
				<div id="newStory" onClick={this.togglePopup.bind(this)}>
					<div className="addStory"></div>
				</div>
				{this.state.popupToggled &&
					<div id="story-popup">
						<div className="story-container">
							<div className="story">
								<div className="story-content">
									<input placeholder="Hier ein Titel" className="story-title-input" value={this.state.storyTitle} onChange={this.onTitleChange.bind(this)}/>
									<textarea placeholder="Hier noch bisschen Content" value={this.state.storyContent} onChange={this.onContentChange.bind(this)}></textarea>
									<div className="story-image-url-container">
										<input placeholder="Hier noch eine URL" className="story-image-url-input" value={this.state.storyImageUrl} onChange={this.onImageUrlChange.bind(this)} />
									</div>
								</div>
								<div className="story-image" style={storyImageStyle}></div>
							</div>
							<div className="button-group">
								<button className="cancel-button" onClick={this.togglePopup.bind(this)} >ABBRECHEN</button>
								<button className="submit-button" onClick={this.submitChanges.bind(this)}>BESTÄTIGEN</button>
							</div>
						</div>
					</div>
				}
			</div>
		)
	}
}

export class Story extends React.Component {

	static propTypes = {
		story: PropTypes.object.isRequired,
		viewer: PropTypes.object.isRequired,
	};

	constructor(props) {
		super(props)
		this.state = {
			popupToggled: false,
			storyTitle: this.props.story.title,
			storyContent: this.props.story.content,
			storyImageUrl: this.props.story.imageUrl
		}
	}

	togglePopup() {
		if(this.state.popupToggled) {
			this.setState({
				popupToggled: false,
				storyTitle: this.props.story.title,
				storyContent: this.props.story.content,
				storyImageUrl: this.props.story.imageUrl
			})
		} else {
			this.setState({popupToggled: true})
		}
	}

	onTitleChange(event) {
		this.setState({storyTitle: event.target.value});
	}

	onContentChange(event) {
		this.setState({storyContent: event.target.value});
	}

	onImageUrlChange(event) {
		this.setState({storyImageUrl: event.target.value});
	}

	submitChanges() {
		Relay.Store.commitUpdate(new UpdateStoryMutation({
       id: this.props.story.id,
			 title: this.state.storyTitle,
			 content: this.state.storyContent,
			 imageUrl: this.state.storyImageUrl
     }))
		 this.setState({popupToggled: false})
	}

	deleteStory() {
		console.log(this.props.story);
		console.log(this.props.viewer);
		Relay.Store.commitUpdate(new DeleteStoryMutation({
       story: this.props.story,
			 viewer: this.props.viewer
     }))
		 this.setState({popupToggled: false})
	}

	render() {
		const storyImageStyle = {
			backgroundImage: 'url(' + this.state.storyImageUrl + ')'
		}

		return(
			<div className="story-container">
				<article key={this.props.story.id} className="story" onClick={this.togglePopup.bind(this)}>
					<div className="story-content">
						<h1>{this.props.story.title}</h1>
						<p>{this.props.story.content}</p>
					</div>
					<div className="story-image" style={storyImageStyle}></div>
				</article>
				{this.state.popupToggled &&
					<div id="story-popup">
						<div className="story-container">
							<div className="story">
								<div className="story-content">
									<input className="story-title-input" value={this.state.storyTitle} onChange={this.onTitleChange.bind(this)}/>
									<textarea value={this.state.storyContent} onChange={this.onContentChange.bind(this)}></textarea>
									<div className="story-image-url-container">
										<input className="story-image-url-input" value={this.state.storyImageUrl} onChange={this.onImageUrlChange.bind(this)} />
									</div>
								</div>
								<div className="story-image" style={storyImageStyle}></div>
							</div>
							<div className="button-group">
								<button className="delete-button" onClick={this.deleteStory.bind(this)} >LÖSCHEN</button>
								<button className="cancel-button" onClick={this.togglePopup.bind(this)} >ABBRECHEN</button>
								<button className="submit-button" onClick={this.submitChanges.bind(this)} >BESTÄTIGEN</button>
							</div>
						</div>
					</div>
				}
			</div>
		)
	}
}

export default Relay.createContainer(Stories, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        allStorys(first: 100) {
          edges {
            node {
							id
              title
              content
							imageUrl
							${DeleteStoryMutation.getFragment('story')}
            }
          }
        }
				id
				${DeleteStoryMutation.getFragment('viewer')}
      }
    `,
  },
})

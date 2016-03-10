import './index.styl';
import React from 'react';
import Relay from 'react-relay';

export class Stories extends React.Component {

	render() {

    console.log(this.props.viewer);

		var storyImage1 = require('../../assets/images/quinta.jpg')
		var storyImage2 = require('../../assets/images/nashorn.jpg')

    var storyImageStyle1 = {
      backgroundImage: 'url(' + storyImage1 + ')'
    }

		var storyImageStyle2 = {
      backgroundImage: 'url(' + storyImage2+ ')'
    }

		return (
			<div>
        {this.props.viewer.allStorys.edges.map(({node}) => (
          <article key={node.id} className="story">
            <div className="story-content">
              <h1>{node.title}</h1>
              <p>{node.content}</p>
            </div>
            <div className="story-image" style={storyImageStyle1}></div>
          </article>
          ))
        }
			</div>
		)
	}
}

export default Relay.createContainer(Stories, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        allStorys(first: 2) {
          edges {
            node {
							id
              title
              content
            }
          }
        }
      }
    `,
  },
})

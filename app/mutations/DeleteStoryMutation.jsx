import Relay from 'react-relay';

export default class RemoveStoryMutation extends Relay.Mutation {
  static fragments = {
    story: () => Relay.QL`
      fragment on Story {
        id,
        title,
        content,
        imageUrl
      }
    `,
    viewer: () => Relay.QL`
      fragment on Viewer {
        id,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{deleteStory}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on DeleteStoryPayload {
        story {
          id
        },
        viewer {
          allStorys
        }
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'allStorys',
      deletedIDFieldName: 'story{id}',
    }];
  }
  getVariables() {
    return {
      id: this.props.story.id,
    };
  }
  // getOptimisticResponse() {
  //   return {
  //     story: { id: this.props.story.id },
  //     viewer: { id: this.props.viewer.id},
  //   };
  // }
}

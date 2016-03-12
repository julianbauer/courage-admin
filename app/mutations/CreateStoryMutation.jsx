import Relay from 'react-relay'

export default class AddFieldMutation extends Relay.Mutation {

  getMutation () {
    return Relay.QL`mutation{createStory}`
  }

  getFatQuery () {
    return Relay.QL`
      fragment on CreateStoryPayload {
        edge,
        viewer
      }
    `
  }

  getConfigs () {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewerId,
      connectionName: 'allStorys',
      edgeName: 'edge',
      rangeBehaviors: {
        '': 'append',
      },
    }]
  }

  getVariables () {
    return {
      id: this.props.id,
      title: this.props.title,
      content: this.props.content,
      imageUrl: this.props.imageUrl
    }
  }

  getOptimisticResponse() {
    return {
      edge: {
        node: {
          id: this.props.id,
          title: this.props.title,
          content: this.props.content,
          imageUrl: this.props.imageUrl
        }
      },
      viewer: {
        id: this.props.viewerId
      }
    }
  }
  static fragments = {
  };
}

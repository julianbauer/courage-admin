import Relay from 'react-relay'

export default class updateStoryMutation extends Relay.Mutation {

  getMutation () {
    return Relay.QL`mutation{updateStory}`
  }

  getFatQuery () {
    return Relay.QL`
      fragment on UpdateStoryPayload {
        story {
          title,
          content,
          imageUrl
        }
      }
    `
  }

  getConfigs () {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        story: this.props.id,
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
      story: {
        title: this.props.title,
        content: this.props.content,
        imageUrl: this.props.imageUrl
      }
    }
  }
  static fragments = {
  };
}

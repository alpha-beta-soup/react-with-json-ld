import React from 'react';
import MetaTags from 'react-meta-tags';
import JSONLD from './JSON-LD';

export default class MetaComponent extends React.Component {
  render() {
    return (
      <MetaTags>
        <title>{this.props.title}</title>
        <meta property="og:type" content="website" />
        <meta property="og:description" content={this.props.description} />
        <meta property="og:title" content={this.props.title} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content={this.props.image} />
        {
          this.props.data && <JSONLD data={this.props.data}/>
        }
      </MetaTags>
    );
  }
}

import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description,imgurl,newsUrl,author,date,source} = this.props;
    return (
      <div className="my-3">
        <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"style={{zIndex:'1' ,left:'90%' }}>{source}</span>
            <img src={!imgurl?"https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/2754AMN7Q7IB57BLL5V5J3BPYA.jpg&w=1440":imgurl} className="card-img-top" alt=""/>
            <div className="card-body">
            <h5 className="card-title">{title}
            </h5>
            <p className="card-text">{description}</p>
            <p className="card-text "><small className="text-danger fs-5">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target = "_blank" className="btn btn-sm btn btn-dark">Read More</a>
        </div>
     </div>
  </div>
    )
  }
}

export default NewsItem

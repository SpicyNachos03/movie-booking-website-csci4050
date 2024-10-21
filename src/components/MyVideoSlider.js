'use client';

import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

class MyVideoSlider extends React.Component {
  constructor() {
    super();
    this.state = {
      showPlayButton: true,
      showFullscreenButton: true,
      showGalleryPlayButton: true,
      showGalleryFullscreenButton: true,
      showVideo: {},
    };

    this.trailers = [
      {
        thumbnail: 'https://img.youtube.com/vi/2LqzF5WauAw/hqdefault.jpg',
        original: 'https://img.youtube.com/vi/2LqzF5WauAw/maxresdefault.jpg',
        embedUrl: 'https://www.youtube.com/embed/2LqzF5WauAw?autoplay=1&showinfo=0',
        description: 'Interstellar Movie - Official Trailer',
        renderItem: this._renderVideo.bind(this),
      },
      {
        thumbnail: 'https://img.youtube.com/vi/YoHD9XEInc0/hqdefault.jpg',
        original: 'https://img.youtube.com/vi/YoHD9XEInc0/maxresdefault.jpg',
        embedUrl: 'https://www.youtube.com/embed/YoHD9XEInc0?autoplay=1&showinfo=0',
        description: 'Inception - Official Trailer',
        renderItem: this._renderVideo.bind(this),
      },
      {
        thumbnail: 'https://img.youtube.com/vi/NgsQ8mVkN8w/hqdefault.jpg',
        original: 'https://img.youtube.com/vi/NgsQ8mVkN8w/maxresdefault.jpg',
        embedUrl: 'https://www.youtube.com/embed/NgsQ8mVkN8w?autoplay=1&showinfo=0',
        description: 'Ratatouille - Official Trailer',
        renderItem: this._renderVideo.bind(this),
      },
    ];
  }

  _toggleShowVideo(url) {
    this.setState({
      showVideo: {
        ...this.state.showVideo,
        [url]: !this.state.showVideo[url]
      }
    });

    if (!this.state.showVideo[url]) {
      if (this.state.showPlayButton) {
        this.setState({showGalleryPlayButton: false});
      }

      if (this.state.showFullscreenButton) {
        this.setState({showGalleryFullscreenButton: false});
      }
    }
  }

  _renderVideo(item) {
    return (
      <div className='image-gallery-image'>
        {
          this.state.showVideo[item.embedUrl] ?
            <div className='video-wrapper'>
                <a
                  className='close-video'
                  onClick={this._toggleShowVideo.bind(this, item.embedUrl)}
                >
                </a>
                <iframe
                  width='560'
                  height='315'
                  src={item.embedUrl}
                  frameBorder='0'
                  allowFullScreen
                >
                </iframe>
            </div>
          :
            <a onClick={this._toggleShowVideo.bind(this, item.embedUrl)}>
              <div className='play-button'></div>
              <img src={item.original}/>
              {
                item.description &&
                  <span
                    className='image-gallery-description'
                    style={{right: '0', left: 'initial'}}
                  >
                    {item.description}
                  </span>
              }
            </a>
        }
      </div>
    );
  }

  render() {
    return (
      <ImageGallery
        items={this.trailers}
        showPlayButton={this.state.showPlayButton && this.state.showGalleryPlayButton}
        showFullscreenButton={this.state.showFullscreenButton && this.state.showGalleryFullscreenButton}
        showThumbnails={true}
        showIndex={false}
        showNav={true}
        thumbnailPosition='bottom'
        slideDuration={450}
        slideInterval={5000}
        slideOnThumbnailOver={false}
        additionalClass="app-image-gallery"
      />
    );
  }
}

export default MyVideoSlider;
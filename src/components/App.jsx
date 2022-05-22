import { Component } from 'react';

import pixabayAPI from '../services/pixabay-api';
import SearchBar from 'components/Searchbar';
import Loader from './Loader';
import ButtonLoadMore from './Button';
import PixabayImageGallery from './ImageGallery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    searchImage: '',
    error: null,
    status: 'idle',
    images: [],
    page: 1,
    totalHits: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevState.searchImage;
    const nextSearch = this.state.searchImage;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearch !== nextSearch) {
      this.loadImagesBySearch(nextSearch);
    }

    if (prevPage < nextPage) {
      this.loadMoreImages(nextPage);
    }
    this.scrollToBottom();
  }

  loadImagesBySearch(searchImage) {
    this.setState({ status: 'pending', images: [] });
    const { page } = this.state;
    pixabayAPI
      .fetchPixabayImage(searchImage, page)
      .then(imagesObj => {
        if (imagesObj.hits.length === 0) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          this.setState({ status: 'idle' });
        } else {
          toast.info(`количество картинок ${imagesObj.totalHits}`);
          this.setState({
            images: imagesObj.hits,
            status: 'resolved',
            totalHits: imagesObj.totalHits,
          });
          console.log(imagesObj.totalHits);
        }
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  }
  loadMoreImages(page) {
    this.setState({ status: 'pending' });
    const { images, searchImage } = this.state;
    pixabayAPI.fetchPixabayImage(searchImage, page).then(imagesObj => {
      this.setState({
        images: [...images, ...imagesObj.hits],
        status: 'resolved',
      });
    });
  }

  handleFormSubmit = searchImage => {
    this.resetPage();
    this.setState({ searchImage: searchImage });
  };

  resetImages() {
    this.setState({ images: [] });
  }

  resetPage() {
    this.setState({ page: 1 });
  }

  onButtonClick() {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  }

  scrollToBottom() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  render() {
    const { images, status, error, page, totalHits } = this.state;
    const loadMore = page < totalHits / 12;

    return (
      <div>
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ToastContainer autoClose={4000} />
        {images.length !== 0 && <PixabayImageGallery images={images} />}
        {status === 'pending' && (
          <div>
            <Loader images={images} />
          </div>
        )}
        {status === 'rejected' && (
          <div role="alert">
            <p>{error.message}</p>
          </div>
        )}
        {status === 'resolved' && loadMore && (
          <div>
            <ButtonLoadMore onClick={() => this.onButtonClick()} />
          </div>
        )}
      </div>
    );
  }
}

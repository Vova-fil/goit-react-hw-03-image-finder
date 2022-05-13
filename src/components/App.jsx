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
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevState.searchImage;
    const nextSearch = this.state.searchImage;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearch !== nextSearch) {
      // console.log('змінився запрос');
      this.loadImagesBySearch(nextSearch);
      // this.setState({ searchImage: '' });
      // this.resetImages();
      // this.resetPage();
    }

    if (prevPage < nextPage) {
      // console.log('змінився номер сторінки');
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
        // console.log(images);
        if (imagesObj.hits.length === 0) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          this.setState({ status: 'idle' });
        } else this.setState({ images: imagesObj.hits, status: 'resolved' });
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  }
  loadMoreImages(page) {
    this.setState({ status: 'pending' });
    const { images, searchImage } = this.state;
    pixabayAPI
      .fetchPixabayImage(searchImage, page)
      // якщо все добре, то ми міняємо статус на резолвд
      .then(imagesObj => {
        // console.log(response);
        if (imagesObj.hits.length === 0) {
          toast.error(
            'Sorry, there are no more images matching your search query.'
          );
          this.setState({ status: 'idle' });
        } else
          this.setState({
            images: [...images, ...imagesObj.hits],
            status: 'resolved',
          });
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  }

  handleFormSubmit = searchImage => {
    console.log(searchImage);
    this.resetPage();
    this.setState({ searchImage: searchImage });
  };

  resetImages() {
    this.setState({ images: [] });
  }

  resetPage() {
    // console.log(this.state.page);
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
    const { images, status, error } = this.state;
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
        {status === 'resolved' && (
          <div>
            <ButtonLoadMore onClick={() => this.onButtonClick()} />
          </div>
        )}
      </div>
    );
  }
}

// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         textTransform: 'uppercase',
//         color: '#010101',
//       }}
//     >
//       React homework template
//     </div>
//   );
// };

import { Component } from 'react';
import PropTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';
import './Searchbar.styled.js';
import {
  Searchbar,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from './Searchbar.styled';

export default class SearchBar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    searchImage: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchImage.trim() === '') {
      toast.warn('Введите корректный запрос!', { theme: 'colored' });
      return;
    }
    this.props.onSubmit(this.state.searchImage);
  };

  handleChange = e => {
    const { value } = e.currentTarget;

    this.setState({
      searchImage: value.toLowerCase(),
    });
  };

  render() {
    return (
      <Searchbar>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormBtn type="submit">
            <FcSearch size="40" />
          </SearchFormBtn>

          <SearchFormInput
            value={this.state.searchImage}
            onChange={this.handleChange}
            className="input"
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="поле поиска изображений и фотографий"
          />
        </SearchForm>
      </Searchbar>
    );
  }
}

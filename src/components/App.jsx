import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './SearchBar/SearchBar';
import { Button } from './Button/Button';
import { useEffect, useState } from 'react';
import { fetchImages } from '../services/fetchImages';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    if (!query) {
      return;
    }
    fetchImages(query, page)
      .then(resp => {
        setImages(prevImages =>
          page === 1 ? [...resp.hits] : [...prevImages, ...resp.hits]
        );
        setTotalImages(resp.totalHits);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, query]);

  const hendleLoadMore = () => {
    setPage(page => page + 1);
    setIsLoading(true);
  };

  const handleSubmit = e => {
    setQuery(e);
    setImages([]);
    setPage(1);
  };

  const reanderButtonOnLOader = () => {
    return isLoading ? (
      <Loader />
    ) : (
      images.length !== 0 && images.length < totalImages && (
        <Button onClick={hendleLoadMore} />
      )
    );
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      <ImageGallery images={images} />
      {reanderButtonOnLOader()}
    </div>
  );
};

// CREATED BY CLASS

// export class Appold extends Component {
// state = {
//   query: '',
//   images: [],
//   page: 1,
//   isLoading: false,
//   totalImages: 0,
// };

// componentDidUpdate(_, prevState) {
//   const { query, page } = this.state;

//   if (prevState.query !== query || prevState.page !== page) {
//     fetchImages(query, page)
//       .then(resp => {
//         this.setState(({ images }) => ({
//           images: page === 1 ? [...resp.hits] : [...images, ...resp.hits],
//           totalImages: resp.totalHits,
//         }));
//       })
//       .finally(() => {
//         this.setState({ isLoading: false });
//       });
//   }
// }

// hendleLoadMore = () => {
//   this.setState(({ page }) => ({ page: page + 1, isLoading: true }));
// };

// handleSubmit = query => {
//   this.setState({ query, isLoading: true });
// };

// reanderButtonOnLOader = () => {
//   return this.state.isLoading ? (
//     <Loader />
//   ) : (
//     this.state.images.length !== 0 &&
//       this.state.images.length < this.state.totalImages && (
//         <Button onClick={this.hendleLoadMore} />
//       )
//   );
// };

//   render() {
//     return (
//       <div>
//         <SearchBar onSubmit={this.handleSubmit} />
//         <ImageGallery images={this.state.images} />
//         {this.reanderButtonOnLOader()}
//       </div>
//     );
//   }
// }

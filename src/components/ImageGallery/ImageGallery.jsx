import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  return (
    <ul className="ImageGallery">
      {images.map(img => {
        return <ImageGalleryItem key={img.id} image={img} />;
      })}
    </ul>
  );
};

// export class ImageGallery extends Component {
//   state = {
//     images: [],
//   };

// async componentDidMount() {
//   try {
//     const images = await this.imgData();
//     this.setState({ images });
//   } catch (error) {
//     console.error(error);
//   }
// }

// render() {

// const currentImages = this.state.images.map(image => ({
//   id: image.id,
//   webURL: image.webformatURL,
//   largeURL: image.largeImageURL,
//   name: image.user,
// }))

//     return (
//       <ul>
//         <ImageGalleryItem />
//       </ul>
//     );
//   }
// }

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRef = document.querySelector('#modal-root');

export const Modal = ({ largeImage, type, onClose }) => {
  useEffect(() => {
    const onCloseByEsc = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onCloseByEsc);
    return () => {
      window.removeEventListener('keydown', onCloseByEsc);
    };
  }, [onClose]);

  return createPortal(
    <div onClick={onClose} className="Overlay">
      <div className="Modal">
        <img src={largeImage} alt={type} />
      </div>
    </div>,
    modalRef
  );
};

// cREATED BY CLASS

// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.onCloseByEsc);
//   }
//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.onCloseByEsc);
//   }
//   onCloseByEsc = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };
//   render() {
//     const { largeImage, type, onClose } = this.props;
//     return createPortal(
//       <div onClick={onClose} className="Overlay">
//         <div className="Modal">
//           <img src={largeImage} alt={type} />
//         </div>
//       </div>,
//       modalRef
//     );
//   }
// }

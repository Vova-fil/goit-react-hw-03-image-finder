import { Component } from 'react';
export default class App extends Component {
  state = {
    searchImage: '',
    error: null,
    status: 'idle',
    images: [],
    page: 1,
  };

   onButtonClick() {
    
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  }
   render() {
    const { images, status, error } = this.state;
     return (
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

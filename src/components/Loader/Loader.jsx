// import { Oval } from 'react-loader-spinner';
//import { Spinner } from '@chakra-ui/react';
import Spinner from 'react-bootstrap/Spinner';

import { LoaderStyle, Title } from './Loader.styled';

export default function Loader() {
  return (
    <LoaderStyle>
      <Title> Загрузка...</Title>
      <Spinner animation="border" variant="warning" />
    </LoaderStyle>
  );
}

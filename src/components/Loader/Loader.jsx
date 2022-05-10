import { Oval } from 'react-loader-spinner';
import { LoaderStyle, Title } from './Loader.styled';

export default function Loader() {
  return (
    <LoaderStyle>
      <Title>Загрузка...</Title>
      <Oval
        height="50"
        width="50"
        strokeWidth={5}
        color="red"
        secondaryColor="yellow"
      />
    </LoaderStyle>
  );
}

import { Child } from './Child';

const Parent = () => {
  return (
    <Child color='green' onClick={() => console.log('Clicked')}>
      Hello form inside the component
    </Child>
  );
};

export default Parent;

export default (state, lastKnowScrollY = 0, currentScrollY = 0) => {
  const scrollDirection = currentScrollY >= lastKnowScrollY ? 'down': 'up';
  const { status, wrapperHeight } = state;

  // If we reach the top and is still not "unfixed"
  if (
    currentScrollY <= 0
    && status !== 'unfixed'
  ) {
    return 'unfix';
  // If scrolling down but haven't passed header, keep scrolling
  } else if (
    currentScrollY <= wrapperHeight 
    && scrollDirection === 'down'
    && status === 'unfixed'
  ) {
    return 'none';
  // If header is passed while scrolling down, unpin header
  } else if (
    scrollDirection === 'down'
    && status !== 'unpinned'
    && currentScrollY > wrapperHeight
  ) {
    return 'unpin';
  // While scrolling up when the header is passed, pin the header
  } else if (
    currentScrollY > 0
    && scrollDirection === 'up'
    && status === 'unpinned'
  ) {
    return 'pin';
  } else {
    return 'none';
  }
};
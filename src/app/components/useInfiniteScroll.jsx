import { useEffect, useState } from "react";

const useInfiniteScroll = (loadMore) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 50 &&
        !isFetching
      ) {
        setIsFetching(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching]);

  useEffect(() => {
    if (!isFetching) return;

    loadMore().then(() => setIsFetching(false));
  }, [isFetching, loadMore]);

  return isFetching;
};

export default useInfiniteScroll;

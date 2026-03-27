import useSWR from 'swr';

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useTasks() {
  const { data, error } = useSWR('/api/v1/tasks', fetcher);
  return {
    tasks: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useCategories() {
  const { data, error } = useSWR('/api/v1/categories', fetcher);
  return {
    categories: data,
    isLoading: !error && !data,
    isError: error,
  };
}

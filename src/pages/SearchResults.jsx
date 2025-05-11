import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axiosInstance from '../lib/axiosInstance';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const query = searchParams.get('q');

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get('/customers', {
          params: {
            search: query,
            search_fields: ['user.full_name', 'user.phone', 'city.name'],
            per_page: 10,
            page: 1
          }
        });

        if (response.data && response.data.data) {
          setResults(response.data.data);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
        setError(error.response?.data?.message || t('search.error'));
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, t]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">{t('search.error')}</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {t('search.results')}: {query}
      </h1>
      
      {results.length === 0 ? (
        <p className="text-gray-500">{t('search.noResults')}</p>
      ) : (
        <div className="grid gap-4">
          {results.map((customer) => (
            <div
              key={customer.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{customer.user.full_name}</h2>
                  <p className="text-gray-600">{customer.user.phone}</p>
                  <p className="text-gray-500">
                    {customer.city.nameEN} / {customer.country.nameEN}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-sm ${
                    customer.user.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {customer.user.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults; 